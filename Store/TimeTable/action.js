import axios from  '../../instances'


export const CreateTimeTable=(data)=>{
    console.log(data,'action')
    return axios.post('/timetable',data)
}

export const getAllTimeTable=(userId)=>{
    return axios.get('/timetable/'+userId)
}