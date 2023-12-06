import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-song.model";
import { Request, Response } from "express";

export const index = async (req: Request, res: Response) => {
  res.send("OK");
};
