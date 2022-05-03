import React, { useContext, useEffect, useState } from 'react'
import {Text,View,ToastAndroid,ScrollView,BackHandler,Alert, Linking,Image,TouchableOpacity,AsyncStorage} from 'react-native';


import styles from './style';
import {Asterik,Input,Title,Paragraph,Header,Buttons,Container,PickerPopup, PickerItem} from '../../shared'

import {AppStateContext} from '../../context'
import { login } from '../../Store/Auth/action';




const Login =(props)=>{
  

  const [username,setUserName]=useState()
  const [password,setPassword]=useState()

  const {user,setUser}=useContext(AppStateContext)
  const  handleBackPress = () => {
    if(props.navigation.isFocused()){
      props.navigation.goBack()
    
    return true;
    }else{
      return false
    }
  }
 
  useEffect(() => {
    
    const backhandler= BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backhandler.remove(); 
  },[]);

   const LoginHandler=()=>{
     if(username.trim().length>0){
      if(password.length>0){
        const uploadData={
          username,
          password
        }
        login(uploadData).then(res=>{
          if(res.data.error){
            ToastAndroid.showWithGravity(
              res.data.error,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM
            );
          }else{
            const data=res.data
           console.warn(data)
            AsyncStorage.setItem('userId',data.userId)
            setUser(data.userType)
            if(data.approve=="true"&&data.emailVerify){
              props.navigation.navigate('BottomTabBar',{verifyRequest:'approved'});
  
            }else if(data.approve=="true"&&!data.emailVerify){
              props.navigation.navigate('VerifyUser',{verifyRequest:'approved'});
              
            }else if(data.approve=="false"&&!data.emailVerify){
              props.navigation.navigate('VerifyUser',{verifyRequest:'disapproved'});
  
            }else{
              props.navigation.navigate('VerifyUser',{verifyRequest:'pending'});
  
            }
          }
        }).catch(err=>console.log(err))
      }else{
        ToastAndroid.showWithGravity(
          "Please Enter Password!",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      }
     }else{
      ToastAndroid.showWithGravity(
        "Please Enter Username!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
     }
    
 
    }
    const RegisterHandler=()=>{
  
      
      props.navigation.navigate('Registration');
      
        
      }
   
  
    return (
      <View style={{flex:1}}>
         <Header heading={"Login"} 
          onPress={()=>props.navigation.goBack()}
          icon="arrowleft"/>
  
      <Container>
          
           <ScrollView showsVerticalScrollIndicator={false}  >
             <View style={{flex:1}}>
               <View style={{flex:1,alignItems:'center',marginBottom:30}}>
               <Image
                style={{width: 120, height: 120,borderRadius:50,marginTop:50}}
                resizeMode={'cover'}
                source={require('../../Images/placeholder.jpeg')}
               />
               </View>
                <Input required={1} label="Username" placeholder="Username" value={username} onChangeText={(value)=>setUserName(value)}/>
                <Input required={1} label="Password" secureTextEntry={true} onChangeText={(value)=>setPassword(value)} value={password} placeholder="Password" />

                <Buttons title="LOGIN" onPress={()=>LoginHandler()} style={{marginTop:30,marginBottom:10}} />
                  
                  <TouchableOpacity onPress={() => Linking.openURL("https://docs.google.com/document/d/e/2PACX-1vSHcd0Gstz3HxGocaG8gsoZe23DPeQ4QMS10zdm_7grReu-wKLJfWWHtcIClBQ4omVJUGcJI-WzCW6s/pub")}>
                  
                    <Text style={{fontSize:14,color:'#1976d2',textAlign:'center'}}>Forgot your password ?</Text>
               
                  </TouchableOpacity>
                  <Text style={{fontSize:30,textAlign:'center',marginVertical:20}}> OR </Text>
                  <Buttons title="REGISTER" onPress={()=>RegisterHandler()} style={{marginBottom:20}} />

             </View> 

            </ScrollView>
           
        </Container> 
        </View>
      );
      
  }


export default Login