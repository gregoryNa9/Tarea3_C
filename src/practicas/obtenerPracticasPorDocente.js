const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.obtenerPracticasPorDocente = async (event) => {
  const { docenteId } = event.pathParameters;

  const params = {
    TableName: "practicas",
  };

  const data = await dynamoDB.scan(params).promise();

  // Filtrar por el campo `docenteId`
  const practicasDocente = data.Items.filter(p => p.docenteId === docenteId);

  return {
    statusCode: 200,
    body: JSON.stringify(practicasDocente),
  };
};
