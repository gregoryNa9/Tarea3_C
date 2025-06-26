const AWS = require("aws-sdk");

exports.obtenerEquip = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const result = await dynamoDB
    .get({
      TableName: "usoEquipo",
      Key: { id },
    })
    .promise();
  const uso = result.Item;
  return {
    status: 200,
    body: uso,
  };
};
