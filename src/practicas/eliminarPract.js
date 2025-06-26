const AWS = require("aws-sdk");

exports.eliminarTask = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const {id} = event.pathParameters;
  await dynamoDB
    .delete({
      TableName: "tabla",
      Key : {id},
    })
    .promise();

  return {
    status: 200,
    body: {
        message: "Tarea eliminada",
      },
  };
};
