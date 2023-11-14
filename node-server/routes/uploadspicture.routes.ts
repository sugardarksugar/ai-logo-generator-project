import express from "express";
// import { knex } from "../client";
import { UploadPictureController } from "../controllers/uploads-picture-controller";
// import { UploadPictureService } from "../services/uploads-picture.service";

export const uploadPictureRoutes = express.Router();

// let uploadPictureService = new UploadPictureService(knex);
let uploadPictureController = new UploadPictureController();

uploadPictureRoutes.get("/uploadsfrompython", uploadPictureController.uploads);
