import express from 'express';

const router = express.Router({ mergeParams: true });
import { messagePost,
  getTweets,
  getTweetsWithMaxComments,
  getUsersWithMaximumTweets,
  getUsersWithMaximumInteractions
 } from '../handlers/ApplicationHandler';

router.route('/tweet').post(messagePost);
router.route('/comment').post(messagePost);
router.route('/reaction').post(messagePost);

router.route('/tweets').get(getTweets);
router.route('/tweetswithmaxcomments').get(getTweetsWithMaxComments);
router.route('/userswithmaxtweets').get(getUsersWithMaximumTweets);
router.route('/userswithmaxinteractions').get(getUsersWithMaximumInteractions);

export default router;
