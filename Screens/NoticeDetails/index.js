import React,{useEffect,useState} from 'react'
import {View,RefreshControl,Image, AsyncStorage,BackHandler} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Container, Paragraph,Header,Title ,Para, Spinner} from '../../shared'


const NoticeDetails=(props)=>{
  const [data,setData]=useState({})
  const [date,setDate]=useState(new Date())
  const mlist = [ "Jan", "Febr", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ];
  const [refreshing,setRefreshing]=useState(false)
    const [refresh,setRefresh]=useState(false)
    const [loading,setLoading]=useState(false)

    const onRefresh=()=>{
        setRefreshing(true);
        setRefresh(!refresh);

    }
    useEffect(()=>{
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);  
      return ()=> BackHandler.removeEventListener('hardwareBackPress',handleBackPress);  
    },[])
   
    
  
    const  handleBackPress = () => {
      if(props.navigation.isFocused()){
        props.navigation.goBack()
      
  
        return true;
        
       
        }else{
          return false
        }
   
  
      }
    return <View style={{flex:1}}>
          <Header heading={'New Title'} icon="arrowleft" onPress={()=>handleBackPress()}/>

       {!loading? <Container>
          
          <View style={{marginVertical:20}}>
              <ScrollView  showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }> 
        
             {data?.image? <Image
               style={{width: '100%', height: 200,borderRadius:5}}
               resizeMode={'stretch'}
               source={{uri:BASE_URL+'/Uploads/notice/download/'+data.image}}
             />:
            <Image
               style={{width: '100%', height: 200,borderRadius:5}}
               resizeMode={'stretch'}
               source={require('../../Images/Notices.png')}
             />}
             <Title style={{marginVertical:5}}>{"What is Lorem Ipsum?"}</Title>
             <Para>{date.getDate()} {mlist[date.getMonth()]} {date.getFullYear()}</Para>
             <Paragraph style={{marginVertical:5,textAlign:'justify'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five  </Paragraph>
             </ScrollView>
          </View>
    </Container>:<Spinner/>}
    </View>
}

export default NoticeDetails