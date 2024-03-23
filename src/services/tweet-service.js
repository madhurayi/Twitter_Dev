import {TweetRepository,HashtagRepository} from '../repository/index.js'
class TweetService{
    constructor(){
        console.log(TweetRepository);

        this.tweetReposiitory= new TweetRepository();
        this.hashtagRepository= new HashtagRepository();
    }
    async create(data){
        const content= data.content;
        const tags= content.match(/#[a-zA-Z0-9_]+/g)
            .map((tag)=>tag.substring(1).toLowerCase()); // this regex extracts hashtags
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
    }
    async get(tweetId){
        const tweet= await this.tweetReposiitory.getWithComments(tweetId);
        return tweet;
    }
}

export default TweetService

/**
 * this is my first #tweet. I am really #exited
 */