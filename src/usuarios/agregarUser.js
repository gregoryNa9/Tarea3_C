const { v4 } = require("uuid");
const AWS = require("aws-sdk");
exports.agregarUser = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { nombre, correo, rol } = JSON.parse(event.body);
  const id = v4();
  const items = {
    id,
    nombre,
    correo,
    rol,
  };
  await dynamoDB
    .put({
      TableName: "usuario",
      Item: items,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};
