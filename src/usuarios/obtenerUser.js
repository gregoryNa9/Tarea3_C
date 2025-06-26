const AWS = require("aws-sdk");

exports.obtenerUser = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const result = await dynamoDB
    .get({
      TableName: "usuario",
      Key: { id },
    })
    .promise();
  const usuario = result.Item;
  return {
    status: 200,
    body: usuario,
  };
};
