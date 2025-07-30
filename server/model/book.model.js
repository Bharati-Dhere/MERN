const mongoose=require('mongoose');

const bookSchema=new mongoose.Schema({
    BookName:{
        type:String,
        required:true

    },
    BookAuthor:{
        type:String,
        required:true
    },
    BookTitle:{
       type:String,
        required:true
    },
    BookPrice:{
       type:String,
        required:true
    },
    PublishDate:{
        type:String,
        
    }

},{timestamps:true})

const Book=mongoose.model("books",bookSchema);

module.exports={Book}