var mongoose=require('mongoose')
mongoose.Promise=global.Promise
mongoose.connect('mongodb://localhost:27017/contact',{useNewUrlParser:true})
var db=mongoose.connection
db.on('error',console.log.bind(console,'connection error'))
db.once('open',function(){
    console.log("we're connected!")
})
var userSchema=new mongoose.Schema({
    name:String,
    text:String,
    time:Number
})
var model=mongoose.model('contact',userSchema)
module.exports=model