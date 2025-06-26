const { v4 } = require("uuid");
const AWS = require("aws-sdk");

exports.agregarLab = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { nombre, ubicacion, equiposDisponibles } = JSON.parse(event.body);
  const id = v4();
  const items = {
    id,
    nombre,
    ubicacion,
    equiposDisponibles,
  };

  await dynamoDB
    .put({
      TableName: "laboratorios",
      Item: items,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};
