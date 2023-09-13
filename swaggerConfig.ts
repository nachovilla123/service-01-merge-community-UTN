import swaggerJsdoc from "swagger-jsdoc";

 const options = {
   swaggerDefinition: {
     info: {
       title: "Mi API REST con Swagger",
       version: "1.0.0",
       description: "Documentación de mi API REST con Swagger",
     },
     basePath: "/",
   },
   apis: ["src/*.ts"], // Rutas donde se encuentran tus definiciones Swagger
 };

 export const swaggerSpec = swaggerJsdoc(options);
