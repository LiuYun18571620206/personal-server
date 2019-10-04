var express = require('express');
var router = express.Router();
var {user}=require('../contact')
  router.get('/',function(req,res,next){
    res.render('registered')
  })
  router.get('/verificationUserName',function(req,res,next){
      //验证用户名
    let value=req.query.value
    user.find({userName:value},function(error,person){
        if(person){
           res.send({state:true}) 
        }else{
            res.send({state:false})
        }
    })
  })
  router.get('/userInfo',function(req,res,next){
    let value=req.query.userID
    user.find({id:value},function(error,person){
      if(person){
        res.send({user:person[0]})
      }else{
        res.send({err:'用户不存在'})
      }
    })
  })
  router.post('/login',function(req,res,next){
    let {userName,password}=req.body.params
    user.find({userName,password},function(error,person){
      console.log(person[0].id)
      if(person){
        res.send({id:person[0].id})
      }else{
        res.send({
          err:'用户名或密码错误'
        })
      }
    })
  })
  router.post('/signature',function(req,res,next){
    let {userID:id,value}=req.body.parmas
    user.update({
      id
    },{
      $set:{
        signature:value
      }
    },function(error,person){
      res.send('ok')
    })
  })
  router.post('/submitUser',function(req,res,next){
      //提交用户
    let {password,userName,name,nickName,sex,birthday}=req.body.params,obj,id
    sex==='man'?sex='男':sex==='woman'?sex='女':null
    user.find({userName:userName},function(error,person){
      if(!person.length){
        user.countDocuments({},function(error,person){
          id=new Date().getTime()+'N'+(person+1)
          obj={
            password,userName,name,sex,nickName,id,lv:0,birthday,signature:''
          }
          user.insertMany(obj)
          res.send('ok')
        })
      }else{
        res.send({err:{userName:'用户名已经存在'}})
      }
      return
    })
  })
  
  router.get('/getVerificationNumber',function(req,res,next){
    //获取验证码
    res.send(Math.floor(Math.random()*10000))
    })
module.exports = router;