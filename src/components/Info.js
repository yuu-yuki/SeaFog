import React, {Component} from 'react'
import {Text, View, StyleSheet, Image} from 'react-native'

export default class Info extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Info</Text>
        <Image style={styles.img} source={require('../../assets/img.jpg')}/>
        <Text style={styles.devText}>Dev-ers</Text>
        <Text style={styles.devName}>Duy & Hiếu</Text>
        <Text style={styles.devContact}>Contact us : achduy113@gmail.com</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    
    paddingTop: 80
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    position: 'absolute',
    alignSelf: 'center',
    top: 30
  },
  img : {
    width: 230,
    height: 230,
    alignSelf: 'center'
  }, 
  devText : {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 10,
    alignSelf: 'center'
  },
  devName : {
    marginTop: 10,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '300',
  },
  devContact : {
    marginTop: 10,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'italic'
  }
})