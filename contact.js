var mongoose=require('mongoose')
mongoose.Promise=global.Promise
mongoose.connect('mongodb://localhost:27017/data',{useNewUrlParser:true})
var db=mongoose.connection
db.on('error',console.log.bind(console,'connection error'))
db.once('open',function(){
    console.log("we're connected!")
})
var contactSchema=new mongoose.Schema({
    name:String,
    text:String,
    time:Number,
    id:String
})
var linkSchema=new mongoose.Schema({
    type:String
})
var userSchema=new mongoose.Schema({
    id:String,
    userName:String,
    nickName:String,
    password:String,
    sex:String,
    lv:Number,
    birthday:String,
    name:String,
    signature:String,
})
var contact=mongoose.model('contact',contactSchema)
var link=mongoose.model('link',linkSchema)
var user=mongoose.model('user',userSchema)
module.exports={
    contact,
    link,
    user
}