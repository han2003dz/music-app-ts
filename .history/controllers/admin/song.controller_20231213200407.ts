import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";

// [GET] /admin/songs
export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({
    deleted: false,
  });

  res.render("admin/pages/songs/index", {
    pageTitle: "Quản lý bài hát",
    songs: songs,
  });
};
