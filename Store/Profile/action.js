import axios from  '../../instances'



export const getProfileDetails=(userId)=>{
        console.warn(userId,'action')
        return axios.get('/profile/'+userId)
}