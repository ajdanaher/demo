1.	Used MongoDB Database and implemented the project.
2.	There are three collections I create.
a.	Posts – This collection is used for original tweet.
b.	Comments – This collection is used for all Comments being created to the posts. Please note unique key for post is present in this document.
c.	Reaction - This collection is used for all reaction posted on individual post or comment. Please note unique key for post/comment is present in this document.

End points for three use cases in question –

-	Get /v1/tweetswithmaxcomments
-	Get /v1/userswithmaxtweets
-	Get /v1/userswithmaxinteractions

End points for other cases –
-	Post /v1/tweet  This end point is for a new tweet or post.
-	Post /v1/comment. This end point is for new comment posted.
-	Post /v1/reaction. This end point is for new reaction.
-	Get  /v1/tweets. This end point is for get all tweets in last 5 days. Pass query parameter days to get other then 5 days. E.g. /tweets?days=7 will give you tweets from last 7 days.

DataStructure

Post or tweet =

{
  "type": "Tweet.Post",
  "title": "second tweet",
  "createdAt": "2022-02-11", //UTC date time.
  "actor": {
    "id": "uniqueId",
    "name": "name",
    "handle": "@someHandle"
  },
  "content": "200 characters long utf-8 formatted another content"
}

Comment –
{
  "type": "Tweet.Comment",
  "id": "uniqueIdInString",
  "title": "stringData",
  "createdAt": "2022-02-11", //UTC date time.
  "actor": {
    "id": "uniqueId",
    "name": "name",
    "handle": "@someHandle"
  },
  "refId": "stringData"
  "content": "200 characters long utf-8 formatted content"
}


Reaction –
{
  "type": "Tweet.Comment",
  "id": "uniqueIdInString",
  "title": "stringData",
  "createdAt": "2022-02-11", //UTC date time.
  "actor: {
    "id": "uniqueId",
    "name": "name",
    "handle": "@someHandle"
  },
  "refId": "stringData"
  "content": "200 characters long utf-8 formatted content"
}

