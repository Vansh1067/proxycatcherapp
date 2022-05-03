import axios from  '../../instances'


export const createNotice=(data)=>{
    console.log(data,'action')
    return axios.post('/notice',data)
}

export const getAllNotice=(userId)=>{
        return axios.get('/notice/'+userId)
}

export const noticeDetails=(noticeId)=>{
    return axios.get('/notice/noticeDetails/'+noticeId)
}