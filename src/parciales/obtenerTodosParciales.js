const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.obtenerTodosParciales = async () => {
  try {
    const result = await dynamoDB.scan({ TableName: "parciales" }).promise();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // ← MUY IMPORTANTE
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*", // ← también aquí
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({ message: "Error interno", error }),
    };
  }
};
