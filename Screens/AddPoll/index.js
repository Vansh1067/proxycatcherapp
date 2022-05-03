import React, { useState,useEffect } from 'react'
import {View,BackHandler,TextInput, AsyncStorage,ToastAndroid} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Container, Paragraph ,Header, Row, Buttons,Title, Input,Popup, Spinner} from '../../shared'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import styles from './styles'
import Icon  from 'react-native-vector-icons/AntDesign'
import { CreatePoll } from '../../Store/Poll/action'


const AddPoll=(props)=>{
    const [text,setText]=useState('')
    const [loading,setLoading]=useState(false)
    const [optiontext,setOptiontext]=useState('')
    const [addoptionPopup,setAddoptionpopup]=useState(false)
    const [options,setOptions]=useState([])
    const [sender,setSender]=useState([])
    const changeTextHandler=(value)=>{
        if(value.length<1500){
                setText(value)
        }else{
            setText(value.slice(0,1500))
        }
    }
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
      const addOptionHandler=(text)=>{
        const data={title:text,number:options.length+1}
         setOptions([...options,data])
         setOptiontext("")
         setAddoptionpopup(!addoptionPopup)
      }
    const sendQuery=()=>{
        if(!text.trim().length){
            ToastAndroid.showWithGravity(
                'Please enter your Question',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
              );
            return 

        }
        if(options.length<2){
            ToastAndroid.showWithGravity(
                'Please enter minimum 2 options',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
              );
            return 
        }
        if(!sender.length){
            ToastAndroid.showWithGravity(
                'Please select users',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
              );
            return 
        }
    setLoading(true)
        AsyncStorage.getItem('userId',(err,userId)=>{
            const uploadData={
                sender,description:text,options,createdBy:userId
            }
            console.log(uploadData)

          CreatePoll(uploadData).then(res=>{
              console.log(res.data,'aa')
                if(res.data.error){
                    ToastAndroid.showWithGravity(
                        "Try Again",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM
                      );
                }else{
                    console.log(res,'piols');
                    props.route.params.setRefresh(!props.route.params.refresh)

                    props.navigation.goBack()
                    ToastAndroid.showWithGravity(
                        "Polls Create Succesfully",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM
                      );
                    setLoading(false)
                } 
            }) 
        })
      
    }
    const delteoptionHandler=(index)=>{
        let optArray=[...options];
        optArray = optArray.filter((item,i) => i !== index)
        setOptions([...optArray])
    }

    return <View style={{flex:1}}>
         <Header heading="Add Poll" icon="arrowleft" onPress={()=>handleBackPress()}/>
       {loading?<Spinner/>:<Container>  
        <Popup visible={addoptionPopup}>
            <Title style={{textAlign:'center'}}>Add Options To Your Poll</Title>
            <Input placeholder="Enter Option" value={optiontext} onChangeText={(value)=>{setOptiontext(value)}}></Input>
            <View style={{flexDirection:'row',justifyContent:"center",marginTop:10}}>
                <Buttons title="Add" style={{width:140}}  onPress={()=>{{addOptionHandler(optiontext)}}}/>
            </View>
        </Popup>
        <ScrollView  showsVerticalScrollIndicator={false}>

         <View style={{marginTop:30,flex:1}}>
            <Paragraph>Write your question here?</Paragraph>
            <View style={{marginTop:30,flex:1}}>
                    <Row>
                        <Paragraph>Tell us here</Paragraph>
                        <Paragraph style={{color:"#959595"}}>{text.length||0}/1500</Paragraph>
                    </Row>
                    <View style={{marginVertical:10}}>
                    <TextInput
                        style={styles.TextInputStyleClass}
                        placeholder={"Write message"}
                        placeholderTextColor={"#9E9E9E"}
                        numberOfLines={10}
                        multiline={true}
                        autoCorrect={false}
                        textAlignVertical = "top"
                        value={text}
                        onChangeText={(value)=>changeTextHandler(value)}
                    />
                    </View>
            </View>
            <View style={{flexDirection:'row',flex:1,justifyContent:'space-between',alignItems:'center',marginVertical:10}}>
                <Paragraph>Add Options</Paragraph>
                <Icon name="pluscircle" color="#EB5C5C" size={30} onPress={()=>{setAddoptionpopup(!addoptionPopup)}} />
        </View>
        <View style={{marginBottom:20,minHeight:50}}>
     
                                       {
                                           options.map((op,i)=>{
                                            return <View key={i} style={{marginVertical:6,flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
                                            <Paragraph style={{fontSize:16}}>{op.number}. &nbsp; {op.title}</Paragraph>
                                            <Icon name="delete" color="#000000" size={20} onPress={()=>delteoptionHandler(i)} />
                                            </View>
                                         
                                           })
                                       }

        </View>
            <View style={{marginVertical:10,width:'100%'}}>
                                <Title style={{marginLeft:10}}>To whom you want to send poll ?</Title>
                                
                                <View style={{width:'100%',marginTop:20}}>
                                <Buttons style={{backgroundColor:'#FFFFFF',borderColor:"#292F3B",borderWidth:1}}  color="#292F3B" title={sender.length>0?sender.length+" user selected":"SELECT USER"} onPress={()=>props.navigation.navigate('Sender',{setSender:setSender,sender:sender})}></Buttons>
                                </View>
                                   
                                  
                                    
            </View>
                            <View style={{width:'100%',marginTop:20}}>
                                <Buttons title="SEND POLL" onPress={sendQuery}></Buttons>
                            </View>
            </View>
        </ScrollView>
    
    </Container>}
    </View>
}

export default AddPoll