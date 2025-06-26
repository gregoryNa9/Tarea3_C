const AWS = require("aws-sdk");

exports.actualizarPract = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const { nombre, fecha, parcialAsociado, laboratorioAsignado } = JSON.parse(event.body);

  await dynamoDB
    .update({
      TableName: "practicas",
      Key: { id },
      UpdateExpression: "set nombre = :nombre, fecha = :fecha, parcialAsociado = :parcialAsociado, laboratorioAsignado = :laboratorioAsignado",
      ExpressionAttributeValues: {
        ":nombre": nombre,
        ":fecha": fecha,
        ":parcialAsociado": parcialAsociado,
        ":laboratorioAsignado": laboratorioAsignado,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();

  return {
    status: 200,
    body: JSON.stringify({
      message: "Práctica actualizada correctamente",
    }),
  };
};
