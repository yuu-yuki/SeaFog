import React from 'react';
import { AsyncStorage } from 'react-native'

import Home from './src/components/Home'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount() {
    //this._checkNetworkConnection()
    this._isDataExists()
  }

  // _checkNetworkConnection() {
  //   NetInfo.getConnectionInfo().then((connectionInfo) => {
  //     this.setState({
  //       connectionType : connectionInfo.type,
  //       effectiveType : connectionInfo.effectiveType
  //     })
  //   });
  // }

  async _isDataExists(){
    await AsyncStorage.getItem('DATA_OBJECT')
      .then((value) => {
        if (value === null) {
          this._storeData()
        }
      })
      .catch(() => {
        this.setState({
          isError : true
        })
      })
  }

  async _storeData(){
    let newObject = {
      city : {
        label: 'Vũng tàu',
        value: 'vung tau'
      },
      units : {
        label: '°C',
        value: 'metric'
      }
    }
    await AsyncStorage.setItem('DATA_OBJECT', JSON.stringify(newObject))
      .catch(() => {
        this.setState({
          isError : true
        })
      })
  }



  render() {
    return (
      <Home />
    )
  }
}



