import  React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ClassesHome from '../Screens/Classes'
import AddClass from '../Screens/AddClass'
import Teacher from '../Screens/Teachers'





const Stack=createNativeStackNavigator()

const Classes=()=>{
    return <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Classes" component={ClassesHome}/>
            <Stack.Screen name="AddClass" component={AddClass}/>
            <Stack.Screen name="Teacher" component={Teacher}/>

         
        </Stack.Navigator>

}

export default Classes