const express= require('express');
const connect = require('./config/database');
const app= express();

// const {TweetRepository}= require('./repository/index');
// const TweetService= require('./services/tweet-service');


app.listen(3007,async()=>{
    console.log("Server started");
        await connect();
        console.log("mongodb connected");    
        // let service= new TweetService();
        // let tweet= await service.create({
        //     content:"my #working twitter"
        // });
        
    })