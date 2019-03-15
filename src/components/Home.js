import React, { Component } from 'react'
import {ScrollView, Text, View} from 'react-native'
import Swiper from 'react-native-swiper'

import WeatherHome from './WeatherHome'
import WeatherList from './WeatherListHourly'
import WeatherChart from './WeatherChart'

export default class Home extends Component {
  render() {
    return (
      <Swiper loop={false} showsPagination={false} index={1}>
        {/* Swiper left - Weather Left */}
        <View><Text>X</Text></View>
        <Swiper horizontal={false} loop={false} showsPagination={false} index={1}>
          {/* Swiper up - Weather Chart */}
          <WeatherChart></WeatherChart>
          {/* Swiper home - Weather Home */}
          <WeatherHome/>
          {/* Swiper down - Weather Hourly */}
          <WeatherList/>
        </Swiper> 
        {/* Swiper right - Weather Right */}
        <View><Text>Y</Text></View>
      </Swiper>
    )
  }
}