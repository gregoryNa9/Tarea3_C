const AWS = require("aws-sdk");

exports.obtenerAsig = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const result = await dynamoDB
    .get({
      TableName: "asignaturas",
      Key: { id },
    })
    .promise();
  const asignatura = result.Item;
  return {
    status: 200,
    body: asignatura,
  };
};
