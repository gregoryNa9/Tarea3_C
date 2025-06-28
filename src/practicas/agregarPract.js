const { v4 } = require("uuid");
const AWS = require("aws-sdk");

exports.agregarPract = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  try {
    const {
      nombre,
      descripcion = '',
      fechaLimite,
      parcialAsociado = null,
      laboratorioAsignado = null,
      docenteId,
    } = JSON.parse(event.body);

    if (!nombre || !fechaLimite || !docenteId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Nombre, fechaLimite y docenteId son obligatorios" }),
      };
    }

    // Validar que fechaLimite sea una fecha válida
    const fecha = new Date(fechaLimite);
    if (isNaN(fecha.getTime())) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "fechaLimite no es una fecha válida" }),
      };
    }

    const id = v4();

    const item = {
      id,
      nombre,
      descripcion,
      fechaLimite: fecha.toISOString(),
      parcialAsociado,
      laboratorioAsignado,
      docenteId,
    };

    await dynamoDB
      .put({
        TableName: "practicas",
        Item: item,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(item),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error interno", error: error.message }),
    };
  }
};
