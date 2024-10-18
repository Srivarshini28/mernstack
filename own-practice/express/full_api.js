const {MongoClient, ObjectId} = require('mongodb');
var express = require('express');
var app = express();
app.use(express.json());

const url = 'mongodb+srv://srivarshini:mongo@cluster0.q8nx0.mongodb.net/';
const client = new MongoClient(url);

const dbName = 'job_database';
const col = 'jobs';

app.post('/reg', async(req,res) =>{
    let {name, companyname, requirement, email, password} = req.body;
    try{
        if (name == null ||companyname == null || requirement == null || email ==null || password == null){
            res.status(200).json({"message":"Please enter all the fields"})
        }
        else{
            let data = {name, companyname, requirement, email, password};
            await client.connect();
            const db = client.db(dbName);
            const collection = await db.collection(col);
            await collection.insertOne(data);
            res.status(200).json({"message":"Resgistered sucessfully!!"})
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({"message":"Server error"})
    }
        
})

app.get('/show', async(req,res) =>{
    await client.connect();
    const db = client.db(dbName);
    const collection = await db.collection(col);
    const list = await collection.find({}).toArray();
    res.status(200).json(list)          
})

app.post('/login', async(req,res) =>{
    let {email, password} = req.body;
    try{
        if (email ==null || password == null){
            res.status(200).json({"message":"Please enter all the fields"})
        }
        else{
            let data = {email, password};
            await client.connect();
            const db = client.db(dbName);
            const collection = await db.collection(col);
            await collection.find({"email":email,"password":password});
            res.status(200).json({"message":"Login sucessfully!!"})
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({"message":"Server error"})
    }
        
})

app.put('/update', async(req,res) =>{
    let {email, password} = req.body;
    try{
        if (email ==null || password == null){
            res.status(200).json({"message":"Please enter all the fields"})
        }
        else{
            await client.connect();
            const db = client.db(dbName);
            const collection = await db.collection(col);
            await collection.updateOne({"email":email},{$set:{"password":password}});
            res.status(200).json({"message":"Updated sucessfully!!"})
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({"message":"Server error"})
    }
        
})

app.delete('/delete', async(req,res) =>{
    let {name} = req.body;
    try{
        if (name == null){
            res.status(200).json({"message":"Please enter the name that needs to be deleted"})
        }
        else{
            await client.connect();
            const db = client.db(dbName);
            const collection = await db.collection(col);
            await collection.deleteOne({"name":name});
            res.status(200).json({"message":"Deleted sucessfully!!"})
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({"message":"Server error"})
    }
        
})

app.get("/getById",async(req,res)=>{
    let {id} = req.query;
    await client.connect();
    let db = client.db(dbName);
    let data = await db.collection(col).find({"_id":new ObjectId(id)}).toArray();
    // res.json({"msg":"Id info"})
    res.json(data);
})

app.listen(8899,()=>{
    console.log("Server started!!")
})