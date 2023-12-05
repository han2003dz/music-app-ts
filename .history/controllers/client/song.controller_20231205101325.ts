import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { Request, Response } from "express";

// [GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
  const topic = await Topic.findOne({
    slug: req.params.slugTopic,
    deleted: false,
  });

  const songs = await Song.findOne({
    deleted: false,
    topicId: topic.id,
    status: "active",
  }).select("title avatar singerId like createdAt slug");
  res.render("client/pages/songs/list", {
    pageTitle: "Trang danh sách bài hát",
  });
};
