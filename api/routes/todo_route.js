const router=require('express').Router();
let todo=require('../models/todo_model');

router.post('/getTodo',(req,res)=>{
    todo.find({username:req.body.username})
    .then(result=>res.send(result))
    .catch(err=>res.send(err))
})

router.post('/addTodo',(req,res)=>{

    const newTodo=new todo({
        username:req.body.username,
        todo:req.body.todo,
        finish_date:req.body.finish_date,
        finish_date_timestamp:(new Date(req.body.finish_date)).getTime()
    })
    newTodo.save()
    .then(()=>res.json("todo add"))
    .catch(err=>console.log(err))
})

router.post('/deleteTodo',(req,res)=>{
    todo.deleteOne({_id:req.body.id})
    .then(()=>res.json('Todo Delete!'))
    .catch(err=>console.log(err))
})

router.post('/updateTodo',(req,res)=>{
    let dataUpdate
    if(req.body.date!=='')
    {
         dataUpdate={
            todo:req.body.todo,
            finish_date:req.body.date,
            finish_date_timestamp:(new Date(req.body.date)).getTime()
        }
    }else{
         dataUpdate={
            todo:req.body.todo
        }
    }
    
    todo.updateOne({_id:req.body.id},dataUpdate)
    .then(()=>res.json('Todo Change!'))
    .catch(err=>console.log(err))
})

module.exports=router;