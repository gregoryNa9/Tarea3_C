const { v4 } = require("uuid");
const AWS = require("aws-sdk");

exports.agregarEquip = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { estudiante, practica, equipoUsado, horaInicio, horaFin } = JSON.parse(event.body);
  const id = v4();
  const items = {
    id,
    estudiante,
    practica,
    equipoUsado,
    horaInicio,
    horaFin,
  };

  await dynamoDB
    .put({
      TableName: "usoEquipo",
      Item: items,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};
