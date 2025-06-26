const AWS = require("aws-sdk");

exports.eliminarEquip = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  await dynamoDB
    .delete({
      TableName: "usoEquipo",
      Key: { id },
    })
    .promise();

  return {
    status: 200,
    body: {
      message: "Registro eliminado",
    },
  };
};
