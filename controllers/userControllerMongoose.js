let userModel = require('../models/userModel')

class userControllerMongoose{
  
    

async savUserToDb(req, res){
    let user= new userModel(
       req.body) ;  


user.save()
.then(doc=>{
    console.log(doc);
    res.send(doc)
})
.catch(err=>{
    console.log(err);
})

 }

 async findUser(req, res){
    userModel.find({
        firstName: "sara",
        lastName: "chen",
        mail: "sssss",
        password: "222222"
    })
    .then(doc=>{
        console.log(doc)
        res.send(doc)
    })
    .catch(err=>{
        console.error(err)
    })

   }
}
module.exports=new userControllerMongoose();
