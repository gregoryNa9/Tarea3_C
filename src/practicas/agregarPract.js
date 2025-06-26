const { v4 } = require("uuid");
const AWS = require("aws-sdk");

exports.agregarPract = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { nombre, fecha, parcialAsociado, laboratorioAsignado } = JSON.parse(event.body);
  const id = v4();
  const items = {
    id,
    nombre,
    fecha,
    parcialAsociado,
    laboratorioAsignado,
  };

  await dynamoDB
    .put({
      TableName: "practicas",
      Item: items,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};
