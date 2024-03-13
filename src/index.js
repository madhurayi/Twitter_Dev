const express= require('express');
const connect = require('./config/database');
const app= express();

const Tweet= require('./models/tweet');


app.listen(3007,async()=>{
    console.log("Server started");
        await connect();
        console.log("mongodb connected");
        const tweets= await Tweet.find({
            content:["First tweet","Second tweet"]
        })
        console.log(tweets);
    })