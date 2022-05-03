
import axios from  '../../instances'


export const CreateClasses=(data)=>{
    console.log(data,'action')
    return axios.post('/classes',data)
}

export const getAllClasses=(userId)=>{
        return axios.get('/classes/'+userId)
}

export const pollDetails=(pollId)=>{
    return axios.get('/polls/pollDetails/'+pollId)
}