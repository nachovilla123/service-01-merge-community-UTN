import express from "express";
import { mergeCommunities } from "./service/mergeCommunities";
import { swaggerSpec } from "../swaggerConfig"; // Ajusta la ruta según tu estructura de archivos
import swaggerUi from "swagger-ui-express";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json()); // middleware que transforma la req.body en un objeto JSON

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene la lista de usuarios.
 *     responses:
 *       200:
 *         description: Lista de usuarios.
 */
app.get("/", (_req, res) => {
  console.log("nos saludan!");
  res.send("Hello World! hola a todos");
});

/**
 * @swagger
 * /api/fusion:
 *   post:
 *     summary: Fusionar dos comunidades.
 *     description: Fusiona dos comunidades proporcionadas en el cuerpo de la solicitud.
 *     parameters:
 *       - name: community1
 *         in: body
 *         description: Primera comunidad a fusionar.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *             degreeOfConfidence:
 *               type: number
 *             members:
 *               type: array
 *               items:
 *                 type: object
 *             interestingServices:
 *               type: array
 *               items:
 *                 type: object
 *             interestingEstablishments:
 *               type: array
 *               items:
 *                 type: object
 *       - name: community2
 *         in: body
 *         description: Segunda comunidad a fusionar.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *             degreeOfConfidence:
 *               type: number
 *             members:
 *               type: array
 *               items:
 *                 type: object
 *             interestingServices:
 *               type: array
 *               items:
 *                 type: object
 *             interestingEstablishments:
 *               type: array
 *               items:
 *                 type: object
 *     responses:
 *       200:
 *         description: Comunidad fusionada exitosamente.
 *         schema:
 *           type: object
 *           properties:
 *             mergedCommunity:
 *               type: object
 *       400:
 *         description: Error de solicitud, se requieren dos comunidades válidas para la fusión.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */
app.post("/api/fusion", (req, res) => {
 
  const { community1, community2 } = req.body;

  if (!community1 || !community2) {
    return res
      .status(400)
      .json({ error: "Se requieren dos comunidades válidas para la fusión." });
  }
  // Fusiona las dos comunidades
  const mergedCommunity = mergeCommunities(community1, community2);

  // Envía la comunidad fusionada como respuesta
  res.json({ mergedCommunity });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
