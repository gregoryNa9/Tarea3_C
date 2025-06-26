const AWS = require("aws-sdk");

exports.actualizarEquip = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const { estudiante, practica, equipoUsado, horaInicio, horaFin } = JSON.parse(event.body);

  await dynamoDB
    .update({
      TableName: "usoEquipo",
      Key: { id },
      UpdateExpression: "set estudiante = :estudiante, practica = :practica, equipoUsado = :equipoUsado, horaInicio = :horaInicio, horaFin = :horaFin",
      ExpressionAttributeValues: {
        ":estudiante": estudiante,
        ":practica": practica,
        ":equipoUsado": equipoUsado,
        ":horaInicio": horaInicio,
        ":horaFin": horaFin,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();

  return {
    status: 200,
    body: JSON.stringify({
      message: "Registro actualizado correctamente",
    }),
  };
};
