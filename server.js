const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors=require('cors')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000; 

mongoose.connect('mongodb+srv://smile69narak:'+process.env.MONGO_ATLAS_PASSWORDS+'@cluster0-m70hg.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const userRouter=require('./api/routes/user_route');
const todoRouter=require('./api/routes/todo_route');
app.use('/user',userRouter);
app.use('/todo',todoRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

const connection = mongoose.connection
connection.once('open',()=>{
    console.log("Mongoose Connection!!")
})

app.listen(PORT, () => {
    console.log("application start at port ",PORT)
});