import React, { Component } from 'react'
import {ImageBackground, StyleSheet, View, Text, AsyncStorage, Dimensions, Image} from 'react-native'
import Swiper from 'react-native-swiper'
import axios from 'axios'
import { LinearGradient } from 'expo'

import WeatherHome from './WeatherHome'
import WeatherList from './WeatherListHourly'
import WeatherChart from './WeatherChart'
import WeatherConfig from './WeatherConfig'
import Info from './Info'

import backgound from '../../assets/seafog.jpg'
import logo from '../../assets/logo.png'

const {width, height} = Dimensions.get('window')

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weatherData : [],
      isLoading : true,
      isReady : false,
      error : {
        errorHandle : false,
        text : ''
      },
      appObject : {
        city : '',
        units: ''
      }
    }
  }

  // Cb dữ liệu
  componentWillMount() {
    this._onReady()
  }

  componentDidMount() {

  }

  async _onReady() { 
    await this._retrieveData()
    await this._getWeatherData()
    await setTimeout(() => {
      if(!this.state.isLoading && !this.state.error.errorHandle) {
        this.setState({isReady:true})
      } else {
        this.setState(state => ({error : {...state.error, errorHandle: true, text : 'Đang lấy dữ liệu thời tiết...'}}))
      }
    }, 3000)
  }

  // Get data from AsyncStorage
  async _retrieveData() {
    await AsyncStorage.getItem('DATA_OBJECT')
      .then((value) => {
        let parsed = JSON.parse(value)
        this.setState(state => ({appObject : {...state.appObject, city: parsed.city, units: parsed.units}}))
      })
      .catch(() => {
        this.setState(state => ({error : {...state.error, errorHandle: true, text : 'Không lấy được dữ liệu trong hệ thống.'}}))
      })
  }

  // Get weather data from openweathermap.com
  async _getWeatherData() {
    let {city, units} = this.state.appObject
    await axios.get("http://api.openweathermap.org/data/2.5/forecast", {
      params : {
        q : city,
        units : units,
        APPID : '825b6253f970889b88af823e5bd09f20'
      }
    })
    .then(res => this.setState({weatherData : res.data.list, isLoading: false}))
    .catch(() => {
      this.setState(state => ({error : {...state.error, errorHandle: true, text : 'Không lấy được dữ liệu thời tiết.'}}))
    })
  }

  async _getState(appObject){
    await this.setState(state => (
        {
          appObject : {...state.appObject, city : appObject.city, units : appObject.units}, 
          isLoading: true,
          isReady: false
        }
      )
    )
    await this._getWeatherData()
    await setTimeout(() => {
      if(!this.state.isLoading && !this.state.error.errorHandle) {
        this.setState({isReady:true})
      } else {
        this.setState(state => ({error : {...state.error, errorHandle: true, text : 'Đang lấy dữ liệu thời tiết...'}}))
      }
    }, 3000)
  }

  // Render
  render() {
    let {weatherData} = this.state
    // Checking is data loading
    if(this.state.isReady) {
      // When data ready
      return (
        <View style={styles.container}>
          <ImageBackground source={backgound} style={styles.imageBackgound}>
          <Swiper loop={false} showsPagination={false} index={1} >
          {/* Swiper left - Weather Left */}
          <Info/>
          <Swiper horizontal={false} loop={false} showsPagination={false} index={1} >
            {/* Swiper top - Weather Chart */}
            <WeatherChart weatherList={weatherData} />    
            {/* Swiper home - Weather Home */}
            <WeatherHome weather={weatherData.slice(0,1)[0]}/>
            {/* Swiper down - Weather Hourly */}
            <WeatherList weatherList={weatherData.slice(0, 7)} />
          </Swiper> 
          {/* Swiper right - Weather Right */}
          <WeatherConfig appObject={this.state.appObject} getState={appObject => this._getState(appObject)}/>
        </Swiper>
          </ImageBackground>
        </View>  
      )
    } else { 
      // When data is loading
      let colors = ["#00FFFF","#17C8FF","#329BFF","#4C64FF","#6536FF","#8000FF"]
      return (
        <LinearGradient colors={colors} style={styles.container}>
          <Image source={logo} style={styles.logo}/>
          <Text style={styles.errorText}>{this.state.error.text}</Text>
        </LinearGradient>
      );
    }
  }
}

const styles = StyleSheet.create({
  container : {
    width: width,
    height: height,
    paddingTop : 30,
  },
  logo : {
    position: 'absolute',
    alignSelf: 'center',
    bottom: height/2,
    width: 96,
    height: 96,
  },
  errorText : {
    color: '#fff',
    position: 'absolute',
    alignSelf: 'center',
    bottom: height/3,
    fontWeight: '500'
  },
  imageBackgound : {
    width: '100%', 
    height: '100%',
  },
  ring: {
    backgroundColor: "#40C4FF",
    borderRadius: 150,
    borderWidth: 2,
    borderColor: "#FFF",
    padding: 7
  },
})