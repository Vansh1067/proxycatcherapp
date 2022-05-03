import React,{useState} from 'react'
import {View} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Container ,Header} from '../shared'
import Teachers  from '../Screens/Teachers';
import Students from '../Screens/Students';
const Tab = createMaterialTopTabNavigator();
const ApprovalTopTab=(props)=>{
  
    
    const  handleBackPress = () => {
        if(props.navigation.isFocused()){
        props.navigation.goBack()
        return true;
        }else{
          return false
        }
      }
    return <View style={{flex:1}} >
        <Header heading="Approval Request" icon="arrowleft" onPress={handleBackPress}>
            
        </Header>

      <Container style={{paddingBottom:0}} >   
   
    <Tab.Navigator
      initialRouteName="Teacher"
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
        name="Teacher"
       
        options={{ tabBarLabel: 'Teacher' }}
        listeners={{
          /* focus:()=>setScreen('Checked') */
        }}
      >
        {
            prop=>(<Teachers hide={1}  approve={1}  {...props}/>)
        }
        </Tab.Screen>
      <Tab.Screen
        name="Student"
       
        options={{ tabBarLabel: 'Student' }}
        listeners={{
         /*  focus:()=>setScreen('Pending') */
        }}
      >
        {
          prop=>(<Students hide={1} approve={1} {...props}/>)
        }
        </Tab.Screen>
       
       
    </Tab.Navigator>
  
    </Container>
    </View>
}

export default ApprovalTopTab