import React from 'react';
import { View, Text, StyleSheet, ImageBackground, NetInfo  } from 'react-native'

import backgound from './assets/seafog.jpg'

import Home from './src/components/Home'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      connectionType : 'none',
      effectiveType : 'none'
    }
  }

  componentWillMount() {
    this._checkNetworkConnection()
  }

  _checkNetworkConnection() {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      this.setState({
        connectionType : connectionInfo.type,
        effectiveType : connectionInfo.effectiveType
      })
    });
  }

  render() {
    if(this.state.connectionType !== "none") {
      return (
        <View style={styles.container}>
          <ImageBackground source={backgound} style={styles.imageBackgound}>
            <Home />
          </ImageBackground>
        </View>
      )
    } else {
      return (
        <View>
          <Text>ERR</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container : {
    paddingTop : 30
  },
  imageBackgound : {
    width: '100%', 
    height: '100%',
  }
});

