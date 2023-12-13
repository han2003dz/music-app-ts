import { Request, Response } from "express";
import { convertToSlug } from "../../helpers/convertToSlug";
export const result = async (req: Request, res: Response) => {
  const keyword: string = `${req.query.keyword}`;
  let arrSongs = [];
  if (keyword) {
    const keywordRegex = new RegExp(keyword, "i");
    const unicodeSlug = convertToSlug(keyword)
  }
};
