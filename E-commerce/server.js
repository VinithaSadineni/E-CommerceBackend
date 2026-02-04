//create HTTP server
import exp from 'express'
import{connect} from 'mongoose'
import{productRoute} from './APIs/productApp.js'
import{userRoute} from './APIs/userApp.js'
const app=exp()
const port=3800
//connect to MongoDB
async function connectDB(){
    try{
        await connect("mongodb://localhost:27017/ecomdb")
        console.log("Connected to DB")
        app.listen(port,()=>console.log("server listening on port 3800...."))
    }catch(err){
        console.log("DB connection failed",err)
    }
}

connectDB()
app.use(exp.json())
app.use("/user-api",userRoute)
app.use("/products-api",productRoute)


//error handling middleware
app.use((err,req,res,next)=>{
    res.status(500).json({message:"error",reason:err.message})
})