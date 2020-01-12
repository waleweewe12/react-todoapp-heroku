const login=(data)=>{
    return{
        type:'login',
        username:data.username
    }
}

export default login;