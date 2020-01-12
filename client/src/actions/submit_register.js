const submit=(data)=>{
    return{
        type:'submit',
        email:data.email,
        username:data.username,
        passwords:data.passwords
    }
}

export default submit;