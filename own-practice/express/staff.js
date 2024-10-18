const {MongoClient} = require("mongodb");
var express = require("express");
var app = express();
app.use(express.json());            // translator middleware

const url = "mongodb+srv://srivarshini:mongo@cluster0.q8nx0.mongodb.net/"
const client = new MongoClient(url);

app.post('/create', async(req,res) =>{

    var data = {
    "name": req.query.name,
    "email":req.query.email,
    "password":req.query.password,
    "address": req.query.address,
    "mobile": req.query.mobile
    }

    // or
    // let body = req.body;
    // let data = {
    //     'name':body['name'],
    //     'email':body['email'],
    //     'password':body['password'],
    //     'address':body['address'],
    //     'mobile':body['mobile']
    // }
    await client.connect();
    const db = client.db('staff');
    const collection = await db.collection('teachers');
    await collection.insertOne(data);
    res.status(200).json({ "message": "Created a record" });
})


app.post('/register', async(req,res) =>{

    let {name, email, password,address,mobile} = req.body;
    if  (name && email && password && address && mobile){
        let data = {name, email, password,address,mobile}
        await client.connect();
     const db = client.db('staff');
    const collection = await db.collection('teachers');
    await collection.insertOne(data);
    res.status(200).json({ "message": "Created a record" });
    }
    else{
        res.status(200).json({ "message": "error" });
    }
})

app.post('/login', async(req,res) =>{

    let {name, email, password,address,mobile} = req.body;
    if  (name && email && password && address && mobile){
        let data = {name, email, password,address,mobile}
        await client.connect();
     const db = client.db('staff');
    const collection = await db.collection('teachers');
    await collection.insertOne(data);
    res.status(200).json({ "message": "Created a record" });
    }
    else{
        res.status(200).json({ "message": "error" });
    }
})

app.listen(8899,()=>{
    console.log("server started");
})