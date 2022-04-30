import React,{useState,useEffect} from 'react'
import {View,Text,Image,ScrollView, TouchableOpacity,RefreshControl,AsyncStorage,Share, Linking} from 'react-native'
import { Container, Paragraph,Row ,OptionCard, Title, Para, Popup,Buttons, Spinner, RedirectFunction} from '../../shared'
import FontAwesome  from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo  from 'react-native-vector-icons/Entypo'
import {  TouchableWithoutFeedback } from 'react-native-gesture-handler'


import { CommonActions } from '@react-navigation/native';
import { getProfileDetails } from '../../Store/Profile/action'


const MoreHome=(props)=>{
    const [logout,setlogout]=useState(false)
    const [data,setData]=useState({})
    const [userId,setUserId]=useState('')

    const [refreshing,setRefreshing]=useState(false)
    const [refresh,setRefresh]=useState(false)

    const [loading,setLoading]=useState(false)

    useEffect(()=>{
        setLoading(true)
        AsyncStorage.getItem('userId',(err,userId)=>{
            setUserId(userId)
            
            getProfileDetails(userId).then(res=>{
                if(res.data.error){
                    ToastAndroid.showWithGravity(
                      'check your internet connection!',
                      ToastAndroid.LONG,
                      ToastAndroid.BOTTOM
                    );
                  }else{
                    setData(res.data.data);
                    setLoading(false)
                    setRefreshing(false)
                  }
                
            })
        })
    },[refresh])
    const onRefresh=()=>{
        setRefreshing(true);
        setRefresh(!refresh);

    }
    const resetAction = CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Welcome' }
         
        ],
      })
 
    const logoutHandler=()=>{
        
        AsyncStorage.clear()
        props.navigation.dispatch(resetAction)
       /*  Logout().then((response)=>{
            ToastAndroid.showWithGravity(
                'logout successfully',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
              );
        //  
       
        }).catch(err=>console.log(err)) */
    }
    
  
   
    if(loading){
        return <Spinner/>
    }
    return <Container>
        <Popup visible={logout}>
                           
                           <Title style={{textAlign:'center'}}>Logout</Title>
                           <Para style={{marginVertical:25,fontSize:14,textAlign:'center'}}>Are you sure to logout ?</Para>
                           <View style={{flexDirection:'row',justifyContent:"space-between",alignItems:'center'}}>
                               <Buttons title="CANCEL" style={{width:110,backgroundColor:'#FFFFFF',borderColor:"#EB5C5C",borderWidth:1}} color='#EB5C5C' onPress={()=>setlogout(!logout)}/>
                               <Buttons title="YES" style={{width:110}}  onPress={()=>{setlogout(!logout);logoutHandler()}}/>
                           </View>
                         
                       </Popup>
        <ScrollView  showsVerticalScrollIndicator={false}  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            <View>
            <TouchableOpacity onPress={()=>props.navigation.navigate('Profile',{userId:userId})}>
            <Row>
            <Row style={{marginVertical:30}}>
            <Image
               style={{width: 80, height: 80,borderRadius:50}}
               resizeMode={'cover'}
               source={require('../../Images/placeholder.jpeg')}
             /> 
            <View style={{display:'flex',flexDirection:'column',justifyContent:'space-around',padding:20,maxWidth:260}}>
                 <Paragraph >{data.name}</Paragraph>
                 <Paragraph>+91-{data.phone}</Paragraph>
            </View>
            </Row>
            <FontAwesome name="angle-right" size={20} color="#424242"  onPress={()=>props.navigation.navigate('Profile',{onRefresh})}/>
            </Row>
            </TouchableOpacity>
        
        <View style={{marginVertical:20}}>
            <OptionCard text="Polls" onPress={()=>props.navigation.navigate('Polls')}>
            <FontAwesome name="line-chart" size={18} color="#292F3B" style={{marginRight:20}}/>
            </OptionCard>
            <OptionCard text="Approval Request" onPress={()=>props.navigation.navigate('Approval')}>
            <MaterialCommunityIcons name="wallet" size={18} color="#292F3B" style={{marginRight:20}}/>
            </OptionCard>
            <OptionCard text="Notices" onPress={()=>props.navigation.navigate('Notices')} badge={data?.notices||null}>
            <MaterialCommunityIcons name="message-bulleted" size={18} color="#292F3B" style={{marginRight:20}}/>
            </OptionCard>
          {/*   <OptionCard text="Queries" badge={talktousCount||null} onPress={()=>props.navigation.navigate('Queries')}>
            <FontAwesome name="envelope" size={18} color="#292F3B" style={{marginRight:20}}/>
            </OptionCard> */}
        </View>
       
        <View style={{flexDirection:'row',justifyContent:'center',marginVertical:50,alignItems:"center"}}>
            <Paragraph>Love this app? </Paragraph>
            <TouchableWithoutFeedback onPress={()=>Linking.openURL('https://play.google.com/store')}>
                <View>
            <Paragraph style={{color:"#0C5C8F"}}>Rate us here </Paragraph>
            </View>
            </TouchableWithoutFeedback>
            <FontAwesome name="angle-right" size={20} color="#0C5C8F"/>
        </View>
        <View style={{flexDirection:'row',marginVertical:30}}>
        <MaterialCommunityIcons name="logout" size={22} color="#EB5C5C" style={{marginRight:10}}/>
        <TouchableOpacity onPress={()=>setlogout(!logout)}>
            <View>
        <Title style={{color:"#EB5C5C"}}>Logout</Title>
        </View>
        </TouchableOpacity>
        </View>
        </View>
        </ScrollView>
    </Container>
}

export default MoreHome