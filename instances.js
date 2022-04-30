import axios from 'axios'
import { AsyncStorage ,ToastAndroid} from 'react-native'
import {CommonActions} from '@react-navigation/native'
export const BASE_URL='http://192.168.43.129:3000/'
import {navigationRef} from './App'
const Instances=axios.create({
    baseURL:BASE_URL

})
const resetAction = CommonActions.reset({
    index: 0,
    routes: [
      { name: 'Welcome' }
     
    ],
  })
 Instances.interceptors.request.use(async (config)=>{
 /*  await  AsyncStorage.getItem('accessToken',(err,result)=>{
        console.log(result,'accessToken')
    config.params = {...config.params, access_token: result}
    
   }) */
   console.log(config.url,'url',config.params)

   return config
})  

Instances.interceptors.response.use(res=>{
    console.log(res.status,'response')
   
    return res
},error=>{
    if (error.response) {
        // Request made and server responded
            console.log(error)
        
        if(error.response.status==401){
            navigationRef.current.dispatch(resetAction)
         // props.navigation.dispatch(resetAction)
          ToastAndroid.showWithGravity(
            'Your session expired',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
          console.log('logon')
        
        AsyncStorage.clear()
  
        }
      } 
})

export default Instances