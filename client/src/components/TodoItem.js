import React,{useState} from 'react';
import './TodoItem.css';
import {Button,Collapse,Form,Badge,Modal} from 'react-bootstrap'
import axios from 'axios';

function TodoItem(props) {

  const ButtonStyle=()=>{
    return{
        padding:"2px 2px",
        marginLeft:"10px",
        float:'right',
        display:'flex'
    }
  }

  const deleteitem=(e)=>{
    axios.post('/todo/deleteTodo',{id:props.todo_id})
    .then(()=>console.log('todo delete!'))
    .catch(err=>console.log(err))
  }

  const updateitem=(e)=>{
    e.preventDefault()
    if(dummytodo==='')
    {
        setShow(!show)
    }else{
        if(isNaN(new Date(dummytododate)))
        {
            setDummytododate('')
        }
        const data={
            id:props.todo_id,
            todo:dummytodo,
            date:dummytododate
        }
        let config = {
            onUploadProgress: progressEvent => {
                let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                if(percentCompleted===100)
                {
                    setOpen(!open)
                }
            }
        }
        axios.post('/todo/updateTodo',data,config)
        .then(()=>console.log('todo update!'))
        .catch(err=>console.log(err))
    }
  }

  const [open, setOpen] = useState(false);
  const changeitem=(e)=>{
    setOpen(!open)
    setDummytodo(props.todo)
  }

  const settododate=(date)=>{
    let tododate=''
    if(date.getDate()<10)
    {
        tododate=tododate+'0'
    }
    tododate=tododate+date.getDate()+'/'
    if((date.getMonth()+1)<10)
    {
        tododate=tododate+'0'
    }
    tododate=tododate+(date.getMonth()+1)+'/'+date.getFullYear()
    return tododate
  }
  const tododate=settododate((new Date(props.tododate)))
  
  const [dummytodo,setDummytodo]=useState(props.todo)
  const writeDummytodo=(e)=>{
      setDummytodo(e.target.value)
  }

  const [dummytododate,setDummytododate]=useState('')
  const writeDummytododate=(e)=>{
      setDummytododate(e.target.value)
  }

  const [show,setShow]=useState(false)
  const handleClose=()=>{
      setShow(!show)
  }
  
  return (
    <div className='todo-item'>
        <div className="row">
            <div className="col-md-4 col-sm-12">
                <p style={{display:'flex'}}>{props.todo}</p>
            </div>
            <div className='col-md-4 col-sm-12'>
                <p style={{display:'flex',float:'left'}}>{tododate} (วัน/เดือน/ปี)</p>
            </div>
            <div className='col-md-4 col-sm-12'>
                <Button  style={ButtonStyle()} variant="danger" onClick={deleteitem}> delete </Button>
                <Button  style={ButtonStyle()} variant="primary" onClick={changeitem}>{open ? 'close':'change'}</Button>
            </div>
        {/*
        <Button  style={ButtonStyle()} variant="primary" onClick={changeitem}>{open ? 'close':'change'}</Button>
  <Button  style={ButtonStyle()} variant="danger" onClick={deleteitem}> delete </Button>*/}
        </div>
        
        <Collapse in={open}>
            <div id="example-collapse-text">
                <Form  onSubmit={updateitem}>
                    <Form.Group  controlId={'NewTodo'+props.todo_id}>
                        <Form.Label><Badge variant="warning">New TODO</Badge></Form.Label>
                        <Form.Control type="text" value={dummytodo} placeholder="Enter New Todo"  onChange={writeDummytodo}/>
                        <Form.Text className="text-muted">
                            Input your new todo
                        </Form.Text>
                    </Form.Group>

                    <Form.Group  controlId={'NewTodoDate'+props.todo_id}>
                        <Form.Label><Badge variant="warning">New Finished Date</Badge></Form.Label>
                        <Form.Control type="date" value={dummytododate} placeholder="Enter New Finished Date"  onChange={writeDummytododate}/>
                        <Form.Text className="text-muted">
                            Input your finished date
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </Collapse>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>เกิดข้อผิดพลาดในการแก้ไข TODO !</Modal.Title>
          </Modal.Header>

          <Modal.Body>กรุณากรอกข้อมูลให้ครบถ้วน</Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}

export default TodoItem;