import { Request, Response } from "express";
export const result = async (req: Request, res: Response) => {
  const keyword: string = `${req.query.keyword}`;
  let arrSongs = [];
  if (keyword) {
    const keywordRegex = new RegExp(keyword, "i");
    const unicodeSlug = convertTo
  }
};
