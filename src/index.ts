import express from "express";
import dbConnection from "./app/config/dbConnect";
import router from "./app/router/router";
import user from "./app/model/userModel";
import swaggerJSdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { PORT, SWAGGER } from "./app/constant/constant";

const baseUrl = PORT.baseUrl;
const swaggerUrl = SWAGGER.swaggerUrl;

const app = express();
app.use(express.json());

dbConnection;
user;
app.use(router);

const option = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Klickfie",
      version: "1.0.0",
    },
    servers: [
      {
        url: `${swaggerUrl}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "apiKey",
          name: "authorization",
          scheme: "bearer",
          in: "header",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["src/app/router/router.ts"],
};

const swaggerSpec: object = swaggerJSdoc(option);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.static(path.join(__dirname, "./public/upload")));

app.listen(`${baseUrl}`, () => {
  console.log(`Express server is running.`);
});
