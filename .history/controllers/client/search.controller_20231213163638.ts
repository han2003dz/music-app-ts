import { Request, Response } from "express";
import { convertToSlug } from "../../helpers/convertToSlug";
import Song from "../../models/song.model";

// [GET] /search/result
export const result = async (req: Request, res: Response) => {
  const keyword: string = `${req.query.keyword}`;
  let arrSongs = [];
  if (keyword) {
    const keywordRegex = new RegExp(keyword, "i");
    const unicodeSlug = convertToSlug(keyword);
    const slugRegex = new RegExp(unicodeSlug, "i");
    const songs = await Song.find({
      $or: [{ title: keywordRegex }, { slug: slugRegex }],
    });
    if(song.length > 0) {
      for(const song of songs) {
        const infoSinger = await 
      }
    }
  }

};
