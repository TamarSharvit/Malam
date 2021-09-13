const express=require('express')
const userControllerMongoose = require('../controllers/userControllerMongoose')
const router=express.Router()
router.post('/', userControllerMongoose.savUserToDb);
router.get('/',userControllerMongoose.findUser);
module.exports=router;