const data={
    email:'',
    username:'',
    passwords:''
}
const register=(state=data,action)=>{
    switch(action.type){
        case "submit":
            return {
                ...state,
                email:action.email,
                username:action.username,
                passwords:action.passwords
            }
        default:
            return state 
    }
}

export default register;