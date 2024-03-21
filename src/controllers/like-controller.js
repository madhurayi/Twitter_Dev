import LikeService from '../services/like-service.js';

const likeService= new LikeService();

export const togglelike= async (req,res) => {
    try{
        const response=await likeService.toggleLike(req.query.modelId,req.query.modelType,req.body.userId);
        console.log("controller",response);
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