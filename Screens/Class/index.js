import React, { useState } from 'react'
import {Text,View,ScrollView,BackHandler,Alert, RefreshControl,Image,TouchableOpacity} from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialIcons'
import Icons  from 'react-native-vector-icons/AntDesign'

import {Asterik,Row,Title,Paragraph,Header,Para,Container, Spinner,FilterPopup} from '../../shared'
import styles from './styles'
import ClassCard from '../../Component/ClassCard';
const TimeTable=(props)=>{
    const [showSearch,setShowSearch]=useState(false)

    const [loading,setLoading]=useState(false)

    const [refreshing,setRefreshing]=useState(false)
    const [refresh,setRefresh]=useState(false)
    const [popup,setPopup]=useState(false)
    const [filter,setFilter]=useState({index:null,value:''})
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
        <ClassCard title='Ecnomics - PCS125' year="4th Year" sem="8th Sem" time="2:00 pm" leftTitle={"Add Student"} RightTitle="Details" LeftButton={()=>props.navigation.navigate("Students")} RightButton={()=>props.navigation.navigate("ClassDetails")}/>
        <ClassCard title='Ecnomics - PCS125' year="4th Year" sem="8th Sem" time="2:00 pm" leftTitle={"Add Student"} RightTitle="Details" LeftButton={()=>props.navigation.navigate("Students")} RightButton={()=>props.navigation.navigate("ClassDetails")}/>
        <ClassCard title='Ecnomics - PCS125' year="4th Year" sem="8th Sem" time="2:00 pm" leftTitle={"Add Student"} RightTitle="Details" LeftButton={()=>props.navigation.navigate("Students")} RightButton={()=>props.navigation.navigate("ClassDetails")}/>
      
       
</View>
</Container>
        </View>)
}
export default TimeTable