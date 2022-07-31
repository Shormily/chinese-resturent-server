const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

const app = express ();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) =>{
    res.send('Running my resturent server')
});
// user:chinese-resturent 
// pass:D11lSMRUi4QH5d4M



const uri = "mongodb+srv://Chinese-Resturent:D11lSMRUi4QH5d4M@cluster0.0qqdu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// ----------

  //  **2 ta rule async ba client collection jkono akta krlie hobe..

// ------------
// client.connect(err => {
//   const collection = client.db("Chinese").collection("user");
//   // perform actions on the collection object
//   console.log("Hitting the database");
//   const user = {name:"Mahiya", email:"mahiya@gmail.com", phone:"01312155566"};
//   collection.insertOne(user)
//   .then(() =>{
//     console.log('insert success')
//   })
// //   client.close();
// });

async function run() {
  try {
    await client.connect();
    const database = client.db("Chinese");
    const usersCollection = database.collection("users");
  // GET API
  app.get('/users', async(req,res)=>{
     const cursor = usersCollection.find({});
     const users = await cursor.toArray();
     res.send(users);
  });


  //  POST API
  app.post('/users', async(req,res)=>{
    const newUser = req.body;
    const result = await usersCollection.insertOne(newUser);
   console.log('From got new user',req.body)
   console.log('added user',result)
  res.json(result)


});

// Delete API

app.delete('/users/:id', async(req,res)=>{
  const id = req.params.id;
  const query = {_id: ObjectId(id)};
  const result = await usersCollection.deleteOne(query);
  
  console.log("Delleting user with id",result)

  res.json(result)
})



  } finally {
    // await client.close();
  }
}
run().catch(console.dir);





app.listen(port, () =>{
    console.log("Running server on port")
})