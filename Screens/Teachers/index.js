import React, { useState } from 'react'
import {Text,View,ScrollView,BackHandler,Alert, RefreshControl,Image,TouchableOpacity} from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialIcons'
import {Asterik,Row,Title,Paragraph,Header,Para,Container,VideoThumbnail, Spinner,FilterPopup} from '../../shared'
import styles from './styles'
const Teachers=(props)=>{
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
          <Container style={{paddingBottom:0}}>
          {!props.hide? <Row style={{marginVertical:15}}>
                        <Text><Title style={{color:"#0E7167"}}>{10} </Title><Title>Teachers</Title></Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Para style={{color:"#0C5C8F",fontSize:16,marginRight:20}}>All</Para>
                        <Icon name="filter-list" size={22} color="#0C5C8F" onPress={()=>setPopup(!popup)}/>
                        </View>
        </Row>:null}
        <View  style={{...styles.list,justifyContent:"flex-start",marginTop:0}} >
          
        <FilterPopup popup={popup} filter={filter} setPopup={setPopup} setFilter={setFilter}/>
        <VideoThumbnail views={`MCA DEPT`} title={'Ashish Negi (Ass. Prof)'} onClick={()=>props.navigation.navigate('Profile',{approve:true})}/>
        <VideoThumbnail views={`MCA DEPT`} title={'Ashish Negi (Ass. Prof)'} onClick={()=>props.navigation.navigate('Profile')}/>
        <VideoThumbnail views={`MCA DEPT`} title={'Ashish Negi (Ass. Prof)'} onClick={()=>props.navigation.navigate('Profile')}/>
        <VideoThumbnail views={`MCA DEPT`} title={'Ashish Negi (Ass. Prof)'} onClick={()=>props.navigation.navigate('Profile')}/>
        <VideoThumbnail views={`MCA DEPT`} title={'Ashish Negi (Ass. Prof)'} onClick={()=>props.navigation.navigate('Profile')}/>
        <VideoThumbnail views={`MCA DEPT`} title={'Ashish Negi (Ass. Prof)'} onClick={()=>props.navigation.navigate('Profile')}/>
        <VideoThumbnail views={`MCA DEPT`} title={'Ashish Negi (Ass. Prof)'} onClick={()=>props.navigation.navigate('Profile')}/>

            

     
</View>
</Container>
        </View>)
}
export default Teachers