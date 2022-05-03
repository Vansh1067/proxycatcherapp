import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'


const Dot=({color,text,style})=>{
    return <View style={{flexDirection:'row',alignItems:'center',marginVertical:3,...style}}>
      <View style={{...styles.dot,backgroundColor:color}}></View>
      <Text style={{fontSize:10,color:'#515762'}}>{text}</Text>
    </View>
  }
   
const Bar=({total,complete,height,color,text,children})=>{
    return  <View style={{justifyContent:'center',position:'relative',flexDirection:'row',alignItems:'center'}}>
     {/*  <View style={{transform: [{rotateZ:'-90deg'},{translateY:-28}],position:'absolute'}}>
       <Text  style={{color:'#515762',fontSize:10}}>{text}</Text> 
      </View> */}
      <View style={{flexDirection:'column',alignItems:'center',alignSelf:'flex-end'}}>
       {children}
       
      <View style={{...styles.bar,height:250,backgroundColor:'#ECEFF1',position:'relative',flexDirection:'row'}}>
          <View style={{position:'absolute',zIndex:500,alignSelf:'center',top:5,width:'100%'}}>
          <Text style={{...styles.BarText,textAlign:'center'}}>{total}</Text>
          </View>
          <View style={{transform: [{rotateZ:'-90deg'},{translateY:-13},{translateX:20}],alignSelf:'flex-end'}}>
          <Text  style={{color:'#515762',fontSize:10,position:'absolute'}}>{text}</Text> 
          </View>
          <SubBar color={color||"#FFCDD2"} height={height}complete={complete}/>
  
      </View>
      </View>
    </View>
  
  }
  const SubBar=({height,color,complete})=>{
    return <View style={{height:`${height}%`,backgroundColor:color,width:40,alignItems:'center',justifyContent:'flex-end',paddingBottom:5,alignSelf:'flex-end'}}>
            <Text style={{...styles.BarText,marginVertical:8}}>{height}</Text>
            <Text style={styles.BarText}>{complete}</Text>
  
    </View>
  }
  
const Graph=({heading,subHeading,paragraph,caption,xLabel,yLabel,pointLabel,pointLabelColors,data})=>{
    
    return  <View>
    {/* <Text style={styles.heading}>{heading}</Text>
    <Text style={styles.subHeading}>{subHeading}</Text>
    <Text style={styles.paragraph}>{paragraph}</Text>
    <View style={{flexDirection:'row',marginVertical:15}}>
        {
            pointLabel.map((label,i)=>{
                
                return <Dot color={pointLabelColors[i]} text={label} style={{marginRight:15}}/>
            })
        } 
    </View> */}
    <View >
      <View style={{flexDirection:'row',minHeight:250}}>
         { yLabel?<View style={{justifyContent:'center',alignItems:'center'}}>
            <Icon name="long-arrow-up" size={20} color="#515762"/>
            <Text style={{...styles.arrowText,transform: [{rotateZ:'-90deg'}],marginVertical:40}}>{yLabel}</Text>
            <Icon name="long-arrow-down" size={20} color="#515762"/>
          </View>:null
        }   
          <View style={{...styles.graph}} >
          <Icon name="angle-up" size={20} color="#515762" style={{position:'absolute',top:-10,left:-7}}/>
            <ScrollView horizontal={true}>
                {
                  data.map((bar,i)=>{
                      return  <Bar total={bar.total} complete={bar.complete} key={i} height={bar.height} color={bar.color} text={bar.label}>
                         {/*  {
                              bar.value.map((val,i)=>{
                                  return <Dot color={pointLabelColors[i]} key={i} text={val}/>
                              }) 
                          } */}
                       
                      </Bar>
                  })
                }
            </ScrollView>
            <Icon name="angle-right" size={20} color="#515762" style={{position:'absolute',bottom:-10,right:-0.5}}/>
          </View>
      </View>
      {xLabel?<View style={{alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
        <Icon name="long-arrow-left" size={20} color="#515762"/>
        <Text style={{...styles.arrowText,marginHorizontal:15}}>{xLabel}</Text>
        <Icon name="long-arrow-right" size={20} color="#515762"/>
      </View>:null 
    }
    </View>
    {/* <Text style={styles.caption}>{caption}</Text> */}
  </View>
}
 export default Graph

const styles = StyleSheet.create({
    ScrollView:{
      padding:15
    },
    heading:{
      fontSize:18,
      fontWeight:'600',
      color:'#0C5C8F'
    },
    subHeading:{
      fontSize:16,
      fontWeight:'600',
      color:'#292F3B',
      marginVertical:15
    },
    paragraph:{
      fontSize:14,
      fontWeight:'600',
      color:'#515762',
    
    },
    dot:{
      width:10,
      height:10,
      borderRadius:20,
      marginRight:6
    },
    arrowText:{
      color:'#515762',
      fontSize:12,
      marginVertical:10,
  
    },
    graph:{
      flex:11,
      backgroundColor:'#FAFAFA',
      borderLeftWidth:1,
      borderLeftColor:'#515762',
      borderBottomWidth:1,
      borderBottomColor:'#515762',
      flexDirection:'row',
      alignItems:'flex-end',
      position:'relative',
      paddingTop:15
    },
    bar:{
      width:40,
      justifyContent:'flex-end',
      marginHorizontal:20,
      alignItems:'center',
    
  
    },
    BarText:{
      fontSize:12,
      color:'#0C5C8F'
    },
    caption:{
      color:'#515762',
      fontSize:14,
      textAlign:'center',
      marginVertical:15

    }
});
