const AWS = require("aws-sdk");

exports.actualizarLab = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const { nombre, ubicacion, equiposDisponibles } = JSON.parse(event.body);

  await dynamoDB
    .update({
      TableName: "laboratorios",
      Key: { id },
      UpdateExpression: "set nombre = :nombre, ubicacion = :ubicacion, equiposDisponibles = :equiposDisponibles",
      ExpressionAttributeValues: {
        ":nombre": nombre,
        ":ubicacion": ubicacion,
        ":equiposDisponibles": equiposDisponibles,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();

  return {
    status: 200,
    body: JSON.stringify({
      message: "Laboratorio actualizado correctamente",
    }),
  };
};
