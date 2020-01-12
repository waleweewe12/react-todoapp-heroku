const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const todoSchema=new Schema({
    username:{
        type: String,
        required: true
    },
    todo:{
        type: String,
        required: true
    },
    finish_date:{
        type: Date,
        required: true
    },
    finish_date_timestamp:{
        type: Number,
        required: true
    }
},{
    timestamps: true,
})

const todo=mongoose.model('todo',todoSchema);
module.exports=todo;