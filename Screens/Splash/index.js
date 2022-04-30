import React, {useContext, useEffect} from 'react';
import {Text,Image,View,ActivityIndicator,AppState,AsyncStorage,Alert,ToastAndroid} from 'react-native';
import { getProfileDetails } from '../../Store/Profile/action';
import {AppStateContext} from '../../context'



const Splash=(props)=>{
    const {user,setUser}=useContext(AppStateContext)

    useEffect(()=>{
        AsyncStorage.getItem('userId',(err,userId)=>{
            //console.warn(userId)
            if(userId){
                getProfileDetails(userId).then(res=>{
                    if(res.data.error){
                        AsyncStorage.clear()
                      }else{
                          const DATA=res.data.data
                          //console.log(DATA,"splas")
                          setUser(DATA.userType)

                          if(DATA.approve=="true"&&DATA.emailVerify){
                            props.navigation.navigate('BottomTabBar');
                
                          }else if(DATA.approve=="true"&&!DATA.emailVerify){
                            props.navigation.navigate('VerifyUser',{verifyRequest:'approved'});
                            
                          }else if(DATA.approve=="false"&&!DATA.emailVerify){
                            props.navigation.navigate('VerifyUser',{verifyRequest:'disapproved'});
                
                          }else{
                            props.navigation.navigate('VerifyUser',{verifyRequest:'pending'});
                
                          }
                         
                       

                      }
                })
               
            }else{
                props.navigation.navigate('Welcome');
            }
        })
    },[])

    return <View style={{backgroundColor:'#FFFFFF', flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
    <View style={{width:'100%',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
    <Image source={require('../../Images/LOGO2.png')} 
        style={{justifyContent: 'center', alignSelf: 'center', resizeMode: 'contain', width:100, height:100 }} />
     <ActivityIndicator size="large" color='#f44336'/>
    </View>
</View>
}


export default Splash