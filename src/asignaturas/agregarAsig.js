const { v4 } = require("uuid");
const AWS = require("aws-sdk");

exports.agregarAsig = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { nombre, codigo, docenteId, estudiantes } = JSON.parse(event.body);
  const id = v4();

  const item = {
    id,
    nombre,
    codigo,
    docenteId,
    estudiantes: estudiantes || []
  };

  await dynamoDB
    .put({
      TableName: "asignaturas",
      Item: item
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(item)
  };
};
