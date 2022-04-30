import styles from '../shared/style'
import React, { useState,useEffect } from 'react';
import {View,Text,TouchableOpacity,ToastAndroid,TextInput,Image,Share, Modal,TouchableNativeFeedback,TouchableWithoutFeedback,ActivityIndicator, TouchableWithoutFeedbackComponent, AsyncStorage,Alert, BackHandler} from 'react-native'
import CheckBox from 'react-native-check-box'
/* import DateTimePicker from '@react-native-community/datetimepicker' */


import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import { CommonActions } from '@react-navigation/native';

import Icon  from 'react-native-vector-icons/AntDesign'
import FontAwesome  from 'react-native-vector-icons/FontAwesome'
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons'
/* import {BASE_URL} from '../instances' */
import Iconicons  from 'react-native-vector-icons/Ionicons'
/* import { decode } from 'html-entities'; */
import NetInfo from "@react-native-community/netinfo";
import BackgroundTimer from 'react-native-background-timer'
const RNFS=require('react-native-fs')
const BASE_URL='/'
export const Buttons=({title,children,onPress,deactivate,style,color,disabled})=>{
    const deactivateStyle={
      backgroundColor:deactivate?"#C4C4C4":"#EB5C5C",

    }
    return <View style={styles.buttonView}>
    <TouchableOpacity onPress={disabled?null:onPress} style={{...styles.button,...deactivateStyle,...style}}>
    <Text style={{...styles.buttonText,color:color||'#FFFFFF'}}>{title}</Text>
      {children}
    </TouchableOpacity>
  </View>
}

 export const Header=({onPress,heading,icon,children,style,headingColor,showSearch,filter,setSearch,type,title})=>{
    return <View style={{...styles.headingView,...style}}>
      {heading?<View style={{flexDirection:'row',alignItems:'center',flex:11}}>
    {icon?<Icon name={icon} size={22} color="#292F3B" style={{marginRight:10}} onPress={onPress}/>:null}
    {!showSearch?<Paragraph style={{color:headingColor||'#292F3B'}}>{heading}</Paragraph>:
    type==1?<TextInput autoFocus={true} style={{borderBottomColor:'#292F3B',borderBottomWidth:1,height:23,padding:0,margin:0,fontSize:14,flex:12}} placeholder="Search" onBlur={()=>filter()} onChangeText={(text)=>setSearch(text)} onEndEditing={()=>filter()}/>:
    <TextInput autoFocus={true} style={{borderBottomColor:'#292F3B',borderBottomWidth:1,height:23,padding:0,margin:0,fontSize:14,flex:12}} placeholder="Search"  onChangeText={(text)=>filter(text)} /> }
    </View>:null}
    <View  >
          {children?children:null}
    </View>
 
    </View>
   
} 

export const Asterik=()=>{
  return <Text style={{color:'#EB5C5C'}}>*</Text>
}

export const Input=(props)=>{
  return <View style={{width:'100%',marginVertical:10}}>
    <Text>{props.label}&nbsp;{props.required? <Asterik/>:null}</Text>
    <TextInput {...props}style={{...styles.textInput,...props.style}} placeholder={props.placeholder} ></TextInput>
    </View>
}

export const Title=({children,style})=>{
  return <Text style={{...styles.text,...style}}>{children}</Text>
}
export const Paragraph=({children,style})=>{
  return <Text style={{...styles.paragraph,...style}}>{children}</Text>
}
export const Para=({children,style})=>{
  return <Text style={{...styles.para,...style}}>{children}</Text>
}
export const Container=({children,style})=>{
  return <View style={{...styles.container,...style}}>{children}</View>
}

export const Popup=({visible,children,style})=>{
  return <Modal visible={visible} animationType="fade" transparent={true}>
    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:"rgba(0,0,0,0.3)"}}>
    <View style={{...styles.modal,...style}}>
    {children}

    </View>

    </View>
  </Modal>
}
export const TextCard=({text1,text2,color,onPress})=>{
  return <TouchableNativeFeedback onPress={onPress}>
    <View style={styles.textCard}>
      <Title style={{color:color,fontSize:22}}>{text1}</Title>
      <Paragraph style={{color:"#515762",marginLeft:20}}>{text2}</Paragraph>
  </View>
  </TouchableNativeFeedback>
}

