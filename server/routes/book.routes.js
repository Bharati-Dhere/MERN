const express=require('express');
const {handleBookController,handleBookListController,handleBookDeleteController,handleBookUpdateController}=require('../controller/book.controller')

const router=express.Router();

router.post('/addbook',handleBookController);
router.get('/booklists',handleBookListController);
router.post('/deletebook',handleBookDeleteController);
router.put('/updatebook',handleBookUpdateController);
module.exports=router;