const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.obtenerAsignaturasPorDocente = async (event) => {
  const { docenteId } = event.pathParameters;

  const result = await dynamoDB
    .scan({
      TableName: "asignaturas",
      FilterExpression: "docenteId = :docenteId",
      ExpressionAttributeValues: {
        ":docenteId": docenteId,
      },
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(result.Items),
  };
};
