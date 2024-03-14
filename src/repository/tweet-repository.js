import Tweet from '../models/tweet.js'
class TweetRepository{
    async create(data){
        try{
            const tweet= await Tweet.create(data);
            return tweet;
        }catch(error){
            console.log(error);
        }
    }
    async get(id){
        try{
            const tweet= await Tweet.findById(id);
            return tweet;
        }catch(error){
            console.log(error);
        }
    }
    async destroy(id){
        try{
            const tweet= await Tweet.findByIdAndDelete(id);
            return tweet;
        }catch(error){
            console.log(error);
        }
    }
    async getWithComments(id){
        try{
            //lean will convert the mongoose object to plain javascript object
            const tweet= await Tweet.findById(id).populate({path: 'comments'}).lean();
            return tweet;
        }catch(error){
            console.log(error);
        }
    }
    async getAll(offset,limit){
        try{
            const tweet= await Tweet.find().limit(limit).skip(offset);
            return tweet;
        }catch(error){
            console.log(error);
        }
    }
}

export default TweetRepository;