'use strict'

import Joi from '@hapi/joi';

/*
{
	"type": "Tweet.Post",
  "title": "second tweet",
  "createdAt": "2022-02-11",
  "actor": {
    "id": "uniqueId",
    "name": "name",
    "handle": "@someHandle"
  },
  "content": "200 characters long utf-8 formatted another content"
}
*/
const validatePostMessage = event => new Promise (async (resolve, reject) => {
  const schema = Joi.object({
    type: Joi.string().required().valid("Tweet.Post"),
    id: Joi.string().min(3).max(40).optional(),
    title: Joi.string().min(1).max(40).optional(),
    createdAt: Joi.date().iso().required(),
    actor: Joi.object({
      id: Joi.string().optional(),
      name: Joi.string().required(),
      handle: Joi.string().required(),
      email: Joi.string().email().optional()
    }),
    content: Joi.string().allow('').max(200).required()
  });
  try {
    const value = await schema.validate(event);
    resolve(value);
  } catch(e) {
    console.log(e);
    reject(new Error(e.message))
  }
});

/*
const event = {
  "type": "Tweet.Comment",
  "id": "uniqueIdInString",
  "title": "stringData",
  "createdAt": "date in Standard ISO 8601 format in UTC, 2019-10-12T12:50:40.53Z",
  "actor": {
    "id": "uniqueId",
    "name": "name",
    "handle": "@someHandle"
  },
  "refId": "stringData"
  "content": "200 characters long utf-8 formatted content"
}
*/
const validateCommentMessage = event => new Promise (async (resolve, reject) => {
  const schema = Joi.object({
    type: Joi.string().required().valid("Tweet.Comment"),
    id: Joi.string().min(3).max(40).optional(),
    title: Joi.string().min(1).max(40).optional(),
    createdAt: Joi.date().iso().required(),
    actor: Joi.object({
      id: Joi.string().optional(),
      name: Joi.string().required(),
      handle: Joi.string().required(),
      email: Joi.string().email().optional()
    }),
    refId: Joi.string().min(3).max(40).required(),
    content: Joi.string().allow('').max(200).required()
  });
  try {
    const value = await schema.validate(event);
    resolve(value);
  } catch(e) {
    console.log(e);
    reject(new Error(e.message))
  }
});

/*
const event = {
  type: "Tweet.Comment",
  id: "uniqueIdInString",
  title: "stringData",
  createdAt: "date in Standard ISO 8601 format in UTC, 2019-10-12T12:50:40.53Z",
  actor: {
    id: "uniqueId",
    name: "name",
    handle: "@someHandle"
  },
    refId: "stringData"
  content: "200 characters long utf-8 formatted content"
}
*/
const validateReactionMessage = event => new Promise (async (resolve, reject) => {
  const schema = Joi.object({
    type: Joi.string().required().valid("Tweet.Reaction"),
    id: Joi.string().min(3).max(40).optional(),
    title: Joi.string().min(1).max(40).optional(),
    createdAt: Joi.date().iso().required(),
    actor: Joi.object({
      id: Joi.string().optional(),
      name: Joi.string().required(),
      handle: Joi.string().required(),
      email: Joi.string().email().optional()
    }),
    refId: Joi.string().min(3).max(40).required(),
    content: Joi.string().allow('').max(200).required()
  });
  try {
    const value = await schema.validate(event);
    resolve(value);
  } catch(e) {
    console.log(e);
    reject(new Error(e.message))
  }
});

export {
  validatePostMessage,
  validateCommentMessage,
  validateReactionMessage
}