export const PickerModal=({heading,children})=>{
  const [show,setShow]=useState(false)
  return <View style={{marginVertical:10}}>
  <TouchableWithoutFeedback 
      onPress={()=>setShow(!show)}>
      <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:10}}>
          <Paragraph  style={{color:"#292F3B"}}>{heading}</Paragraph>
          <FontAwesome name={show?'angle-up':"angle-down"} size={20} color="#515762"/>
      </View> 
  </TouchableWithoutFeedback>
  {
      show&&<View>
          {children}
      </View>
  }
                      
                      
   </View>
}

export const CheckBoxed=({isChecked,onClick,text})=>{
  return <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:"center",marginLeft:20,marginVertical:10}}>
  <Paragraph>{text}</Paragraph>
  <CheckBox
  onClick={onClick}
  isChecked={isChecked}
  checkedCheckBoxColor={'#f44336'}
  uncheckedCheckBoxColor={'#757575'}
  />
</View>
}
/* export const DatePicker=({value,onChange,style})=>{
  
  const [show, setShow] = useState(false);
  const date=new Date(`${value}`)
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const day=date.getDate()
  const month=date.getMonth()
  const year=date.getFullYear()


  return <View>
    <TouchableWithoutFeedback style={{flexDirection:"row",alignItems:"center"}} onPress={()=>setShow(!show)} >
    <View style={{...styles.datepicker,...style}}>
<Paragraph>{day +'-'+months[month]+'-'+year}</Paragraph>
    <Iconicons name="md-calendar" size={22} color="#292F3B"/>
    </View>
    </TouchableWithoutFeedback>
   {show? <DateTimePicker
          testID="dateTimePicker"
          value={value}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={(e,date)=>{onChange(e,date);setShow(!show)}}
        />:null
   }
  </View>
} */
export const Row=({style,children})=>{
  return <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',...style}}>
    {children}
  </View>
}

export const Dot=({style})=>{
  return  <View style={{width:6,height:6,borderRadius:50,backgroundColor:"#515762",marginHorizontal:15,...style}}></View>
}
export const AnalyticsCard=({text1,text2,onPress,heading})=>{
  return <TouchableNativeFeedback onPress={onPress}>
    <View style={{...styles.textCard,justifyContent:'space-between'}}>
      <View>
<Paragraph style={{color:"#424242",marginVertical:3,fontSize:16}}>{heading}</Paragraph>
    {text1||text2?<Row style={{justifyContent:'flex-start'}}>
      <Para style={{fontSize:13}}>{text1}</Para>
      {text2?<><Dot/>
      <Para style={{fontSize:13}}>{text2}</Para>
        </>:null}
      </Row>:null}

      </View>
      <FontAwesome name="angle-right" size={20} color="#424242"/>

  </View>
  </TouchableNativeFeedback>
}

export const VideoThumbnail=({views,onClick,sold,title,image,link})=>{
  console.log(image,'image')
  const shareMessage=()=>{
    Share.share({
        message: `Watch my latest video on ${title}: \n ${link}`,
        url: link,
        title: title
      }, {
        dialogTitle: 'Watch my latest video',
        tintColor: '#F44336'
      });
}
  return <View style={{marginVertical:10,flexDirection:'row'}}  >
           <TouchableWithoutFeedback  >
            {image? <Image
               style={{width: 120, height: 80,borderRadius:5,marginRight:10}}
               resizeMode={'cover'}
               source={{uri:image}}
             />:<Image
             style={{width: 120, height: 80,borderRadius:5,marginRight:10}}
             resizeMode={'cover'}
             source={require('../Images/download.jpeg')}
           />}
             </TouchableWithoutFeedback>
             <View style={{paddingVertical:10,flex:1}}>
               <Paragraph style={{flex:1,flexWrap:'wrap',fontSize:16}}>{title}</Paragraph>
            {/*    {!views?<Row style={{justifyContent:'flex-start'}}>
                <Para style={{fontSize:13}}>{sold} Sold</Para>
                <Dot/>
                <Para style={{fontSize:13}}>{earnings}</Para>

              </Row>: */}
              <Row>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                 
                  <Para style={{marginLeft:10}}>{views}</Para>
                </View>
                <TouchableOpacity onPress={()=>onClick()}><View>
                  <Para style={{color:"#0C5C8F",fontWeight:'600'}} >View Details </Para>
                  </View></TouchableOpacity>
              </Row>
            
             </View>
             
             
         </View>
}

