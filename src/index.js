import express from 'express';
import {connect} from './config/database.js';
const app= express();

import TweetService from './services/tweet-service.js';

app.listen(3007,async()=>{
    console.log("Server started");
        await connect();
        console.log("mongodb connected");    
        // let service= new TweetService();
        // let tweet= await service.create({
        //     content:"my #working twitter"
        // });
        
    })