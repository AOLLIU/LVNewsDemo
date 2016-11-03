/**
 * Created by liuwei on 16/11/1.
 */
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
    Text,
    View,
    NavigatorIOS,
    TabBarIOS
} from 'react-native';

//导入自己构建的组件
var LVHome = require('./LVHome');
var LVFind = require('./LVFind');
var LVMessage = require('./LVMessage');
var LVMine = require('./LVMine');

// 声明TabBarItem
var TabBarItemIOS = TabBarIOS.Item;

//组件
var LVTabBar = React.createClass({


    //状态机
    getInitialState(){
        return{
            selectedItem:'home'
        }
    },

    //渲染组件
    render() {
        return (
            //TabBar
            <TabBarIOS
                tintColor='orange'
            >
                {/*首页*/}
                <TabBarItemIOS
                    title='首页'
                    icon={require('image!tabbar_home')}
                    selectedIcon={require('image!tabbar_home_highlighted')}
                    onPress={()=>{
                        this.setState({
                            selectedItem:'home'
                        })
                    }}
                    selected={this.state.selectedItem === 'home'}
                >
                    <NavigatorIOS
                        style={styles.navStyle}
                        tintColor='orange'
                        initialRoute={
                            {
                                title:'首页',
                                component:LVHome,
                            }
                        }
                    />
                </TabBarItemIOS>
                {/*发现*/}
                
                <TabBarItemIOS
                    tintColor='orange'
                    title='发现'
                    icon={require('image!tabbar_discover')}
                    selectedIcon={require('image!tabbar_discover_highlighted')}
                    onPress={()=>
                        this.setState({
                            selectedItem:'discover'
                        })
                    }
                    selected={this.state.selectedItem === 'discover'}
                >

                    <NavigatorIOS
                        style={styles.navStyle}
                        tintColor='orange'
                        initialRoute={
                            {
                                title:'发现',
                                component:LVFind,
                            }
                        }
                    />
                </TabBarItemIOS>
                {/*消息*/}
                <TabBarItemIOS
                    title='消息'
                    icon={require('image!tabbar_message_center')}
                    selectedIcon={require('image!tabbar_message_center_highlighted')}
                    onPress={()=>{
                        this.setState({
                            selectedItem:'message'
                        })
                    }}
                    selected={this.state.selectedItem === 'message'}
                >
                    <NavigatorIOS
                        style={styles.navStyle}
                        tintColor='orange'
                        initialRoute={
                            {
                                title:'消息',
                                component:LVMessage,
                            }
                        }
                    />
                </TabBarItemIOS>
                {/*我的*/}
                <TabBarItemIOS
                    title='我的'
                    icon={require('image!tabbar_profile')}
                    selectedIcon={require('image!tabbar_profile_highlighted')}
                    onPress={()=>{
                        this.setState({
                            selectedItem:'mine'
                        })
                    }}
                    selected={this.state.selectedItem === 'mine'}
                >
                    <NavigatorIOS
                        style={styles.navStyle}
                        tintColor='orange'
                        initialRoute={
                            {
                                title:'我的',
                                component:LVMine,
                            }
                        }
                    />
                </TabBarItemIOS>
            </TabBarIOS>
        )
    }
    
})


//组件样式
const styles = StyleSheet.create({
    navStyle: {
        flex:1,
    },

});

//导出组件
module.exports = LVTabBar;
