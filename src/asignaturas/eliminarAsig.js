const AWS = require("aws-sdk");

exports.eliminarAsig = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  await dynamoDB
    .delete({
      TableName: "asignaturas",
      Key: { id },
    })
    .promise();

  return {
    status: 200,
    body: {
      message: "Asignatura eliminada",
    },
  };
};
