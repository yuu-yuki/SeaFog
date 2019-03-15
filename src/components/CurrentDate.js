import React, { Component } from 'react'
import {Text} from 'react-native'

export default class CurrentDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curTime : new Date(),
      curDay: "",
    }
  }

  componentDidMount() {
    this.curTimeId = setInterval(() => {
      this.setState({
        curTime : new Date()
      })
    }, 1000)

    switch(new Date().getDay()) {
      case 0 : this.setState({curDay: "Chủ nhật"}); break
      case 1 : this.setState({curDay: "Thứ hai"}); break
      case 2 : this.setState({curDay: "Thứ ba"}); break
      case 3 : this.setState({curDay: "Thứ tư"}); break
      case 4 : this.setState({curDay: "Thứ năm"}); break
      case 5 : this.setState({curDay: "Thứ sáu"}); break
      case 6 : this.setState({curDay: "Thứ bảy"}); break
    }
  }

  render() {
    let {curTime, curDay} = this.state;

    return <Text style={this.props.style}> {curDay} - {curTime.toLocaleDateString()}</Text>
  }
}