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

  const songs = await Song.find({
    deleted: false,
    topicId: topic.id,
    status: "active",
  }).select("title avatar singerId like createdAt slug");

  for (const song of songs) {
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
      deleted: false,
    }).select("fullName");

    song["infoSinger"] = infoSinger;
  }

  res.render("client/pages/songs/list", {
    pageTitle: topic.title,
    songs: songs,
  });
};

export const detail = async (req: Request, res: Response) => {
  const slugSong: string = req.params.slugSong;
  console.log(slugSong);
  const
  res.render("client/pages/songs/detail", {
    pageTile: "chi tiết bài hát",
  });
};
