const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port=process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

// name: geniusDB
// password:JAC0XxayakOC9kG2


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ruqflxh.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
    const serviceCollection = client.db('geniusCar').collection('services');
    const orderCollection = client.db('geniusCar').collection('orders');

    app.get('/services',async(req,res)=>{
      const query = {}
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    })

    app.get('/services/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const service = await serviceCollection.findOne(query);
      res.send(service);
    })


// orders api
    app.get('/orders',async(req,res)=>{
      let query = {}
      if(req.query.email){
        query ={
          email: req.query.email
        }
      }
      const cursor = orderCollection.find(query);
      const orders = await cursor.toArray();
      res.send(orders)
    })


    //orders
    app.post('/orders',async(req,res)=>{
      const order = req.body;
      const result =await orderCollection.insertOne(order);
      res.send(result);
    })

  }
  finally{

  }
}
run().catch(err=>console.log(err));


app.get('/',(req,res)=>{
  res.send('genius car server is running')
});

app.listen(port,()=>{
  console.log(`Listening the port ${port}`);
})
 
