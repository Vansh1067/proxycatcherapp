import { useFocusEffect } from '@react-navigation/native';

import React,{useEffect,useState} from 'react'
import {View,RefreshControl,BackHandler, AsyncStorage} from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'

import { Container, Paragraph,Header,NoticeCard, Spinner } from '../../shared'

const Notices=(props)=>{
  const [data,setData]=useState([])
  const [refreshing,setRefreshing]=useState(false)
    const [refresh,setRefresh]=useState(false)
    const [loading,setLoading]=useState(false)
    

    const onRefresh=()=>{
   

    }
    const  handleBackPress = () => {
      if(props.navigation.isFocused()){
        props.navigation.goBack()
     
  
        return true;
        
       
        }else{
          return false
        }
   
  
      }
      useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);  
        return ()=> BackHandler.removeEventListener('hardwareBackPress',handleBackPress);  
      },[])
      
  


    return <View style={{flex:1}} >
       <Header heading="Notices" icon="arrowleft" onPress={()=>handleBackPress()}/>

        {!loading?<Container >
        
            <NoticeCard  image={null} read={false} title={'New Notice'} createdAt={new Date()}onPress={()=>props.navigation.navigate('NoticeDetails')}/>
            <NoticeCard  image={null} read={false} title={'New Notice'} createdAt={new Date()}onPress={()=>props.navigation.navigate('NoticeDetails')}/>
            <NoticeCard  image={null} read={false} title={'New Notice'} createdAt={new Date()}onPress={()=>props.navigation.navigate('NoticeDetails')}/>
            <NoticeCard  image={null} read={false} title={'New Notice'} createdAt={new Date()}onPress={()=>props.navigation.navigate('NoticeDetails')}/>
            <NoticeCard  image={null} read={false} title={'New Notice'} createdAt={new Date()}onPress={()=>props.navigation.navigate('NoticeDetails')}/>
            <NoticeCard  image={null} read={false} title={'New Notice'} createdAt={new Date()}onPress={()=>props.navigation.navigate('NoticeDetails')}/>
            <NoticeCard  image={null} read={false} title={'New Notice'} createdAt={new Date()}onPress={()=>props.navigation.navigate('NoticeDetails')}/>
            <NoticeCard  image={null} read={false} title={'New Notice'} createdAt={new Date()}onPress={()=>props.navigation.navigate('NoticeDetails')}/>

      
    </Container>:<Spinner/>}
    </View>
}

export default Notices