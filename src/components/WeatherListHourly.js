import React, { Component } from 'react'
import {View, StyleSheet, FlatList, Text, Image} from 'react-native'

import WeatherListItem from './WeatherListHourlyItem'

import iconTitle from '../../assets/clock.png'

export default class WeatherList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weatherListHourly : props.weatherList,
    }
  }
  
  render() {
    let {weatherListHourly} = this.state
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