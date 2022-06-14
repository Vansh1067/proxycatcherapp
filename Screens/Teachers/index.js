import React, { useState,useEffect } from 'react'
import {Text,View,ScrollView,BackHandler,ToastAndroid, RefreshControl,Image,TouchableOpacity,AsyncStorage} from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialIcons'

import {Asterik,Row,Title,Paragraph,Header,Para,Container,VideoThumbnail, Spinner,FilterPopup} from '../../shared'
import {  getApprovalUser,getApprovalrequest } from '../../Store/Profile/action';
import styles from './styles'
const Teachers=(props)=>{
    const [showSearch,setShowSearch]=useState(false)

    const [loading,setLoading]=useState(false)

    const [refreshing,setRefreshing]=useState(false)
    const [refresh,setRefresh]=useState(false)
    const [popup,setPopup]=useState(false)
    const [filter,setFilter]=useState({index:null,value:''})
    const [teach,setTeach]=useState([])
    const [selectOne,setSelectOne]=useState()
    useEffect(()=>{
        setLoading(true)
        if(props.approve){
          AsyncStorage.getItem('userId',(err,userId)=>{
            getApprovalrequest(2,userId).then(res=>{
    
              if(res.data.error){
                ToastAndroid.showWithGravity(
                  res.data.error,
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM
                );
              }else{
                const UserData=res.data.data
                console.log(UserData)
                setTeach([...UserData])
                setLoading(false)
                setRefreshing(false)
              }
            })
          })
        }else{
          AsyncStorage.getItem('branch',(err,branch)=>{
            console.log(branch)
          getApprovalUser(2,branch).then(res=>{
            if(res.data.error){
              ToastAndroid.showWithGravity(
                res.data.error,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
              );
            }else{
              const UserData=res.data.data
              if(props.route.params.onlyteacher){
                setSelectOne(props.route.params.teacher||null)
              }
              console.log(UserData,'pp')
              setTeach([...UserData])
              setLoading(false)
              setRefreshing(false)
            }
          })
        })
        }
    
    },[refresh])
    const onRefresh=()=>{
        setRefreshing(true);
        setRefresh(!refresh);

    }
    const addHandler=(val)=>{
      
     const index= props.teacher.findIndex(value=>val._id===value.userId)
     if(index>-1){
      const filterArray=props.teacher.filter((value,i)=>value.userId!==val._id)
      props.setTeachers([...filterArray])
     }else{
      const d={userId:val._id}

        props.setTeachers([...props.teacher,d])
     }
    }
    const selectOneHandler=(val)=>{
      console.log(val)
      if(val){
        props.route.params.setTeacher(val)

        setSelectOne(val)
        props.navigation.goBack()

      }else{
        props.route.params.setTeacher({})
        setSelectOne(null)


      }
    }
    const  handleBackPress = () => {
        if(props.navigation.isFocused()){
        props.navigation.goBack()
        return true;
        }else{
          return false
        }
      }
    if(loading){
        return  <Spinner/>
    }
    return (<View style={{flex:1}}>
         {!props.hide?<Header heading={'Teachers'} onPress={()=>handleBackPress()} icon="arrowleft" showSearch={showSearch} >
        <Icon name="search" size={22} color="#292F3B"style={{alignSelf:'flex-end'}} onPress={()=>{setShowSearch(!showSearch)}}/> 
          </Header>:null}
          <Container style={{paddingBottom:0,margin:0}}>
          {!props.approve? <Row style={{marginVertical:15}}>
                        <Text><Title style={{color:"#0E7167"}}>{teach.length} </Title><Title>Teachers</Title></Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                       {props.route.params?.onlyteacher?null: <TouchableOpacity onPress={()=>{  props.setTeachers([...teach,...props.teacher])}}><Para style={{color:"#0C5C8F",fontSize:16,marginRight:20}}>All</Para></TouchableOpacity>}
                        {!props.hide?  <Icon name="filter-list" size={22} color="#0C5C8F" onPress={()=>setPopup(!popup)}/>:null}
                        </View>
        </Row>:null}
        <View  style={{...styles.list,justifyContent:"flex-start",marginTop:0}} >

        <FilterPopup popup={popup} filter={filter} setPopup={setPopup} setFilter={setFilter}/>
        <ScrollView showsVerticalScrollIndicator={false}  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {
       teach.length>0?teach.map((val,i)=>{
         if(props.approve){
            return   <VideoThumbnail key={i} views={`${val.branch} DEPT`} title={`${val.name}`}  role={val.role}buttontext={'View Details'}  onPress={()=>props.navigation.navigate('Profile',{userId:val._id,approve:true,setRefresh:setRefresh,refresh:refresh})} onClick={()=>{props.navigation.navigate('Profile',{userId:val._id,approve:true,setRefresh:setRefresh,refresh:refresh})}}/>

         }
        else if(props.route?.params?.onlyteacher){
        
          if(selectOne?._id==val._id){
            return   <VideoThumbnail key={i} views={`${val.branch} DEPT`} title={`${val.name} `} role={val.role} select={1}   onPress={()=>props.navigation.navigate('Profile',{userId:val._id})} onClick={()=>{selectOneHandler(null)}}/>

          }else{
            return   <VideoThumbnail key={i} views={`${val.branch} DEPT`} title={`${val.name} `} role={val.role}  buttontext={'Select'} onPress={()=>props.navigation.navigate('Profile',{userId:val._id})} onClick={()=>{selectOneHandler(val)}}/>

          }

         }else if(props.route?.params?.onlyShow){
          return   <VideoThumbnail key={i} views={`${val.branch} DEPT`} title={`${val.name}`}  role={val.role}buttontext={'View Details'}  onPress={()=>props.navigation.navigate('Profile',{userId:val._id,approve:true,setRefresh:setRefresh,refresh:refresh})} onClick={()=>{props.navigation.navigate('Profile',{userId:val._id,approve:true,setRefresh:setRefresh,refresh:refresh})}}/>

         }
         else{
            const index= props.teacher.findIndex(value=>val._id===value.userId)
            if(index>-1){
              return   <VideoThumbnail key={i} views={`${val.branch} DEPT`} title={`${val.name} `} role={val.role} select={1} onPress={()=>props.navigation.navigate('Profile',{userId:val._id})} onClick={()=>{addHandler(val)}}/>

            }else{
              return   <VideoThumbnail key={i} views={`${val.branch} DEPT`} title={`${val.name}`} role={val.role} buttontext={'Select'} onPress={()=>props.navigation.navigate('Profile',{userId:val._id})} onClick={()=>{addHandler(val)}}/>

            }
          }
          }):<View style={{flex:1,alignItems:"center",marginVertical:100}}><Paragraph style={{color:"#00000050"}}>No Teacher Found</Paragraph></View>
        }
        </ScrollView>
       

            

     
</View>
</Container>
        </View>)
}
export default Teachers