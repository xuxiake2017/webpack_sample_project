import React, { Component } from 'react'
import config from "./config.json"
import styles from './Greeter.css'

export default class Greeter extends Component {
  constructor() {
    super();
    this.state = {
      name: '张三'
    }
    this.age = 23
  }
  componentDidMount() {
    console.log('componentDidMount')
    this.getData()
    console.log(this.age)
    console.log(this)
  }
  getData () {
  }
  onClick () {
    this.setState({
      name: '李四'
    })
    alert('111')
  }

  render() {
    return (
      <div className={ styles.root } onClick={ () => this.onClick() }>
        {config.greetText}
        <div>{ this.state.name }</div>
      </div>
    )
  }
}