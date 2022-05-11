import  React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';


import TimeTableHome from '../Screens/TimeTable'
import AddTimeTable from '../Screens/AddTimeTable'
import AddDay from '../Screens/AddDay'
import Teacher from '../Screens/Teachers'
import TimeTablesDetails from '../Screens/TimeTablesDetails'





const Stack=createNativeStackNavigator()
const TimeTable=()=>{
    return<Stack.Navigator screenOptions={{headerShown:false}} >
            <Stack.Screen name="TimeTables" component={TimeTableHome} />
            <Stack.Screen name="AddTimeTable" component={AddTimeTable} />
            <Stack.Screen name="AddDay" component={AddDay} />
            <Stack.Screen name="Teacher" component={Teacher}/>
            <Stack.Screen name="TimeTablesDetails" component={TimeTablesDetails}/>


        </Stack.Navigator>


}

export default TimeTable