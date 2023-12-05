import { Express } from "express";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
const clientRoutes = (app: Express): void => {
  
  app.use(`/topics`, topicRoutes);
  app.use()
};

export default clientRoutes;
