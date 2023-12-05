import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { Request, Response } from "express";

// [GET] /songs/:slug
export const list = async (req: Request, res: Response) => {
  res.render("client/pages/songs/list", {});
};
