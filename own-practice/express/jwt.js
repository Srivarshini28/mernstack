// import
const { MongoClient, ObjectId } = require('mongodb');
var express = require('express');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var fs= require('fs')
var fileupload = require('express-fileupload');
const url = 'mongodb+srv://srivarshini:mongo@cluster0.q8nx0.mongodb.net/';
const client = new MongoClient(url);

const dbName = 'job_database';
const col = 'jobs';

// middleware
var app = express();
app.use(express.json());
app.use(cors());
app.use(fileupload({limits:{fileSize:50*1024*1024}}));

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


app.use('/api/', (req, res, next) => {
    let { token } = req.headers;
    if (!token) {
        return res.status(401).json({ "msg": "Please enter token" });
    } else {
        jwt.verify(token, 'SECRET', (err, dec) => {
            if (err) {
                return res.status(401).json({ "msg": "Invalid token" });
            }
            console.log("Decoded token: ", dec);
            next();
        });
    }
});

app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ "message": "Please enter all the fields" });
        } else {
            await client.connect();
            const db = client.db(dbName);
            const collection = db.collection(col);
            let result = await collection.find({ "email": email, "password": password }).toArray(); // Ensure .toArray() is called
            if (result.length > 0) {
                var token = jwt.sign({ "email": result[0].email }, 'SECRET'); // Correctly access the email
                res.status(200).json({ "message": "Login successfully!!", "Token": token }); // Return token in the same response object
            } else {
                res.status(401).json({ "message": "Login failed!!" }); // Use 401 for unauthorized access
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Server error" });
    }
});

app.get('/api/show', async (req, res) => {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(col);
    const list = await collection.find({}).toArray();
    res.status(200).json(list);
});

app.put('/api/update', async (req, res) => {
    let { id, email, password } = req.body;
    try {
        if (!id || !email || !password) {
            return res.status(400).json({ "message": "Please enter all the fields" });
        } else {
            await client.connect();
            const db = client.db(dbName);
            const collection = db.collection(col);
            await collection.updateOne({ "_id": new ObjectId(id) }, { $set: { "email": email, "password": password } });
            res.status(200).json({ "message": "Updated successfully!!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Server error" });
    }
});

app.delete('/api/delete', async (req, res) => {
    let { id } = req.body;
    try {
        if (!id) {
            return res.status(400).json({ "message": "Please enter the ID that needs to be deleted" }); // Corrected message
        } else {
            await client.connect();
            const db = client.db(dbName);
            const collection = db.collection(col);
            await collection.deleteOne({ "_id": new ObjectId(id) });
            res.status(200).json({ "message": "Deleted successfully!!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Server error" });
    }
});

// app.post('/upload', (req,res)=>{
//     let img = req.files.img;
//     let path = __dirname + '/uploads'+fileupload.name;
//     img.mv(path);
//     res.json({'msg':"uploaded"});
// })

app.delete('/remove', (req,res)=>{
    let {filename} = req.body;
    let path = __dirname + '/uploads'+filename;
    fs.unlink(path,(err) => {
        if (err) {
            return res.status(500).json({ "msg": "Error deleting file", error: err });
        }
        res.json({ 'msg': "File deleted successfully!" });
    });
});

app.post('/upload', function(req, res) {
    let file = req.files.img;
    
    let uploadPath = __dirname + '/uploads/' + file.name;
    file.mv(uploadPath,function(err){
       if(err)
          return res.status(500).send(err);
       res.send("File uploaded!!")
    })
    
  });

app.listen(8899, () => {
    console.log("server started");
});