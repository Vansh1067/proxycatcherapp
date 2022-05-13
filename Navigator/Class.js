import  React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Class from '../Screens/Class'
import ClassDetails from '../Screens/ClassDetails'
import Students from '../Screens/Students'





const Stack=createNativeStackNavigator()

const Classs=()=>{
    return <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Class" component={Class}/>
            <Stack.Screen name="ClassDetails" component={ClassDetails}/>
            <Stack.Screen name="Students" component={Students}/>


         
        </Stack.Navigator>

}

export default Classs