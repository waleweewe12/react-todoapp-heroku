/*settings */
const express=require('express')
const bodyparser=require('body-parser')
const cors=require('cors')
const mongoose=require('mongoose')
const path=require('path')

require('dotenv').config();

mongoose.connect('mongodb+srv://smile69narak:'+process.env.MONGO_ATLAS_PASSWORDS+'@cluster0-m70hg.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})
const app=express();
app.use(cors());
app.use(express.json());

/*working */

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))
const userRouter=require('./api/routes/user_route');
const todoRouter=require('./api/routes/todo_route');
app.use('/user',userRouter);
app.use('/todo',todoRouter);
if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}


/*Connection */

const connection = mongoose.connection
connection.once('open',()=>{
    console.log("Mongoose Connection!!")
})

const port=process.env.PORT || 8080
app.listen(port,()=>{
    console.log("application start at port "+port)
})