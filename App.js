import React,{useEffect} from 'react';
import 'react-native-gesture-handler';
import {AppState,Alert, SafeAreaView, StatusBar, AsyncStorage} from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NetInfo from "@react-native-community/netinfo";
import AppStateProvider from './context'

import Splash from './Screens/Splash'
import Welcome from './Screens/Welcome'
import Login from './Screens/Login'
import Registration from './Navigator/RegisterationNav'
import VerifyUser from './Screens/VerifyUser'
import BottomTabBar from './Navigator/BottomTab';
import Teachers from './Screens/Teachers'
import Students from './Screens/Students'
import Approval from './Navigator/ApprovalRequestNav'
import Sender from './Navigator/senderNav'

import Profile from './Screens/Profile'
import Polls from './Screens/Polls'


const checkinternetconnection=()=>{
  Alert.alert(
   'No Internet Connection',
   'Please check your internet connection',
  [ 
    {text: 'Retry', onPress: () => internetconnection()},
  ],
    { cancelable: false }
  ) 
}

 const internetconnection=()=>{
  console.log('netconnnection');
  NetInfo.fetch().then(state => {
    console.log("Connection type**", state.type);
    console.log("Is connected?", state.isConnected);
    if(!state.isConnected){
      checkinternetconnection();
    }
  });
}  
 
export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
const Stack=createNativeStackNavigator();
const App =() => {

  useEffect(()=>{
    internetconnection();

  })
  
  return <AppStateProvider>
  <StatusBar barStyle="light-content"></StatusBar>
  <NavigationContainer ref={navigationRef}>
 
        <Stack.Navigator screenOptions={{headerShown:false}} >
          <Stack.Screen name="Splash" component={Splash}/>
          <Stack.Screen name="Welcome" component={Welcome}/>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Registration" component={Registration}/>
          <Stack.Screen name="VerifyUser" component={VerifyUser}/>
          <Stack.Screen name="BottomTabBar" component={BottomTabBar}/>
          <Stack.Screen name="Teachers" component={Teachers}/>
          <Stack.Screen name="Profile" component={Profile}/>
          <Stack.Screen name="Students" component={Students}/>
          <Stack.Screen name="Approval" component={Approval}/>
           
          <Stack.Screen name="Polls" component={Polls}/> 
        </Stack.Navigator>
       
  </NavigationContainer>
</AppStateProvider>
  }

export default App;