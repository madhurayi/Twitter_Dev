import {CommentRepository,TweetRepository }from "../repository/index.js";


class CommentService {
    constructor(){
      this.commentRepo= new CommentRepository();
      this.tweetRepo= new TweetRepository();  
    }
    async create(modelId,modelType,userId,content){
        if(modelType=='Tweet'){
            var commentable= await this.tweetRepo.get(modelId);
        }else if(modelType=='Comment'){
            console.log("modelId ",modelId);
            var commentable=await this.commentRepo.get(modelId);
            console.log("commentable",commentable);
        }else{
            throw new Error('Unknown model type');
        }
        const comment= await this.commentRepo.create({
            content: content,
            userId: userId,
            onModel:modelType,
            commentable: modelId,
            comments:[]
        });
        console.log("comment created ",comment);
        commentable.comments.push(comment);
        await commentable.save();
        return comment;
    }
}

export default CommentService;