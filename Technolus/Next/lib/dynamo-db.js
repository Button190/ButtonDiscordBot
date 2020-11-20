import aws from 'aws-sdk';

const client = new aws.DynamoDB.DocumentClient({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
  params: {
    TableName: process.env.TABLE_NAME
  }
});

export default {
  query: (params) => client.query(params).promise(),
  get: (params) => client.get(params).promise(),
  put: (params) => client.put(params).promise(),
  scan: (params) => client.scan(params).promise(),
  update: (params) => client.update(params).promise(),
  delete: (params) => client.delete(params).promise()
};
