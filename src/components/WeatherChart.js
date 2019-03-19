import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Svg from 'expo'
import { LineChart, YAxis, Grid, XAxis } from 'react-native-svg-charts'
import moment from 'moment'

import Dimensions from 'Dimensions'

const { width, height } = Dimensions.get('window')
const {Defs, LinearGradient, Stop } = Svg

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
        dates.push(weather.dt)
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
    let {showText} = this.props
    let font = { fontSize: 12, fill: 'black' }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Weather Statistics</Text>
        <View style={styles.yAxisContainer}>
          <YAxis
            style={styles.yAxis}
            data={data.temps}
            contentInset={{ top: 20, bottom: 20 }}
            svg={font}
            numberOfTicks={10}
            formatLabel={value => `${value}${showText.units.label}`}
          />
          <LineChart
            style={{ flex: 1 }}
            data={data.temps}
            gridMin={25}
            contentInset={{ top: 10, bottom: 10 }}
            svg={{ stroke: 'rgb(134, 65, 244)' }}
          >
            <Grid />          
          </LineChart>
        </View>
        <XAxis
          style={styles.xAxis}
          data={data.dates}
          contentInset={{ left: 20, right: 20 }}
          svg={font}
          xAccessor={({ value }) => value}
          formatLabel={(value) => value}
        />
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
    fontSize: 28,
    fontWeight: '600',
    position: 'absolute',
    alignSelf: 'center',
    top: 30
  },
  yAxisContainer: {
    height: height / 2,
    flexDirection: 'row'
  },
  yAxis: {
    height: height / 2
  },
  xAxis: {
    marginLeft: 25
  }
})