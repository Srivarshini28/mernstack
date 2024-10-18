const {MongoClient,cornode,Objectd} = require('mongodb')
var fileUpload = require("express-fileupload")
const url = 'mongodb+srv://srivarshini:mongo@cluster0.q8nx0.mongodb.net/';
const client = new MongoClient(url)

var express = require('express')
var router = express.Router();

router.post("/getAllProduct",(req,res)=>{
    let productList = [
        {"name":"pen"},
        {"name":"pencil"},
        {"name":"book"},
        {"name":"laptop"},{"name":"mobile"},
        {"name":"backcase"}
    ]
    res.json(productList);
    res.json({"msg":"list of product"})
})

router.post("/addReviewForProduct",async(req,res)=>{
    let{category,reviewText,name} = req.body;
    let data = {
        "name":name,
        "category":category,
        "reviewText":reviewText
    }
    let path =__dirname+"/uploads/"+req.files.names;
    req.files.img.mv(path,(err)=>{

    });
    await client.connect();
    let db = client.db("product-review");
    db.collection("user").insertOne(data);
    res.json({"msg":"Reviewed the Product"})
})

module.exports = router;