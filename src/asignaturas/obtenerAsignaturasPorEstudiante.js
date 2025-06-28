const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.obtenerAsignaturasPorEstudiante = async (event) => {
  const { id } = event.pathParameters;

  const result = await dynamoDB
    .scan({
      TableName: "asignaturas"
    })
    .promise();

  const asignaturas = result.Items.filter(asig =>
    asig.estudiantes && asig.estudiantes.includes(id)
  );

  return {
    statusCode: 200,
    body: JSON.stringify(asignaturas)
  };
};
