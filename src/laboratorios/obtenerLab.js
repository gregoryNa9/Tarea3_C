const AWS = require("aws-sdk");

exports.obtenerLab = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const result = await dynamoDB
    .get({
      TableName: "laboratorios",
      Key: { id },
    })
    .promise();
  const laboratorio = result.Item;
  return {
    status: 200,
    body: laboratorio,
  };
};

