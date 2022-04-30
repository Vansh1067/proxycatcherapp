import React,{useContext} from 'react'
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {AppStateContext} from '../context'

import HomeScreen from './Dashboard'
import TimeTableScreen from './TimeTable'
import ClassesScreen from './Classes'
import ClassScreen from './Class'
import CalenderScreen from './Calender'
import MoreScreen from './More'
import FontAwesome5  from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons'



const Tab = createBottomTabNavigator();
const TabBar=(props)=>{
   const {user}=useContext(AppStateContext)
    return <Tab.Navigator   screenOptions={{
        headerShown:false,
        tabBarActiveTintColor: '#EB5C5C',
        tabBarInactiveTintColor: '#515762',
        
        tabBarStyle:{
            height:60,
            paddingVertical:10,
            paddingBottom:10
          
        }
      }}
      
      
      >
                <Tab.Screen name="Home" component={HomeScreen} 
                options={ () => ({
                        tabBarIcon: ({focused}) => <MaterialIcons name='home' size={25} color={!focused?'#515762':'#EB5C5C'} />
                        })}/>
                {user==3? <Tab.Screen name="TimeTable" component={TimeTableScreen} 
                options={ () => ({
                        tabBarIcon: ({focused}) => <FontAwesome5 name='table' size={25} color={!focused?'#515762':'#EB5C5C'} />
                        })}/>:null}
                {user==3?<Tab.Screen name="Classes" component={ClassesScreen} 
                options={ () => ({
                        tabBarIcon: ({focused}) => <MaterialIcons name='video-library' size={25} color={!focused?'#515762':'#EB5C5C'} />
                        })}/>:null}
                {user!=3?<Tab.Screen name="Calender" component={CalenderScreen} 
                options={ () => ({
                    tabBarIcon: ({focused}) => <FontAwesome5 name='table' size={25} color={!focused?'#515762':'#EB5C5C'} />
                    
                    })}/>:null}
                {user!=3?<Tab.Screen name="Class" component={ClassScreen} 
                options={ () => ({
                    tabBarIcon: ({focused}) => <MaterialIcons name='video-library' size={25} color={!focused?'#515762':'#EB5C5C'} />
                    })}/>:null}
                <Tab.Screen name="More" component={MoreScreen} 
                options={ () => ({
                    tabBarIcon: ({focused}) => <MaterialCommunityIcons name='dots-horizontal-circle' size={25} color={!focused?'#515762':'#EB5C5C'} />
                    })}/>

            </Tab.Navigator>
    
}

export default TabBar