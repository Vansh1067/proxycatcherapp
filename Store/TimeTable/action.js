import axios from  '../../instances'


export const CreateTimeTable=(data)=>{
    console.log(data,'action')
    return axios.post('/timetable',data)
}

export const getAllTimeTable=(userId)=>{
    return axios.get('/timetable/'+userId)
}
export const getTimeTableClass=(userId,day,user)=>{
    console.warn(userId,day)
    if(user==1){
        return axios.get('/timetable/timetableclassesforStudents/'+userId+"/"+day)

    }else{
        return axios.get('/timetable/timetableclasses/'+userId+"/"+day)

    }
}
export const startClasses=(classesId,data)=>{
    console.log(classesId,data)
    return axios.post('/attendance/'+classesId,data,{
        headers:{ "Content-Type": "multipart/form-data"}
    })
}