import  React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MoreHome from '../Screens/More'
import Profile from '../Screens/Profile'
import Notices from '../Screens/Notices'
import NoticeDetails from '../Screens/NoticeDetails'
import Queries from '../Screens/Queries'
import QueriesDetails from '../Screens/QueriesDetails'
import AddQuerie from '../Screens/AddQuerie'
import Polls from '../Screens/Polls'
import AddPoll from '../Screens/AddPoll'
import PollDetails from '../Screens/PollDetails'
import Sender from './senderNav'












const Stack=createNativeStackNavigator()
const More=()=>{
    return <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="More" component={MoreHome}/>
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="Notices" component={Notices}/>
            <Stack.Screen name="NoticeDetails" component={NoticeDetails}/>
            <Stack.Screen name="Queries" component={Queries}/>
            <Stack.Screen name="QueriesDetails" component={QueriesDetails}/>
            <Stack.Screen name="AddQuerie" component={AddQuerie}/>
            <Stack.Screen name="Polls" component={Polls}/>
            <Stack.Screen name="AddPoll" component={AddPoll}/>
            <Stack.Screen name="PollDetails" component={PollDetails}/>
            <Stack.Screen name="Sender" component={Sender}/> 


         </Stack.Navigator>

  
}

export default More