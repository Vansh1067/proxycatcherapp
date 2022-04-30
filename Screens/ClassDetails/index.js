import React,{useEffect,useState} from 'react'
import {View,RefreshControl,Image, Text,BackHandler} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Container, VideoThumbnail,Header,Title ,Para, Spinner,Paragraph} from '../../shared'
import styles from './styles'
import Graph from '../../Component/LabelGraph'

const ClassDetails=(props)=>{
 
  const [date,setDate]=useState(new Date())
  const mlist = [ "Jan", "Febr", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ];
  const [refreshing,setRefreshing]=useState(false)
    const [refresh,setRefresh]=useState(false)
    const [loading,setLoading]=useState(false)

    const onRefresh=()=>{
        setRefreshing(true);
        setRefresh(!refresh);

    }
    useEffect(()=>{
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);  
      return ()=> BackHandler.removeEventListener('hardwareBackPress',handleBackPress);  
    },[])
   
    
  
    const  handleBackPress = () => {
      if(props.navigation.isFocused()){
        props.navigation.goBack()
      
  
        return true;
        
       
        }else{
          return false
        }
   
  
      }
              
      const data=[{total:'150',complete:'100',height:50,color:'#FFE0B2',label:'2nd Feb,2020',value:[]},{value:[],total:'150',complete:'20',height:20,color:'#C5E1A5',label:'3rd Feb,2020'}]
    
     /*  const color = percent >= 0 && percent <= 25 ? '#FFCDD2' : percent >= 26 && percent <= 50 ? '#FFE0B2' : '#C5E1A5' */
    return <View style={{flex:1}}>
          <Header heading={'Economics'} icon="arrowleft" onPress={()=>handleBackPress()}/>

       {!loading? <Container>
          
          <View style={{marginVertical:20}}>
              <ScrollView  showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }> 
        
        <View style={styles.menuSectionView}> 
              <View style={styles.menuSection}> 
                <View style={styles.iconView}>
                  <MaterialIcon name="assignment" size={22} style={{color:'#616161'}}/>
                </View>
                  <Text style={{color:'#424242',fontSize:16}}>Economics PCS-125</Text>
              </View>
              <View style={styles.menuSection}> 
                <View style={styles.iconView}>
                  <Icon name="question" size={22} style={{color:'#616161'}}/>
                </View>
                <Text style={{color:'#424242',fontSize:16}}>4th Year</Text>
              </View>
              <View style={styles.menuSection}> 
                <View style={styles.iconView}>
                  <MaterialIcon name="local-library" size={22} style={{color:'#616161'}}/>
                </View>
                <Text style={{color:'#424242',fontSize:16}}>7th Sem</Text>
              </View>
              <View style={styles.menuSection}> 
                <View style={styles.iconView}>
                  <Icon name="clock-o" size={22} style={{color:'#616161'}}/>
                </View>
                <Text style={{color:'#424242',fontSize:16}}>2:00 PM</Text>

              </View>
            </View>
             <Title style={{marginVertical:5,color:'#0C5C8F'}}>{"Attendance"}</Title>
             <Para>25 Total Classes</Para>
             <View style={{marginVertical:30}}>
             <Graph 
             
              xLabel="Date"
              yLabel="Records"
              pointLabel={[]}
              pointLabelColors={[]}
              data={data}
              /> 
              </View>
             <View style={{flexDirection:'row',flex:1,justifyContent:'space-between',alignItems:'center',marginVertical:10}}>
                <Paragraph>Student Response</Paragraph>
                <Title style={{color:'#43A047'}}>67%</Title>
            </View>
            <View>
                <Text>20 Feb,2022</Text>
            </View>
             <View  style={{...styles.list,justifyContent:"flex-start",marginTop:0}} >
          
         
          <VideoThumbnail views={`MCA DEPT`} title={'Ashish Negi (Ass. Prof)'} onClick={()=>props.navigation.navigate('Profile',{approve:true})}/>
        <VideoThumbnail views={`CSE-4-7`} title={'Naman Joshi (4th year)'} onClick={()=>props.navigation.navigate('Profile')}/>
          <VideoThumbnail views={`MCA DEPT`} title={'Ashish Negi (Ass. Prof)'} onClick={()=>props.navigation.navigate('Profile')}/>
        <VideoThumbnail views={`CSE-4-7`} title={'Naman Joshi (4th year)'} onClick={()=>props.navigation.navigate('Profile')}/>
          <VideoThumbnail views={`MCA DEPT`} title={'Ashish Negi (Ass. Prof)'} onClick={()=>props.navigation.navigate('Profile')}/>
      
        
        </View>
             </ScrollView>
          </View>
    </Container>:<Spinner/>}
    </View>
}

export default ClassDetails