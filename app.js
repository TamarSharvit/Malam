

const express=require('express');
const app= express();

const path = require('path');
// const user=require('./routers/userRoute');
const mongoosedb=require('./mongooseDB');
const usermongoose=require('./routes/userMongooseRoute')

const categoryRoutes=require('./routes/CategoryRoutes');
const orderRoutes=require('./routes/OrdersRoutes');
const productRoutes=require('./routes/ProductRoutes');
const userRoutes=require('./routes/UserRoutes')
const db=require('./db');


mongoosedb._connect();


app.use(express.json());

app.use('/usermongoose', usermongoose);
app.use(express.static('static'));

app.use('/api/user', userRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/product', productRoutes);
app.use('/api/category', categoryRoutes);

app.use((err, req, res, next)=>{
    console.log(err);
    res.status(500).send("An error!!");
})
app.use((req, res)=>{
    res.status(404).sendFile(path.join(__dirname,'/static/404.html'));
})
// app.use('/user', user);
//db.connectToMongo();

// app.get('/', (req,res)=>{
//     res.end('hello!');
// })
//db.connectToMongo();
app.listen(3017, ()=>{
    console.log('server up :) ');
})


