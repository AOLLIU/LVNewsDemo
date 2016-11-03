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
    WebView,
} from 'react-native';

var  URL_API= 'http://c.m.163.com/nc/article/BJEJ1ND500014PRF/full.html'

var  LVNewsDetail = React.createClass({
    // 初始化状态
    getInitialState(){
        return{
            newsDetail: '正在加载中'
        }
    },

    render() {
        // 拼接参数
        var URL_API = 'http://c.m.163.com/nc/article/'+this.props.rowData.docid+'/full.html'

        return (
            <WebView
                ref={'webView'}
                automaticallyAdjustContentInsets={true}
                source={{html:this.state.newsDetail, baseUrl: ''}}
                startInLoadingState={true}
            />
        );
    },

    componentDidMount(){
        // 拼接参数
        var URL_API = 'http://c.m.163.com/nc/article/'+this.props.rowData.docid+'/full.html'
        // 请求数据
        this.getNewsDetails(URL_API);
    },

    getNewsDetails(URL_API){
        fetch(URL_API)
            .then((response)=>response.json())
            .then((responseData)=>{
                var newsDetailData = responseData[this.props.rowData.docid];
                // 取出新闻的主要内容
                var bodyData = newsDetailData.body;
                // 取出图片数组
                var imageData = newsDetailData.img;
                // 取出标题
                var newsTitle = newsDetailData.title;
                var titleHtml = '<div style="margin:10px 5px; font-size: 18px; font-weight: bold">'+newsTitle+'</div>'
                // 取出发布时间和来源
                var source = newsDetailData.source;
                var ptime = newsDetailData.ptime;
                var subTitleHtml =  '<div style="color:darkgrey; font-size: 13px; margin-left: 5px;">' +
                    '<span style="margin-right: 10px;">'+ptime+'</span>' +
                    '<span>'+source+'</span>' +
                    '</div>';

                // 遍历数组替换body中的占位标签
                for(var i=0; i<imageData.length; i++){
                    // 取出占位标签
                    var imgRef = imageData[i].ref;
                    // 取出图片路径
                    var imgSrc = imageData[i].src;
                    var imgHtml = '<img src="'+ imgSrc + '" width="360" height="auto">';
                    bodyData = bodyData.replace(imgRef, imgHtml);
                }

                bodyData = titleHtml + subTitleHtml + bodyData;
                console.log(bodyData);
                this.setState({
                    newsDetail: bodyData
                });
            })

    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

module.exports = LVNewsDetail;

