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
    ScrollView,
    Image,
} from 'react-native';

//导入定时器
var TimerMixin = require('react-timer-mixin')

//获取屏幕宽度
var Dimensions = require('Dimensions');
var ScreenW = Dimensions.get('window').width;




//组件
var LVCycleScrollView = React.createClass({

    mixins: [TimerMixin],

    //设置默认不改变的值
    getDefaultProps(){
        return{
            timer:2000,
            imageData:[],
        }
    },

    //设置状态机
    getInitialState(){
        return{
            activityPage:0,//当前页码
            currentX:0,//当前偏移量
            title:this.props.imageData.length>0?this.props.imageData[0].title : ''
        }
    },

    //渲染组件
    render(){
        return(
            <View style={styles.container}>
                <ScrollView
                    ref='scrollView'//绑定标示
                    horizontal={true}//是否水平
                    showsHorizontalScrollIndicator={false}//显示滚动条
                    pagingEnabled={true}//分页
                    onScrollEndDrag={this.onEndDrag}//结束拖拽
                    onScrollBeginDrag={this.onStartDrag}//开始拖拽
                    onMomentumScrollEnd={this.onAnimationEnd}//结束滑动
                >
                    {/*返回图片组件*/}
                    {this.renderAllImage(this.props.imageData)}
                </ScrollView>
                <View style={styles.pageViewStyle}>
                    {/*文字*/}
                    <Text style={styles.titleStyle}>{this.state.title}</Text>
                    {/*pageController试图*/}
                    {this.renderPageCircle()}
                </View>
            </View>
        )
    },

    //返回图片组件
    renderAllImage(data){
        //map方法使用具体看js map方法使用,其实就是遍历数组取出每个元素执行()中函数后返回整个数组
        return data.map(function (item,i) {
            //取出item中的图片名称
            var imageName = item.imgsrc;
            //返回image组件
            return(
                <Image key={i} source={{uri:imageName}} style={styles.imageStyle}/>
            )
        })


    },

    //返回pageController
    renderPageCircle(){
        //定义数组放5个原点
        var indicatorArr = [],style;
        //遍历所有的数据
        for (var i=0;i<this.props.imageData.length;i++){
            //分别设置原点的样式
            style=(i === this.state.activityPage)? {color:'orange'}:{color:'#ffffff'};
            indicatorArr.push(
                <Text key={i}  style={[{fontSize:25},style]}>&bull;</Text>
            )

        }
        return indicatorArr;
    },



    //复杂操作
    componentDidMount(){
        //开启定时器
        this.startTimer();
    },

    //开启定时器
    startTimer(){
        //拿到scrollview
        var scrollview = this.refs.scrollView;
        var imageCount = this.props.imageData.length;
        
        //添加定时器
        var timer = this.setInterval(function () {
            //当前页
            var activePage;
            //判断是否到达边界
            if (this.state.activityPage>imageCount){
                activePage=0;
            }else{
                activePage=this.state.activityPage+1;
            }
            
            //scrollview滚动
            var currentX = activePage * ScreenW;
            scrollview.scrollResponderScrollTo({x:currentX,y:0,animated:true});
            
            //更新state
            this.setState({
               activityPage:activePage,//当前的页数
                currentX:currentX,//scrollView的当前偏移量
            });

        },this.props.timer)
    },

    //结束拖拽
    onEndDrag(){
        this.startTimer();
    },

    //开始拖拽
    onStartDrag(){
        this.clearInterval(this.timer);
    },

    //结束滑动  默认会把scrollview传过来
    onAnimationEnd(scrollview){
        //求出偏移量
        var contentOffSetX = scrollview.nativeEvent.contentOffset.x;
        //求出当前页码
        var currentPage = contentOffSetX / ScreenW;
        
        //修改状态机
        this.setState({
            activePage:currentPage,
            currentX: contentOffSetX,
            title: this.props.imageData.length>0?this.props.imageData[0].title : ''
        })
    },

})

//组件样式
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    imageStyle:{
        width: ScreenW,
        height: 150,
    },
    pageViewStyle:{
        width:ScreenW,
        height: 25,
        backgroundColor:'rgba(0,0,0,0.5)',
        // 绝对定位
        position: 'absolute',
        left: 0,
        bottom:0,
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    titleStyle:{
        width:ScreenW - 65,
        color:'white'
    }

});

//导出组件
module.exports = LVCycleScrollView;
