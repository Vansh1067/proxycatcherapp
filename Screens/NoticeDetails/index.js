import React,{useEffect,useState} from 'react'
import {View,RefreshControl,Image, AsyncStorage,BackHandler,ToastAndroid} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Container, Paragraph,Header,Title ,Para, Spinner} from '../../shared'
import { noticeDetails } from '../../Store/Notice/action'


const NoticeDetails=(props)=>{
  const [noticesDetails,setNoticesDetails]=useState({})


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
      setLoading(true)  
      console.log(props.route.params)
      noticeDetails(props.route.params.noticeId).then(res=>{
        console.log(res.data)
         if(res.data.error){
          ToastAndroid.showWithGravity(
            res.data.error,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
        }else{
          const DATA=res.data.data
          setNoticesDetails(DATA)

          setDate(new Date(DATA.createdAt))

          setLoading(false)
          setRefreshing(false)
        } 
      })
    },[refresh])
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
        
             {noticesDetails?.imgUrl? <Image
               style={{width: '100%', height: 200,borderRadius:5}}
               resizeMode={'stretch'}
               source={{uri:BASE_URL+'/Uploads/notice/download/'+data.image}}
             />:
            <Image
               style={{width: '100%', height: 200,borderRadius:5}}
               resizeMode={'stretch'}
               source={require('../../Images/Notices.png')}
             />}
             <Title style={{marginVertical:5}}>{noticesDetails?.description?.slice(0,35)}</Title>
             <Para>{date.getDate()} {mlist[date.getMonth()]} {date.getFullYear()}</Para>
             <Paragraph style={{marginVertical:5,textAlign:'justify'}}>{noticesDetails?.description} </Paragraph>
             </ScrollView>
          </View>
    </Container>:<Spinner/>}
    </View>
}

export default NoticeDetails