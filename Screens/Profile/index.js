import React, { useEffect,useState } from 'react'
import {View,Image, TouchableOpacity,RefreshControl,BackHandler,Text,ToastAndroid} from 'react-native'
import styles from './styles'
import {Container,Header,Row, Spinner,Input } from '../../shared'
import Icon  from 'react-native-vector-icons/Entypo'
import { ScrollView } from 'react-native-gesture-handler'
import FloatingLabel from 'react-native-floating-labels'
import { approvedUser, getProfileDetails } from '../../Store/Profile/action'

const Profile=(props)=>{
    const [data,setData]=useState({})
    const [user,setUser]=useState(0)
  
    const [refreshing,setRefreshing]=useState(false)
    const [refresh,setRefresh]=useState(false)
    const [loading,setLoading]=useState(false)

    const onRefresh=()=>{
        setRefreshing(true);
        setRefresh(!refresh); 

    }
    const Approvehandler=(val)=>{
      approvedUser(props.route.params.userId,{approve:val}).then(res=>{
        if(res.data.error){
          ToastAndroid.showWithGravity(
            res.data.error,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
        }else{
            console.log(res.data)
            props.navigation.goBack()
            props.route.params.setRefresh(!props.route.params.refresh)
        }
      })
    }
    useEffect(()=>{ 
        const userId=props.route.params.userId;
        setLoading(!loading)
        getProfileDetails(userId).then(res=>{
          if(res.data.error){
            ToastAndroid.showWithGravity(
              'check your internet connection!',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM
            );
          }else{
            setData(res.data.data);
            console.log(res.data.data)
            setUser(+res.data.data.userType)
            setLoading(false)
            setRefreshing(false)
          }
         
        }) 
      
       },[refresh])
       useEffect(()=>{
        const backhandler= BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => backhandler.remove();
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
        <Header heading="My Profile" icon="arrowleft"  onPress={()=>handleBackPress()}>
           {/*  <Icon name={'edit'} size={16} color="#292F3B" style={{marginRight:10}} onPress={()=>props.navigation.navigate('EditProfile',{data:data,onRefresh})} /> */}

                </Header>
       {!loading? <Container>
         
            
       
        <ScrollView  showsVerticalScrollIndicator={false}  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{marginVertical:20}}>
      
        <Row style={{marginVertical:10,justifyContent:'center'}}>
            
              <Image
               style={{width: 90, height: 90,borderRadius:50}}
               resizeMode={'cover'}
               source={require('../../Images/placeholder.jpeg')}
             />

        </Row>
        <View style={{marginVertical:20}}>
           
            <FloatingLabel 
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                editable={false}
                value={data?.name}
                                   
            >Full name  </FloatingLabel>
            <FloatingLabel 
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                editable={false}
                value={data?.phone}
            >Contact No. </FloatingLabel>
            <FloatingLabel 
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                editable={false}
                value={data?.email}
            >Email Id </FloatingLabel>
            {user==1&&<FloatingLabel 
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                editable={false}
                value={data?.year}
            >Year </FloatingLabel>}
             {user==2&&<FloatingLabel 
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                editable={false}
                value={data?.role||'4th Year'}
            >Role </FloatingLabel>}
            {user==1&&<FloatingLabel 
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                editable={false}
                value={data?.semester||'5th Semester'}
            >Semester </FloatingLabel>}
            <FloatingLabel 
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                editable={false}
                value={data?.branch||'CSE'}
            >Branch </FloatingLabel>
            
            <FloatingLabel 
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                editable={false}
                value={data?.userId}
            >{user==1?'College Id':user==2?'Teacher Id':'HOD Id'}</FloatingLabel>
    
            
        </View>
        {props.route?.params?.approve&&data.approve==""?<View style={styles.buttonView}>
        <TouchableOpacity onPress={() => Approvehandler(true) } style={styles.button}>
           <Text style={styles.buttonText}>Approval</Text>
        </TouchableOpacity>
      </View>:null}
      {props.route?.params?.approve&&data.approve==""?<View style={styles.buttonView}>
        <TouchableOpacity onPress={() => Approvehandler(false) } style={styles.button}>
           <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>
      </View>:null}
        </View>
        </ScrollView>
    </Container>:<Spinner/>}
    </View>
}

export default Profile