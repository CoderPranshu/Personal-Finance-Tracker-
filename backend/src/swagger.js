/**
 * swagger.js
 * ----------
 * Swagger (OpenAPI) setup.
 *
 * This generates interactive docs at:
 * - GET /api-docs
 * - GET /api-docs.json
 */

const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

function mountSwagger(app) {
  const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "Personal Finance Tracker API",
      version: "1.0.0",
      description: "Simple API docs for the Finance Tracker project",
    },
    servers: [{ url: "http://localhost:5000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  };

  const options = {
    swaggerDefinition,
    // We'll add JSDoc annotations later; for now this keeps the page working.
    apis: ["./src/routes/*.js"],
  };

  const swaggerSpec = swaggerJSDoc(options);

  app.get("/api-docs.json", (req, res) => res.json(swaggerSpec));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = { mountSwagger };

