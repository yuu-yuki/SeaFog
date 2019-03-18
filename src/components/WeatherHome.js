import React, { Component } from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import Dimensions from 'Dimensions'

import getPathIcon from '../Images'
import CurrentDate from './CurrentDate'

const {width, height} = Dimensions.get('window')

export default class WeatherHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weatherData : {
        weatherIcon : props.weather.weather[0].icon,
        statusText : this._uppercaseFirstLetter(props.weather.weather[0].description),
        weatherTemperature: Math.round(props.weather.main.temp),
      }
    }
  } 

  // componentWillReceiveProps(nextProps){
  //   if(nextProps.weather !== this.props.weather){
  //     let parsed = JSON.stringify(nextProps.weather[0])
  //     if(parsed !== undefined) {
  //       this.setState((state, props) => ({
  //         weatherData : {
  //           ...state.weatherData, 
  //           weatherTemperature : nextProps.weather[0].main.temp
  //         }
  //       }))
  //     }  
  //   }
  // }

  _uppercaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1) 
  }

  render() {  
    let {weatherTemperature, weatherIcon, statusText} = this.state.weatherData
    let {showText} = this.props
    return (  
      <View style={styles.container}>
        <Text style={styles.appTitle}>SEA FOG APPLICATION</Text>
        <View style={styles.weatherDetail}>
          <View style={styles.weatherStatus} >
            <Image style={styles.statusIcon} source={getPathIcon(weatherIcon)} />   
            <Text style={styles.city}> {showText.city.label} - </Text>
            <CurrentDate style={styles.statusDate}/>
          </View>
          <Text style={styles.weatherTemperature}>{weatherTemperature}{showText.units.label}</Text>
          <Text style={styles.statusText}>{statusText}</Text>
        </View>
      </View>
    )
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
  city : {
    fontSize: 16,
    fontWeight: '300'
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
})