import React, { Component } from 'react'
import {View, StyleSheet, FlatList, Text, Image} from 'react-native'
import axios from 'axios'

import WeatherListItem from './WeatherListHourlyItem'

import iconTitle from '../../assets/clock.png'

export default class WeatherList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weatherListHourly : [],
      errorHandle : false
    }
  }

  componentWillMount() {
    this._getWeatherData()
  }

  componentDidMount() {
    
  }

  _getWeatherData() {
    axios.get("http://api.openweathermap.org/data/2.5/forecast?q=vung%20tau,vn&units=metric&APPID=825b6253f970889b88af823e5bd09f20")
    .then(res => this.setState({
      weatherListHourly : res.data.list.slice(0, 6), 
      errorHandle : false
    }))
    .catch(err => this.setState({errorHandle : true}) )
  }
  
  render() {
    // Conditional when get weather error
    let {weatherListHourly} = this.state
    if (this.state.errorHandle !== true) {
      return (
        <View style={styles.container}>
          <View style={styles.containerTitle}>
            <Image style={styles.iconTitle} source={iconTitle}/>
            <Text style={styles.title}>Hourly Forecase</Text>
          </View>
          
          <FlatList 
            data={weatherListHourly}
            renderItem={({item})=> <WeatherListItem weather={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>         
      )
    }
    else {
      return (
        <View>

        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff', 
    opacity: 0.6,
  },
  containerTitle : {
    paddingLeft : 15,
    flexDirection: 'row',
    marginTop: 11,
    marginBottom: 11
  },
  title : {    
    marginLeft: 10,
    fontSize: 24,
  },
  iconTitle : {
    height: 32,
    width: 32
  },
  weatherList : {
    paddingRight : 15,
    paddingLeft : 15
  },
})