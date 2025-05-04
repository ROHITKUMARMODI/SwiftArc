let {validationResult} = require("express-validator");
const productModel = require("../db/models/product.model");
const  mongoose = require("mongoose");
let ObjectId= mongoose.Schema.ObjectId

let getAllProduct = async(req,res)=>{
    let skip = req.query.skip;
    let limit = req.query.limit;
    let category = req.query.category;
    let minPrice = req.query.minPrice;
    let maxPrice = req.query.maxPrice;
    let query={};
    if(category && category!=""){
        query["category"] = category;
    }
    if((minPrice && minPrice >0) ||(maxPrice && maxPrice>0)){
        if(minPrice && maxPrice && minPrice>maxPrice){
            return res.status(400).json({message:"minPrice can't greater than maxPrice"})
        }
        if(minPrice && maxPrice){
            query["price"] ={$and:[{$gte:minPrice},{$lte:maxPrice}]}
        }
        else if(minPrice && !maxPrice){
            query["price"] = {$gte:minPrice}
        }
        else if(maxPrice && !minPrice){
            query["price"] = {$lte:maxPrice}
        }
    }
    let allProduct =  await productModel.find(query).skip(skip).limit(limit);
    res.status(200).json({message:"product fetched successfully",data:allProduct})
}


let getProductById = async(req,res)=>{
    let productId = req.params.id;
    let product = await productModel.findById(productId);
    if(!product){
        res.status(400).json({message:"product not found"})
    }
    res.status(200).json({message:"product fetched successfully"})
}

let createProduct = async(req,res)=>{
    let body = req.body;
    try{
       let errors = validationResult(req);
       if(errors && errors.length){
        return res.status(400).jsomn({message:errors.message})
       }
       let product = new productModel({
        name:body.name,
        price:body.price,
        dec:body.desc
       })
       await product.save()
       res.status(200).json({message:"product created successfully"})
    }
    catch(err){
       res.status(500).json({message:"internal error"})
    }
}

let updateProduct = async(req,res)=>{
    let productId = req.params.id;
    let newDesc = req.body.desc
    let newPrice= req.body.price
    let newCategory = req.body.category
    if(newDesc && newDesc !=""){
        newDesc = req.desc
    }
    if(newPrice && newPrice>0){
        newDesc = req.price
    }
    if(newCategory && newCategory !=""){
        newDesc = req.category
    }
    await product.save()
    res.status(201).json({message:"product updated successfully"})
}

let deleteProduct = async(req,res)=>{
    let productId = req.params.id;
    await productModel.deleteOne({__id:new ObjectId(productId)})
    res.status(200).json({message:"product deleted successfully"})
}


module.exports = {getAllProduct,getProductById,createProduct,deleteProduct,updateProduct}