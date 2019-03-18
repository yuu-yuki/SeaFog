import React, {Component} from 'react'
import {View, Text, StyleSheet, Picker, Dimensions, AsyncStorage, TouchableOpacity} from 'react-native'
import { Card } from 'react-native-elements'
import { Constants, LinearGradient } from 'expo'

import {units, cities} from '../../data/store.json'

const { width, height } = Dimensions.get('window')
export default class WeatherConfig extends Component {

  constructor(props){
    super(props)
    this.state = {
      appObject : {
        city : {
          label: '',
          value: ''
        },
        units: {
          label: '',
          value: ''
        }
      },
      isChanging : false
    }
  }

  componentWillMount(){
    let {appObject} = this.props
    this.setState(state => ({appObject:{...state.appObject, city: appObject.city, units: appObject.units}}))
  }

  _renderCities(){
    let converted = []
    cities.map(city => converted.push(<Picker.Item label={city.label} value={city.value}/>))  
    return converted;
  }

  _renderUnits(){
    let converted = []
    units.map(unit => converted.push(<Picker.Item label={unit.label} value={unit.value}/>))  
    return converted;
  }

  async _storeData(){
    let newObject = {
      city : {
        label: this.state.appObject.city.label,
        value: this.state.appObject.city.value
      },
      units : {
        label: this.state.appObject.units.label,
        value: this.state.appObject.units.value
      }
    }
    await AsyncStorage.setItem('DATA_OBJECT', JSON.stringify(newObject))
  }

  async _storeCity(itemValue, itemIndex){
    await cities.map((city, index) => {
      if(index === itemIndex) {
        this.setState(state => ({
          appObject : {
            ...state.appObject, 
            city: city
          }
        }))
      }
    })
    await this._storeData()
  }

  async _storeUnit(itemValue, itemIndex){
    await units.map((unit, index) => {
      if(index === itemIndex) {
        this.setState(state => ({
          appObject : {
            ...state.appObject, 
            units: unit
          }
        }))
      }
    })
    await this._storeData()
  }

  _submit(){
    if(!this.state.isChanging){
      this.props.getState(this.state.appObject)
    }
  }

  render() {
    let colors = ["#00FFFF","#17C8FF","#329BFF","#4C64FF","#6536FF","#8000FF"]
    return(
      <View style={styles.container}>  
        <Text style={styles.title}>
          Settings
        </Text>
        <View style={styles.configContainer}>
          <View style={styles.selectContainer}>
            <Text style={styles.selectTitle}>Select Cities</Text>
            <Picker
              selectedValue={this.state.appObject.city.value}
              onValueChange={(itemValue, itemIndex) =>this._storeCity(itemValue, itemIndex)}
            >
            {this._renderCities()}
          </Picker>
          </View>
          <View style={styles.selectContainer}>
            <Text style={styles.selectTitle}>Select Units</Text>
            <Picker
              selectedValue={this.state.appObject.units.value}
              onValueChange={(itemValue, itemIndex) =>this._storeUnit(itemValue, itemIndex)}
            >
            {this._renderUnits()}
            </Picker>
          </View>
        </View>
        <View style={styles.button}>
          <LinearGradient
            colors={colors}
            start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
            style={styles.buttonGradient}
          >
          <TouchableOpacity style={styles.buttonContainer} onPress={() => this._submit()}>
              <Text style={styles.buttonText}>
                Confirm
              </Text>
            </TouchableOpacity>
          </LinearGradient>       
        </View>
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
    justifyContent: 'center',
    paddingLeft: 25,
    paddingRight: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    position: 'absolute',
    alignSelf: 'center',
    top: 30
  },
  configContainer: {
    height: height/2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',

  },
  selectTitle : {
    fontSize: 18,
    fontWeight: '500',
    alignSelf: 'center'
  },
  button:{
    alignSelf: 'center',
  },
  buttonGradient:{ 
    height: 55, 
    width: 200, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  buttonContainer: {
    width: 200,
    alignItems: 'center',
  }, 
  buttonText: {
    textAlign: 'center',
    justifyContent: 'center',
    color: '#329BFF',
    fontSize: 18,
    fontWeight: '600',
    paddingTop:14,
    paddingBottom:14,
    marginLeft: 1,
    marginRight: 1,
    width: 194,
    backgroundColor: '#fff'
  }
})