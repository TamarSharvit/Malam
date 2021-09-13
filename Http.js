//lesson 3

const http = require('http');
users=require('./user');
const express = require('express')
var app=express();
var useRouter=require('./routes/userRoute')


class myServer extends http.Server {
    constructor() {
        super();


        this.on('request', (req, res) => {

            let url = req.url;
            let myUrl = new URL('http://localhost:3015/' + url);

            console.log("2. " + myUrl.searchParams.get('user'));
            console.log("3. " + myUrl.searchParams.get('pass'));

            let user = myUrl.searchParams.get('user');
            let pass = myUrl.searchParams.get('pass');

            login(user, pass).then((thisUser) => {

                res.end("hello to " + thisUser.firstName);


                console.log("find the user! hello!");

                console.log(thisUser.firstName);
            })
                .catch((err) => {
                    res.end(err);
                });


            // let params = new URLSearchParams(url);
            // console.log("4. "+params.get('user'));
            // console.log("5. "+params.get('pass'));
            //res.end("Thank you for connecting! ")
        });
        this.listen("3015");
    }


    //http://localhost:3015/?user=ycyc@gmail.com&pass=123456



}

var server = new myServer();

// //lesson 5- express
// app.use(express.json()) 
// app.use('/user',useRouter);
// // app.post('/',(req, res)=>{
// //     u=req.body
// //     res.send('post metod')
// // })
// app.listen(3015);

// //lesson 4
// var DateCon=require("./Dates");
// cDate=new DateCon.ConvertionDate(new Date());
// console.log(cDate.momentDate());