import axios from  '../../instances'



export const registration=(data)=>{
        console.log(data,'action')
        return axios.post('/auth/registration',data)
}
export const login=(data)=>{
        return axios.post('/auth/login',data)
}