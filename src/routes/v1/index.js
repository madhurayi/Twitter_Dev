import express from 'express';
import {togglelike} from '../../controllers/like-controller.js'
import {createTweet,getTweet} from '../../controllers/tweet-controller.js';
import {createComment} from '../../controllers/commetn-controller.js'
import { signup,login } from '../../controllers/auth-controller.js'; 

import {authenticate} from '../../middlewares/authentication.js';
const router= express.Router();

router.post('/tweets',authenticate,createTweet);
router.get('/tweets/:id',getTweet);
router.post('/likes/toggle',togglelike);
router.post('/signup',signup);
router.post('/login',login);

router.post('/comments',createComment);
export default router;