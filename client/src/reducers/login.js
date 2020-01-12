const data={
    username:""
}

const loginReducer=(state=data,action)=>{
    switch(action.type){
        case "login":
            return{
                ...state,
                username:action.username
            }
        default:
            return state
    }
}

export default loginReducer;