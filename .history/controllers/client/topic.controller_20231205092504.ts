import { Request, Response } from "express";
import Topic from "../../models/topic.model";

// [GET] /topics/
export const topics = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    status: "active",
    deleted: false,
  });

  res.render("client/pages/topics/index", {
    pageTitle: "Trang topics",
    topics: topics,
  });
};
