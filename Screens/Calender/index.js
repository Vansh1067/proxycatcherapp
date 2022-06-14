import React, { useState,useEffect,useContext } from 'react'
import {Text,View,ScrollView,BackHandler,Alert, RefreshControl,Image,ToastAndroid,AsyncStorage} from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialIcons'
import Icons  from 'react-native-vector-icons/AntDesign'
import DateTimePicker from '@react-native-community/datetimepicker';
import { RNCamera } from 'react-native-camera';
import {Asterik,Row,Title,Paragraph,Header,Para,Container, Spinner,Popup,Buttons} from '../../shared'
import styles from './styles'
import ClassCard from '../../Component/ClassCard';
import { getTimeTableClass, startClasses } from '../../Store/TimeTable/action';
import { AppStateContext } from '../../context';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const Calender=(props)=>{
    const [showSearch,setShowSearch]=useState(false)

    const [loading,setLoading]=useState(false)
    const [upload,setUploads]=useState(false)

    const [refreshing,setRefreshing]=useState(false)
    const [refresh,setRefresh]=useState(false)
    const {user}=useContext(AppStateContext)
    const [popup,setPopup]=useState(false)
    const [filter,setFilter]=useState({index:null,value:''})
    const [date,setDate]=useState(new Date())
    const [classes,setClasses]=useState([])
    const [reschedule,setRescedule]=useState(false)
    const [isDisplayCalender,setIsDisplayCalender]=useState(false)
    const [isDisplayTime,setIsDisplayTime]=useState(false)
    const [rescheduleTime,setResceduleTime]=useState(new Date())
    const daysname=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const months=["January","February","March","April","May","June","July","August","September","October","November","December"];

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
    const frontoptions = {
        quality: 1.0,
        maxWidth: 400,
        maxHeight: 400,
        cameraType:'front',
        mediaType: 'photo',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        }
    };
    const backoptions = {
        quality: 1.0,
        maxWidth: 400,
        maxHeight: 400,
        cameraType:'back',
        mediaType: 'photo',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        }
    };
    const joinClass=()=>{
        launchCamera(backoptions, (response) => {
            console.log(response, 'res')
            
           
    
          })
    }
    const startClass=(id)=>{
        launchCamera(frontoptions, (response) => {
            console.log(id,response, 'res')
            const body=new FormData()
            setUploads(true)
        /*     body.append('teacherImage', { uri: response.uri, name: response.fileName, filename: response.fileName, type: response.type });
            
            startClasses(id,body).then(res=>{
                console.warn(res)
            }).catch(err=>console.log(err))
             */
    
          })
    }
    useEffect(()=>{
        setLoading(true)
        AsyncStorage.getItem("userId",(err,userId)=>{
            const day=date.getDay()
            console.warn(day)
            getTimeTableClass(userId,daysname[day-1],user).then(res=>{
            
                if(res.data.error){
                    ToastAndroid.showWithGravity(
                      res.data.error,
                      ToastAndroid.LONG,
                      ToastAndroid.BOTTOM
                    );
                  }else{
                    console.log(res.data,'fetch classes')
                    setClasses(res.data.data)
                    setLoading(false)
                    setRefreshing(false)
                  } 
              
            })

        })
    },[refresh,date])
    const onRefresh=()=>{
        setRefreshing(true);
        setRefresh(!refresh);

    }
    const changeSelectedDate=(event, selectedDate)=>{
        const currentDate = selectedDate || toDate;
        console.log(currentDate)
        setDate(currentDate);
        setIsDisplayCalender(false)
     }
     const changeSelectedTime=(event, selectedDate)=>{
        const currentDate = selectedDate || toDate;
        console.log(currentDate)
        
        setIsDisplayTime(false)
     }
     takePicture = async () => {
        if (this.camera) {
          const options = { quality: 0.5, base64: true };
          const data = await this.camera.takePictureAsync(options);
          console.log(data.uri);
        }
      };
    return (<View style={{flex:1}}>
         <Header heading={'Calender'}  showSearch={showSearch} >
        <Icon name="search" size={22} color="#292F3B"style={{alignSelf:'flex-end'}} onPress={()=>{setShowSearch(!showSearch)}}/> 
          </Header>
          {loading?<Spinner/>:<Container style={{paddingBottom:60}}>
         
          <Popup visible={reschedule}>
                           
                           <Title style={{textAlign:'center'}}>Confirmation !</Title>
                           <Para style={{marginVertical:25,fontSize:14,textAlign:'center'}}>Are you sure to reschedule ?</Para>
                           <View style={{flexDirection:'row',justifyContent:"space-between",alignItems:'center'}}>
                               <Buttons title="CANCEL" style={{width:110,backgroundColor:'#FFFFFF',borderColor:"#EB5C5C",borderWidth:1}} color='#EB5C5C' onPress={()=>setRescedule(false)}/>
                               <Buttons title="YES" style={{width:110}}  onPress={()=>{setIsDisplayTime(true);setRescedule(false)}}/>
                           </View>
                         
           </Popup>
           <Popup visible={upload}>
                           
                           <Title style={{textAlign:'center'}}>Message</Title>
                           <Para style={{marginVertical:25,fontSize:14,textAlign:'center'}}>Your image is upload successfully, Class is start Now</Para>
                           <View style={{flexDirection:'row',justifyContent:"center",alignItems:'center'}}>
                             
                               <Buttons title="OKAY" style={{width:110}}  onPress={()=>{setUploads(false)}}/>
                           </View>
                         
           </Popup>
          {isDisplayCalender && (
                                        <DateTimePicker
                                           value={date||new Date()}
                                           mode={'date'}
                                           is24Hour={false}
                                           display="default"
                                           onChange={changeSelectedDate}
                                        />
                                    )}
         {isDisplayTime && (
                                        <DateTimePicker
                                           value={new Date(rescheduleTime)}
                                           mode={'time'}

                                           is24Hour={false}
                                           display="default"
                                           onChange={changeSelectedTime}
                                        />
                                    )}
        <View  style={{...styles.list,justifyContent:"flex-start",marginTop:0}} >
        <Row style={{marginVertical:15}}>
                        <Title>{daysname[date.getDay()-1]} <Paragraph>({date.getDate()}th {months[date.getMonth()]}, {date.getFullYear()})</Paragraph></Title>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                   
                        <Icons name="calendar" size={22} color="#0C5C8F" onPress={()=>setIsDisplayCalender(!isDisplayCalender)}/>
                        </View>
        </Row>
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
           
          }>
              {
                  classes.length>0?
                      classes.map((cls,i)=>{
                          console.log(cls)
                          const nowDate=formatAMPM(new Date())
                          const classEnddate=formatAMPM(new Date(cls.timeTo))
                          //console.warn(nowDate,classEnddate)
                          const endClass=nowDate>classEnddate 
                          const prevDate=new Date()>date
                          const nextDate=new Date()<date


                          console.warn(prevDate)//endClass||prevDate||nextDate
                          return <ClassCard title={`${cls.classesId.name} - ${cls.classesId.code}`} year= {cls.classesId.year} sem={cls.classesId.semester} time={formatAMPM(new Date(cls.timeFrom))} leftTitle={user==1?cls.teacherId.name:"Reschedule"} RightTitle={user==1?"Join Class":"Start Class"} LeftButton={()=>{setRescedule(true);setResceduleTime(cls.timeFrom)}} RightButton={()=>user==1?joinClass():startClass(cls.classesId._id)} leftDis={prevDate} rightDis={false}/>
                      })
                  :<View style={{flex:1,alignItems:"center",marginVertical:100}}><Paragraph style={{color:"#00000050"}}>No Classes Today, Enjoy your holiday</Paragraph></View>
              }
        
  
          
        </ScrollView>
        
        </View>
</Container>}
        </View>)
}
export default Calender