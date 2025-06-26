const AWS = require("aws-sdk");

exports.obtenerPar = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const result = await dynamoDB
    .get({
      TableName: "parciales",
      Key: { id },
    })
    .promise();
  const parcial = result.Item;
  return {
    status: 200,
    body: parcial,
  };
};
