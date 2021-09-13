let mongoose = require('mongoose');
const server="localhost:27017"
const db= "211760640";
class mongoosedb{
    constructor(){
        this._connect;
    }
    _connect(){
        let url= `mongodb://${server}/${db}`;
        mongoose.connect(url, { useUnifiedTopology: true,  useNewUrlParser: true} )
        .then(()=>{
            console.log("db connection!!")
        })
        .catch(err=>{
            console.error("db connection error")
        })
    }
}
module.exports= new mongoosedb();