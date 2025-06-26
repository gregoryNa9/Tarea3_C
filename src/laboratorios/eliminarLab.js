const AWS = require("aws-sdk");

exports.eliminarLab = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  await dynamoDB
    .delete({
      TableName: "laboratorios",
      Key: { id },
    })
    .promise();

  return {
    status: 200,
    body: {
      message: "Laboratorio eliminado",
    },
  };
};
