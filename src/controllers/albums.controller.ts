import { Request, Response } from "express";
import { albumsService } from "../services/albums.service";
import { Album } from "../types/common";

export const getAlbumsByPopularity = async (req: Request, res: Response): Promise<void> => {
  const artistName = req.query.artistName as string;
  let albums: Album[] = [];

  if(artistName) {
    albums = await albumsService.getAlbumsByPopularity(artistName, req.ip);
  }
  
  res.send(albums);
}