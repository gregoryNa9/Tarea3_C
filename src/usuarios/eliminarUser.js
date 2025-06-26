const AWS = require("aws-sdk");

exports.eliminarUser = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  await dynamoDB
    .delete({
      TableName: "usuarios",
      Key: { id },
    })
    .promise();

  return {
    status: 200,
    body: {
      message: "Usuario eliminado",
    },
  };
};
