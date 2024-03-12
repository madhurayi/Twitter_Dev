const express= require('express');
const connect = require('./config/database');
const app= express();

const TweetRepository= require('./repository/tweet-repository');
const Comment= require('./models/comment');

app.listen(3007,async()=>{
    console.log("Server started");
        await connect();
        console.log("mongodb connected");
        // const tweet= await Tweet.create({
        //     content: 'Second tweet'
        // })
        // const tweets= await Tweet.find({userEmail:'a@b.com'});
        // const tweet= await Tweet.findById('65f0774ac14f34e237553772');
        // tweet.userEmail = 'b@c.com';
        // await tweet.save();
        const tweetRepo= new TweetRepository();
        const tweet= await tweetRepo.create({content: "tweet with commentschema"});
        console.log(tweet);
        const comment= await Comment.create({content:"New comment"});
        const tweet1= await tweetRepo.getAll(2,4)
        console.log(tweet1[0].contentWithEmail);
})