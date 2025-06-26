const { v4 } = require("uuid");
const AWS = require("aws-sdk");

exports.agregarAsig = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { nombre, codigo, docenteAsignado } = JSON.parse(event.body);
  const id = v4();
  const items = {
    id,
    nombre,
    codigo,
    docenteAsignado,
  };

  await dynamoDB
    .put({
      TableName: "asignaturas",
      Item: items,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};
