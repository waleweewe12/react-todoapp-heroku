import React,{useEffect, useState} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import submit from './actions/submit_login'
import AppNav from './components/Nav'
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Todo from './components/Todo'
import './App.css'

function App() {

  const showstate=useSelector(state=>state.login)
  const dispatch=useDispatch()

  useEffect(()=>{
    getusername();
    gettestuser()
  })

  const getusername=()=>{
    
    if(localStorage.getItem('token'))
    {
      let Bearer_token='Bearer '+localStorage.getItem('token')
      axios.post('http://localhost:5000/user/getuser',{Bearer_token})
      .then(res=>{
        if(localStorage.getItem('token'))
          dispatch(submit({username:res.data.authData.username}))
      })
      .catch(err=>{
        dispatch(submit({username:''}))
        localStorage.removeItem('token')
      })
    }
  }

  const [testuser,setTestuser]=useState('')
  const gettestuser=()=>{
    axios.get('/getuser')
    .then((res)=>{
      setTestuser(res.data.username)
    })
    .catch(err=>console.log(err))
  }

  return (
    <Router>
      <div className="App">
        <AppNav/>
        <img className='App-logo' src="kirisu-sensei.jpg" alt='อาจารย์คิริสึ มาฟุยุ น่ารักที่สุดในโลก'/>
        <Switch>
        
          {/*login*/}
          {
            showstate.username!=='' && <Redirect from='/login' to='/' />
          }
          {
            showstate.username==='' && <Route path='/login' exact component={Login}/>
          }

          {/*register*/}
          {
            showstate.username!=='' && <Redirect from='/register' to='/' />
          }
          {
            showstate.username==='' && <Route path='/register' exact component={Register}/>
          }
          
          {/*home*/}
          {
            showstate.username==='' && <Redirect from='/' to='/login'/>
          }

        </Switch>
        {
          showstate.username!==''
          &&
          <Todo/>
        } 
        <h1>{testuser}</h1>
      </div>
    </Router>
  );
}

export default App;
