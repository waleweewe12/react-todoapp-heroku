const express=require('express')
const cors=require('cors')
const bodyparser=require('body-parser')

const app=express();
app.use(express.json())
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

app.get('/getuser',(req,res)=>{
    res.send({
        username:'weerapath'
    })
})

const port = 5000
app.listen(5000,()=>{
    console.log("Application start at port "+port)
})