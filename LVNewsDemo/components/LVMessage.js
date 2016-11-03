//导入外部组件
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';


//组件
class LVMessage extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>消息</Text>
            </View>
        )

    }
}

//组件样式
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

});

//导出组件
module.exports = LVMessage;