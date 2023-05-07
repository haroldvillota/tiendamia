const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Basic Meta Informations about our API
const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Provider Integration API", version: "1.0.0" },
  },
  apis: [
    
    './routes/offerRoutes.js',
    './routes/dailySaleRoutes.js',
    './routes/orderRoutes.js',
    './routes/parameterRoutes.js',
    ],
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app, port) => {

  // Route-Handler to visit our docs
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Make our docs in JSON format available
  app.get("/api/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(
    `Docs are available on http://localhost:${port}/api/docs`
  );

};

module.exports = { swaggerDocs };