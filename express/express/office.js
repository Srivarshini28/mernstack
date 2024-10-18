const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb+srv://srivarshini:mongo@cluster0.q8nx0.mongodb.net/';
const client = new MongoClient(url);
// Database Name
const dbName = 'office';

async function insertData(){
    let empData ={
        "name":"Varshini",
        "mobile":"7010054866",
        "address":"Chennai",
    }
    await client.connect();
    const db = client.db(dbName);
    const collection = await db.collection('employee');
    await collection.insertOne(empData);
    console.log('Record inserted');
}

insertData();