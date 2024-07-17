const orders = require('../Models/orderSchema')

exports.addOrder = async(req,res)=>{
    console.log("Inside addOrder");
    //getUserId
    const userId = req.payload
    //get order details
    const {items,amount,status,createdAt}=req.body
    console.log(userId,items,amount,status,createdAt);
    //logic for adding new order
    try{
            const newOrder = new orders({
                items,amount,status,createdAt,userId
            })
            await newOrder.save()//save new order in mongodb
            res.status(200).json(newOrder)//response send to client
        }
    catch(error){
        res.status(404).json({message:error.message})
    } 
}

exports.getAllOrders = async (req,res)=>{
    //get userId
    const userId = req.payload;
    //get all orders of particular user
    try{
        //api call
        const userOrder = await orders.find({userId})
        res.status(200).json(userOrder) //send all orders to frontend
    }
    catch(err){
        res.status(401).json("Internal server error "+err.message)
    }
}

exports.updateOrder = async(req,res)=>{
    const {items,amount,status,createdAt} = req.body
    userId = req.payload
    const {oid} = req.params
    try{
        //find the particular order and update the order details then save to mongodb
        const updateOrder = await orders.findByIdAndUpdate({_id:oid},{items,amount,status,createdAt,userId})
        //to save the order details to mongodb
        await updateOrder.save()
        //response send back to client
        res.status(200).json(updateOrder)
    } 
    catch(err){
        res.status(401).json("Internal server error "+err.message)
    }
}

//get orders of all users
exports.getAllUsersOrders = async (req,res)=>{
    try{
        //api call
        const userOrder = await orders.find()
        res.status(200).json(userOrder) //send all orders to frontend
    }
    catch(err){
        res.status(401).json("Internal server error "+err.message)
    }
}