export const TestThumbnail=({text1,text2,heading,title,color,icon,onPress})=>{
  return <TouchableOpacity onPress={onPress}><View style={{flex:1,marginVertical:15}} >
        <Row>
          <Paragraph style={{flex:1,flexWrap:'wrap',fontSize:16,marginBottom:5}}>{heading}</Paragraph>
          {
                            icon ?
                              icon <= 1 ?
                               <MaterialIcons name="thumb-down" size={24} style={{color:'#f44336',paddingLeft:'1%'}}/>
                              :
                              icon > 2  ?
                                <MaterialIcons name="stars" size={24} style={{color:'#4caf50',paddingLeft:'1%'}}/>
                              :
                                <MaterialIcons name="thumb-up" size={24} style={{color:'#ffc107',paddingLeft:'1%'}}/>
                            :
                             null
         }
        </Row>
       {title? <Para style={{marginVertical:5}}>{title}</Para>:null}
        <Row style={{justifyContent:'flex-start'}}>
                <Para style={{color:"#424242"}}>{text1}</Para>
                {text2?<>
                <Dot/>
                <Para style={{color:"#424242"}}>{text2}</Para>
                </>:null}

        </Row>
  </View>
  </TouchableOpacity>
}

export const OptionCard=({onPress,text,children,badge})=>{
  return <TouchableOpacity onPress={()=>onPress()} >
    <Row  style={{marginVertical:15}}>
    <Row>
    {children}
    <Paragraph>{text}</Paragraph>
    {badge?<Para style={{backgroundColor:"#EB5C5C",borderRadius:50,paddingVertical:1.5,paddingHorizontal:5,color:"#FFFFFF",fontSize:10,marginHorizontal:5}}>{badge}</Para>:null}
    </Row>
    <FontAwesome name="angle-right" size={20} color="#424242"/>
  </Row>
    </TouchableOpacity>
    
}

export const WalletInfo=({price,debit,date,desc,currency,exchangeRate})=>{
  return <Row style={{marginVertical:15}}>
      <View>
        <Paragraph style={{marginBottom:7}}>{!debit?'Credits Added':'Payout'}</Paragraph>
        <Para>{desc+' on '+ date}</Para>
      </View>
      <Paragraph style={{color:debit?"#EB5C5C":"#0C5C8F"}}>{debit?'-':'+'} {/* decode(currency) */currency} {+(price*exchangeRate).toFixed(2)}</Paragraph>
  </Row>
}
export const QueryBox=({badge,admin,onPress,msg,date,exist})=>{
  const DATE=new Date(date)
 
  const mlist = [ "Jan", "Febr", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ];
 
  return <View style={{...styles.textCard,padding:10}}>
      <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={onPress}>
          {admin?<Image
               style={{width:45, height:45,borderRadius:50,marginRight:10}}
               resizeMode={'cover'}
               source={require(`../Images/LOGO3.png`)}
             />:exist?<Image
             style={{width:45, height:45,borderRadius:50,marginRight:10}}
             resizeMode={'cover'}
             source={{uri:'file://'+RNFS.DocumentDirectoryPath+'/profile.jpg'}}
           />:<Image
           style={{width:45, height:45,borderRadius:50,marginRight:10}}
           resizeMode={'cover'}
           source={require(`../Images/user.png`)}
         />}
             <View style={{flex:1}}>

               <Paragraph style={{fontSize:14}} >{msg?.slice(0,100)}...</Paragraph>
               <Para style={{marginTop:5}}>{DATE.getDate()} {mlist[DATE.getMonth()]} {DATE.getUTCFullYear()}</Para>
             </View>
          {badge?<Para style={{alignSelf:'flex-start',backgroundColor:"#EB5C5C",borderRadius:50,paddingVertical:1.5,paddingHorizontal:5,color:"#FFFFFF",fontSize:10}}>{1}</Para>:null}
      </TouchableOpacity>
  </View>
}

