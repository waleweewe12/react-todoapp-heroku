import registerReducer from './register'
import loginReducer from './login'
import {combineReducers} from 'redux'

const AllReducers=combineReducers({
    register:registerReducer,
    login:loginReducer
})

export default AllReducers;