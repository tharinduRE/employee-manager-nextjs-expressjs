import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swagger from "../config/swagger";
const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition: swagger,
  apis: ["packages/components.yaml", "dist/routes/*.js"],
});

router.use("/", swaggerUi.serve);
router.get(
  "/",
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

export default router;
