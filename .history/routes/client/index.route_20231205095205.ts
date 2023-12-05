import { Express } from "express";
import { topicRoutes } from "./topic.route";
import {son}
const clientRoutes = (app: Express): void => {
  
  app.use(`/topics`, topicRoutes);
};

export default clientRoutes;
