import express from "express";
import { PreferenceController } from "../controllers/preference.controller";
import { preferenceService } from "../services";

export const preferenceRoutes = express.Router();

export const preferenceController = new PreferenceController(preferenceService);

preferenceRoutes.post("/preference", preferenceController.insertPreference);
preferenceRoutes.get("/preference", preferenceController.getPreference);
