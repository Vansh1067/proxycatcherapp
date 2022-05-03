import React,{useEffect,useState} from 'react'
import {View,RefreshControl,Image, AsyncStorage,BackHandler,ToastAndroid} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Container, VideoThumbnail,Header,Title ,Para, Spinner,Paragraph} from '../../shared'
import styles from './styles'
import Graph from '../../Component/LabelGraph'
import { pollDetails } from '../../Store/Poll/action'

const NoticeDetails=(props)=>{
 
  const [date,setDate]=useState(new Date())
  const mlist = [ "Jan", "Febr", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ];
  const [refreshing,setRefreshing]=useState(false)
    const [refresh,setRefresh]=useState(false)
    const [loading,setLoading]=useState(false)
    const [pollsDetails,setPollsDetails]=useState({})
    const [graphData,setGraphData]=useState([])

    const onRefresh=()=>{
        setRefreshing(true);
        setRefresh(!refresh);

    }
    useEffect(()=>{
      setLoading(true)
        pollDetails(props.route.params.pollId).then(res=>{
          if(res.data.error){
            ToastAndroid.showWithGravity(
              res.data.error,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM
            );
          }else{
            const DATA=res.data.data
            setPollsDetails(DATA)
            setDate(new Date(DATA.createdAt))
            const bars=DATA.options.map((op)=>{
              const per=(DATA.responser?.length/DATA.sender?.length)*100
              const color =per <= 25 ? '#FFCDD2' : per >= 26 && per <= 50 ? '#FFE0B2' : '#C5E1A5'
            console.log(color,per)

              const opt={total:DATA.sender?.length,complete:DATA.responser?.length,height:per,color:color,label:op.title,value:[]}
            return opt
            })
            console.log(bars)
            setGraphData(bars)
            setLoading(false)
            setRefreshing(false)
          }

          console.log(props.route.params.pollId,res.data)
        })
    },[refresh])
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
              
      const data=[{total:'150',complete:'100',height:50,color:'#FFE0B2',label:'Yes',value:[]},{value:[],total:'150',complete:'20',height:20,color:'#C5E1A5',label:'No'}]
    
     /*  */
    return <View style={{flex:1}}>
          <Header heading={'New Title'} icon="arrowleft" onPress={()=>handleBackPress()}/>

       {!loading? <Container>
          
          <View style={{marginVertical:20}}>
              <ScrollView  showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }> 
        
            
             <Title style={{marginVertical:5}}>{pollsDetails.description}</Title>
             <Para>{date.getDate()} {mlist[date.getMonth()]} {date.getFullYear()}</Para>
             <View style={{marginVertical:30}}>
             <Graph 
             
              xLabel="Answers"
              yLabel="Response"
              pointLabel={[]}
              pointLabelColors={[]}
              data={graphData}
              /> 
              </View>
             <View style={{flexDirection:'row',flex:1,justifyContent:'space-between',alignItems:'center',marginVertical:10}}>
                <Paragraph>Responser</Paragraph>
                <Title style={{color:'#43A047'}}>{(pollsDetails.responser?.length/pollsDetails.sender?.length)*100}%</Title>
            </View>
             <View  style={{...styles.list,justifyContent:"flex-start",marginTop:0}} >
              {
                pollsDetails.responser?.map((res,i)=>{
                  console.log(res)
                  return   <VideoThumbnail views={`MCA DEPT`} title={'Ashish Negi (Ass. Prof)'} onClick={()=>props.navigation.navigate('Profile',{approve:true})}/>
      
                })
              }
         
        
      
        
        </View>
             </ScrollView>
          </View>
    </Container>:<Spinner/>}
    </View>
}

export default NoticeDetails