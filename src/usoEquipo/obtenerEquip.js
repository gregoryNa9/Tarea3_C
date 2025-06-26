const AWS = require("aws-sdk");

exports.obtenerTask = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const {id} = event.pathParameters;
  const result = await dynamoDB
    .get({
      TableName: "tabla",
      Key : {id},
    })
    .promise();
  const tarea = result.Item;
  return {
    status: 200,
    body: tarea,
  };
};
