import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { Request, Response } from "express";
import { *asPopper } from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js';

// [GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
  const topic = await Topic.findOne({
    slug: req.params.slugTopic,
    deleted: false,
  });

  const songs = await Song.find({
    deleted: false,
    topicId: topic.id,
    status: "active",
  }).select("title avatar singerId like createdAt slug");

  for

  res.render("client/pages/songs/list", {
    pageTitle: "Trang danh sách bài hát",
  });
};
