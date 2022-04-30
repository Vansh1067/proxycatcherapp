import React from 'react'
import { useEffect ,useState} from 'react'
import {View,Text} from 'react-native'

import { Container, Paragraph ,Header,QueryMSG} from '../../shared'

import { ScrollView } from 'react-native-gesture-handler'
const QueriesDetails=(props)=>{
    const [msg,setMsg]=useState()
    const [exist,setExist]=useState(false)

   
   
    return <View style={{flex:1}}>
         <Header heading="Talk to us" icon="arrowleft" onPress={()=>props.navigation.goBack()}/>
        <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
         <View style={{marginVertical:20}}>
             
                <QueryMSG msg={"Hello I am there fine ,How are you"} exist={exist} date={new Date()}/>
                <QueryMSG admin={true} msg={"Hi I am also good i hope you are doing well"} date={new Date()}/>

         </View>
         </ScrollView>
    </Container>
    </View>
}

export default QueriesDetails