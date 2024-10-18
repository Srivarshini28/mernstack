const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb+srv://srivarshini:mongo@cluster0.q8nx0.mongodb.net/';
const client = new MongoClient(url);
// Database Name
const dbName = 'sample_mflix';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('movies');
    
    // Insert a record into the 'movies' collection
    const newMovie = {
        title: "New Movie Title",
        year: 2024,
        genre: ["Action", "Adventure"],
        director: "Director Name"
    };

    await collection.insertOne(newMovie);
    console.log('Record inserted successfully');

    // Retrieve and display the data
    const data = await collection.find({}).toArray();
    console.log(data);


    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
