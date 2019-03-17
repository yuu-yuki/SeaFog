import React, { Component } from 'react'
import {View, Image, StyleSheet, Text, Button} from 'react-native'

import getPathIcon from '../Images'

export default class WeatherListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weatherData: {
        weatherIcon : props.weather.weather[0].icon,
        weatherTime : this._convertTo12Hour(new Date(props.weather.dt * 1000).getHours()),
        weatherTemperature: props.weather.main.temp,
      }
    }
  }

  _convertTo12Hour(time) {
    return time >= 12 ? (time-12) + " PM" : time + " AM"
  }

  render() {
    let {weatherIcon, weatherTime, weatherTemperature} = this.state.weatherData
    return(
      <View style={styles.container}>
        <Image style={styles.weatherIcon} source={getPathIcon(weatherIcon)} />
        <Text style={styles.weatherTime}>{weatherTime}</Text>
        <Text style={styles.weatherTemperature}>{weatherTemperature}°C</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    marginRight: 30,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 11,
    paddingBottom: 11,
    borderTopWidth: 1,
    borderTopColor: 'gray'
  },
  weatherIcon : {
    width: 32,
    height: 32,
    marginRight: 15
  },
  weatherTime : {
    fontWeight: '500'
  },
  weatherTemperature : {
    fontWeight: '500',
    marginLeft: 'auto',
  }
})