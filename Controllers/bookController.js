const books = require('../Models/bookSchema')

exports.addBook = async(req,res)=>{
    console.log("Inside addBook");
    //getUserId
    const userId = req.payload
    //get bookImage
    const bookImage = req.file.filename
    //get book details
    const {title,author,genre,price,availability,description}=req.body
    console.log(userId,title,author,genre,price,availability,description,bookImage);
    
    //logic for adding new book
    try{
        const existingBook = await books.findOne({title})
        if(existingBook){
            res.status(404).json("Book already exist")
        }
        else{
            const newBook = new books({
                title,author,genre,price,availability,description,bookImage,userId
            })
            await newBook.save()//save new book in mongodb
            res.status(200).json(newBook)//response send to client
        }
    }
    catch(error){
        res.status(404).json({message:error.message})
    } 
}

//get all books after login
exports.getAllBooks = async(req,res)=>{
    const searchKey = req.query.search
    const query = {
        title:{
            $regex:searchKey, //regular expression
            $options:"i"  //to ignore case sensitivity during search
        }
    }
    try{
        const allBooks = await books.find(query)
        res.status(201).json(allBooks)
    }
    catch(err){
        res.status(401).json("Internal server error "+err.message)
    }
}

//update book details
exports.updateBook = async(req,res)=>{
    const {title,author,genre,price,availability,description, bookImage} = req.body
    const uploadImage = req.file?req.file.filename:bookImage
    userId = req.payload
    const {bid} = req.params
    try{
        //find the particular book and update the book details then save to mongodb
        const updateBook = await books.findByIdAndUpdate({_id:bid},{title,author,genre,price,availability,description, bookImage:uploadImage,userId})
        //to save the book details to mongodb
        await updateBook.save()
        //response send back to client
        res.status(200).json(updateBook)
    } 
    catch(err){
        res.status(401).json("Internal server error "+err.message)
    }
}

//delete book
exports.deleteBook = async(req,res)=>{
    const {bid} = req.params;
    try{
        const deleteBook = await books.findByIdAndDelete({_id:bid})
        res.status(200).json(deleteBook)
    }
    catch(err){
        res.status(401).json("Internal server error "+err.message)
    }
}

//get all books before login
exports.getBooks = async(req,res)=>{
    try{
        const allBooks = await books.find()
        res.status(201).json(allBooks)
    }
    catch(err){
        res.status(401).json("Internal server error "+err.message)
    }
}