import React,{useState,useContext} from 'react'
import {View,AsyncStorage} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Container ,Header,Popup,Title,Buttons,Para} from '../shared'
import { CommonActions } from '@react-navigation/native';

import Icon  from 'react-native-vector-icons/MaterialIcons'
import Registration from '../Screens/Registration'
import {AppStateContext} from '../context'

const Tab = createMaterialTopTabNavigator();
const RegistrationTopTab=(props)=>{
    const [popup,setPopup]=useState(false)
    const {user,setUser}=useContext(AppStateContext)
    const resetAction = CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Welcome' }
         
        ],
      })
    const logout=()=>{
        props.navigation.dispatch(resetAction)
        AsyncStorage.clear()
        
      }
    const userHandler=(val)=>{
     // console.warn(val,'nav')
      setUser(val)
    }
    return <View style={{flex:1}} >
        <Header heading="New Registration">
             <Icon name={'close'} size={22} color="#292F3B" style={{marginRight:10}} onPress={()=>setPopup(!popup)}/>
        </Header>

      <Container style={{paddingBottom:0}} >   
      <Popup visible={popup}>
                           
                           <Title style={{textAlign:'center'}}>Exit Registration</Title>
                           <Para style={{marginVertical:25,fontSize:14}}>The information you have provided won’t be saved. Are you sure to exit registration ?</Para>
                           <View style={{flexDirection:'row',justifyContent:"space-between",alignItems:'center'}}>
                               <Buttons title="CANCEL" style={{width:110,backgroundColor:'#FFFFFF',borderColor:"#EB5C5C",borderWidth:1}} color='#EB5C5C' onPress={()=>setPopup(!popup)}/>
                               <Buttons title="YES" style={{width:110}}  onPress={()=>{setPopup(!popup);logout()}}/>
                           </View>
                         
                       </Popup>
    <Tab.Navigator
      initialRouteName="Student"
      backBehavior="none"
    
      tabBarOptions={{
        activeTintColor: '#EB5C5C',
        inactiveTintColor:"#292F3B",
        
        indicatorStyle: {   
            backgroundColor: '#EB5C5C',
           
          },
        labelStyle: { fontSize: 14},
        style: { backgroundColor: '#FAFAFA',elevation:0 },
    
      }}
    >
      <Tab.Screen
        name="Student"
       
        options={{ tabBarLabel: 'Student' }}

        listeners={{
          focus:()=>userHandler(1)
        }}
      >
        {
          prop=>(<Registration  user={user} {...props}/>)
        }
        </Tab.Screen>
        <Tab.Screen
        name="Teacher"
       
        options={{ tabBarLabel: 'Teacher' }}
        listeners={{
          focus:()=>userHandler(2)
        }}
      >
        {
            prop=>(<Registration user={user}  {...props}/>)
        }
        </Tab.Screen>
        <Tab.Screen
        name="HOD"
       
        options={{ tabBarLabel:'HOD' }}

        listeners={{
          focus:()=>userHandler(3)

        }}
      >
        {
            prop=>(<Registration user={user}  {...props}/>)
        }
        </Tab.Screen>
    </Tab.Navigator>
  
    </Container>
    </View>
}

export default RegistrationTopTab