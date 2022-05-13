
import axios from  '../../instances'


export const CreateClasses=(data)=>{
    console.log(data,'action')
    return axios.post('/classes',data)
}

export const getAllClasses=(userId)=>{
        return axios.get('/classes/'+userId)
}
export const addStudentToClass=(data)=>{
    return axios.put('/classes/addStudent',data)
}

export const removeStudentToClass=(data)=>{
    return axios.put('/classes/removeStudent',data)
}

export const pollDetails=(pollId)=>{
    return axios.get('/polls/pollDetails/'+pollId)
}