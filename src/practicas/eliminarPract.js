const AWS = require("aws-sdk");

exports.eliminarPract = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  await dynamoDB
    .delete({
      TableName: "practicas",
      Key: { id },
    })
    .promise();

  return {
    status: 200,
    body: {
      message: "Practica eliminada",
    },
  };
};
