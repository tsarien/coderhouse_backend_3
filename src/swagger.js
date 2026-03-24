import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación Proyecto Adoptme Coderhouse",
      description: "Coderhouse Backend III",
      version: "1.0.0",
    },
  },
  apis: [`./src/docs/**/*.yaml`],
};

export const specs = swaggerJSDoc(swaggerOptions);
