import React, { Component } from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import axios from 'axios'
import Dimensions from 'Dimensions'

import getPathIcon from '../Images'
import CurrentDate from './CurrentDate'

const {width, height} = Dimensions.get('window');

export default class WeatherHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentWeather: {},
      temperature: 0,
      icon: '',
      statusText: ''
    }
  } 

  componentWillMount() {
    this._getWeatherData()
  }

  _getWeatherData() {
    axios.get("http://api.openweathermap.org/data/2.5/weather?q=vung%20tau,vn&units=metric&APPID=825b6253f970889b88af823e5bd09f20")
    .then(res => this.setState({
      currentWeather : res.data, 
      temperature: Math.round(res.data.main.temp),
      icon : res.data.weather[0].icon,
      statusText: this._uppercaseFirstLetter(res.data.weather[0].description),
      errorHandle : false
    }))
    .catch(err => this.setState({errorHandle : true}) )
  }

  _uppercaseFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {  
    let {temperature, icon, statusText} = this.state 
    return (  
      <View style={styles.container}>
        <Text style={styles.appTitle}>SEA FOG APPLICATION</Text>
        <View style={styles.weatherDetail}>
          <View style={styles.weatherStatus} >
            <Image style={styles.statusIcon} source={getPathIcon(icon)} />       
            <CurrentDate style={styles.statusDate}/>
          </View>
          <Text style={styles.weatherTemperature}>{temperature}°C</Text>
          <Text style={styles.statusText}>{statusText}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    flexDirection: 'column',
    width: width,
    height: height
  },
  appTitle : {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: '300'
  },
  weatherDetail : {
    alignItems: 'flex-end',
    marginTop : 10,
    marginRight: 20,
  },
  weatherStatus : {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  statusIcon : {
    height: 32,
    width: 32,
    marginRight: 8
  },
  statusDate : {
    fontSize: 16,
    fontWeight: '300'
  },
  statusText : {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600'
  },
  weatherTemperature: {
    fontSize: 64,
  },
});