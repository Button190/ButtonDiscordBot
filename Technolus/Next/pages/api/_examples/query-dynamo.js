import * as uuid from 'uuid';
import dynamoDb from '../../lib/dynamo-db';

import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    //origin: "*",
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST'],
  })
)

export default async function handler(req, res) {

  //Run cors
  await cors(req, res)  

  // if (req.method === 'PUT') {
  //   const item = {
  //     id: uuid.v4(),
  //     content: req.body.content,
  //     createdAt: Date.now()
  //   };

  //   await dynamoDb.put({
  //     Item: item
  //   });

  //   res.status(201).json(item);
  // }

  if (req.method === 'GET' && !req.query.fuzzy) {
    //console.log(req.query);
    const { Item } = await dynamoDb.get({
      Key: {
        user: req.query.user,
        project: req.query.project
      }
    });

    res.status(200).json(Item);
  }
  
  // get items with primary key and beguining with sort key
  if (req.method === 'GET' && req.query.fuzzy) {
    //console.log(req.query);
      const Item = await dynamoDb.query({
        KeyConditionExpression: "#user = :user and begins_with(#project, :project)",
        ExpressionAttributeNames:{
            "#user": "user",
            "#project": "project"
        },
        ExpressionAttributeValues: {
          ":user": req.query.user,
          ":project": req.query.project,
        },
      });

    res.status(200).json(Item);
  }


  if (req.method === 'POST') {
    const params = JSON.parse(req.body);

    const { Attributes } = await dynamoDb.update({
      Key: {
        "user": params.user,
        "project": params.project
      },
      //UpdateExpression: "SET #project = if_not_exists(#project, :project), #value = :value",
      //UpdateExpression: "#user = :user, #project = :project, #value = :value",
      UpdateExpression: "SET #value = :value",
      ExpressionAttributeNames:{
        //"#user": "user",
        //"#project": "project",
        "#value": "value",
      },
      ExpressionAttributeValues: {
        ":value": params.value,
      },
        ReturnValues: "UPDATED_NEW" // 'ALL_NEW'
    });

    res.status(200).json(Attributes);
  }

  if (req.method === 'DELETE') {
    await dynamoDb.delete({
      Key: {
        user: req.query.user,
        project: req.query.project
      }
    });

    res.status(204).json({});
  }
}