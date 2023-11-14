import express from "express";
import { knex } from "../client";
import { LogoGenerationService } from "../services/logoGeneration.service";
import { LogoGenerationController } from "../controllers/logoGeneration.controller";
import { UploadPictureService } from "../services/uploads-picture.service";

export const logoGenerationRoutes = express.Router();
export const logoGenerationService = new LogoGenerationService(knex);
export const uploadPictureService = new UploadPictureService(knex);

export const logoGenerationController = new LogoGenerationController(logoGenerationService, uploadPictureService);

logoGenerationRoutes.post(
  "/logogenerating",
  logoGenerationController.companyNameAndCompanyDescriptionToGoogleCollab
);
