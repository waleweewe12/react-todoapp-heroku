import React,{useState,useEffect} from 'react';
import {useSelector} from 'react-redux'
import axios from 'axios'
import {Button,Form,Modal,Collapse} from 'react-bootstrap'
import './Todo.css'
import TodoItem from './TodoItem.js'

function Todo() {
    const [todo,setTodo]=useState([])
    const user_login=useSelector(state=>state.login)
    const [showTodoForm,setTodoForm]=useState(false)

    const [newtodo,setNewtodo]=useState('')
    const addNewtodo=(e)=>{
      setNewtodo(e.target.value)
    }

    const [newtododate,setNewtododate]=useState('')
    const addNewtododate=(e)=>{
      setNewtododate(e.target.value)
    }

    useEffect(()=>{
      getTodo();
    })

    const getTodo=()=>{
      if(user_login.username!=='')
      {
        const data_username={
          username:user_login.username
        }
        axios.post('http://localhost:5000/todo/getTodo',data_username)
        .then(res=>{
          let newTodo=res.data
          newTodo=newTodo.sort((a,b)=>(a.finish_date_timestamp > b.finish_date_timestamp ? 1 : -1))
          setTodo(newTodo)
        })
        .catch(err=>console.log(err))
      }
    }

    const addTodo=(e)=>{

      e.preventDefault()
      
      if(isNaN(new Date(newtododate)) || newtodo==='')
      {
        setShow(!show)
      }else{
        const data={
          username:user_login.username,
          todo:newtodo,
          finish_date:newtododate
        }
        axios.post('http://localhost:5000/todo/addTodo',data)
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
        setNewtodo('')
        setNewtododate('')
        setTodoForm(!showTodoForm)
      }
    }

    const [show,setShow]=useState(false)
    const handleClose=()=>{
      setShow(!show)
    }

  return (
        <div className="Todo">
          <div className="add-todo-button">
          <Button  variant="outline-primary" block onClick={(e)=>{setTodoForm(!showTodoForm)}}>
            {showTodoForm ? 'CLOSE' : 'ADD TODO'}
            {!showTodoForm && <img src='AddIcon2.svg' alt='add icon' style={{width:'30px',height:'30px',marginLeft:'20px'}}/>}
          </Button>
          </div>
          
            <Collapse in={showTodoForm}>
              <div id="example-collapse-text">
                <Form className="add-todo-form" onSubmit={addTodo}>

                  <Form.Group controlId="formTODO">
                    <Form.Label>Enter TODO : </Form.Label>
                    <Form.Control type="text" placeholder="Enter TODO" value={newtodo} onChange={addNewtodo}/>
                    <Form.Text className="text-muted">
                      Put your TODO.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formFinishDate">
                    <Form.Label>Finished : </Form.Label>
                    <Form.Control type="date" placeholder="Enter Finished Date"  value={newtododate} onChange={addNewtododate}/>
                    <Form.Text className="text-muted">
                      Finished Date
                    </Form.Text>
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
            </Collapse>
          
          {/*show TodoItem*/}

          {
            user_login.username!==''
            &&
            todo.map(todopost=>
              (
                <TodoItem key={todopost._id} todo={todopost.todo} tododate={todopost.finish_date} todo_id={todopost._id}/>
              )
            )
          }

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>เกิดข้อผิดพลาดในการเพิ่ม TODO !</Modal.Title>
          </Modal.Header>

          <Modal.Body>กรุณากรอกข้อมูลให้ครบถ้วน</Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
  );
}

export default Todo;