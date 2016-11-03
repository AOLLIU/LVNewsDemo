/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

//导入外部组件
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
} from 'react-native';

var LVTabBar = require('./components/LVTabBar');

//组件
class LVNewsDemo extends Component {
  
  render() {
    return (
        <LVTabBar/>
    )
  }
}

//注册组件
AppRegistry.registerComponent('LVNewsDemo', () => LVNewsDemo);
