import { Router } from "express";
import { getAlbumsByPopularity } from "../controllers/albums.controller";

const albumsRouter = Router();

albumsRouter.get("/", getAlbumsByPopularity);

export default albumsRouter;