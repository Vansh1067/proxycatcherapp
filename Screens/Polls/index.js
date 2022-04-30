import React, { useState,useEffect } from 'react'
import {Text,View,ScrollView,BackHandler,Alert, RefreshControl,Image,TouchableOpacity} from 'react-native';
import {Header,PollCard,Container} from '../../shared'
import Icons  from 'react-native-vector-icons/AntDesign'

import styles from './styles'
const Polls =(props)=>{
   /*  const  handleBackPress = () => {
        if(props.navigation.isFocused()){
      props.navigation.goBack()
       
        
        return true;
        }else{
          return false
        }
      }
      useEffect(()=>{
        const backhandler= BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => backhandler.remove();
       },[]) */
    return  <View style={{flex:1}}>
    <Header heading="Polls" icon="arrowleft" onPress={()=>props.navigation.goBack()}/>
        <Container>
        <View style={styles.addMore}>
                <Icons name="pluscircle" color="#EB5C5C" size={50} onPress={()=>props.navigation.navigate("AddPoll")} />
        </View>
        <View  style={{...styles.list,justifyContent:"flex-start",marginTop:0}} >
        <PollCard title="What is Lorem Ipsum?" percentage={67} createdAt={new Date()} onPress={()=>props.navigation.navigate("PollDetails")} />
        <PollCard title="What is Lorem Ipsum?" percentage={67} createdAt={new Date()} onPress={()=>props.navigation.navigate("PollDetails")}/>
        <PollCard title="What is Lorem Ipsum?" percentage={67} createdAt={new Date()} onPress={()=>props.navigation.navigate("PollDetails")}/>
        <PollCard title="What is Lorem Ipsum?" percentage={67} createdAt={new Date()} onPress={()=>props.navigation.navigate("PollDetails")}/>
        <PollCard title="What is Lorem Ipsum?" percentage={67} createdAt={new Date()} onPress={()=>props.navigation.navigate("PollDetails")}/>
        <PollCard title="What is Lorem Ipsum?" percentage={67} createdAt={new Date()} onPress={()=>props.navigation.navigate("PollDetails")}/>
        <PollCard title="What is Lorem Ipsum?" percentage={67} createdAt={new Date()} onPress={()=>props.navigation.navigate("PollDetails")}/>
        <PollCard title="What is Lorem Ipsum?" percentage={67} createdAt={new Date()} onPress={()=>props.navigation.navigate("PollDetails")}/>
        </View>
       </Container>
    </View>
}

export default Polls