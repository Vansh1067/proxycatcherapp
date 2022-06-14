import React,{useEffect,useState} from 'react'
import {View,RefreshControl,Image, AsyncStorage,BackHandler,ToastAndroid} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Container, Paragraph,Header,Title ,Para, Spinner} from '../../shared'




const TimeTableDetails=(props)=>{
    const [data,setData]=useState()
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        setLoading(true)
        setData(props.route.params.data)
        console.log(props.route.params.data)
        setLoading(false)

    },[props])
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
        const formatAMPM = (date) => {
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes.toString().padStart(2, '0');
            let strTime = hours + ':'+minutes +' '+ ampm;
            return strTime;
        }
        const DayPlan=(data)=>{
            console.warn(data.data)
            const DATA=data.data
               return <View style={{borderColor:'#202020',borderWidth:1,marginVertical:10,padding:10,borderRadius:8}}>
                   <Paragraph >Day : {DATA.day}  </Paragraph>
                   <Paragraph>Time : {formatAMPM(new Date(DATA.timeFrom))} -{formatAMPM(new Date(DATA.timeTo))} </Paragraph>
                   <Paragraph>Class Code : {DATA.classesId.name} ({DATA.classesId.code}) </Paragraph>
                   <Paragraph>Teacher  :  {DATA.teacherId.name} ( {DATA.teacherId.role}) </Paragraph>
               </View>
           }
    if(loading){
        return <Spinner/>
    }
    return <View style={{flex:1}}>
    <Header heading={`${data?.year||""} - ${data?.semester||""} - ${data?.branch||""}`} icon="arrowleft" onPress={()=>handleBackPress()}/>
    <Container >
    <ScrollView style={{marginVertical:15}}>

        {
            data?.days.map((d,i)=>{
                return <DayPlan key={i} data={d}/>
            })
        }
    </ScrollView>
    </Container>
    </View>
}

export default TimeTableDetails