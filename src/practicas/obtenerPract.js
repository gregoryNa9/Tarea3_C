const AWS = require("aws-sdk");

exports.obtenerPract = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const result = await dynamoDB
    .get({
      TableName: "practicas",
      Key: { id },
    })
    .promise();
  const practica = result.Item;
  return {
    status: 200,
    body: practica,
  };
};
