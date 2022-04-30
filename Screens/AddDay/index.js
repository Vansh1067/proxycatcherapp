import React, { useState,useEffect } from 'react'
import {View,BackHandler,TextInput, TouchableWithoutFeedback,ScrollView, TouchableOpacity} from 'react-native'
import styles from './styles'
import Icon  from 'react-native-vector-icons/AntDesign'
import {Asterik,Input,Title,Paragraph,Header,Buttons,Container,Row,Para} from '../../shared'
import  { Menu,MenuItem, MenuDivider } from 'react-native-material-menu';

const AddTimeTable=(props)=>{
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
 
    return(<View style={{flex:1}}>
        <Header heading="Add Time Table" icon="arrowleft" onPress={()=>handleBackPress()}/>
       <Container >  
       <ScrollView style={{flex:1}}showsVerticalScrollIndicator={false}>
       <View style={{marginTop:20}}>
      
          <View style={{marginVertical:10}}>
                                   <Para>Select Day <Asterik/></Para>
                                    <Menu 
                                   ref={_yearMenu}
                                   style={{width:'90%',marginTop:50}}
                                   anchor={<TouchableWithoutFeedback 
                                    onPress={()=>{setShowYear(!showYear);_yearMenu.current.show()}}>
                                    <View style={{borderBottomWidth:1,borderBottomColor:'#959595',display:'flex',flexDirection:'row',justifyContent:'space-between',paddingVertical:10,marginVertical:5}}>
                                    <Paragraph style={{color:year?"#292F3B":showYear?"#0C5C8F":'#959595'}}>{year||'Select Day '}</Paragraph>
                                    <Icon name="caretdown" size={12} color="#959595"/>
                                    </View>
                                    </TouchableWithoutFeedback>}
                                   >
                                     <MenuItem onPress={()=>{setYear('Monday');setShowYear(!showYear);_yearMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >Monday</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setYear('Tuesday');setShowYear(!showYear);_yearMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >Tuesday</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setYear('Wednesday');setShowYear(!showYear);_yearMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >Wednesday</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setYear('Thursday');setShowYear(!showYear);_yearMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >Thursday</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setYear('Friday');setShowYear(!showYear);_yearMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >Friday</Paragraph></MenuItem>
                                     <MenuItem onPress={()=>{setYear('saturday');setShowYear(!showYear);_yearMenu.current.hide()}}><Paragraph style={{marginVertical:10}} >saturday</Paragraph></MenuItem>

                                   </Menu>
            </View>
            <View style={{marginVertical:10}}>
                                   <Para>Time (From) <Asterik/></Para>
                                   <TouchableOpacity onPress={()=>{props.navigation.navigate("Teachers")}}>
                                   <View style={{borderBottomWidth:1,borderBottomColor:'#959595',display:'flex',flexDirection:'row',justifyContent:'space-between',paddingVertical:10,marginVertical:5}}>
                                    <Paragraph style={{color:role?"#292F3B":showRole?"#0C5C8F":'#959595'}}>{role||'Time (From)'}</Paragraph>
                                    <Icon name="caretright" size={12} color="#959595"/>
                                    </View>
                                    </TouchableOpacity>
                                 
            </View>
            <View style={{marginVertical:10}}>
                                   <Para>Time (To)<Asterik/></Para>
                                   <TouchableOpacity onPress={()=>{props.navigation.navigate("Teachers")}}>
                                   <View style={{borderBottomWidth:1,borderBottomColor:'#959595',display:'flex',flexDirection:'row',justifyContent:'space-between',paddingVertical:10,marginVertical:5}}>
                                    <Paragraph style={{color:role?"#292F3B":showRole?"#0C5C8F":'#959595'}}>{role||'Time (To)'}</Paragraph>
                                    <Icon name="caretright" size={12} color="#959595"/>
                                    </View>
                                    </TouchableOpacity>
                                 
            </View>
            <View style={{marginVertical:10}}>
                                   <Para>Class<Asterik/></Para>
                                   <TouchableOpacity onPress={()=>{props.navigation.navigate("Teachers")}}>
                                   <View style={{borderBottomWidth:1,borderBottomColor:'#959595',display:'flex',flexDirection:'row',justifyContent:'space-between',paddingVertical:10,marginVertical:5}}>
                                    <Paragraph style={{color:role?"#292F3B":showRole?"#0C5C8F":'#959595'}}>{role||'Class'}</Paragraph>
                                    <Icon name="caretright" size={12} color="#959595"/>
                                    </View>
                                    </TouchableOpacity>
                                 
            </View>
            <View style={{marginVertical:10}}>
                                   <Para>Teacher<Asterik/></Para>
                                   <TouchableOpacity onPress={()=>{props.navigation.navigate("Teachers")}}>
                                   <View style={{borderBottomWidth:1,borderBottomColor:'#959595',display:'flex',flexDirection:'row',justifyContent:'space-between',paddingVertical:10,marginVertical:5}}>
                                    <Paragraph style={{color:role?"#292F3B":showRole?"#0C5C8F":'#959595'}}>{role||'Teacher'}</Paragraph>
                                    <Icon name="caretright" size={12} color="#959595"/>
                                    </View>
                                    </TouchableOpacity>
                                 
            </View>
       
           
       
           
         </View>
       
       
         <View style={{marginVertical:50}}>
          <Buttons title="Add Day" onPress={()=>RegisterHandler()}  />
          </View>
          </ScrollView>
           </Container>
           </View>)
}

export default AddTimeTable