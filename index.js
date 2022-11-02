const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
// MiddleWare
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.o5lz3b5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const serviceCollection = client.db('geniusCar').collection('services')

        app.get('/services', async (req,res)=>{
            const query = {};
            // console.log(serviceCollection);
            const cursor = serviceCollection.find(query);
            // console.log(cursor)
            const services = await cursor.toArray()
            res.send(services);
        });

        app.get('/services/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service);
        })
    }
    finally{

    }
}

run().catch(err => console.error(err))


app.get('/', (req,res)=>{
    res.send("Genius Car Server Is Running")
})

app.listen(port, ()=>{
    console.log(`Genius Car Server Is Running On port ${port}`)
})