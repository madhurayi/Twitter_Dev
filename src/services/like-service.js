import { TweetRepository ,LikeRepository} from "../repository/index.js";
class LikeService{
    constructor(){
        this.likeRepository= new LikeRepository();
        this.tweetRepository= new TweetRepository();
    }
    async toggleLike(modelId,modelType,userId){ //api/v1/like/toogle?id=modelid&type=Tweet
        if(modelType=='Tweet'){
            var likeable= await this.tweetRepository.find(modelId);
            console.log("likeable is ",likeable,modelId,modelType,userId);
        }else if(modelType=='Comment'){
            //TODO
        }else{
            throw new Error('Unknown model type');
        }
        const exists=await this.likeRepository.findByUserAndLikeable({
            user: userId,
            onModel: modelType,
            likeable: modelId
        });
        console.log("likeservice exists ",exists);
        if(exists){
            console.log("hiii");
            console.log("id--",exists.id);

            likeable.likes.pull(exists._id);
            console.log("id--",exists.id);
            await likeable.save();
            await exists.deleteOne();
            var isAdded=false;
            console.log("isadded ",isAdded);
        }else{
            const newLike= await this.likeRepository.create({
                user: userId,
                onModel:modelType,
                likeable: modelId
            });
            console.log(newLike);
            likeable.likes.push(newLike);
            await likeable.save();
            var isAdded=true;
        }
        console.log("likeservice",isAdded);
        return isAdded;
    }
}

export default LikeService;