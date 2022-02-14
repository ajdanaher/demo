import CODES from '../helpers/statusCodes';
import { validatePostMessage,
  validateCommentMessage,
  validateReactionMessage } from '../helpers/messageValidator';
import { updateDB, queryDB } from '../helpers/DBOperations';

export const validateInputMessage = function (req) {
  switch (req.body.type) {
    case 'Tweet.Post':
      return validatePostMessage(req);
    case 'Tweet.Comment':
      return validateCommentMessage(req);
    case 'Tweet.Reaction':
      return validateReactionMessage(req);
    default:
      return Promise.reject({message: "Incorrect Message Type"});
  }
}

export const messagePost = async (req, res) => { 
  const { body } = req;
  if(!body.type) {
    res.status(CODES.BAD_REQUEST).json({message: "Missing Type of Message"});
  }
  try {
    await validateInputMessage(req);
  } catch (e) {
    res.status(CODES.BAD_REQUEST).json(e);
  }
  
  try {
    const result = await updateDB(body);
    console.log(result);
    res.status(CODES.OK).json({message: "Success"});
  } catch(e) {
    console.log(e);
    res.status(CODES.INTERNAL_SERVER_ERROR).json({message: "Error"});
  }
}

export const getDataFromDB = (collection, days) => new Promise(async (resolve, reject) => {
  try {
    const today = new Date();
    const priorDate = new Date(new Date().setDate(today.getDate() - days));
    const where = {
      "createdAt" : {"$gte": priorDate}
    };
    const result = await queryDB(collection, where);
    console.log(result);
    resolve(result);
  } catch(e) {
    console.log(e);
    reject(e);
    
  }
});

export const getTweets = async (req, res) => {
  try {
    let query = '';
    ({ query } = req);
    const days = query.days || 3;
    const result = await getDataFromDB('posts', days);
    res.status(CODES.OK).json(result);
  } catch (e) {
    console.log(e);
    res.status(CODES.INTERNAL_SERVER_ERROR).json({message: "Error"});
  }
}

export const getTweetsWithMaxComments = async (req, res) => {
  try {
    const tweets = await getDataFromDB('posts', 5);
    for(const tweet of tweets) {
      const where = {
        "refId" : tweet._id.toString()
      };
      const comments = await queryDB('comments', where);
      tweet.comments = comments.length;
    }
    const orderedTweets = tweets.sort((t1, t2) => t1.comments - t2.comments);
    res.status(CODES.OK).json(orderedTweets);
  } catch(e) {
    console.log(e);
    res.status(CODES.INTERNAL_SERVER_ERROR).json({message: "Error"});
  } 
}

export const getActivities = (tweets) => {
  const users = {};
  for(const tweet of tweets) {
    if(users.hasOwnProperty(tweet.actor.handle)) {
      users[tweet.actor.handle] += 1;
    } else {
      users[tweet.actor.handle] = 1;
    }
  }
  const top5Users = Object.entries(users)
                          .sort(([ , x], [ , y]) => y - x )
                          .slice(0, 5);
  return top5Users;
}

export const getUsersWithMaximumTweets = async (req, res) => {
  try {
    const tweets = await getDataFromDB('posts', 30);
    const top5Users = getActivities(tweets);
    res.status(CODES.OK).json(top5Users); 
  } catch (e) {
    console.log(e);
    res.status(CODES.INTERNAL_SERVER_ERROR).json({message: "Error"});
  }
}

export const getUsersWithMaximumInteractions = async (req, res) => {
  try {
    const tweets = await getDataFromDB('posts', 30);
    const comments = await getDataFromDB('comments', 30);
    const reaction = await getDataFromDB('reaction', 30);
    const totalActivities = [...tweets, ...comments, ...reaction];

    const top5Users = getActivities(totalActivities);
    res.status(CODES.OK).json(top5Users); 
  } catch (e) {
    console.log(e);
    res.status(CODES.INTERNAL_SERVER_ERROR).json({message: "Error"});
  }
}

