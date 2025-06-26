const AWS = require("aws-sdk");

exports.actualizarPar = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const { nombre, asignatura } = JSON.parse(event.body);

  await dynamoDB
    .update({
      TableName: "parciales",
      Key: { id },
      UpdateExpression: "set nombre = :nombre, asignatura = :asignatura",
      ExpressionAttributeValues: {
        ":nombre": nombre,
        ":asignatura": asignatura,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();

  return {
    status: 200,
    body: JSON.stringify({
      message: "Parcial actualizado correctamente",
    }),
  };
};
