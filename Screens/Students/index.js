import React, { useState,useEffect } from 'react'
import {Text,View,ScrollView,BackHandler,ToastAndroid, RefreshControl,Image,TouchableOpacity,AsyncStorage} from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialIcons'
import {Asterik,Row,Title,Paragraph,Header,Para,Container,VideoThumbnail, Spinner,FilterPopup} from '../../shared'
import { addStudentToClass, removeStudentToClass } from '../../Store/Classes/action';
import { getApprovalrequest,getApprovalUser } from '../../Store/Profile/action';
import styles from './styles'
const Students=(props)=>{
    const [showSearch,setShowSearch]=useState(false)

    const [loading,setLoading]=useState(false)

    const [refreshing,setRefreshing]=useState(false)
    const [refresh,setRefresh]=useState(false)
    const [popup,setPopup]=useState(false)
    const [filter,setFilter]=useState({index:null,value:''})
    const [addStudent,setAddStudent]=useState([])
    const [teach,setTeach]=useState([])
    useEffect(()=>{
      const backhandler= BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => backhandler.remove();
     },[])
    useEffect(()=>{
      setLoading(true)
      if(props.approve){
        AsyncStorage.getItem('userId',(err,userId)=>{
          getApprovalrequest(1,userId).then(res=>{
  
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
        getApprovalUser(1,branch).then(res=>{
          if(res.data.error){
            ToastAndroid.showWithGravity(
              res.data.error,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          }else{
            const UserData=res.data.data
            if(props.route.params.onlyStudent){
              setSelectOne(props.route.params.teacher||null)
            }
            console.log(UserData,'pp')
            setTeach([...UserData])
            props?.route?.params?.addStudent? setAddStudent(props.route.params.student):null

            setLoading(false)
            setRefreshing(false)
          }
        })
      })
      }
   
    
  },[refresh])
    const addStudentHandler=(val)=>{
      const index= addStudent.findIndex(value=>val._id===value)

      if(index>-1){
        const filterArray=addStudent.filter((value,i)=>value!==val._id)
  
        removeStudentToClass({classId:props.route.params.classId,data:val._id}).then((res)=>{
          if(res.data.error){
            ToastAndroid.showWithGravity(
              res.data.error,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM
            );
          }else{
            setAddStudent([...filterArray])
            ToastAndroid.showWithGravity(
              "Student remove Successfully",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM
            );
          }

        })

       }else{
         //const d={userId:val._id}
         
         addStudentToClass({classId:props.route.params.classId,data:val._id}).then((res)=>{
          if(res.data.error){
            ToastAndroid.showWithGravity(
              res.data.error,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM
            );
          }else{
            const newData=[...addStudent]
            newData.push(val._id)
            setAddStudent(newData)
            ToastAndroid.showWithGravity(
              "Student Add Successfully",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM
            );
            console.log(addStudent)
          }

         })
       }
    }
    const addHandler=(val)=>{
    
      
    
      const index= props.student.findIndex(value=>val._id===value.userId)

      if(index>-1){

       const filterArray=props.student.filter((value,i)=>value.userId!==val._id)
       props.setStudents([...filterArray])
      }else{
        const d={userId:val._id}
        props.setStudents([...props.student,d])

      }
    
     }
    const onRefresh=()=>{
        setRefreshing(true);
        setRefresh(!refresh);

    }
    const  handleBackPress = () => {
        if(props.navigation.isFocused()){
          if(props.route?.params?.addStudent){
           // console.warn('hosgyg')
            props.route.params.setRefresh(!props.route.params.refresh)
          }
        props.navigation.goBack()
        return true;
        }else{
          return false
        }
      }
    if(loading){
        return  <Spinner/>
    }
    const doneHandler=()=>{
     // props.route.params.setSender([...user])
      props.navigation.goBack()

   }
    return (<View style={{flex:1}}>
         {!props.hide? <Header heading={'Students'} onPress={()=>handleBackPress()} icon="arrowleft" showSearch={showSearch} >
        <Icon name="search" size={22} color="#292F3B"style={{alignSelf:'flex-end'}} onPress={()=>{setShowSearch(!showSearch)}}/> 
          </Header>:null}

          <Container style={{paddingBottom:0}}>
          {!props.approve?<Row style={{marginVertical:15}}>
                        <Text><Title style={{color:"#0E7167"}}>{teach.length} </Title><Title>Students</Title></Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                        {props.route.params?.onlyStudent?null:<TouchableOpacity onPress={()=>{  props.setStudents([...teach,...props.student])}}><Para style={{color:"#0C5C8F",fontSize:16,marginRight:20}}>All</Para></TouchableOpacity>}
                        {!props.hide?  <Icon name="filter-list" size={22} color="#0C5C8F" onPress={()=>setPopup(!popup)}/>:null}
                        </View>
        </Row>:null}
        <View  style={{...styles.list,justifyContent:"flex-start",marginTop:0}} >
          
        <FilterPopup popup={popup} filter={filter} setPopup={setPopup} setFilter={setFilter}/>
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {
       teach.length>0?teach.map((val,i)=>{
         if(props.approve){
            return   <VideoThumbnail views={`${val.branch} DEPT`} title={`${val.name}`} role={val.year} buttontext={'View Details'}  onPress={()=>props.navigation.navigate('Profile',{userId:val._id,approve:true,setRefresh:setRefresh,refresh:refresh})} onClick={()=>{props.navigation.navigate('Profile',{userId:val._id,approve:true,setRefresh:setRefresh,refresh:refresh})}}/>

         }
         else if(props.route?.params?.onlyStudent){
        
          if(selectOne?._id==val._id){
            return   <VideoThumbnail key={i} views={`${val.branch} DEPT`} title={`${val.name} `} role={val.year} select={1}   onPress={()=>props.navigation.navigate('Profile',{userId:val._id})} onClick={()=>{selectOneHandler(null)}}/>

          }else{
            return   <VideoThumbnail key={i} views={`${val.branch} DEPT`} title={`${val.name} `} role={val.year}  buttontext={'Select'} onPress={()=>props.navigation.navigate('Profile',{userId:val._id})} onClick={()=>{selectOneHandler(val)}}/>

          }

         }else if(props.route?.params?.onlyShow){
          return   <VideoThumbnail key={i} views={`${val.branch} DEPT`} title={`${val.name}`}  role={val.year}buttontext={'View Details'}  onPress={()=>props.navigation.navigate('Profile',{userId:val._id,approve:true,setRefresh:setRefresh,refresh:refresh})} onClick={()=>{props.navigation.navigate('Profile',{userId:val._id,approve:true,setRefresh:setRefresh,refresh:refresh})}}/>

         }else if(props?.route?.params?.addStudent){
          const index= addStudent.findIndex(value=>val._id===value)
          if(index>-1){
            return   <VideoThumbnail key={i} views={`${val.branch} DEPT`} title={`${val.name} `}  role={val.year} select={1} onPress={()=>props.navigation.navigate('Profile',{userId:val._id})} onClick={()=>{addStudentHandler(val)}}/>

          }else{
            return   <VideoThumbnail  key={i}  views={`${val.branch} DEPT`} title={`${val.name} `} role={val.year} buttontext={'Select'} onPress={()=>props.navigation.navigate('Profile',{userId:val._id})} onClick={()=>{addStudentHandler(val)}}/>

          } 
         }
         else{
           // console.log(props?.route?.params?.setStudent([]))
        
             const index= props.student.findIndex(value=>val._id===value.userId)
            if(index>-1){
              return   <VideoThumbnail  key={i}  views={`${val.branch} DEPT`} title={`${val.name} `}  role={val.year} select={1} onPress={()=>props.navigation.navigate('Profile',{userId:val._id})} onClick={()=>{addHandler(val)}}/>

            }else{
              return   <VideoThumbnail  key={i}  views={`${val.branch} DEPT`} title={`${val.name} `} role={val.year} buttontext={'Select'} onPress={()=>props.navigation.navigate('Profile',{userId:val._id})} onClick={()=>{addHandler(val)}}/>

            } 
          }
          }):<View style={{flex:1,alignItems:"center",marginVertical:100}}><Paragraph style={{color:"#00000050"}}>No Student Found</Paragraph></View>
        }
        </ScrollView>


            

     
</View>
</Container>
        </View>)
}
export default Students