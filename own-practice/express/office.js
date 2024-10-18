const {MongoClient}  = require("mongodb");

const url = "mongodb+srv://srivarshini:mongo@cluster0.q8nx0.mongodb.net/"
const client = new MongoClient(url);

async function insertData() {
    var data = {
        "name":"Sneka",
        "number":"1234567890",
        "address":"Minjur"
    }
    await client.connect();
    const db = client.db("office");
    const collection = await db.collection("employee");
    await collection.insertOne(data);
    console.log("Inserted");
}

insertData();
