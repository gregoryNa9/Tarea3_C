const { v4 } = require("uuid");
const AWS = require("aws-sdk");

exports.agregarPar = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { nombre, asignatura, calificaciones } = JSON.parse(event.body);
  const id = v4();

  const items = {
    id,
    nombre,
    asignatura,
    calificaciones // array con notas y estudiantes
  };

  await dynamoDB
    .put({
      TableName: "parciales",
      Item: items,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};
