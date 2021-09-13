const express=require('express')
const router=express.Router()
const userController=require('../controllers/userController')


router.get('/',userController.getUserFromDB);
router.post('/',userController.postUserToDB);

module.exports=router;