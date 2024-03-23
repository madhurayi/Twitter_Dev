import CommentService from '../services/comment-service.js';

const commentService= new CommentService();

export const createComment= async (req,res) => {
    try{
        const response=await commentService.create(req.query.modelId,req.query.modelType,req.body.userId,req.body.content);
        return res.status(200).json({
            success: true,
            data: response,
            error:{},
            message: "Successfully toggled like"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            data:{},
            message: 'Something went wrong',
            err: error
        });
    }
}