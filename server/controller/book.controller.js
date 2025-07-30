const {Book}=require('../model/book.model')

const handleBookController=async(req,res)=>{
    try{
    const body=req.body;

    if(!body.BookName||!body.BookAuthor||!body.BookTitle||!body.BookPrice){
       return res.status(400).json({Message:"All fields are required",Success:false})
    }

    const bookAdd=await Book.insertOne(body);

    if(bookAdd){
        
        return res.status(201).json({Message:"data added succesfuly",Success:true,Id:bookAdd?._id})
    }
    
    

    console.log('bookAdd',bookAdd);
    

    }catch(error){
       return res.status(500).json({Message:error.message,Success:false})
        

    }
}


const handleBookListController=async(req,res)=>{
    try {

        const booklist=await Book.find({});

        return res.status(200).json(
            {Message:"All books fetched succesfully",
            Success:true,
            TotalCount:booklist.length,
            BookList:booklist}
        );

        
    } catch (error) {
        
        return res.status(500).json({Message:error.message,Success:false})
    }
}

const handleBookDeleteController=async(req,res)=>{
    const body=req.body;
    try {

        const deleted=await Book.deleteOne({_id:body.Id})
       
        

        if(deleted.acknowledged){
             return res.status(200).json(
            {Message:"Book deleted succesfully",
            Success:true,
            }
        );
        }
        
    } catch (error) {

         return res.status(500).json(
            {Message:error.message,
            Success:false,
            });
        
    }
}

const handleBookUpdateController=async(req,res)=>{
    try{
    const body=req.body;
    const updating =await Book.updateOne({_id:body?.Id},{$set:body});
    

    if(updating.acknowledged){
       return res.status(200).json(
            {Message:"Book Updated succesfully",
            Success:true,
            }
        );
    }
}catch(error){
    return res.status(500).json(
            {Message:error.message,
            Success:false,
            }
        );
}
    
}


module.exports={handleBookController,handleBookListController,handleBookDeleteController,handleBookUpdateController}