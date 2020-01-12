import React from 'react';
import {Link} from 'react-router-dom'
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import submit from '../actions/submit_login'
import './Nav.css'

function AppNav() {
    const user_register=useSelector(state=>state.login)
    const dispatch=useDispatch()
    const logout=()=>{
        dispatch(submit({username:''}))
        localStorage.removeItem('token')
    }
  return (
        <div className="Nav">
            <Navbar bg="dark" variant="dark">
                <Link to='/'><Navbar.Brand>ToDO Apps!</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {
                            user_register.username==='' 
                            &&
                            <Link className='nav-link' to='/register'>register</Link>
                        }
                        {
                            user_register.username==='' 
                            &&
                            <Link className='nav-link' to='/login'>login</Link>
                        }
                    </Nav>
                    {
                        user_register.username!==''
                        &&
                        <NavDropdown style={{color:'white'}} title={user_register.username} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={logout}>log out</NavDropdown.Item>
                        </NavDropdown>
                    }
                </Navbar.Collapse>
            </Navbar>
        </div>
  );
}

export default AppNav;