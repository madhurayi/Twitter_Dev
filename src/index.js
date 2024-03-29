import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import {connect} from './config/database.js';

import apiRoutes from './routes/index.js';

import {UserRepository,TweetRepository} from './repository/index.js';

import LikeService from './services/like-service.js';

import { passportAuth } from './config/jwt-middleware.js';
const app= express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(passport.initialize());
passportAuth(passport);
app.use('/api',apiRoutes);


app.listen(3007,async()=>{
        console.log("Server started");
        await connect();
        console.log("mongodb connected");    
        
        const userRepo= new UserRepository();
        const tweetRepo= new TweetRepository();
        const tweets = await tweetRepo.getAll(0,10);
        // console.log(tweets);
        //console.log(tweets[0].id);
        // const user= await userRepo.create({
        //     email: "madhupriya@gmail.com",
        //     password: "madhu@340",
        //     name: "madhu"
        // });
//          const users= await userRepo.getAll();
//         const likeService= new LikeService();
//        await likeService.toggleLike(tweets[0].id,'Tweet',users[0].id);
        
    }) 