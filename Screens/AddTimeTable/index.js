import React, { useState,useEffect,useContext } from 'react'
import {View,BackHandler,Alert, TouchableWithoutFeedback,ScrollView, TouchableOpacity,AsyncStorage,ToastAndroid} from 'react-native'
import styles from './styles'
import Icon  from 'react-native-vector-icons/AntDesign'
import {Asterik,Input,Title,Paragraph,Header,Buttons,Container,Row,Para} from '../../shared'
import  { Menu,MenuItem, MenuDivider } from 'react-native-material-menu';

import { AppStateContext } from '../../context'
import { CreateTimeTable } from '../../Store/TimeTable/action'

const AddTimeTable=(props)=>{
    const [year,setYear]=useState('');
    const [showYear,setShowYear]=useState(false)
    const [semester,setSemester]=useState('');
    const [showSemester,setShowSemester]=useState(false)
    const [branch,setBranch]=useState('');
    const [showBranch,setShowbranch]=useState(false)
    const [days,setDays]=useState([])

    const _yearMenu=React.createRef()
    const _semesterMenu=React.createRef()
    const _branchMenu=React.createRef()
   
    
    const {user,setUser}=useContext(AppStateContext)
    const  handleBackPress = () => {
        if(props.navigation.isFocused()){
            props.navigation.goBack()
    
            return true;
            
          
            }else{
              return false
            }
       
      }
      useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);  
        return ()=> BackHandler.removeEventListener('hardwareBackPress',handleBackPress);  
      },[])
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
    const AddTimeTableHandler=()=>{
     
      AsyncStorage.getItem('userId',(err,userId)=>{
        const uploadData={
          branch,year,semester,hodId:userId,days
        }
        CreateTimeTable(uploadData).then(res=>{
          if(res.data.error){
            console.log(res.data)
            ToastAndroid.showWithGravity(
                "Try Again",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
              );
        }else{
            console.log(res.data,'timetable');
           props.route.params?.setRefresh(!props.route.params.refresh)

            props.navigation.goBack()
             ToastAndroid.showWithGravity(

                 "Time Table Create Succesfully",
                 ToastAndroid.LONG,
                 ToastAndroid.BOTTOM
               );
            // setLoading(false)
        }
        })
      }).catch(err=>console.log(err))
    }
    const DayPlan=(data)=>{
     console.warn(data.data)
     const DATA=data.data
        return <View style={{borderColor:'#202020',borderWidth:1,marginVertical:10,padding:10,borderRadius:8}}>
            <Paragraph style={{fontSize:14}}>{DATA.day.slice(0,3)} {formatAMPM(new Date(DATA.timeFrom))} -{formatAMPM(new Date(DATA.timeTo))} {DATA.code} {DATA.teacher}</Paragraph>
        </View>
    }
    const deleteDayHandler=(i)=>{
        const filterDays=days.filter((v,ind)=>ind!=i)
        setDays([...filterDays])
    }
    return(<View style={{flex:1}}>
        <Header heading="Add Time Table" icon="arrowleft" onPress={()=>handleBackPress()}/>
       <Container >  
       <ScrollView style={{flex:1}}showsVerticalScrollIndicator={false}>
       <View style={{marginTop:20}}>
      
          <View style={{marginVertical:10}}>
                                   <Para>Select Year <Asterik/></Para>
                                    <Menu 
                                   ref={_yearMenu}
                                   style={{width:'90%',marginTop:50}}
                                   anchor={<TouchableWithoutFeedback 
                                    onPress={()=>{setShowYear(!showYear);_yearMenu.current.show()}}>
                                    <View style={{borderBottomWidth:1,borderBottomColor:'#959595',display:'flex',flexDirection:'row',justifyContent:'space-between',paddingVertical:10,marginVertical:5}}>
                                    <Paragraph style={{color:year?"#292F3B":showYear?"#0C5C8F":'#959595'}}>{year||'Select year '}</Paragraph>
                                    <Icon name="caretdown" size={12} color="#959595"/>
                                    </View>
                                    </TouchableWithoutFeedback>}
                                   >
                                     <MenuItem onPress={()=>{setYear('1st Year');setShowYear(!showYear);_yearMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >1st Year</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setYear('2nd Year');setShowYear(!showYear);_yearMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >2nd Year</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setYear('3rd Year');setShowYear(!showYear);_yearMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >3rd Year</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setYear('4th Year');setShowYear(!showYear);_yearMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >4th Year</Paragraph></MenuItem>
                                   </Menu>
            </View>
           <View style={{marginVertical:10}}>
                                   <Para>Select Semester <Asterik/></Para>
                                    <Menu 
                                   ref={_semesterMenu}
                                   style={{width:'90%',marginTop:50}}
                                   anchor={<TouchableWithoutFeedback 
                                    onPress={()=>{setShowSemester(!showSemester);_semesterMenu.current.show()}}>
                                    <View style={{borderBottomWidth:1,borderBottomColor:'#959595',display:'flex',flexDirection:'row',justifyContent:'space-between',paddingVertical:10,marginVertical:5}}>
                                    <Paragraph style={{color:semester?"#292F3B":showSemester?"#0C5C8F":'#959595'}}>{semester||'Select Semester '}</Paragraph>
                                    <Icon name="caretdown" size={12} color="#959595"/>
                                    </View>
                                    </TouchableWithoutFeedback>}
                                   >
                                       <ScrollView style={ {maxHeight:250}}showsVerticalScrollIndicator={false}>
                                     <MenuItem onPress={()=>{setSemester('1st Semester');setShowSemester(!showSemester);_semesterMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >1st Semester</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setSemester('2nd Semester');setShowSemester(!showSemester);_semesterMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >2nd Semester</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setSemester('3rd Semester');setShowSemester(!showSemester);_semesterMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >3rd Semester</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setSemester('4th Semester');setShowSemester(!showSemester);_semesterMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >4th Semester</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setSemester('5th Semester');setShowSemester(!showSemester);_semesterMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >5th Semester</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setSemester('6th Semester');setShowSemester(!showSemester);_semesterMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >6th Semester</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setSemester('7th Semester');setShowSemester(!showSemester);_semesterMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >7th Semester</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setSemester('8th Semester');setShowSemester(!showSemester);_semesterMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >8th Semester</Paragraph></MenuItem>
                                     </ScrollView>
                                   </Menu>
            </View>
       
            <View style={{marginVertical:10}}>
                                   <Para>Select Branch <Asterik/></Para>
                                    <Menu 
                                   ref={_branchMenu}
                                   style={{width:'90%',marginTop:50}}
                                   anchor={<TouchableWithoutFeedback 
                                    onPress={()=>{setShowbranch(!showBranch);_branchMenu.current.show()}}>
                                    <View style={{borderBottomWidth:1,borderBottomColor:'#959595',display:'flex',flexDirection:'row',justifyContent:'space-between',paddingVertical:10,marginVertical:5}}>
                                    <Paragraph style={{color:branch?"#292F3B":showBranch?"#0C5C8F":'#959595'}}>{branch||'Select branch '}</Paragraph>
                                    <Icon name="caretdown" size={12} color="#959595"/>
                                    </View>
                                    </TouchableWithoutFeedback>}
                                   >
                                       <ScrollView style={ {maxHeight:250}}showsVerticalScrollIndicator={false}>

                                     <MenuItem onPress={()=>{setBranch('CSE');setShowbranch(!showBranch);_branchMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >CSE</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setBranch('ECE');setShowbranch(!showBranch);_branchMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >ECE</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setBranch('CV');setShowbranch(!showBranch);_branchMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >CV</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setBranch('EC');setShowbranch(!showBranch);_branchMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >EC</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setBranch('ME');setShowbranch(!showBranch);_branchMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >ME</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setBranch('BT');setShowbranch(!showBranch);_branchMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >BT</Paragraph></MenuItem>
                                        </ScrollView>

                                   </Menu>
            </View>
       
           
         </View>
         <View style={{flexDirection:'row',flex:1,justifyContent:'space-between',alignItems:'center',marginVertical:20}}>
                <Paragraph>Add Days</Paragraph>
                <Icon name="pluscircle" color="#EB5C5C" size={40} onPress={()=>props.navigation.navigate("AddDay",{days,setDays})} />
        </View>
        <View style={{minHeight:150}}>
                                {
                                  days.map((d,i)=>{
                                    console.log(d,'dayss')
                                    return <TouchableOpacity onPress={()=>Alert.alert('Warning','Are you sure to delete the day',[  {
                                      text: "Yes",
                                      onPress: () => deleteDayHandler(i),
                                    
                                    },  {
                                      text: "Cancel",
                                      onPress: () =>{},
                                   
                                    },])}><DayPlan key={i} data={d} /></TouchableOpacity>
                                  })
                                }
        </View>
         <View style={{marginVertical:50}}>
          <Buttons title="Add Time Table" onPress={()=>AddTimeTableHandler()}  />
          </View>
          </ScrollView>
           </Container>
           </View>)
}

export default AddTimeTable