const AWS = require("aws-sdk");

exports.actualizarUser = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const { nombre, correo, rol } = JSON.parse(event.body);
  await dynamoDB
    .update({
      TableName: "usuario",
      Key: { id },
      UpdateExpression: "set nombre = :nombre, correo = :correo, rol = :rol",
      ExpressionAttributeValues: {
        ":nombre": nombre,
        ":correo": correo,
        ":rol": rol,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();
  return {
    status: 200,
    body: JSON.stringify({
      message: "Usuario actualizado correctamente",
    }),
  };
};
