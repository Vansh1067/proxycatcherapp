import React, { useState,useEffect } from 'react'
import {Text,View,ScrollView,BackHandler,Alert,ToastAndroid, RefreshControl,Image,TouchableOpacity,AsyncStorage} from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialIcons'
import Icons  from 'react-native-vector-icons/AntDesign'

import {Asterik,Row,Title,Paragraph,Header,Para,Container,AnalyticsCard, Spinner,FilterPopup} from '../../shared'
import styles from './styles'
import { getAllClasses } from '../../Store/Classes/action';

const TimeTable=(props)=>{
    const [showSearch,setShowSearch]=useState(false)
    const [loading,setLoading]=useState(false)
    const [refreshing,setRefreshing]=useState(false)
    const [refresh,setRefresh]=useState(false)
    const [popup,setPopup]=useState(false)
    const [filter,setFilter]=useState({index:null,value:''})
    const [classes,setClasses]=useState([])
    const onRefresh=()=>{
        setRefresh(true)
        setRefreshing(true)

    }
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
                        setLoading(false)
                        setRefreshing(false)
                      }
                })
            })
    },[refresh])
    
    return (<View style={{flex:1}}>
         <Header heading={'Classes'}  showSearch={showSearch} >
        <Icon name="search" size={22} color="#292F3B"style={{alignSelf:'flex-end'}} onPress={()=>{setShowSearch(!showSearch)}}/> 
          </Header>
          {loading?<Spinner/>:<Container style={{paddingBottom:0}}>
        <Row style={{marginVertical:15}}>
                        <Text><Title style={{color:"#0E7167"}}>{classes.length||0} </Title><Title>Classes</Title></Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Para style={{color:"#0C5C8F",fontSize:16,marginRight:20}}>All</Para>
                        <Icon name="filter-list" size={22} color="#0C5C8F" onPress={()=>setPopup(!popup)}/>
                        </View>
        </Row>
        <View style={styles.addMore}>
                <Icons name="pluscircle" color="#EB5C5C" size={50} onPress={()=>props.navigation.navigate("AddClass",{refresh,setRefresh})} />
        </View>
        <View  style={{...styles.list,justifyContent:"flex-start",marginTop:0}} >
          
        <FilterPopup popup={popup} filter={filter} setPopup={setPopup} setFilter={setFilter}/>
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
           
          }>
              {
                  classes.length>0?classes.map((cls,i)=>{
                      console.log(cls)
                    return     <AnalyticsCard hide={1} key={i}  heading={`${cls.name} - ${cls.code}`} text1={cls.year} text2={cls.semester} text3={cls.teacherId.name}/>
   
                  }):<View style={{flex:1,alignItems:"center",marginVertical:100}}><Paragraph style={{color:"#00000050"}}>No Classes Found</Paragraph></View>
              }
              </ScrollView>
       
     
</View>
</Container>}
        </View>)
}
export default TimeTable