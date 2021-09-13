const mongo = require('mongodb');


class db{
    constructor(){}
async connectToMongo(){
    const url= "mongodb://srv1:27017";
    let client= new mongo.MongoClient(url, {
        useNewUrlParser:true,
        useUnifiedTopology:true

});
let connected = await client.connect();
this.db=connected.db("211760640");
console.log("db connected");

}
getDb(){
    return this.db;
  }
}

module.exports=new db(); 

   