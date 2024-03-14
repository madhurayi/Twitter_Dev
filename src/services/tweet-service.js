const { TweetRepository ,HashtagRepository} = require("../repository/index")

class TweetService{
    constructor(){
        this.tweetReposiitory= new TweetRepository();
        this.hashtagRepository= new HashtagRepository();
    }
    async create(data){
        const content= data.content;
        const tags= content.match(/#[a-zA-Z0-9_]+/g).map((tag)=>tag.substring(1)); // this regex extracts hashtags
        const tweet= await this.tweetReposiitory.create(data);
        let alreadyPresentTags= await this.hashtagRepository.findByName(tags);
        let titleOfPresenttags= alreadyPresentTags.map(tags=>tags.title)
        let newtags= tags.filter(tag=>!titleOfPresenttags.includes(tag));
        newtags= newtags.map(tag=>{
            return {title: tag, tweets: [tweet.id]}
        });
          await this.hashtagRepository.bulkCreate(newtags);
         alreadyPresentTags.forEach((tag)=>{
            tag.tweets.push(tweet.id);
            tag.save();
         });
         return tweet;
        //console.log(response);
        //todo create hashtags and add here
        /**
         * 1. bulkcreate in mongoose
         * 2. filter title of hashtag based on multiple tags
         * 3. How to add tweet id inside all the hashtags
         */
    }
}

module.exports= TweetService

/**
 * this is my first #tweet. I am really #exited
 */