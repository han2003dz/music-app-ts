import { Request, Response } from "express";
import { convertToSlug } from "../../helpers/convertToSlug";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

// [GET] /search/:type
export const result = async (req: Request, res: Response) => {
  const keyword: string = `${req.query.keyword}`;
  const type: string = req.params.type;
  let arrSongs = [];
  if (keyword) {
    const keywordRegex = new RegExp(keyword, "i");
    const unicodeSlug = convertToSlug(keyword);
    const slugRegex = new RegExp(unicodeSlug, "i");
    const songs = await Song.find({
      $or: [{ title: keywordRegex }, { slug: slugRegex }],
    });
    if (songs.length > 0) {
      for (const song of songs) {
        const infoSinger = await Singer.findOne({
          _id: song.singerId,
        });
        arrSongs.push({
          id: song.id,
          title: song.title,
          avatar: song.avatar,
          slug: song.slug,
          like: song.like,
          infoSinger: {
            fullName: infoSinger.fullName,
          },
        });
      }

      arrSongs = songs;
    }
  }

  res.render("client/pages/search/result", {
    pageTitle: `Kết quả: ${keyword}`,
    keyword: keyword,
    songs: arrSongs,
  });
};
