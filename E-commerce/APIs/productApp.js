import exp from 'express'
import {ProductModel} from '../models/ProductModel.js'
export const productRoute=exp.Router()
//route to create new products
productRoute.post("/products",async(req,res)=>{
    //get product from req
    let productObj=req.body
    //create new product doc
    let newproductDoc=new ProductModel(productObj)
    await newproductDoc.save()
    //send response
    res.status(201).send({message:"new product created"})
})