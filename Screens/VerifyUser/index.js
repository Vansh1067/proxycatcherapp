import React, { useEffect, useState } from 'react'

import {View,BackHandler,Linking,ToastAndroid,AsyncStorage} from 'react-native'

import Icon  from 'react-native-vector-icons/FontAwesome'
import Icons  from 'react-native-vector-icons/Entypo'


import { Buttons, Container , Paragraph, Title,Popup,Para} from '../../shared'
import StepIndicator from 'react-native-step-indicator';
/* import {Logout} from '../../Store/More/action' */
import { CommonActions } from '@react-navigation/native';

const customStyles={
    stepIndicatorSize: 30,
    currentStepIndicatorSize:36,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 0,
    stepStrokeCurrentColor: '#FAFAFA',
    stepStrokeWidth: 0,
    stepStrokeFinishedColor: '#FAFAFA',
    stepStrokeUnFinishedColor: '#FAFAFA',
    separatorFinishedColor: '#C4C4C4',
    separatorUnFinishedColor: '#C4C4C4',
    stepIndicatorFinishedColor: '#FAFAFA',
    stepIndicatorUnFinishedColor: '#FAFAFA',
    stepIndicatorCurrentColor: '#FAFAFA',
    labelColor: '#C4C4C4',
    labelSize: 13,
    currentStepLabelColor: '#424242'
    
}
const VerifyUser=(props)=>{
    const labels=["Registration","Verifying","Access"]
    const [verified,setVerified]=useState(false)
    const [registerFirstTime,setRegisterTime]=useState(false)
    const [popup,setPopup]=useState(false)
    const [count,setCount]=useState(1)

     useEffect(()=>{
        if(registerFirstTime){
          setPopup(true)
        }
        if(verified&&!registerFirstTime){
          setPopup(true)
        }
        if(!verified&&!registerFirstTime){
          setPopup(true)
        }
    },[registerFirstTime,verified]) 
    useEffect(()=>{
      console.log(props.route.params.verifyRequest,'r')
        if(props.route.params.verifyRequest=='pending'){
          setVerified(false);setRegisterTime(true);setCount(1)
        }else if(props.route.params.verifyRequest=='approved'){
          setVerified(true);setRegisterTime(false);setCount(3)
        }else if(props.route.params.verifyRequest=='disapproved'){
          setVerified(false);setRegisterTime(false);setCount(1)
        } 
         BackHandler.addEventListener('hardwareBackPress', handleBackPress);  
        return ()=> BackHandler.removeEventListener('hardwareBackPress',handleBackPress);   
    },[props.route.params])
    const  handleBackPress = () => {
      if(props.navigation.isFocused()){
      BackHandler.exitApp();
      
      return true;
      }else{
        return false
      }
    }
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [
        { name: 'Welcome' }
       
      ],
    })
    const signout=()=>{
    
        props.navigation.dispatch(resetAction)
        ToastAndroid.showWithGravity(
            'Signout successfully',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
  /*     Logout().then((response)=>{
            
        props.navigation.dispatch(resetAction)
        ToastAndroid.showWithGravity(
            'Signout successfully',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
      AsyncStorage.clear()
     
    }).catch(err=>console.log(err,'k')) */
   
    }
    const getStepIndicatorIconConfig = ({position,stepStatus})=> {
        const iconConfig = {
          size: 30,
        };
        switch (position) {
          case 0: {
            iconConfig.name = 'check-circle';
            iconConfig.color="#43A047"
            break;
          }
          case 1: {
            iconConfig.name = stepStatus==="finished"?"check-circle":!verified&&registerFirstTime?'question-circle':"times-circle";
            iconConfig.color=stepStatus==="finished"?"#43A047":!verified&&registerFirstTime?"#0C5C8F":"#EB5C5C"
            break;
          }
          case 2: {
            iconConfig.name =stepStatus==="finished"?"check-circle":'arrow-circle-right';
            iconConfig.color=stepStatus==="finished"?"#43A047":"#C4C4C4"
            break;
          }
          default: {
            break;
          }
        }
        return iconConfig;
      };
      const renderStepIndicator = (params) => (
        <Icon {...getStepIndicatorIconConfig(params)} />
      );
        const Clear=()=>{
          props.navigation.dispatch(resetAction)
        ToastAndroid.showWithGravity(
            'Signout successfully',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
      AsyncStorage.clear()
        }
    return <Container >
            <Popup visible={props.navigation.isFocused()&&popup}>
                            <Title style={{textAlign:'center'}}>{registerFirstTime?'Verification':'Proxy Catcher Verification Request'}</Title>
                            <Para style={{marginVertical:25,textAlign:'center',fontSize:14}}>{registerFirstTime?'Your HOD is verifying your details. After successful verification, you’ll navigate to dashboard.':verified?'Your request has been approved':'Your request has been disapproved'}</Para>
                            <View style={{flexDirection:'row',justifyContent:"center"}}>
                                <Buttons title="OK" style={{width:140}}  onPress={()=>{setPopup(!popup)}}/>
                            </View>
            </Popup>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}} >
            {registerFirstTime?
            <Icon name={'thumbs-o-up'} size={35} color="#43A047" style={{marginRight:10}} />:
            !verified?
            <Icons name="emoji-sad" size={35} color="#EB5C5C" style={{marginRight:10}}/>:
            <Icon name={'smile-o'} size={35} color="#43A047" style={{marginRight:10}} />
            }
            <Title style={{marginVertical:20}}>{registerFirstTime?`Welcome ${props.route.params.name||''}`:verified?"Verification successful":"Verification failed"}</Title>
            <Paragraph style={{textAlign:'center'}}>{registerFirstTime? 'Thanks for sharing your information with us. Now, you can access the app  but first let your HOD to go through your details and verify it.':
            verified?"HOD approve your details now you can mark your attendance,check your records and interact with other":"HOD went your details & request has been disapprovved. if any query write to us at - proxycatcher@gmail.com"}</Paragraph>
            <View style={{width:'100%',marginTop:60}}>
            <StepIndicator
                customStyles={customStyles}
                currentPosition={count}
                labels={labels}
                stepCount={3}
                renderStepIndicator={renderStepIndicator}
            />
            {
                registerFirstTime?<Paragraph style={{fontSize:12,textAlign:'center',color:"#EB5C5C",marginVertical:30}}>Your HOD is verifying your details, We’ll notify you soon.</Paragraph>:
                !verified?<Paragraph style={{fontSize:12,textAlign:'center',color:"#515762",marginVertical:30}}>Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </Paragraph>:null
            }
            
            </View>
            </View>

        {
            !verified?<Buttons title="SIGN OUT" style={{backgroundColor:'#FFFFFF',borderColor:"#292F3B",borderWidth:1}} color="#292F3B" onPress={()=> Clear()}/>:null          
        }
        {
            registerFirstTime? <Buttons title={"GO TO DASHBOARD"} deactivate={1} disabled={1} style={{marginBottom:10}} />:
            <Buttons title={registerFirstTime||verified?"GO TO DASHBOARD":"SIGN OUT"} onPress={()=>{registerFirstTime||verified?props.navigation.navigate('BottomTabBar'):props.route.params.deactivate?Clear():signout()}}style={{marginBottom:10}} />

        }
    </Container>
}

export default VerifyUser