import  React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Calender from '../Screens/Calender'





const Stack=createNativeStackNavigator()

const Calenders=()=>{
    return <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Calender" component={Calender}/>
           

         
        </Stack.Navigator>

}

export default Calenders