import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import {Svg} from 'expo'
import { LineChart, YAxis, Grid, XAxis } from 'react-native-svg-charts'

import Dimensions from 'Dimensions'

const { width, height } = Dimensions.get('window')

export default class WeatherChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weatherData : {
        temps : [],
        dates : []
      }
    }
  }

  componentWillMount() {
    this._prepareData()
  }

  _prepareData() {
    let temps = [], dates = []
    let index = 0
    for(let weather of this.props.weatherList) {
      if(index % 4 == 0){
        temps.push(weather.main.temp)
        dates.push(new Date(weather.dt * 1000))
      }
      index++
    }
    this.setState(state => ({weatherData : {...state.weatherData, temps : temps, dates : dates}}))
  }

  render() {
    const data ={
      temps : this.state.weatherData.temps,
      dates : this.state.weatherData.dates
    } 
    const contentInset = { top: 20, bottom: 20 }
    let font = { fontSize: 12, fill: 'black' }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Thống kê thời tiết</Text>
        <View style={styles.yAxisContainer}>
          <YAxis
            style={styles.yAxis}
            data={data.temps}
            contentInset={contentInset}
            svg={font}
            numberOfTicks={10}
            formatLabel={value => `${value}ºC`}
          />
          <LineChart
            style={{ flex: 1 }}
            data={data.temps}
            gridMin={0}
            contentInset={{ top: 10, bottom: 10 }}
            svg={{ stroke: 'rgb(134, 65, 244)' }}
          >
            <Grid />
        
          </LineChart>
        </View>
        <XAxis
          style={styles.xAxis}
          data={data.dates}
          formatLabel={(value, index) => value}
          contentInset={{ left: 10, right: 10 }}
          svg={font} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    opacity: 0.6,
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '600'
  },
  yAxisContainer: {
    height: height / 2,
    flexDirection: 'row'
  },
  yAxis: {
    height: height / 2
  },
  xAxis: {
    marginLeft: 30
  }
})