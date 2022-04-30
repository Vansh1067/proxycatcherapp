import React, { useState,useEffect } from 'react'
import {View,BackHandler,TextInput, AsyncStorage,ToastAndroid} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Container, Paragraph ,Header, Row, Buttons,Title} from '../../shared'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import styles from './styles'


const Query=(props)=>{
    const [text,setText]=useState('')
    const [user,setUser]=useState(false)

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
    const sendQuery=()=>{
        if(!text.length){
            ToastAndroid.showWithGravity(
                'Please enter your query',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
              );
            return 

        }
       
    }

    return <View style={{flex:1}}>
         <Header heading="Query Or Suggestion" icon="arrowleft" onPress={()=>handleBackPress()}/>
        <Container>  
        <ScrollView  showsVerticalScrollIndicator={false}>
         <View style={{marginTop:30,flex:1}}>
            <Paragraph>Do you have any query or suggestion ?</Paragraph>
            <View style={{marginVertical:30,flex:1}}>
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
            <View style={{marginVertical:10,width:'100%'}}>
                                <Title style={{marginLeft:10}}>To whom you want send queries?</Title>
                                
                                    <RadioGroup
                                    onSelect={(index,value)=>{setUser(index)}} 
                                    color="#0C5C8F"
                                    style={{display:'flex',flexDirection:'row',alignItems:'center',marginTop:5}}
                                    selectedIndex={user}>
                                        
                                        <RadioButton value={true} style={{display:'flex',flexDirection:'row',width:150}} left={1} >
                                            <Paragraph>Student</Paragraph>
                                        </RadioButton>
                                        <RadioButton value={false} style={{display:'flex',flexDirection:'row',flex:150}} left={1} >
                                            <Paragraph>Teacher</Paragraph>
                                        </RadioButton>
                                    </RadioGroup>
                                  
                                    
                            </View>
                            <View style={{width:'100%',marginTop:120}}>
                                <Buttons title="SEND MESSAGE" onPress={sendQuery}></Buttons>
                            </View>
                </View>
        </ScrollView>
        
    </Container>
    </View>
}

export default Query