export const QueryMSG=({admin,msg,date,exist})=>{
  let pos={}
  const DATE=new Date(date)
 

  const mlist = [ "Jan", "Febr", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ];
 
  if(admin){
    pos.left=-1
    pos.borderLeftWidth=10
    pos.borderLeftColor='#959595'
  }else{
    pos.right=0
    pos.borderRightWidth=10
    pos.borderRightColor= '#ECF3FD'
  }
  return <View style={{flexDirection:'column',alignItems:admin?'flex-start':'flex-end',marginVertical:10}}>
    <View style={{width:'90%',display:'flex'}}>
        <View style={{backgroundColor:admin?"":"#ECF3FD",position:'relative',borderRadius:15,borderWidth:admin?1:0,borderColor:'#959595',marginLeft:admin?25:0,marginRight:admin?0:25,borderBottomLeftRadius:admin?0:10,borderBottomRightRadius:admin?10:0}}>
          <Para style={{fontSize:16,padding:15}}>{msg}</Para>
          <View style={{...styles.triangle,...pos}}></View>
        </View>
        <Para style={{fontSize:12,alignSelf:admin?'flex-end':'flex-start'}}>{DATE.toLocaleTimeString('en-US',{hour: '2-digit', minute: '2-digit', hour12: true})}, {DATE.getDate()} {mlist[DATE.getMonth()]}</Para>
       <View style={{display:'flex',flexDirection:'row',marginTop:5,justifyContent:admin?"flex-start":'flex-end',alignItems:'center'}}>
        {admin?<Image
               style={{width:40, height:40,borderRadius:50,alignSelf:"flex-start"}}
               resizeMode={'cover'}
               source={require(`../Images/admin.png`)}
        />:exist?<Image
        style={{width:40, height:40,borderRadius:50,alignSelf:'flex-end'}}
        resizeMode={'cover'}
        source={{uri:'file://'+RNFS.DocumentDirectoryPath+'/profile.jpg'}}
 />:<Image
 style={{width:40, height:40,borderRadius:50,alignSelf:'flex-end'}}
 resizeMode={'cover'}
 source={require(`../Images/user.png`)}
/>}
        {admin?<Para style={{marginLeft:10}}>{admin}</Para>:null}
        </View>
        </View>
  </View>
}
export const NoticeCard=({read,onPress,title,createdAt,image})=>{
  const d=new Date(createdAt)
  const mlist = [ "Jan", "Febr", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ];
  return <TouchableOpacity style={{...styles.textCard,marginVertical:5,elevation:read?0:5,backgroundColor:read?'#FAFAFA':'#FFFFFF'}} onPress={onPress}>
      <Row style={{flex:1}}>
        <View style={{flex:9}} >
          <Paragraph style={{marginBottom:5}}>{title}</Paragraph>
          <Para> {d.getDate()} {mlist[d.getMonth()]} {d.getFullYear()}</Para>
        </View>
       {image? <Image
               style={{width: 80, height: 40,borderRadius:5,flex:3}}
               resizeMode={'cover'}
               source={{uri:BASE_URL+'/Uploads/notice/download/'+image}}
             />:<Image
             style={{width: 80, height: 40,borderRadius:5,flex:3}}
             resizeMode={'cover'}
             source={require('../Images/Notices.png')}
           />
        }
       
      </Row>
  </TouchableOpacity>
}
export const PollCard=({read,onPress,title,createdAt,percentage})=>{
  const d=new Date(createdAt)
  const mlist = [ "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ];
  return <TouchableOpacity style={{...styles.textCard,marginVertical:5,elevation:read?0:5,backgroundColor:read?'#FAFAFA':'#FFFFFF'}} onPress={onPress}>
      <Row style={{flex:1}}>
        <View style={{flex:9}} >
          <Paragraph style={{marginBottom:5}}>{title}</Paragraph>
          <Para> {d.getDate()} {mlist[d.getMonth()]} {d.getFullYear()}</Para>
        </View>
        <Title style={{color:'#43A047'}}>{percentage}%</Title>
       
      </Row>
  </TouchableOpacity>
}
export const FilterPopup=({popup,filter,setFilter,setPopup})=>{
  return  <Popup visible={popup}>
  <Title style={{textAlign:'center'}}>Filter By Student’s Feedback</Title>
  <View style={{marginVertical:20}}>
  <RadioGroup 
  onSelect={(index,value)=>{setFilter({index,value})}} 
  color="#0C5C8F"
  
  selectedIndex={filter.index}>
                                             
              <RadioButton value="Best Feedback" style={{display:'flex',flexDirection:'row-reverse',justifyContent:'space-between'}} >
                  <View style={{flexDirection:'row'}}>
                  <MaterialIcons name="stars" size={20} color="#43A047" onPress={()=>setPopup(!popup)} style={{marginRight:10}}/>
                  <Paragraph>Best Feedback</Paragraph>
                  </View>
              </RadioButton>
              <RadioButton value="Moderate Feedback" style={{display:'flex',flexDirection:'row-reverse',justifyContent:'space-between'}} >
              <View style={{flexDirection:'row'}}>
                  <Icon name="like1" size={20} color="#FFB300" onPress={()=>setPopup(!popup)} style={{marginRight:10}}/>
                  <Paragraph>Moderate Feedback</Paragraph>
                  </View>
              </RadioButton> 
              <RadioButton value="Bad Feedback" style={{display:'flex',flexDirection:'row-reverse',justifyContent:'space-between'}} >
              <View style={{flexDirection:'row'}}>
                  <Icon name="dislike1" size={20} color="#EB5C5C" onPress={()=>setPopup(!popup)} style={{marginRight:10}}/>
                  <Paragraph>Bad Feedback</Paragraph>
                  </View>
              </RadioButton>
                                             
  </RadioGroup>
  </View>
  <View style={{flexDirection:'row',justifyContent:"space-around",marginHorizontal:0,alignItems:'center'}}>
      <Buttons title="CANCEL" style={{width:100,backgroundColor:'#FFFFFF',borderColor:"#EB5C5C",borderWidth:1}} color='#EB5C5C' onPress={()=>{setPopup(!popup);setFilter({value:'',index:null})}}/>
      <Buttons title="DONE" style={{width:100}}  onPress={()=>{setPopup(!popup)}}/>
  </View>
</Popup> 
}

export const AnswerCheck=({check,onPress,marks,questionNumber,attempt,checkMarks})=>{
  return <Row style={{marginVertical:15}}>
      <Para style={{fontSize:14}}>{questionNumber}.</Para>
      <Para style={{fontSize:14}}>{check?checkMarks+'/':null}{marks} Marks</Para>
      <TouchableWithoutFeedback onPress={attempt?onPress:null}>
        <View>
        <Para style={{fontSize:14,color:check?'#43A047':attempt?'#EB5C5C':"#515762"}}>{check?'ANSWER CHECKED':attempt?"CHECK ANSWER":"NOT ATTEMPTED"}</Para>
        </View>
        </TouchableWithoutFeedback>
  </Row>
}

export const DateTopTab=({heading,onChangeFrom,onChangeTo,subHeading,topic,earnings,fromDate,toDate})=>{
  const [currency,setCurrency]=useState('&#8377')
  const [exchange,setExchangeRate]=useState(1)
  useEffect(()=>{
   
  AsyncStorage.getItem('currency',(error,currency)=>{
      if(currency){
          setCurrency(currency)
      }
  })
  AsyncStorage.getItem('exchangeRate',(error,rate)=>{
      if(rate){
          setExchangeRate(rate)
      }
  })
  },[])
  return <View style={{paddingTop:10,backgroundColor:'#FAFAFA'}}>
  <Title style={{marginVertical:5}}>{heading}</Title>
  <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:10,alignItems:'center'}}>
  <DatePicker value={fromDate} onChange={onChangeFrom} />
  <Title>-</Title>
  <DatePicker value={toDate} onChange={onChangeTo} />
  </View>
  <Row style={{marginBottom:15}}>
      <Row style={{width:150,justifyContent:'flex-start'}}>
       <Title style={{color:"#0C5C8F",fontSize:18}}>{topic}</Title>
       <Title style={{color:"#515762",marginLeft:5,fontSize:18}}>{subHeading}</Title>
       </Row>
       <Row style={{width:150,justifyContent:'flex-start'}}>
       <Title style={{color:"#0E7167",fontSize:18}}>{/* decode(currency) */currency} {+(earnings*exchange).toFixed(2)}</Title>
       <Title style={{color:"#515762",marginLeft:5,fontSize:18}}>Earnings</Title>
       </Row>
  </Row>
 

