'use strict'

import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const config = require('../../serverDefination.json');

export const updateDB = obj => new Promise(async (resolve, reject) => {
  const url = config.dbUrl;
  const client = new MongoClient(url);
  let connection;
  try {
    await client.connect();
    connection = 'connected';
    const db = client.db(config.dbName);
    let collectionName = '';
    switch (obj.type) {
      case 'Tweet.Post':
        collectionName = 'posts';
        break;
      case 'Tweet.Comment':
        collectionName = 'comments';
        break;
      case 'Tweet.Reaction':
        collectionName = 'reaction';
        break; 
    }
    obj.createdAt = new Date(obj.createdAt);
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(obj);
    await client.close();
    connection = 'disconnected';
    resolve(result);
  } catch(e) {
    console.log(e.message);
    if(connection === 'connected') {
      await client.close();
    }
    reject(e);
  }
});

export const queryDB = (collectionName, obj = {}) => new Promise(async (resolve, reject) => {
  const url = config.dbUrl;
  const client = new MongoClient(url);
  let connection;
  try {
    await client.connect();
    connection = 'connected';
    const db = client.db(config.dbName);
    const collection = db.collection(collectionName);
    const result = await collection.find(obj).toArray();
    await client.close();
    connection = 'disconnected';
    resolve(result);
  } catch(e) {
    console.log(e.message);
    if(connection === 'connected') {
      await client.close();
    }
    reject(e);
  }
});
