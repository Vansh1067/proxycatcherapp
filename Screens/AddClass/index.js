import React, { useState,useEffect,useContext } from 'react'
import {View,BackHandler,TextInput, TouchableWithoutFeedback,ScrollView, ToastAndroid,AsyncStorage} from 'react-native'
import styles from './styles'
import Icon  from 'react-native-vector-icons/AntDesign'
import {Asterik,Input,Title,Paragraph,Header,Buttons,Container,Row,Para, Spinner} from '../../shared'
import  { Menu,MenuItem, MenuDivider } from 'react-native-material-menu';
import { AppStateContext } from '../../context'
import { CreateClasses } from '../../Store/Classes/action'


const AddClass=(props)=>{
    const [year,setYear]=useState('');
    const [showYear,setShowYear]=useState(false)
    const [semester,setSemester]=useState('');
    const [showSemester,setShowSemester]=useState(false)
    const [branch,setBranch]=useState('');
    const [showBranch,setShowbranch]=useState(false)
    const [teacher,setTeacher]=useState("")
    const [name,setName]=useState("")
    const [classCode,setClassCode]=useState("")
    const [loading,setLoading]=useState(false)

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
      const AddClassHandler=()=>{
        if(name.trim().length>0){
          if(classCode.trim().length>0){
            if(branch){
              if(!year){
                ToastAndroid.showWithGravity(
                  'Please Select Year!',
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM
                );
                return
                }
              if(!semester){
                  ToastAndroid.showWithGravity(
                    'Please Select Semester!',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                  );
                  return 
              }
              if(!teacher){
                ToastAndroid.showWithGravity(
                  'Please Select Teacher!',
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM
                );
                return 
            }
            setLoading(true)
            AsyncStorage.getItem('userId',(err,userId)=>{
              const uploadData={
                name,code:classCode,branch,year,semester,teacherId:teacher._id,hodId:userId,students:[]
              }
              CreateClasses(uploadData).then(res=>{
                console.log(res,'classes')
                if(res.data.error){
                  ToastAndroid.showWithGravity(
                      "Try Again",
                      ToastAndroid.LONG,
                      ToastAndroid.BOTTOM
                    );
              }else{
                  console.log(res.data,'piols');
                 props.route.params?.setRefresh(!props.route.params.refresh)

                 props.navigation.goBack()
                  ToastAndroid.showWithGravity(

                      "Classes Create Succesfully",
                      ToastAndroid.LONG,
                      ToastAndroid.BOTTOM
                    );
                  setLoading(false)
              } 
              })
            })
         
          }else{
            ToastAndroid.showWithGravity(
              'Please Select Branch!',
               ToastAndroid.LONG,
               ToastAndroid.BOTTOM
             );
          }
        }else{
            ToastAndroid.showWithGravity(
             'Please Enter ClassCode!',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM
            );
          }
        }else{
          ToastAndroid.showWithGravity(
            'Please Enter Name!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
        }
      }
      useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);  
        return ()=> BackHandler.removeEventListener('hardwareBackPress',handleBackPress);  
      },[])
    return(<View style={{flex:1}}>
        <Header heading="Add Class" icon="arrowleft" onPress={()=>handleBackPress()}/>
       {loading?<Spinner/>:<Container >  
       <ScrollView style={{flex:1}}showsVerticalScrollIndicator={false}>
       <View style={{marginTop:20}}>
          <Input required={1}  label="Class name" placeholder="Class name" value={name} onChangeText={(val)=>setName(val)}/>
          <Input required={1} label="Class Code" placeholder="Class Code" value={classCode} onChangeText={(val)=>setClassCode(val)}/>
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
       
         
              
            <View style={{width:'100%',marginTop:20}}>
                 <Buttons style={{backgroundColor:'#FFFFFF',borderColor:"#292F3B",borderWidth:1}}  color="#292F3B" title={teacher?teacher.name:"Select Teacher"} onPress={()=>props.navigation.navigate('Teacher',{setTeacher,teacher,onlyteacher:true})}></Buttons>
            </View>
           
         </View>
         <View style={{marginVertical:50}}>
          <Buttons title="ADD CLASS" onPress={()=>AddClassHandler()}  />
          </View>
          </ScrollView>
           </Container>}
           </View>)
}

export default AddClass