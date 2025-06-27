const AWS = require("aws-sdk");

exports.obtenerTodasAsignaturas = async () => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  try {
    const result = await dynamoDB
      .scan({
        TableName: "asignaturas"
      })
      .promise();

    const asignaturas = result.Items;

    return {
      statusCode: 200,
      body: JSON.stringify(asignaturas),
      headers: {
        "Content-Type": "application/json"
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al obtener asignaturas", error }),
      headers: {
        "Content-Type": "application/json"
      }
    };
  }
};
