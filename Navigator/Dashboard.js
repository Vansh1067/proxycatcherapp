import  React from 'react';


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardHome from '../Screens/Dashboard'



const Stack=createNativeStackNavigator()
const Dashboard=()=>{
    return <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Dashboard" component={DashboardHome}/>     
     </Stack.Navigator>

}

export default Dashboard