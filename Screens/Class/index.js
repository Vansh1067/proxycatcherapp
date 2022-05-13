import React, { useState,useEffect } from 'react'
import {Text,View,ScrollView,BackHandler,ToastAndroid, RefreshControl,AsyncStorage,TouchableOpacity} from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialIcons'
import Icons  from 'react-native-vector-icons/AntDesign'

import {Asterik,Row,Title,Paragraph,Header,Para,Container, Spinner,FilterPopup} from '../../shared'
import styles from './styles'
import ClassCard from '../../Component/ClassCard';
import { getAllClasses } from '../../Store/Classes/action';

const Classes=(props)=>{
    const [showSearch,setShowSearch]=useState(false)

    const [loading,setLoading]=useState(false)

    const [refreshing,setRefreshing]=useState(false)
    const [refresh,setRefresh]=useState(false)
    const [popup,setPopup]=useState(false)
    const [classes,setClasses]=useState([])
    const [student,setStudent]=useState([])
    const [filter,setFilter]=useState({index:null,value:''})
    useEffect(()=>{
        setLoading(true)
        AsyncStorage.getItem('userId',(err,userId)=>{
            getAllClasses(userId).then(res=>{
                console.log(res.data,'classes')
                if(res.data.error){
                    ToastAndroid.showWithGravity(
                      res.data.error,
                      ToastAndroid.LONG,
                      ToastAndroid.BOTTOM
                    );
                  }else{
                    setClasses(res.data.data)
                    setStudent(res.data.data.student||[])
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
    if(loading){
        return  <Spinner/>
    }
    return (<View style={{flex:1}}>
         <Header heading={'Classes'}  showSearch={showSearch} >
        <Icon name="search" size={22} color="#292F3B"style={{alignSelf:'flex-end'}} onPress={()=>{setShowSearch(!showSearch)}}/> 
          </Header>
          <Container style={{paddingBottom:0}}>
        <Row style={{marginVertical:15}}>
                        <Text><Title style={{color:"#0E7167"}}>{10} </Title><Title>Classes</Title></Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Para style={{color:"#0C5C8F",fontSize:16,marginRight:20}}>All</Para>
                        <Icon name="filter-list" size={22} color="#0C5C8F" onPress={()=>setPopup(!popup)}/>
                        </View>
        </Row>
      
        <View  style={{...styles.list,justifyContent:"flex-start",marginTop:0}} >
          
        <FilterPopup popup={popup} filter={filter} setPopup={setPopup} setFilter={setFilter}/>
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
           
          }>
        {
            classes.map((cls,i)=>{
                return <ClassCard title={`${cls.name} - ${cls.code}`} year={cls.year} sem={cls.semester} time={cls.branch} leftTitle={"Add Student"} RightTitle="Details" LeftButton={()=>props.navigation.navigate("Students",{student,addStudent:true,classId:cls._id})} RightButton={()=>props.navigation.navigate("ClassDetails",{data:cls})}/>
            })
        }
      </ScrollView>
       
</View>
</Container>
        </View>)
}
export default Classes