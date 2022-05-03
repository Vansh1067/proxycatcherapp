import axios from  '../../instances'


export const CreatePoll=(data)=>{
    console.log(data,'action')
    return axios.post('/polls',data)
}

export const getAllPolls=(userId)=>{
        return axios.get('/polls/'+userId)
}

export const pollDetails=(pollId)=>{
    return axios.get('/polls/pollDetails/'+pollId)
}