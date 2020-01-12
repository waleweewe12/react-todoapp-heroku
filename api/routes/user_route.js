const router=require('express').Router();
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken')
let user=require('../models/user_model');

router.post('/login',(req,res)=>{
    
    user.findOne({$or:[{email:req.body.username_or_email},{username:req.body.username_or_email}]})
    .then(async result=>{
        if(await bcrypt.compare(req.body.passwords,result.passwords))
        {
            const token=jwt.sign(
            {
                username:result.username,
                email:result.email,
                userId:result._id
            },
            'secret',
            {
                expiresIn:'1h'
            }
        )

        res.send({
            error:"",
            token
        })
        }else{
            res.send({
                error:"username or passwords is incorrect",
            })
        }
    })
    .catch(err=>{
        res.send({
            error:"username or passwords is incorrect"
        })
    })
})

router.post('/register',async (req,res)=>{

    try{
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(req.body.passwords,salt,(err,hash)=>{
                const Newregister={  
                    email:req.body.email,
                    username:req.body.username,
                    passwords:hash
                }
                const newuser=user(Newregister)
                newuser.save(Newregister)
                .then(()=>res.json("user add!"))
                .catch((err)=>res.status(400).json('Error: ' + err))
            })
            
        })
        
    }catch(err){
        console.log(err)
    }
})

router.post('/getuser',(req,res)=>{
    let user_token=verifyToken(req.body.Bearer_token)
    if(user_token!=='error')
    {
        jwt.verify(user_token, 'secret', (err, authData) => {
            if(err) {
            res.status(403).send({
                error:"username or passwords is incorrect"
            });
            } else {
                res.json({
                    message: 'Post created...',
                    authData
                });
            }
        });
    }else{
        res.sendStatus(403);
    }
    
})

const verifyToken=(Bearer_token)=> {

    const bearerHeader = Bearer_token;
  
    if(typeof bearerHeader !== 'undefined') {

      const bearer = bearerHeader.split(' ');

      const bearerToken = bearer[1];

      return bearerToken;
    
    } else {
        return 'error'
    }
  
  }

module.exports=router;