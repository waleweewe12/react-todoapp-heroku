const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSchema=new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    username:{
        type: String,
        required: true
    },
    passwords:{
        type: String,
        required: true
    }
},{
    timestamps: true,
})

const user=mongoose.model('user',userSchema);
module.exports=user;