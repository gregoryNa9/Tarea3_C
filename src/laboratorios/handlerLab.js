exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Tarea 1 -- Unidad 1",
      input: event
    }),
  };
};
