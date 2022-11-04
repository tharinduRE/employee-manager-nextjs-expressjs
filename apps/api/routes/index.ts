import express, { Router } from "express";
import config from "../config";
import docsRoute from "./swagger.route";
import empRoute from "./employee.route";

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

/**
 * Declare routes for all models
 */
const defaultIRoute: IRoute[] = [
  {
    path: "/employees",
    route: empRoute,
  },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === "development") {
  router.use("/docs", docsRoute);
}

export default router;
