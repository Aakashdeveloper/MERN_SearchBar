const express = require('express');
const app = express();
const port = 9000
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const mongourl = "mongodb://localhost:27017";
let db;
let col_name = "aprmrng";

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.status(200).send('Health Check')
});

app.get('/users/:id',(req,res) => {
    var {id}= req.params;
    var query={id:parseInt(id),isActive:true}
    db.collection(col_name).find(query).toArray((err,result) => {
        if(err){
            throw err
        }else{
            res.send(result);
        }
    })
})

app.get('/users',(req,res) =>{
    var query = {};
    if(req.query.id){
        query={id:parseInt(req.query.id),isActive:true}
    }else if(req.query.isActive) {
        var output = req.query.isActive;
        var condition;
        if(output==='false'){
            condition=false
        }else if(output==='true'){
            condition=true
        }else{
            condition=true
        }
        query={isActive:condition}
    }
    else{
        query={isActive:true}
    }
    db.collection(col_name).find(query).toArray((err,result) => {
        if(err){
            throw err
        }else{
            res.send(result);
        }
    })
})

//Insert
app.post('/addUser',(req,res) => {
    db.collection(col_name).insert(req.body,(err,result) => {
        if(err){
            throw err;
        }else{
            res.send('Data Added');
        }
    })
})

//update
app.put('/updateUser',(req,res) => {
    db.collection(col_name)
        .findOneAndUpdate({id:parseInt(req.body.id)},{
            $set:{
                "id":req.body.id,
                "name":req.body.name,
                "class":req.body.id,
                isActive:true
            }
        },(err,result) => {
            if(err){
                throw err;
            }else{
                res.send('Data Update');
            }
        })
})

//Delete
app.delete('/deleteUser',(req,res) => {
    db.collection(col_name).findOneAndDelete({"id":parseInt(req.body.id)},
        (err,result) => {
        if(err){
            throw err;
        }else{
            res.send('Data Deleted');
        }
    })
})


MongoClient.connect(mongourl,(err,client) => {
    if(err) console.log('error while connecting');
    db = client.db('classpractice');

    app.listen(port,(err) => {
        console.log(`App is running on port ${port}`)
    })

})