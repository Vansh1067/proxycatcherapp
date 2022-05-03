import React,{useState,useEffect, useContext} from 'react'
import {Text,View,ToastAndroid,ScrollView,BackHandler, AsyncStorage,Image,TouchableOpacity,RefreshControl} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import {Spinner,Input,Title,Paragraph,Header,Buttons,Container,Popup, Para,TextCard} from '../../shared'
import {AppStateContext} from '../../context'
import { StackActions } from '@react-navigation/native';
import { getDashboards } from '../../Store/Profile/action';


const Dashboard=(props)=>{
    const [loading,setLoading]=useState(false)
    const [emailVerify,setEmailVerify]=useState(false)
    const [refreshing,setRefreshing]=useState(false)
    const [refresh,setRefresh]=useState(false)
    const {user}=useContext(AppStateContext)
    const [totalStudents,setTotalStudents]=useState(0);
    const [totalTeachers,setTotalTeachers]=useState(0);
    const [approval,setApproval]=useState(0)
    const [name,setName]=useState("John")

   

    const pushAction = StackActions.push('More');
    useEffect(()=>{
      console.warn(user)
      setLoading(true)
      AsyncStorage.getItem("userType",(err,userType)=>{
        AsyncStorage.getItem('userId',(err,userId)=>{
          getDashboards(3,userId).then(res=>{
            console.log(res.data.data)
            if(res.data.error){
              ToastAndroid.showWithGravity(
                res.data.error,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
              );
            }else{
              const DATA=res.data.data
              setTotalStudents(DATA.student)
              setTotalTeachers(DATA.teacher)
              setApproval(DATA.approve)
              setName(DATA.name)
              setLoading(false)
              setRefreshing(false)
            }
          })
  
  
        })
      
      })
    
    },[refresh])
    useEffect(()=>{
        const backhandler= BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => backhandler.remove();
       },[])
    const onRefresh=()=>{
        setRefreshing(true);
        setRefresh(!refresh);

    }
    const resetAction = CommonActions.reset({
        index: 0,
        routes: [
          { name: 'VerifyUser', params:{verifyRequest:'disapproved'} }
         
        ],
      })
    const  handleBackPress = () => {
        if(props.navigation.isFocused()){
        BackHandler.exitApp();
        
        return true;
        }else{
          return false
        }
      }
    return (<View style={{flex:1}}>
        <Header title={"Dashboard"} >
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image  source={require('../../Images/LOGO3.png')} style={{width:40,height:35,resizeMode: 'contain',marginRight:10}}></Image>
            <Paragraph>{user==1?"Student ":user==2?"Teacher ":"HOD " }Dashboard</Paragraph>
            </View>
        </Header>
        {!loading? <Container>
        
    
      
        <Popup visible={emailVerify}>
            <Title style={{textAlign:'center'}}>Verify Email Address</Title>
            <Para style={{marginVertical:20,fontSize:14}}>It’s important as, without it, We’ll not be able to release your payment.</Para>
            <View style={{flexDirection:'row',justifyContent:"center",marginTop:10}}>
                <Buttons title="GET OTP" style={{width:140}}  onPress={()=>{setEmailVerify(!emailVerify);props.navigation.navigate('VerifyEmail',{email})}}/>
            </View>
        </Popup>
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{paddingVertical:20}}>
            <Paragraph style={{marginBottom:50}}>Hello {name}</Paragraph>
      
            <TextCard text1={totalTeachers} text2="Teachers" color="#0C5C8F" onPress={()=>props.navigation.navigate('Teachers')}/>
            <TextCard text1={totalStudents} text2="Students" color="#0E7167" onPress={()=>props.navigation.navigate('Students')}/>
            <View style={{marginVertical:50}}>
            <Title>Check {user==3?"Approvals":"Polls"} &amp; Queries</Title>
            <Paragraph style={{marginTop:10,marginBottom:30,fontSize:14,color:"#515762"}}>Approve Teacher &amp; students and solve their queries</Paragraph>
            {user==1||user==2?<TextCard text2="Polls" text1={'10'} color="#EB5C5C"  onPress={()=>{
              props.navigation.navigate('More',{screen:'Polls'})}}/>:null}
            {user==3?<TextCard text2="Approval Request" text1={approval} color="#EB5C5C"  onPress={()=>props.navigation.navigate('Approval')}/>:null}
            <TextCard text2="Queries" text1={'10'} color="#EB5C5C"  onPress={()=>props.navigation.navigate('TabBar',{screen:"Tests"})}/>
            </View>
        
           
        </View>
        </ScrollView>
    </Container>:<Spinner/>}
    </View>)
}
export default Dashboard