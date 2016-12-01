//导入外部组件
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableOpacity
} from 'react-native';

var Dimensions = require('Dimensions');
var ScreenW = Dimensions.get('window').width;


//引入轮播器组件
var JHScroll = require('../components/JHScroll');
//引入新闻详情页
var LVNewsDetail = require('../components/LVNewsDetail');

//组件

var  LVHome = React.createClass({
    
    //默认值
    getDefaultProps(){
        return{
            news_list_api: 'http://c.m.163.com/nc/article/headline/T1348647853363/0-30.html?from=toutiao&passport=&devId=nTM86EPlcxZu09VdpTEh6aR3%2B%2FQX6x8vHBD3ne3k5bbgOrg%2FIP5DcguSDmtYyWbs&size=30&version=5.6.0&spever=false&net=wifi&lat=VdPAjFYS6V%2FbifLTNfVZ3w%3D%3D&lon=5xuPWSzPlEX%2F4Ms7bCMCKQ%3D%3D&ts=1459406426&sign=3bxtXzgK0Ab1G%2FKhd%2Fzmew9NKDXQtjYxIXJmE2dPK9B48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore',
            key_word:'T1348647853363'
        }
    },
    
    //状态机
    getInitialState(){
        return{
            // 是否加载数据
            isLoad: false,
            // 滚动图的数据
            scrollImageData: [],
            // listView的数据
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        }
    },

    //渲染组件
    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                renderHeader={this.renderHeader}
            />
        )
    },

    //渲染每一行
    renderRow(rowData){
        return(
            <TouchableOpacity onPress={()=>this.pushToNewsDetail(rowData)}>
                <View style={styles.container}>
                    <Image source={{uri: rowData.imgsrc}} style={styles.cellImageStyle}/>
                    <View style={styles.innerContainer}>
                        <Text style={styles.titleStyle}>{rowData.title}</Text>
                    </View>
                    <View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    },

    //跳转到新闻详情页
    pushToNewsDetail(rowData){
        this.props.navigator.push({
            title:'新闻详情',
            component:LVNewsDetail,
            passProps:{rowData}
        })
    },

    //渲染header
    renderHeader(){
        if (this.state.scrollImageData.length == 0)return;
        return(
            <JHScroll
                imageData = {this.state.scrollImageData}
            />
        )
    },
    
    //复杂操作(发送请求获取数据)
    componentDidMount(){
        // 从网络上加载数据
        this.loadNewsListFormNet();
    },
    
    //发送请求获取数据
    loadNewsListFormNet(){
        var me = this;
        fetch(me.props.news_list_api)
            .then((response)=>response.json())
            .then((responseData)=>{
                var data = responseData[me.props.key_word];
                // 取出滚动图片数据
                var scrollImageData = [];
                // 取出列表需要的数据
                var listViewData = [];
                for(var i=0; i< data.length; i++){
                    // 每一条数据
                    var item = data[i];
                    if(item.hasHead ===1){
                        scrollImageData=item.ads;
                        //debugger;
                    }else{
                        listViewData.push(item);
                    }
                }


                // 更新状态
                this.setState({
                    // 是否加载数据
                    isLoad: true,
                    // 滚动图的数据
                    scrollImageData: scrollImageData,
                    // listView的数据
                    dataSource: this.state.dataSource.cloneWithRows(listViewData)
                });
            })
    },

})

//组件样式
const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        backgroundColor: "red",
        borderBottomWidth:0.5,
        borderBottomColor:'#dddddd',
        paddingBottom:10,
        paddingTop:10,
        borderRadius:20,
    },
    innerContainer:{
        margin:5,
        marginLeft:8,
        width:ScreenW *0.68,
    },
    titleStyle:{
        fontSize:16,
        fontWeight:'bold',
        marginBottom:8
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    cellImageStyle:{
        width:100,
        height:80,
        marginLeft:10

    }
});

//导出组件
module.exports = LVHome;