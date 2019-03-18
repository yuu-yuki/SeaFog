import React, {Component} from 'react'
import {Text, View, StyleSheet} from 'react-native'

export default class Info extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Info</Text>
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
  }
})