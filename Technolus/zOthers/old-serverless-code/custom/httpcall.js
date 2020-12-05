/*
 * TODO: ADD ITERATION OVER MULTIPLE SEARCH ENTRIES IN A RANGE, AND AN ARRAY OF OBJECTS
 *
 * TODO: scrape: json
 * TODO: scrape: json --> POST/OTHER_VERBS
 *
 * TODO: scrape: substring to locate json object/script tags, perform eval and get properties from json.
 *
 * TODO: scrape: remove lowercase body in cheerios contains
 *
 * TODO: scrape: make sure that we can still use regex afterwords if needed to clean up the results. ???
 *
 * TODO: scrape: allow for rounds (asynchronous calls from) and subrounds (synchrous calls that take into account previous results via regex)
 *
 * Study the possibility of allowing for chaining.
 *
 */
import * as uuid from "uuid";
import dynamoDb from "../libs/dynamodb-lib";
import handler from "../libs/handler-lib";
//const axios = require('axios');
//const matchAll = require("match-all");
//const cheerio = require('cheerio');
//const url = require('url');

//npm install axios cheerio

//sources:
//https://www.twilio.com/blog/web-scraping-and-parsing-html-with-node-js-and-cheerio
//https://morioh.com/p/b260ff42c61f

//tester:
// cd gestor-api
// sls invoke local -f httpcall
// (cls && sls invoke local -f httpcall -p mocks/get-entry.json)

export const main = handler(async (event, context) => {
  event = mockEvent();
  const functionDefs = event.pathParameters;
  let retVal = await processDefinitions(functionDefs, "", event);
  console.log(retVal);
  retVal = "Success";
  return retVal;
});

async function processDefinitions(functionDefs, path, event) {
  let retVal = "";
  let promises = [];
  for (let i in functionDefs) {
    let functionDef = functionDefs[i];
    promises[i] = runFunction(functionDef, event);
  }
  retVal = await Promise.all(promises);
  return retVal;
}

const allFunctions = importAllFunctions();
async function runFunction(functionDef, event) {
  const importedFunction = allFunctions[functionDef.functionName];
  let retVal = importedFunction(functionDef.inputs, event);
  if (functionDef.next) {
    // retVal = await processDefinitions(functionDef.next);
  }
  return retVal;
}


//---------------------------------------------------------------------------------------------------
function mockEvent() {
  return {
    "pathParameters": [
      {
        // "functionName": "create",
        "functionName": "readAll",
        // "functionName": "read",
        // "functionName": "update",
        // "functionName": "delete",
        "inputs":
        {
          "id": { "type": "entryID", "value": 'b0c8f4d0-94db-11ea-91de-57177b392698' },
          "content": { "type": "string", "value": "The Flash s01e01" },
          "link": { "type": "string", "value": "http://www.google.com/" },
        },
        'outputs': { "some_pretty_named_return": "some_return" },
        'next': [],
      }
    ],
    "requestContext": {
      "identity": {
        "cognitoIdentityId": "USER-SUB-1234"
      }
    }
  };
}
//---------------------------------------------------------------------------------------------------

