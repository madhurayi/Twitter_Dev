import express from 'express';
import bodyParser from 'body-parser';

import {connect} from './config/database.js';
const app= express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
import apiRoutes from './routes/index.js';
app.use('/api',apiRoutes);

import service from './services/tweet-service.js';

app.listen(3007,async()=>{
    console.log("Server started");
        await connect();
        console.log("mongodb connected");    
        let ser= new service();
        await ser.create({
            content: 'My other code #MADhu #Works?'
        })
        
    })