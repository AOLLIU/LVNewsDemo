/**
 * Created by victor on 16/3/14.
 */
import React, { Component } from 'react';
import{
   StyleSheet,
   View,
   ScrollView,
   Image,
   Text
} from 'react-native';

var TimerMixin = require('react-timer-mixin');

// 获取屏幕的相关系数
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;

// 图片的高度
var imageHeight = 160;



// 创建一个类
var ScrollImage = React.createClass({
    // 设置默认值
    getDefaultProps(){
        return{
          timer: 1500,
          imageData: []
        };
    },

    mixins: [TimerMixin],

    // 设置初始值
    getInitialState(){
        //console.log(this.props.imageData);
        return{
          activePage: 0, // 当前的页数
          currentX: 0,   // scroll的x值：当前的页数 * 屏幕的宽度
          title:this.props.imageData.length>0?this.props.imageData[0].title : ''
        };
    },

    componentDidMount(){
       // 开启定时器
        this.startTimer();
    },

    // 开启定时器
    startTimer(){
        // 拿到scrollView
        var scrollView = this.refs.scrollView;
        var imageCount = this.props.imageData.length;

        // 添加定时器
        this.timer = this.setInterval(function(){
             var activePage;
             // 判断
            if((this.state.activePage+1) >= imageCount){ // 超出最大边界
                activePage = 0;
            }else{
                activePage = this.state.activePage + 1;
            }

            // 让scrollView滚动
            var currentX = activePage * screenWidth;
            scrollView.scrollResponderScrollTo({x:currentX, y:0, animated:true});

            // 更新state
            this.setState({
                activePage: activePage, // 当前的页数
                currentX: activePage * screenWidth   // scroll的x值：当前的页数 * 屏幕的宽度
            });

        }, this.props.timer);

    },

    // 返回需要的组件
    render(){
        return(
           <View style={styles.container}>
               {/*滚动图片视图*/}
               <ScrollView
                   ref='scrollView'
                   horizontal={true}
                   showsHorizontalScrollIndicator={false}
                   pagingEnabled={true}
                   onScrollEndDrag={this.onEndDrag}
                   onScrollBeginDrag={this.onStartDrag}
                   onMomentumScrollEnd={this.onAnimationEnd}
                   >
                   {/*返回五张图片*/}
                   {this.renderAllImage(this.props.imageData)}
               </ScrollView>
               {/*page视图*/}
               <View style={styles.pageViewStyle}>
                   <Text style={{width:screenWidth - 65, color:'white'}}>{this.state.title}</Text>
                   {/*返回五个圆点*/}
                   {this.renderPageCircle()}

               </View>
           </View>
        );
    },

    // 返回所有的图片组件
    renderAllImage(data){
        // 遍历
        return data.map(function(item, i){
            // 取出每个item中的图片名称
            var imageName = item.imgsrc;
            // 返回Image组件
            return (
             <Image key={i} source={{uri: imageName}} style={{width: screenWidth, height: imageHeight}}/>
            )
        });
    },

    // 返回所有的圆点
    renderPageCircle(){
        // 定义一个数组放置5个圆点
        var indicator = [], style;
        // 遍历所有的数据
        for(var i=0; i<this.props.imageData.length; i++){
            // 分别设置圆点的样式
            style = (i=== this.state.activePage) ? {color:'orange'} : {color:'#ffffff'};

            indicator.push(
                <Text key={i} style={[{fontSize:25}, style]}>&bull;</Text>
            );
        }
        return indicator;
    },

    // 当用户拖拽结束的时候调用
    onEndDrag(){
       this.startTimer();
    },

    // 当用户开始拖拽的时候
    onStartDrag(event){
        //console.log('44343');
        this.clearInterval(this.timer);
    },

    // 当滚动结束时
    onAnimationEnd(e){
       //console.log('1111');
        // 求出偏移量
        var contentOffSetX = e.nativeEvent.contentOffset.x;
        var activePage = contentOffSetX / screenWidth;

        // 更新状态
        this.setState({
            activePage: activePage, // 当前的页数
            currentX: contentOffSetX,   // scroll的x值：当前的页数 * 屏幕的宽度
            title: this.props.imageData.length>0?this.props.imageData[0].title : ''
        });
    }
});


// 给类中的组件添加样式
var styles = StyleSheet.create({
    container:{
        flex:1
    },
    pageViewStyle:{
        width:screenWidth,
        height: 25,
        backgroundColor:'rgba(0,0,0,0.5)',
        // 绝对定位
        position: 'absolute',
        left: 0,
        bottom:0,
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    }
});


// 返回对应的模块
module.exports = ScrollImage;