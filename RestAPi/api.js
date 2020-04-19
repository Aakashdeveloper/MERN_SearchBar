const express = require('express');
const app = express();
const port = 9000
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const mongourl = "mongodb://localhost:27017";
let db;
let col_name = "zomato";
let cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get('/',(req,res) => {
    db.collection(col_name).find({}).toArray((err,result) => {
        if(err) throw err
        else{
            res.send(result)
        }
    })
  
});

app.get('/hotels/:id',(req,res) => {
    var {id}= req.params;
    var query={id:id}
    db.collection(col_name).find(query).toArray((err,result) => {
        if(err){
            throw err
        }else{
            res.send(result);
        }
    })
})

app.get('/hotels',(req,res) =>{
    var query = {};
    if(req.query.city){
        query={city:req.query.city}
    }
    else{
        query={}
    }
    db.collection(col_name).find(query).toArray((err,result) => {
        if(err){
            throw err
        }else{
            res.send(result);
        }
    })
})


MongoClient.connect(mongourl,(err,client) => {
    if(err) console.log('error while connecting');
    db = client.db('edureka');

    app.listen(port,(err) => {
        console.log(`App is running on port ${port}`)
    })

})