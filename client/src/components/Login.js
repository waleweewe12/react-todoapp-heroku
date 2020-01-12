import React,{useState} from 'react';
import {Form,Col,Row,Button,Modal} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import submit from '../actions/submit_login'
import './Login.css'
import axios from 'axios'

function Login() {

    const dispatch=useDispatch() 

    const [username,setUsername]=useState('')
    const Login_username=(e)=>{
        setUsername(e.target.value)
    }

    const [passwords,setPasswords]=useState('')
    const Login_passwords=(e)=>{
        setPasswords(e.target.value)
    }

    const submit_login=(e)=>{
        e.preventDefault()
        const submit_data={
            username_or_email:username,
            passwords:passwords
        }
        axios.post('http://localhost:5000/user/login',submit_data)
        .then(res => {
            if(res.data.error==='')
            {
                localStorage.setItem('token',res.data.token)
                let Bearer_token='Bearer '+localStorage.getItem('token')
                axios.post('http://localhost:5000/user/getuser',{Bearer_token})
                .then(res=>{
                    dispatch(submit({username:res.data.authData.username}))
                })
                .catch(()=>{
                    dispatch(submit({username:''}))
                    localStorage.removeItem('token')
                })
            }else{
                console.log(res.data.error)
                setShow(!show)
            }
                
        })
        .catch(err=>console.log(err))

        setPasswords('')
        setUsername('')
    }

    const [show,setShow]=useState(false)
    const handleClose=()=>{
        setShow(!show)
    }

  return (
    <div className="Login shadow-lg p-3 mb-5 bg-white rounded">
        <div>
        <Form onSubmit={submit_login}>
            <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                    Email
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" value={username} placeholder="username or email" onChange={Login_username}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                    Password
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="password" value={passwords} placeholder="Password" onChange={Login_passwords}/>
                </Col>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>

        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>การเข้าสู่ระบบล้มเหลว!</Modal.Title>
          </Modal.Header>

          <Modal.Body>username or passwords is incorrected. </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
}

export default Login;