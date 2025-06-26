const AWS = require("aws-sdk");

exports.eliminarPar = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  await dynamoDB
    .delete({
      TableName: "parciales",
      Key: { id },
    })
    .promise();

  return {
    status: 200,
    body: {
      message: "Parcial eliminado",
    },
  };
};
