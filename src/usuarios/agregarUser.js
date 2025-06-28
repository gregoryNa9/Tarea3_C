const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.agregarUser = async (event) => {
  try {
    console.log("Event recibido:", event);

    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "No se recibió body en la solicitud" }),
      };
    }

    let data;
    try {
      data = JSON.parse(event.body);
    } catch (parseError) {
      console.error("Error al parsear JSON:", parseError);
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Body no es un JSON válido" }),
      };
    }

    const { nombre, correo, rol } = data;

    if (!nombre || !correo || !rol) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Faltan datos obligatorios: nombre, correo o rol" }),
      };
    }

    const id = v4();
    const item = { id, nombre, correo, rol };

    console.log("Guardando item en DynamoDB:", item);
    await dynamoDB
      .put({
        TableName: "usuario",
        Item: item,
      })
      .promise();

    console.log("Item guardado correctamente.");

    return {
      statusCode: 200,
      body: JSON.stringify(item),
    };
  } catch (error) {
    console.error("Error en agregarUser:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error interno del servidor",
        error: error.message || error.toString(),
      }),
    };
  }
};
