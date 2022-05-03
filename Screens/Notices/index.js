import { useFocusEffect } from '@react-navigation/native';

import React,{useEffect,useState} from 'react'
import {View,RefreshControl,BackHandler, AsyncStorage,ToastAndroid} from 'react-native'
import Icons  from 'react-native-vector-icons/AntDesign'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import styles from './styles'

import { Container, Paragraph,Header,NoticeCard, Spinner } from '../../shared'
import { getAllNotice } from '../../Store/Notice/action';

const Notices=(props)=>{
  const [notice,setNotice]=useState([])
  const [refreshing,setRefreshing]=useState(false)
    const [refresh,setRefresh]=useState(false)
    const [loading,setLoading]=useState(false)
    

    const onRefresh=()=>{
   
      setRefresh(!refresh)
      setRefreshing(true)
    }
    useEffect(()=>{
        setLoading(true)
        AsyncStorage.getItem('userId',(err,userId)=>{
          getAllNotice(userId).then(res=>{
            console.log(res.data)
            if(res.data.error){
              ToastAndroid.showWithGravity(
                res.data.error,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
              );
            }else{
              setNotice(res.data.data)
              setLoading(false)
              setRefreshing(false)
            }
          })
        })
    },[refresh])
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
          <View style={styles.addMore}>
                <Icons name="pluscircle" color="#EB5C5C" size={50} onPress={()=>props.navigation.navigate("AddNotice",{refresh,setRefresh})} />
          </View>
          <View  style={{...styles.list,justifyContent:"flex-start",marginTop:0}} >
          <ScrollView showsVerticalScrollIndicator={false}refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
           
          }>
            {
              notice.map((nt,i)=>{
                return <NoticeCard  image={null} read={false} title={nt.description.slice(0,25)} createdAt={new Date(nt.createdAt)}onPress={()=>props.navigation.navigate('NoticeDetails',{noticeId:nt._id})}/>

              })
            }
          
            </ScrollView>
            </View>
          
      
    </Container>:<Spinner/>}
    </View>
}

export default Notices