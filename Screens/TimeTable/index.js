import React, { useState,useEffect } from 'react'
import {Text,View,ScrollView,BackHandler,Alert, RefreshControl,ToastAndroid,TouchableOpacity,AsyncStorage} from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialIcons'
import Icons  from 'react-native-vector-icons/AntDesign'

import {Asterik,Row,Title,Paragraph,Header,Para,Container,AnalyticsCard, Spinner,FilterPopup} from '../../shared'
import styles from './styles'
import { getAllTimeTable } from '../../Store/TimeTable/action';

const TimeTable=(props)=>{
    const [showSearch,setShowSearch]=useState(false)

    const [loading,setLoading]=useState(false)

    const [refreshing,setRefreshing]=useState(false)
    const [timetables,setTimeTables]=useState([])
    const [refresh,setRefresh]=useState(false)
    const [popup,setPopup]=useState(false)
    const [filter,setFilter]=useState({index:null,value:''})
    const onRefresh=()=>{
        setRefreshing(true);
        setRefresh(!refresh);

    }
    useEffect(()=>{
        setLoading(true)
        AsyncStorage.getItem('userId',(err,userId)=>{
            getAllTimeTable(userId).then(res=>{
                if(res.data.error){
                    ToastAndroid.showWithGravity(
                      res.data.error,
                      ToastAndroid.LONG,
                      ToastAndroid.BOTTOM
                    );
                  }else{
                    setTimeTables(res.data.data)
                    console.log(res.data.data[0].days)
                    setLoading(false)
                    setRefreshing(false)
                  }
            })

        })
    },[refresh])
    if(loading){
        return  <Spinner/>
    }
    return (<View style={{flex:1}}>
         <Header heading={'Time Table'}  showSearch={showSearch} >
        <Icon name="search" size={22} color="#292F3B"style={{alignSelf:'flex-end'}} onPress={()=>{setShowSearch(!showSearch)}}/> 
          </Header>
          <Container style={{paddingBottom:0}}>
        <Row style={{marginVertical:15}}>
                        <Text><Title style={{color:"#0E7167"}}>{timetables.length} </Title><Title>Time Table</Title></Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Para style={{color:"#0C5C8F",fontSize:16,marginRight:20}}>All</Para>
                        <Icon name="filter-list" size={22} color="#0C5C8F" onPress={()=>setPopup(!popup)}/>
                        </View>
        </Row>
        <View style={styles.addMore}>
                <Icons name="pluscircle" color="#EB5C5C" size={50} onPress={()=>props.navigation.navigate("AddTimeTable",refresh,setRefresh)} />
        </View>
        <View  style={{...styles.list,justifyContent:"flex-start",marginTop:0}} >
          
        <FilterPopup popup={popup} filter={filter} setPopup={setPopup} setFilter={setFilter}/>
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
           
          }>
            {
                timetables.map((t,i)=>{
                   return  <AnalyticsCard key={i}  heading={`${t.year} - ${t.semester}`}  onPress={()=>{props.navigation.navigate('TimeTablesDetails',{data:t})}}/>

                })
            }
        </ScrollView>
    
       
</View>
</Container>
        </View>)
}
export default TimeTable