import exp from 'express'
import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserModel.js'
import {verifyToken} from '../middlewares/verifyToken.js'
export const userRoute = exp.Router()
import { ProductModel } from '../models/ProductModel.js'

userRoute.post('/users', async (req, res) => {
    //get new user from req.body
    let newUser = req.body
    //run validator
    await new UserModel(newUser).validate();
    //console.log(newUser);
    //hash the password
    let hashedPwd = await hash(newUser.password, 12);
    //replace plain password with hashed password
    newUser.password = hashedPwd;
    //create new user document
    let newUserDoc = new UserModel(newUser)
    console.log(newUserDoc);
    //save in DB
    await newUserDoc.save({ validateBeforeSave: false });
    //res
    res.status(201).json({ message: "New user created" })

})
userRoute.post('/auth', async (req, res) => {
    //get user cred obj
    //let {username, password}=req.body;
    let userCred = req.body
    //check for username
    let userofDB = await UserModel.findOne({ username: userCred.username })
    //if user not found
    if (userofDB === null) {
        return res.status(404).json({ message: "Invalid Username" })
    }
    //compare password
    let st = await compare(userCred.password, userofDB.password)
    //if passwords not matched
    if (st === false) {
        return res.status(404).json({ message: "Invalid Password" })
    }
    //create  signed token
    let signedToken = jwt.sign({ username: userCred.username }, 'secret', { expiresIn: 30 })
    //save token as httpOnly  cookie
    res.cookie('token', signedToken, {
        httpOnly: true,// it is httpOnly cookie
        secure: false,// for https protocol turn secure to true
        sameSite: "lax"//relax, gives moderate level security and gives permission with few restrictions
    })
    //res.status(200).json({ message: "Login Successfull", token: signedToken })
    res.status(200).json({ message: "Login Successfull" })
})

userRoute.put('/users/:id', async (req, res) => {
    //get objectId from url params
    let objId = req.params.id
    //get modified user from req
    let modfifiedUser = req.body
    //make update
    let lastestUser = await UserModel.findByIdAndUpdate(objId, { $set: { ...modfifiedUser } }, { new: true })//returns modified counts
    res.status(200).json({ message: "user modified", payload: lastestUser })
    //send res
})



//Create a protected Route
userRoute.get('/test', verifyToken, (req, res) => {
    res.json({ message: "test route" })
})

//Add product to user's cart
userRoute.put("/user-cart/user-id/:uid/product-id/:pid", async (req, res) => {
  //read uid and pid from url parameters
  let { uid, pid } = req.params; //{ uid:"" , pid:""}
  //check user
  let user = await UserModel.findById(uid);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  //check product
  let product = await ProductModel.findById(pid);
  console.log("product", product);
  if (!product) {
    return res.status(401).json({ message: "Product not found" });
  }
  //perform update
  let modifiedUser = await UserModel.findByIdAndUpdate(
    uid,
    { $push: { cart: { product: pid } } },
    { new: true },
  ).populate("cart.product");
  //res
  res.status(200).json({ message: "Product added to cart", payload: modifiedUser });
});
// Read user by id
userRoute.get("/users/:uid", async (req, res) => {
    let { uid } = req.params;
    let userObj = await UserModel.findById(uid).populate("cart.product", "productName price")
    res.status(200).json({ message: "User Details", payload: userObj })
})
//
userRoute.get("/compare/:id",async(req,res)=>{
    let productId=new Types.ObjectId(req.params.pid)
    //get product
    let prod=await ProductModel.findById(productId)
    if(prod._id.equals(productId)){
        console.log("eq")
    }
    else{
        console.log("noteq")
    }
})