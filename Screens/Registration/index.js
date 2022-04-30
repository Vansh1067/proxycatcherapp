import React, { useEffect, useState } from 'react'
import {Text,View,ToastAndroid,ScrollView,BackHandler,Alert, Linking,Image,AsyncStorage,TouchableWithoutFeedback} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {Asterik,Input,Title,Paragraph,Header,Buttons,Container,Row,Para} from '../../shared'
import  { Menu,MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon  from 'react-native-vector-icons/AntDesign'
import { registration } from '../../Store/Auth/action';

const Registration=(props)=>{
    const [year,setYear]=useState('');
    const [showYear,setShowYear]=useState(false)
    const [semester,setSemester]=useState('');
    const [showSemester,setShowSemester]=useState(false)
    const [branch,setBranch]=useState('');
    const [showBranch,setShowbranch]=useState(false)
    const [role,setRole]=useState('');
    const [showRole,setShowRole]=useState(false)

    const _yearMenu=React.createRef()
    const _semesterMenu=React.createRef()
    const _branchMenu=React.createRef()
    const _roleMenu=React.createRef()

    const [user,setUser]=useState(props.user||1)
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [userId,setUserId]=useState("")
    const [phone,setPhone]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")





    const RegisterHandler=()=>{
       
            const namePattern=new RegExp(/^[a-zA-Z ]+$/)
            if(namePattern.test(name)){
              const emailPattern=new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
              if(emailPattern.test(email)){
                if(branch){
                  if(!year&&user==1){
                    ToastAndroid.showWithGravity(
                      'Please Select Year!',
                      ToastAndroid.LONG,
                      ToastAndroid.BOTTOM
                    );
                    return
                    }
                  if(!semester&&user==1){
                      ToastAndroid.showWithGravity(
                        'Please Select Semester!',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM
                      );
                      return 
                  }
                  if(!role&&user==2){
                    ToastAndroid.showWithGravity(
                      'Please Select Role!',
                      ToastAndroid.LONG,
                      ToastAndroid.BOTTOM
                    );
                    return 
                }
                const idPattern=new RegExp(/^\d{6}$/)
                if(idPattern.test(userId)){
                const phonePattern=new RegExp(/^\d{10}$/)

                  if(phonePattern.test(phone)){
                    if(!password){
                        ToastAndroid.showWithGravity(
                          'Please enter password!',
                          ToastAndroid.LONG,
                          ToastAndroid.BOTTOM
                        );
                        return 
                      
                    }
                    if(!password){
                      ToastAndroid.showWithGravity(
                        'Please enter confirm password!',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM
                      );
                      return 
                    
                  }
                  if(password!=confirmPassword){
                    ToastAndroid.showWithGravity(
                      'Password does not match!',
                      ToastAndroid.LONG,
                      ToastAndroid.BOTTOM
                    );
                    return 
                  }else{
                    const uploadData={
                      name,email,branch,semester,year,role,userId,phone,password,confirmPassword,userType:+user
                    }
                    registration(uploadData)
                    .then(response=>{
                      console.log(response.data)
                      if(response.data.error){
                        ToastAndroid.showWithGravity(
                          response.data.error,
                          ToastAndroid.LONG,
                          ToastAndroid.BOTTOM
                        );
                      }else{
                        ToastAndroid.showWithGravity(
                          response.data.message,
                          ToastAndroid.LONG,
                          ToastAndroid.BOTTOM
                        );
                        const DATA=response.data.data
                        AsyncStorage.setItem('userId',DATA._id)
                        props.navigation.navigate('VerifyUser',{verifyRequest:'pending'});
                        console.log(DATA.userId)
                        
                      }
                    }).catch(err=>console.warn(err))
                  
                  }
                }else{
                  ToastAndroid.showWithGravity(
                    phone?'Please Enter Valid Phone number!':'Please Enter Phone number!',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                  );
                  return
                }
                }else{
                  ToastAndroid.showWithGravity(
                    userId?`Please Enter valid ${user==1?'Student':user==2?'Teacher':'HOD'} Id!`:`Please Enter ${user==1?'Student':user==2?'Teacher':'HOD'} Id!`,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                  );
                }

               
                }else{
                  ToastAndroid.showWithGravity(
                    'Please Select branch!',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                  );
                  return
                }
              }else{
                ToastAndroid.showWithGravity(
                  email?'Please Enter Valid Email!':'Please Enter  email!',
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM
                );
                return
              }
            }else{
              ToastAndroid.showWithGravity(
                name?'Please Enter Valid Name!':'Please Enter Name!',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
              );
             return;
            }
       
             
      
      
       
     
      
        
      }

    return (
        <View style={{flex:1,backgroundColor: '#FAFAFA'}}>
          
   
               <ScrollView showsVerticalScrollIndicator={false}>
                        
          <Row style={{ marginVertical: 30, justifyContent: 'center' }}>
            <View style={{ position: 'relative' }}>
              
                  <Image
                    style={{ width: 90, height: 90, borderRadius: 50 }}
                    resizeMode={'cover'}
                    source={require('../../Images/placeholder.jpeg')}
                  />
              <TouchableWithoutFeedback onPress={() => { refRBSheet.current.open() }}>
                <View style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: '#FAFAFA', padding: 5, borderRadius: 50, borderWidth: 1, borderColor: '#EB5C5C' }}>
                  <FontAwesome name="camera" color="#EB5C5C" style={{ fontSize: 20 }} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </Row>
          <View>
          <Input value={name} required={1} label="Full name" placeholder="Full name" onChangeText={(value)=>{setName(value)}}/>
          <Input required={1} value={email} label="Email" placeholder="Email" onChangeText={(value)=>{setEmail(value)}}/>
          <View style={{marginVertical:10}}>
                                   <Para>Select Branch <Asterik/></Para>
                                    <Menu 
                                   ref={_branchMenu}
                                   style={{width:'90%',marginTop:42}}
                                   anchor={<TouchableWithoutFeedback 
                                    onPress={()=>{setShowbranch(!showBranch);_branchMenu.current.show()}}>
                                    <View style={{borderBottomWidth:1,borderBottomColor:'#959595',display:'flex',flexDirection:'row',justifyContent:'space-between',paddingVertical:10}}>
                                    <Paragraph style={{color:branch?"#292F3B":showBranch?"#0C5C8F":'#959595'}}>{branch||'Select branch '}</Paragraph>
                                    <Icon name="caretdown" size={12} color="#959595"/>
                                    </View>
                                    </TouchableWithoutFeedback>}
                                   >
                                       <ScrollView style={ {maxHeight:250}}showsVerticalScrollIndicator={false}>

                                     <MenuItem onPress={()=>{setBranch('CSE');setShowbranch(!showBranch);_branchMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >CSE</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setBranch('ECE');setShowbranch(!showBranch);_branchMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >ECE</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setBranch('CE');setShowbranch(!showBranch);_branchMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >CE</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setBranch('EE');setShowbranch(!showBranch);_branchMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >EE</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setBranch('ME');setShowbranch(!showBranch);_branchMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >ME</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setBranch('BT');setShowbranch(!showBranch);_branchMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >BT</Paragraph></MenuItem>
                                        </ScrollView>

                                   </Menu>
            </View>
          {user==1&& <View style={{marginVertical:10}}>
                                   <Para>Select Year <Asterik/></Para>
                                    <Menu 
                                   ref={_yearMenu}
                                   style={{width:'90%',marginTop:42}}
                                   anchor={<TouchableWithoutFeedback 
                                    onPress={()=>{setShowYear(!showYear);_yearMenu.current.show()}}>
                                    <View style={{borderBottomWidth:1,borderBottomColor:'#959595',display:'flex',flexDirection:'row',justifyContent:'space-between',paddingVertical:10}}>
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
            </View>}
            {user==1&&<View style={{marginVertical:10}}>
                                   <Para>Select Semester <Asterik/></Para>
                                    <Menu 
                                   ref={_semesterMenu}
                                   style={{width:'90%',marginTop:42}}
                                   anchor={<TouchableWithoutFeedback 
                                    onPress={()=>{setShowSemester(!showSemester);_semesterMenu.current.show()}}>
                                    <View style={{borderBottomWidth:1,borderBottomColor:'#959595',display:'flex',flexDirection:'row',justifyContent:'space-between',paddingVertical:10}}>
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
            </View>}
            {user==2&&<View style={{marginVertical:10}}>
                                   <Para>Select Role <Asterik/></Para>
                                    <Menu 
                                   ref={_roleMenu}
                                   style={{width:'90%',marginTop:42}}
                                   anchor={<TouchableWithoutFeedback 
                                    onPress={()=>{setShowRole(!showRole);_roleMenu.current.show()}}>
                                    <View style={{borderBottomWidth:1,borderBottomColor:'#959595',display:'flex',flexDirection:'row',justifyContent:'space-between',paddingVertical:10}}>
                                    <Paragraph style={{color:role?"#292F3B":showRole?"#0C5C8F":'#959595'}}>{role||'Select Role '}</Paragraph>
                                    <Icon name="caretdown" size={12} color="#959595"/>
                                    </View>
                                    </TouchableWithoutFeedback>}
                                   >
                                       <ScrollView style={ {maxHeight:250}}showsVerticalScrollIndicator={false}>
                                     <MenuItem onPress={()=>{setRole('Assistant Professor');setShowRole(!showRole);_roleMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >Assistant Professor</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setRole('Associate Professor');setShowRole(!showRole);_roleMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >Associate Professor</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setRole('Professor');setShowRole(!showRole);_roleMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >Professor</Paragraph></MenuItem>

                                     </ScrollView>
                                   </Menu>
            </View>}
        
            {user==1&&<Input required={1} label="College ID" placeholder="College ID" value={userId}  onChangeText={(value)=>{setUserId(value)}}/>}
          {user==2&&<Input required={1} label="Teacher ID" placeholder="Teacher ID" value={userId}  onChangeText={(value)=>{setUserId(value)}}/>}
          {user==3&&<Input required={1} label="HOD ID" placeholder="HOD ID" value={userId}   onChangeText={(value)=>{setUserId(value)}}/>}

          <Input required={1} label="Phone number" placeholder="Phone number" value={phone}  onChangeText={(value)=>{setPhone(value)}}/>
          <Input required={1} label="Password" placeholder="Password" secureTextEntry={true} value={password}  onChangeText={(value)=>{setPassword(value)}}/>
          <Input required={1} label="Confirm Password" placeholder="Confirm Password" value={confirmPassword}  onChangeText={(value)=>{setConfirmPassword(value)}}/>
          <Buttons title="REGISTER" onPress={()=>RegisterHandler()} style={{marginVertical:50}} />

          </View>
               </ScrollView>
        
        </View>
    )
}

export default Registration