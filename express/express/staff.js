var express = require("express") 
    // require is like import 
// express is built on functions concept 
var app = express();
app.use(express.json()); // middleware function
const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb+srv://srivarshini:mongo@cluster0.q8nx0.mongodb.net/';
const client = new MongoClient(url);
// Database Name
const dbName = 'staff';
app.post("/createTeacher", async (req, res) => {
    try {
        const db = client.db(dbName);
        const data = {
            'name': req.query.name,
            'email': req.query.email,
            'password': req.query.password,
            'address': req.query.address,
            'mobile': req.query.mobile,
        };
        await db.collection('teachers').insertOne(data);
        res.status(200).json({ "message": "Created a record" });
    } catch (error) {
        console.error("Error inserting record", error);
        res.status(500).json({ "message": "Error creating record" });
    }
});

app.listen(8899,() => {
    console.log("server started");
});