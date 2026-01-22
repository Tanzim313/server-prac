const express = require('express')
const app = express()
const port = 3000

const { MongoClient, ObjectId } = require('mongodb');

async function runGetStarted() {
  // Replace the uri string with your connection string
  const uri = 'mongodb+srv://tools_db:J9nOPDcdtyX4rcTK@cluster0.7k1gh4c.mongodb.net/?appName=Cluster0';
  const client = new MongoClient(uri);

  try {
    const database = client.db('tools_db');
    const toolsCollection = database.collection('tools');


    app.get("/tools",async(req,res)=>{

        const result = await toolsCollection.find().toArray();

        res.send(result);

    });

    app.get("/tools/:id",async(req,res)=>{

        const id = req.params.id;

        const data = await toolsCollection.findOne({_id:new ObjectId(id)});
        
        console.log(data);
        res.send(data);
    })


    //post

    app.post("/tools",async(req,res)=>{

        const data = req.body;

        const result = await toolsCollection.insertOne(data);

        res.send(result);

    })

    

   

  } finally {
    //await client.close();
  }
}
runGetStarted().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
