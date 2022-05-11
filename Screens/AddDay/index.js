import React, { useState,useEffect } from 'react'
import {View,BackHandler,TextInput, TouchableWithoutFeedback,ScrollView, TouchableOpacity,AsyncStorage} from 'react-native'
import styles from './styles'
import Icon  from 'react-native-vector-icons/AntDesign'
import {Asterik,Input,Title,Paragraph,Header,Buttons,Container,Row,Para} from '../../shared'
import  { Menu,MenuItem, MenuDivider } from 'react-native-material-menu';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getAllClasses } from '../../Store/Classes/action'

const AddTimeTable=(props)=>{
    const [day,setDay]=useState('');
    const [showDay,setShowDay]=useState(false)
  

    const [fromDate, setFromDate] = useState(null);
    const [teacher,setTeacher]=useState("")
    const [classes,setClasses]=useState([])

    
    const [toDate, setToDate] = useState(null);

    const [displaymode, setMode] = useState('time');
    const [isDisplayToDate, setToShow] = useState(false);
    const [isDisplayFromDate, setFromShow] = useState(false);
    const formatAMPM = (date) => {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes.toString().padStart(2, '0');
      let strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
  }
    const changeSelectedFromDate = (event, selectedDate) => {
       const currentDate = selectedDate || fromDate;
       console.log(formatAMPM(currentDate))
       setFromDate(currentDate);
       setFromShow(false)
      
    };
    const changeSelectedToDate=(event, selectedDate)=>{
       const currentDate = selectedDate || toDate;
       console.log(currentDate.toLocaleTimeString())
       setToDate(currentDate);
       setToShow(false)
    }
    const showMode = (currentMode,type) => {
      if(type=="from"){
        setFromShow(true);

      }else{
        setToShow(true);

      }
       setMode(currentMode);
    };
    const displayTimepicker = (type) => {
      
       showMode('time',type);
    };
    const [role,setRole]=useState('');
    const [cls,setCls]=useState('');

    const [showRole,setShowRole]=useState(false)
    const [showClass,setShowClass]=useState(false)


    const _dayMenu=React.createRef()
    const _classMenu=React.createRef()

 
 

    const  handleBackPress = () => {
        if(props.navigation.isFocused()){
            props.navigation.goBack()
    
            return true;
            
          
            }else{
              return false
            }
       
      }
      const AddDayHandler=()=>{
         const dayData={
            day,timeFrom:fromDate,timeTo:toDate,code:cls.code,teacher:teacher.name,teacherId:teacher._id,classesId:cls._id
         }
         const days=props.route.params.days;
         props.route.params.setDays([...days,dayData])
         props.navigation.goBack()

      }
      useEffect(()=>{
        // setLoading(true)
         AsyncStorage.getItem('userId',(err,userId)=>{
         
             getAllClasses(userId).then(res=>{
                 console.log(res,'classes')
                 if(res.data.error){
                     ToastAndroid.showWithGravity(
                       res.data.error,
                       ToastAndroid.LONG,
                       ToastAndroid.BOTTOM
                     );
                   }else{
                     setClasses(res.data.data)
                     //setLoading(false)
                     //setRefreshing(false)
                   }
             })
         })
 },[])
      useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);  
        return ()=> BackHandler.removeEventListener('hardwareBackPress',handleBackPress);  
      },[])
 
    return(<View style={{flex:1}}>
        <Header heading="Add Time Table" icon="arrowleft" onPress={()=>handleBackPress()}/>
       <Container >  
       <ScrollView style={{flex:1}}showsVerticalScrollIndicator={false}>
       <View style={{marginTop:20}}>
      
          <View style={{marginVertical:10}}>
                                   <Para>Select Day <Asterik/></Para>
                                    <Menu 
                                   ref={_dayMenu}
                                   style={{width:'90%',marginTop:50}}
                                   anchor={<TouchableWithoutFeedback 
                                    onPress={()=>{setShowDay(!showDay);_dayMenu.current.show()}}>
                                    <View style={{borderBottomWidth:1,borderBottomColor:'#959595',display:'flex',flexDirection:'row',justifyContent:'space-between',paddingVertical:10,marginVertical:5}}>
                                    <Paragraph style={{color:day?"#292F3B":showDay?"#0C5C8F":'#959595'}}>{day||'Select Day '}</Paragraph>
                                    <Icon name="caretdown" size={12} color="#959595"/>
                                    </View>
                                    </TouchableWithoutFeedback>}
                                   >
                                     <MenuItem onPress={()=>{setDay('Monday');setShowDay(!showDay);_dayMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >Monday</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setDay('Tuesday');setShowDay(!showDay);_dayMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >Tuesday</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setDay('Wednesday');setShowDay(!showDay);_dayMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >Wednesday</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setDay('Thursday');setShowDay(!showDay);_dayMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >Thursday</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setDay('Friday');setShowDay(!showDay);_dayMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >Friday</Paragraph></MenuItem>
                                    

                                   </Menu>
            </View>
            <View style={{marginVertical:10}}>
                                   <Para>Time (From) <Asterik/></Para>
                                   <TouchableOpacity onPress={()=>{displayTimepicker('from')}}>
                                   <View style={{borderBottomWidth:1,borderBottomColor:'#959595',display:'flex',flexDirection:'row',justifyContent:'space-between',paddingVertical:10,marginVertical:5}}>
                                    <Paragraph style={{color:fromDate?"#292F3B":isDisplayFromDate?"#0C5C8F":'#959595'}}>{fromDate?formatAMPM(fromDate):'Time (From)'}</Paragraph>
                                    {isDisplayFromDate && (
                                        <DateTimePicker
                                           value={fromDate||new Date()}
                                           mode={displaymode}
                                           is24Hour={false}
                                           display="default"
                                           onChange={changeSelectedFromDate}
                                        />
                                    )}
                                    </View>
                                    </TouchableOpacity>
                                 
            </View>
            <View style={{marginVertical:10}}>
                                   <Para>Time (To)<Asterik/></Para>
                                   <TouchableOpacity onPress={()=>{displayTimepicker('to')}}>
                                   <View style={{borderBottomWidth:1,borderBottomColor:'#959595',display:'flex',flexDirection:'row',justifyContent:'space-between',paddingVertical:10,marginVertical:5}}>
                                    <Paragraph style={{color:toDate?"#292F3B":isDisplayToDate?"#0C5C8F":'#959595'}}>{toDate?formatAMPM(toDate):'Time (To)'}</Paragraph>
                                    {isDisplayToDate && (
                                        <DateTimePicker
                                           value={toDate||new Date()}
                                           mode={displaymode}
                                           is24Hour={false}
                                           display="default"
                                           onChange={changeSelectedToDate}
                                        />
                                    )}
                                    </View>
                                    </TouchableOpacity>
                                 
            </View>
   
            <View style={{marginVertical:10}}>
                                   <Para>Select Class <Asterik/></Para>
                                    <Menu 
                                   ref={_classMenu}
                                   style={{width:'90%',marginTop:50}}
                                   anchor={<TouchableWithoutFeedback 
                                    onPress={()=>{setShowClass(!showClass);_classMenu.current.show()}}>
                                    <View style={{borderBottomWidth:1,borderBottomColor:'#959595',display:'flex',flexDirection:'row',justifyContent:'space-between',paddingVertical:10,marginVertical:5}}>
                                    <Paragraph style={{color:cls?"#292F3B":showClass?"#0C5C8F":'#959595'}}>{cls?`${cls.name} - ${cls.code}`:'Select Class '}</Paragraph>
                                    <Icon name="caretdown" size={12} color="#959595"/>
                                    </View>
                                    </TouchableWithoutFeedback>}
                                   >
                                      {
                                         classes.map((c,i)=>{
                                          return   <MenuItem onPress={()=>{setCls(c);setShowClass(!showClass);_classMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >{c.name}- {c.code}</Paragraph></MenuItem>
                                
                                         })
                                      }
                                     
                                   </Menu>
            </View>
            <View style={{marginVertical:10}}>
            <View style={{width:'100%',marginTop:20}}>
                 <Buttons style={{backgroundColor:'#FFFFFF',borderColor:"#292F3B",borderWidth:1}}  color="#292F3B" title={teacher?teacher.name:"Select Teacher"} onPress={()=>props.navigation.navigate('Teacher',{setTeacher,teacher,onlyteacher:true})}></Buttons>
            </View>
                                 
            </View>
       
           
       
           
         </View>
       
       
         <View style={{marginVertical:50}}>
          <Buttons title="Add Day" onPress={()=>AddDayHandler()}  />
          </View>
          </ScrollView>
           </Container>
           </View>)
}

export default AddTimeTable