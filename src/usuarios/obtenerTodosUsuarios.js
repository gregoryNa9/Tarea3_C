const AWS = require("aws-sdk");

exports.obtenerTodosUsuarios = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  try {
    const result = await dynamoDB.scan({
      TableName: "usuario",
    }).promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", 
      },
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: "Error al obtener los usuarios", details: error.message }),
    };
  }
};
