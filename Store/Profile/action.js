import axios from  '../../instances'



export const getProfileDetails=(userId)=>{
        console.warn(userId,'action')
        return axios.get('/profile/'+userId)
}

export const getApprovalrequest=(userType,userId)=>{
        return axios.get('/profile/approvalRequest/'+userType+"/"+userId)
}

export const getApprovalUser=(userType,branch)=>{
        return axios.get('/profile/users/'+userType+"/"+branch)
}


export const approvedUser=(userId,data)=>{
        return axios.post('/profile/approvedUser/'+userId,data)
}

export const getHods=()=>{
        return axios.get("/profile/getHods")
}

export const getDashboards=(userType,userId)=>{
        return axios.get("/dashboard/"+userType+"/"+userId)
}