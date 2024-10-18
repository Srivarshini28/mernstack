const { MongoClient, corsnode, ObjectId } = require('mongodb');44
var fileUpload = require("express-fileupload")
const url = 'mongodb+srv://srivarshini:mongo@cluster0.q8nx0.mongodb.net/';
const client = new MongoClient(url);

var express = require("express");
var app = express();
app.use(express.json());
app.use('/api/',(req,res,next)=>{
    let {token} = req.headers;
    if (token == "" || token == undefined){
        res.json({"msg":"please enter a token"})
    }else{
        jwt.verify(token,'SECRET');
        const dc = jwt.decode(token);
        console.log(dc);
        next();
    }
})



// limitation for the file upload like size of the file
app.use(fileUpload({limits: { fileSize: 50 * 1024 * 1024 },}));
  

var cors = require("cors");
app.use(cors());
var jwt = require('jsonwebtoken');

app.post("/createjob",async(req,res)=>{
    let body = req.body;
    let data = {
        'name':body['name'],
        'companyname':body['companyname'],
        'requirement':body['requirement']
    }
    await client.connect();
    let db = client.db("job_portal");        
    await db.collection("jobs").insertOne(data);
    res.status(200).json({"message":"created!!"})
})

app.get("/display_job",async(req,res)=>{
    await client.connect();
    let db = client.db("job_portal");
    let list = await db.collection("jobs").find({}).toArray();
    res.status(200).json(list)
})

app.put("/api/update",async(req,res)=>{
    let {name,companyname,requirement} = req.body;
    await client.connect();
    let db = client.db("job_portal");
    await db.collection("jobs").updateOne({"name":name},{$set:{"companyname":companyname,"requirement":requirement}});
    res.json({"msg":"Updated"});
})

app.post("/updateJobsById", async (req, res) => {
    const { id, requirement, name, companyname } = req.body; // Extract from req.body
    await client.connect();
    let db = client.db("job_portal");
    // Update multiple fields including name, companyname, and requirement
    await db.collection("jobs").updateOne(
      { "_id": new ObjectId(id) },
      { $set: { "name": name, "companyname": companyname, "requirement": requirement } }
    );
    res.json({ "msg": "Job updated" });
});

app.delete("/api/delete",async(req,res)=>{
    let {name} = req.query;
    await client.connect();
    let db = client.db("job_portal");
    await db.collection("jobs").deleteOne({"name":name})
    res.json({"msg":"Deleted"})
})

app.delete("/deleteJobsById",async(req,res)=>{
    let {id} = req.query;
    await client.connect();
    let db = client.db("job_portal");
    await db.collection("jobs").deleteOne({"_id":new ObjectId(id)});
    res.json({"msg" :"Job deleted"});
 })

app.post("/login",async(req,res)=>{
    let {email,password} = req.body;
    await client.connect();
    let db = client.db("staff");
    let loginres = await db.collection("teachers").find({"email":email,"password":password}).toArray();
    if (loginres.length>0){
        var token = jwt.sign({"email":loginres[0]["email"]},'SECRET')
        res.json({"msg":"You are correct","token":token})
    }else{
        res.json({"msg":"You are wronng"})
    }
})

// file upload code

app.post('/upload', function(req, res) {
   let file = req.files.img;
   
   let uploadPath = __dirname + '/uploads/' + file.name;
   file.mv(uploadPath,function(err){
      if(err)
         return res.status(500).send(err);
      res.send("File uploaded!!")
   })
   
 });

app.get("/getById",async(req,res)=>{
    let {id} = req.query;
    await client.connect();
    let db = client.db("office");
    let data = await db.collection("employee").find({"_id":new ObjectId(id)}).toArray();
    res.json({"msg":"Id info"})
    res.json(data);
})

app.listen(8899,()=>{
    console.log("server Started")
})