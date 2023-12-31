import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "./docs/swagger";

import recommendationsRoutes from "./routes/recommendations";
import mergeRoutes from "./routes/merge";
const cors = require("cors");

const app = express();
// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // middleware que transforma la req.body en un objeto JSON

//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));

const PORT = 3000;

app.get("/", (_req, res) => {
  console.log("nos saludan!");
  res.send("Hello World! hola a todos hola");
});

//routes
app.use("/api/recommendations", recommendationsRoutes);
app.use("/api/fusion", mergeRoutes);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