</View>
}

export const SortByPopup=({index,onClose,setIndex})=>{
  return <View style={styles.sortPopup}>
    <Row >
      <Paragraph>Sort By</Paragraph>
      <Icon name={'close'} size={16} color="#292F3B" style={{fontWeight:'bold'}} onPress={()=>onClose()} />
    </Row>
    <TouchableWithoutFeedback onPress={()=>{setIndex(0);onClose()}}>
      <View>
    <Para style={{fontSize:14,color:`${index==0?'#0C5C8F':'#292F3B'}`,marginVertical:5,marginTop:10}}>New </Para>
    </View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPress={()=>{setIndex(1);onClose()}}>
      <View>
    <Para style={{fontSize:14,color:`${index==1?'#0C5C8F':'#292F3B'}`,marginVertical:5}}>Most Viewed </Para>
    </View>
    </TouchableWithoutFeedback>
  </View>
}

        
export const PickerPopup=({onClick,value})=>{
  
  return <TouchableWithoutFeedback onPress={onClick}><View style={{width:'100%',borderBottomColor:'#959595',borderBottomWidth:1.5,paddingVertical:7.5,paddingHorizontal:2,flexDirection:'row',alignItems:'center',justifyContent:'space-between',color:'#424242',height:35.5}}>
    <Paragraph>+{value}</Paragraph>
    <Icon name="caretdown" size={12} color="#959595" />
  
  </View>
  </TouchableWithoutFeedback>
}
export const PickerItem=({value,children,onClick})=>{
  return <TouchableWithoutFeedback onPress={()=>onClick(value)}>
    <View>
    <Paragraph style={{marginVertical:10}}>+{children}</Paragraph></View></TouchableWithoutFeedback>
}
export const TimerInterval=({time,cb})=>{
  const [timer,setTimer]=useState(time);

  useEffect(()=>{
    const  intervalId=BackgroundTimer.setTimeout(()=>{
     
      if(timer>0){
      
        
        setTimer(timer-1)

      }else{
        clearTimeout(intervalId)
        cb()
      }
      },1000)
  },[timer])
  return  <Paragraph style={{color:"#0C5C8F"}}>00:{timer>9?timer:`0${timer}`}</Paragraph>
}

