import React, { useState,useEffect } from 'react'
import {Text,View,ScrollView,BackHandler,Alert, RefreshControl,ToastAndroid,AsyncStorage} from 'react-native';
import {Header,PollCard,Container, Spinner} from '../../shared'
import Icons  from 'react-native-vector-icons/AntDesign'

import styles from './styles'
import { getAllPolls } from '../../Store/Poll/action';
const Polls =(props)=>{
  const [polls,setPolls]=useState([])
  const [refreshing,setRefreshing]=useState(false)
  const [refresh,setRefresh]=useState(false)
  const [loading,setLoading]=useState(false)
  const onRefresh=()=>{
    setRefreshing(true);
    setRefresh(!refresh);

}
  useEffect(()=>{
    setLoading(true)
    AsyncStorage.getItem('userId',(err,userId)=>{
      console.log(userId)
      getAllPolls(userId).then(res=>{
        console.log(res.data)
        if(res.data.error){
          ToastAndroid.showWithGravity(
            res.data.error,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
        }else{
          setPolls(res.data.data)
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
        const backhandler= BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => backhandler.remove();
       },[]) 
    return  <View style={{flex:1}}>
    <Header heading="Polls" icon="arrowleft" onPress={()=>props.navigation.goBack()}/>
        {loading?<Spinner/>:<Container>
        <View style={styles.addMore}>
                <Icons name="pluscircle" color="#EB5C5C" size={50} onPress={()=>props.navigation.navigate("AddPoll")} />
        </View>
        <View  style={{...styles.list,justifyContent:"flex-start",marginTop:0}} >
          <ScrollView showsVerticalScrollIndicator={false}refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
              {
                polls.map((p,i)=>{
                  const per=(p.responser.length/p.sender.length)*100
                  return <PollCard key={i} title={p.description.slice(0,25)} percentage={per} createdAt={p.createdAt} onPress={()=>props.navigation.navigate("PollDetails",{pollId:p._id})} />
        
                })
              }
          </ScrollView>
        </View>
       </Container>}
    </View>
}

export default Polls