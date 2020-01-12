import React,{useState} from 'react';
import './Register.css';
import {Form,Button,Modal} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import submit from '../actions/submit_register'
import axios from 'axios'


function Register(){
    const dispatch=useDispatch()
    const [show,setShow]=useState(false)
    const handleClose = () => setShow(false)
    

    const [email,setEmail]=useState('');
    const getEmail=(e)=>{
        setEmail(e.target.value)
    }

    const [username,setUsername]=useState('');
    const getUsername=(e)=>{
        setUsername(e.target.value)
    }

    const [passwords,setPasswords]=useState('');
    const getPasswords=(e)=>{
        setPasswords(e.target.value)
    }

    
    const SubmitForm=(e)=>{
        e.preventDefault()
        const submit_data={
            email:email,
            username:username,
            passwords:passwords
        }
        dispatch(submit(submit_data))
        axios.post('http://localhost:5000/user/register',submit_data)
        .then(res => console.log(res.data))
        .catch(err=>console.log(err))

        setEmail('');
        setUsername('');
        setPasswords('');
        setShow(true)
    }
    return(
        <div className='Register shadow-lg p-3 mb-5 bg-white rounded'>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>สมัครสมาชิกเสร็จสิ้น</Modal.Title>
                </Modal.Header>
                <Modal.Body>ยินดีต้อนรับเข้าสู่ TodoApps โปรดทำการ login เพื่อเข้าสู่ระบบ</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Link to='/login'>
                        <Button variant="primary" onClick={handleClose}>
                            log-in
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
   
            <Form onSubmit={SubmitForm}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={getEmail}/>
                    <Form.Text className="text-muted" >
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicText">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" value={username} onChange={getUsername}/>
                    <Form.Text className="text-muted">
                        Your username contains A-Z,a-z,0-9 or extra symbols 
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={passwords} onChange={getPasswords}/>
                    <Form.Text className="text-muted">
                    Your passwords contains A-Z,a-z,0-9 or extra symbols
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
       
    );
}

export default Register;