export const Couter=({interval,hr,mm,ss})=>{
  const [time,setTime]=useState({hour:0,min:0,sec:0})
  
  interval = BackgroundTimer.setInterval(()=>{

    if(hr == 0 && mm == 0 && ss == 0)
    {
      BackgroundTimer.clearInterval(this.interval);
    }
   
    if(ss == 0)
    {
      console.log("inside the ss intiaxew")
        ss = 59;
       
        if(mm == 0)
        {
          console.log("inside the mm zero")
            mm = 59;
            hr--;
        }
        else{
          mm--;
        }
        if(hr.toString().length < 2) hr = "0"+hr;
        if(mm.toString().length < 2) mm = "0"+mm;
        if(ss.toString().length < 2) ss = "0"+ss;
        setTime({hour:hr,min:mm,sec:ss});
        // console.log("hhsssssss",hr,"mm",mm,"sec",ss)
    }
    else{
      ss--;    
      if(hr.toString().length < 2) hr = "0"+hr;
      if(mm.toString().length < 2) mm = "0"+mm;
      if(ss.toString().length < 2) ss = "0"+ss;
      setTime({hour:hr,min:mm,sec:ss});
      // console.log("hh",hr,"mm",mm,"sec",ss)
    }

   
   //return(<Text style={{fontSize:14,color:'#f44336',paddingLeft:15}}>hr+":"+mm+":"+ss</Text>)
   
     
},1000)
}

export const Spinner=()=>{
  return <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:"#FAFAFA"}}><ActivityIndicator size="large" color='#f44336'/></View>
}
const checkinternetconnection=()=>{
  Alert.alert(
   'No Internet Connection',
   'Please check your internet connection',
  [ 
    {text: 'Retry', onPress: () => internetconnection()},
  ],
    { cancelable: false }
  ) 
}
export const internetconnection=(cb)=>{
  console.log('netconnnection');
  NetInfo.fetch().then(state => {
    console.log("Connection type**", state.type);
    console.log("Is connected?", state.isConnected);
    if(!state.isConnected){
      checkinternetconnection();
    }else{
      cb()
    }
  });
}  
const resetAction = CommonActions.reset({
  index: 0,
  routes: [
    { name: 'Login' }
   
  ],
})
export const RedirectFunction=(error,props)=>{
  
    if (error.response) {
      // Request made and server responded
      
      console.log(error.response)
      if(error.response.status==401){
       // props.navigation.dispatch(resetAction)
        ToastAndroid.showWithGravity(
          'Your session expired',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
          //AsyncStorage.clear()

      }
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }

  
}