function importAllFunctions() {
  const allFunctions = {
    "create": async function (inputs, event) {
      const params = {
        TableName: process.env.tableName,
        Item: {
          userId: event.requestContext.identity.cognitoIdentityId, // federated through the Cognito Identity Pool
          entryId: uuid.v1(), // a unique uuid
          createdAt: Date.now(), //current Unix timestamp
          content: inputs.content.value
        }
      };
      await dynamoDb.put(params);
      return params.Item;
    },
    "readAll": async function (inputs, event) {
      const params = {
        TableName: process.env.tableName,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": event.requestContext.identity.cognitoIdentityId
        }
      };
      const result = await dynamoDb.query(params);
      return result.Items;
    },
    "read": async function (inputs, event) {
      const params = {
        TableName: process.env.tableName,
        Key: {
          userId: event.requestContext.identity.cognitoIdentityId,
          entryId: inputs.id.value
        }
      };
      const result = await dynamoDb.get(params);
      if (!result.Item) throw new Error("Item not found.");
      return result.Item;
    },
    "query": async function (inputs, event) {
      const params = {
        TableName: process.env.tableName,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": event.requestContext.identity.cognitoIdentityId
        }
      };
      const result = await dynamoDb.query(params);
      return result.Items;
    },
    "update": async function (inputs, event) {

      //id? remove from loop,loop things. add to attvals and to expr.
      let expression = "SET content = :content, link = :link";
      let attributeValues = {
        ":content": inputs.content.value || null,
        ":link": inputs.link.value || null
      };

      const params = {
        TableName: process.env.tableName,
        Key: {
          userId: event.requestContext.identity.cognitoIdentityId,
          entryId: inputs.id.value
        },
        UpdateExpression: expression,
        ExpressionAttributeValues: attributeValues,
        ReturnValues: "ALL_NEW"
      };

      await dynamoDb.update(params);
      //const result = await dynamoDb.update(params);
      //return result.Item;
      return { status: true };
    },
    "delete": async function (inputs, event) {
      const params = {
        TableName: process.env.tableName,
        Key: {
          userId: event.requestContext.identity.cognitoIdentityId,
          entryId: inputs.id.value
        }
      };
      await dynamoDb.delete(params);
      return { status: true };
    },

    "regexMatch": async function (inputs, event) {
      let re = new RegExp(inputs.regex.value, inputs.regex.flags + 'g');
      let str = inputs.string.value;

      var xResults = [];
      var xArray = [];

      while ((xArray = re.exec(str))) {
        if (xArray != null && xArray.length > 1 && xArray[1] != '') {
          var xResult = [];
          for (var i = 1; i < xArray.length; i++) {
            xResult.push(xArray[i]);
          }
          xResults.push(xResult);
        } else {
          break;
        }

        console.log(xResult);
      };

      let retVal = 'true';
      return retVal; // string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    },

    "regexMatch_describe": function (inputs, event) {
      let retVal = {
        inputs: [
          {
            'name': 'regex',
            'regex': '.*',
            'type': 'string'
          },
          {
            'name': 'flags',
            'regex': '^((?!b).)*$',
            'type': 'string'
          },
        ]
      };
      return retVal;
    },


  };
  return allFunctions;
}
//---------------------------------------------------------------------------------------------------

// /**
//  * Returns the regex object created from string.
//  * @param {string} regexStr - the regex string.
//  */
// function strToRegex(regexStr) {
//   let re = new RegExp(regexStr, '');
//   return re;
// }

// /**
//  * Returns the str parsed with regex.
//  * @param {string} str - String to parse.
//  * @param {regex} regex - Regex object.
//  */
// function regexPreparse(str, regex) {
//   regex = new RegExp(regex.source, '');
//   if (!str) {
//     return false;
//   }
//   str = str.match(regex);
//   if (!str) {
//     return false;
//   }
//   str = str[1];
//   return str;
// }

// /**
//  * If JSON, returns the json, else: returns false.
//  * @param {jsonString} String - String to parse.
//  */
// function tryParseJSON(jsonString) {
//   try {
//     var o = JSON.parse(jsonString);
//     // Handle non-exception-throwing cases:
//     if (o && typeof o === "object") {
//       return o;
//     }
//   }
//   catch (e) { }
//   return false;
// }

// /**
//  * If string, wrap with array: "string" => ["string"]
//  * If not string, return input parameter without modification
//  * @param {*} variable - if string, will be wrapped into array, else return without modification.
//  */
// function normalizeStringAsArray(variable) {
//   //preparse data, successivellly applying regular expressions contained in an array.
//   if (typeof variable == 'string' || variable instanceof String) {
//     return [variable];
//   }
//   return variable;
// }