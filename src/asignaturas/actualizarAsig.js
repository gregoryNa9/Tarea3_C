const AWS = require("aws-sdk");

exports.actualizarAsig = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const { nombre, codigo, docenteAsignado } = JSON.parse(event.body);

  await dynamoDB
    .update({
      TableName: "asignaturas",
      Key: { id },
      UpdateExpression: "set nombre = :nombre, codigo = :codigo, docenteAsignado = :docenteAsignado",
      ExpressionAttributeValues: {
        ":nombre": nombre,
        ":codigo": codigo,
        ":docenteAsignado": docenteAsignado,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();

  return {
    status: 200,
    body: JSON.stringify({
      message: "Asignatura actualizada correctamente",
    }),
  };
};
