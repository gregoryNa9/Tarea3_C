const { v4 } = require("uuid");
const AWS = require("aws-sdk");

exports.agregarPract = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const body = JSON.parse(event.body);

  const {
    nombre,
    descripcion = '',
    fechaLimite = '',
    docenteId,
    laboratorioAsignado = '',
    parcialAsociado = ''
  } = body;

  const id = v4();
  const item = {
    id,
    nombre,
    descripcion,
    fechaLimite, // se guarda como fechaLimite para que coincida con el frontend
    docenteId,
    laboratorioAsignado,
    parcialAsociado
  };

  await dynamoDB.put({
    TableName: "practicas",
    Item: item,
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(item),
  };
};
