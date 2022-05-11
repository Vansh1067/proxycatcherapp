import React,{useState,useEffect} from 'react'
import {View,TouchableOpacity,BackHandler,ToastAndroid} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Container ,Header, Para, Paragraph} from '../shared'
import Teachers  from '../Screens/Teachers';
import Students from '../Screens/Students';


const Tab = createMaterialTopTabNavigator();
const SenderTopTab=(props)=>{
   
    const [user,setUser]=useState([])
  
    useEffect(()=>{
        if(props.route.params?.sender.length>0){
            const senderArr=props.route.params.sender
            setUser([...senderArr])
            //console.log(senderArr,props.route.params.sender)

        }
    },[props.route.params.sender])
    
    const  handleBackPress = () => {
      if(props.navigation.isFocused()){
         // props.navigation.goBack()
         ToastAndroid.showWithGravity(
          'To go back click on Done',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
          return true;
          
        
          }else{
            return false
          }
     
    }
    useEffect(()=>{
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);  
      return ()=> BackHandler.removeEventListener('hardwareBackPress',handleBackPress);  
    },[])
    const doneHandler=()=>{
       props.route.params.setSender([...user])
       props.navigation.goBack()

    }
    return <View style={{flex:1}} >
        <Header heading="Select Sender" >  
            <TouchableOpacity onPress={()=>doneHandler()}>
            <Paragraph>Done</Paragraph>
            </TouchableOpacity> 
        </Header>

      <Container style={{paddingBottom:0}} >   
   
    <Tab.Navigator
      initialRouteName="Teacher"
      backBehavior="none"
    
      tabBarOptions={{
        activeTintColor: '#EB5C5C',
        inactiveTintColor:"#292F3B",
        
        indicatorStyle: {   
            backgroundColor: '#EB5C5C',
           
          },
        labelStyle: { fontSize: 14},
        style: { backgroundColor: '#FAFAFA',elevation:0 },
    
      }}
    >
         <Tab.Screen
        name="Teacher"
       
        options={{ tabBarLabel: 'Teacher' }}
        listeners={{
          /* focus:()=>setScreen('Checked') */
        }}
      >
        {
            prop=>(<Teachers teacher={user} setTeachers={setUser} hide={1}  {...props}/>)
        }
        </Tab.Screen>
      <Tab.Screen
        name="Student"
       
        options={{ tabBarLabel: 'Student' }}
        listeners={{
         /*  focus:()=>setScreen('Pending') */
        }}
      >
        {
          prop=>(<Students student={user} setStudents={setUser} hide={1} {...props}/>)
        }
        </Tab.Screen>
       
       
    </Tab.Navigator>
  
    </Container>
    </View>
}

export default SenderTopTab