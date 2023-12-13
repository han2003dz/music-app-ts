import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-song.model";
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

// [GET] /songs/detail
export const detail = async (req: Request, res: Response) => {
  const slugSong: string = req.params.slugSong;

  const song = await Song.findOne({
    slug: slugSong,
    status: "active",
    deleted: false,
  });

  const singer = await Singer.findOne({
    _id: song.singerId,
    deleted: false,
    status: "active",
  }).select("fullName");

  const topic = await Topic.findOne({
    _id: song.topicId,
    deleted: false,
    status: "active",
  }).select("title");

  const favoriteSong = await FavoriteSong.findOne({
    // userId: "",
    songId: song.id,
  });

  song["isFavoriteSong"] = favoriteSong ? true : false;

  res.render("client/pages/songs/detail", {
    pageTile: "chi tiết bài hát",
    song: song,
    topic: topic,
    singer: singer,
  });
};

// [PATCh] /songs/like/:typeLike/:idSong
export const like = async (req: Request, res: Response) => {
  const idSong: string = req.params.idSong;
  const typeLike: string = req.params.typeLike;

  const song = await Song.findOne({
    _id: idSong,
    status: "active",
    deleted: false,
  });

  // let newLike = song.like;

  // if (typeLike == "like") {
  //   newLike += 1;
  // } else {
  //   newLike -= 1;
  // }

  const newLike = typeLike == "like" ? song.like + 1 : song.like - 1;

  await Song.updateOne(
    {
      _id: idSong,
    },
    {
      like: newLike,
    }
  );

  res.json({
    code: 200,
    message: "Thành công!",
    like: newLike,
  });
};

// [PATCh] /songs/favorite/:typeFavorite/:idSong
export const favorite = async (req: Request, res: Response) => {
  const idSong: string = req.params.idSong;
  const typeFavorite: string = req.params.typeFavorite;
  switch (typeFavorite) {
    case "favorite":
      const existFavoriteSong = await FavoriteSong.findOne({
        songId: idSong,
      });
      if (!existFavoriteSong) {
        const record = new FavoriteSong({
          // userId: "",
          songId: idSong,
        });
        await record.save();
      }
      break;

    case "unfavorite":
      await FavoriteSong.deleteOne({
        songId: idSong,
      });
      break;
    default:
      break;
  }
  res.json({
    code: 200,
    message: "Thành công!",
  });
};

// [PATCH] /songs/listen/:idSong
export const listens = async (req: Request, res: Response) => {
  try {
    const idSong: string = req.params.idSong;

    const song = await Song.findOne({
      _id: idSong,
    });

    const listens: number = song.listens + 1;

    await Song.updateOne(
      {
        _id: idSong,
      },
      {
        listens: listens,
      }
    );

    const dataSong = await Song.findOne({
      _id: idSong,
    });

    res.json({
      code: 200,
      message: "Thành công!",
      listens: dataSong.listens,
    });
  } catch (error) {}
};
