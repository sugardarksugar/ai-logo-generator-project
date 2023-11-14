import express from "express";
import { ImageController } from "../controllers/image.controller";
import { imageService, preferenceService } from "../services";

export const imageRoutes = express.Router();

export const imageController = new ImageController(
  imageService,
  preferenceService
);

imageRoutes.post("/image", imageController.getImage);
imageRoutes.post("/imagesByKeyword", imageController.getImagesByKeyword);
