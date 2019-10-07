var express = require('express');
var router = express.Router();
var {contact,link}=require('../contact')
/* GET home page. */
router.get('/', function(req, res, next) {
  let agent=req.headers['user-agent']
  let tpl=/Android|webOS|iPhone|iPod|BlackBerry/i.test(agent)? 'phone' : 'Home';
  res.render(tpl);
});
router.get('/link',function(req,res,next){
  let type=req.query.type
  if(Array.isArray(type)){
  type=type.map((v)=>{return {type:v}})
  link.find({'$or':type},(error,person)=>{
    if(error){
      console.error('未找到')
      return
    }
    console.log(person)
    res.send(person)
  })
  }else{
    link.find({type},(error,person)=>{
      if(error){console.error('未找到');return}
      res.send(person)
    })
  }
  
})
router.get('/contact',function(req,res,next){
    //发送评论列表
    contact.find(function(err,person){
      if(err){
        console.log('没有获取到')
        return
      }
      res.send(person)
    })
  });
  router.post('/contact',function(req,res){
    //提交评论
    let obj={...req.body.params}
    contact.insertMany(obj)
    res.send('ok')
})
module.exports = router;
