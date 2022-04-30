import  React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';


import TimeTableHome from '../Screens/TimeTable'
import AddTimeTable from '../Screens/AddTimeTable'
import AddDay from '../Screens/AddDay'




const Stack=createNativeStackNavigator()
const TimeTable=()=>{
    return<Stack.Navigator screenOptions={{headerShown:false}} >
            <Stack.Screen name="TimeTable" component={TimeTableHome} />
            <Stack.Screen name="AddTimeTable" component={AddTimeTable} />
            <Stack.Screen name="AddDay" component={AddDay} />


           
        </Stack.Navigator>


}

export default TimeTable