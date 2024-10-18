const { MongoClient } = require('mongodb');
const {ObjectId} = require('mongodb');

const cors = require('cors');



const url = 'mongodb+srv://srivarshini:mongo@cluster0.q8nx0.mongodb.net/';
const client = new MongoClient(url);

var express = require("express");
var app = express();
app.use(express.json());
app.use(cors());
app.get("/name",(req,res)=>{
    res.json({"msg":"Srivarshini"});    
});

app.post("/name",(req,res)=>{
    res.json({"msg":"Srivarshini MCA"});    
});

app.post("/login",(req,res)=>{
    let {email,password} =req['query'];
    
if(email == 'abc@gmail.com'  && password == 'abc'){
    res.json({"msg":"your email is correct"})
}else{
    res.json({"msg":"your email is not correct"})
}
});

app.post("/register",(req,res)=>{
    let {name,email,password,address} = req.body;
if(name== "abc" && email == "abc@gmail.com" && address == "chennai" && password == "abc"){
    res.json({"msg":"Entered details are correct"})
}else{
    res.json({"msg":"Please Enter all the field"})
}
});

app.post("/add",(req,res)=>{
    let {num1,num2,sum} = req.body;
if(num1==null && num2 == null){
    res.json({"msg":"Enter the two number"})
}else{
    let sum = num1 + num2
    res.json({"msg":sum})
}
})
app.post("/createTeacher",async(req,res)=>{
    let body = req.body;
    let data = {
        'name':body['name'],
        'email':body['email'],
        'password':body['password'],
        'address':body['address'],
        'mobile':body['mobile']
    }
    await client.connect();
    let db = client.db("office");
    await db.collection("teacher").insertOne(data);
    res.status(200).json({"message":"created!!"})
})

app.get("/listemp",async(req,res)=>{
    await client.connect();
    let db = client.db("office");
    let list = await db.collection("employee").find({}).toArray();
    res.status(200).json(list)
})

app.post("/login1",async(req,res)=>{
    await client.connect();
    let {name, mobile} = req.body;
    let db = client.db("office");
    let list = await db.collection("employee").find({"name":name,"mobile":mobile}).toArray();
    if (list.length){
        res.json({"msg":"you are correct"})
    }
    else{
        res.status(400).json({"msg":"you are wrong"})
    }
    res.status(200).json(list)
})

app.get("/filter",async(req,res)=>{
    var filterList = {};
    let{name,mobile,address} = req.query;
    if(name != undefined && name != ''){
        filterList['name'] = name;
    }
    if(mobile != undefined && mobile != ''){
        filterList['mobile'] = mobile;
    }
    if(address != undefined && address != ''){
        filterList['address'] = address;
    }
    let db = client.db("office");
    let rec = await db.collection("teacher").find(filterList).toArray();
    res.status(200).json(rec);
})

app.put("/update",async(req,res)=>{
    let {name,password} = req.body;
    await client.connect();
    let db = client.db("office");
    await db.collection("teacher").updateOne({"password":password},{$set:{"name":name}});
    res.json({"msg":"Password Updated"});
})

app.post("/updatepass",async(req,res)=>{
    let {name,password} = req.query;
    await client.connect();
    let db = client.db("office");
    await db.collection("teacher").updateOne({"password":password},{$set:{"name":name}});
    res.json({"msg":"Password Updated"});
})

app.get("/getById",async(req,res)=>{
    let {id} = req.query;
    await client.connect();
    let db = client.db("office");
    let data = await db.collection("employee").find({"_id":new ObjectId(id)}).toArray();
    res.json({"msg":"Id info"})
    res.json(data);
})

app.delete("/deleteUserByName",async(req,res)=>{
    let {name} = req.query;
    await client.connect();
    let db = client.db("office");
    await db.collection("employee").deleteOne({"name":name})
    res.json({"msg":"user deleted"})
})
    
app.listen(8888,()=>{
    console.log("server Started")
})