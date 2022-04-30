import React,{useEffect} from 'react';
import {Text,Image,View,TouchableOpacity,Linking,BackHandler} from 'react-native';
import styles from './style';
import Swiper from 'react-native-swiper';


const Welcome=(props)=>{
    const  handleBackPress = () => {
      if(props.navigation.isFocused()){
      BackHandler.exitApp();
      
      return true;
      }else{
        return false
      }
    }
    useEffect(() => {
     const backhandler= BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => backhandler.remove();
    },[]);
    return ( <View style={styles.container}>
      <View style={styles.logoView}>
        <Image source={require('../../Images/LOGO2.png')} 
         style={{resizeMode: 'contain', width:120, height:120}} />
      </View>

        <Swiper style={{paddingTop:0,paddingBottom:20}} 
        // index={0}
        activeDotColor={'#9e9e9e'} 
        dotColor={'#e0e0e0'}
        dotStyle={{position:'relative',left:0,right:0,bottom:0,top:40}}
        activeDotStyle={{position:'relative',left:0,right:0,bottom:0,top:40}}
        showsButtons={false}>
          <View style={styles.slide1}>
            <Image
              style={{width: '80%', height: 200,marginVertical:20}}
               source={require('../../Images/SLIDE1.png')}
            />
            <Text style={styles.sliderTitle}>Mark Your Attendance</Text>
            <Text style={styles.sliderContainer}>After successfull registration ,By just scanning face you can mark your attendance </Text>
          </View>
          <View style={styles.slide2}>
            <Image
              style={{width: '80%', height: 200,marginVertical:20}}
              source={require('../../Images/SLIDE2.png')}
            />
            <Text style={styles.sliderTitle}>Check Your Records</Text>
             <Text style={styles.sliderContainer}>After successfull registration ,you can track your class records.</Text>
          </View>
          <View style={styles.slide3}>
            <Image
              style={{width: '80%', height: 200,marginVertical:20}}
              source={require('../../Images/SLIDE3.png')}
            />
            <Text style={styles.sliderTitle}>Interact With Each other</Text>
             <Text style={styles.sliderContainer}>After successfull registration ,you can Interact with each other by Polls, Notice and Queries .</Text>
          </View>
          
      </Swiper>
      <View style={{paddingTop:30,paddingBottom:20}}>
        <Text style={{fontSize:16,color:'#757575',textAlign:'center'}}>By using this application, you agree to our</Text>
        <TouchableOpacity onPress={() => Linking.openURL("https://docs.google.com/document/d/e/2PACX-1vSHcd0Gstz3HxGocaG8gsoZe23DPeQ4QMS10zdm_7grReu-wKLJfWWHtcIClBQ4omVJUGcJI-WzCW6s/pub")}>
            <Text style={{fontSize:14,color:'#1976d2',textAlign:'center'}}>Privacy Policy <Text style={{fontSize:16,color:'#757575',textAlign:'center'}}>and</Text> Terms of Service</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonView}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Login') } style={styles.button}>
           <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
       
    </View>
)
}
export default Welcome