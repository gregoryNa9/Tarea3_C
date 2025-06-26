const { v4 } = require("uuid");
const AWS = require("aws-sdk");
exports.agregarTask = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { titulo, descripcion } = JSON.parse(event.body);
  const fechaCreacion = new Date().toISOString();
  const id = v4();
  const items = {
    id,
    titulo,
    descripcion,
    fechaCreacion,
    completada: false,
  };
  await dynamoDB
    .put({
      TableName: "tabla",
      Item: items,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};
