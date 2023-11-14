import express from "express";
import { PreferenceService } from "../services/preference.service";

export class PreferenceController {
  constructor(private preferenceService: PreferenceService) {}

  getPreference = async (req: express.Request, res: express.Response) => {
    let user_id = req.session.user?.id ?? -1;

    try {
      let searchResult = await this.preferenceService.getPreference(user_id);

      return res.status(200).json({
        status: true,
        preference: searchResult, //preference is an array
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        error: String(error),
      });
    }
  };

  insertPreference = async (req: express.Request, res: express.Response) => {
    try {
      let { data } = req.body;

      if (data.length < 3) {
        return res.status(400).json({
          status: false,
          message: "Please select at least three themes",
        });
      } else {
        let user_id = req.session.user?.id ?? -1;
        await this.preferenceService.insertPreference(user_id, data);

        return res.status(200).json({
          status: true,
          message:
            "Thank you for selecting preferences, please enjoy our services.",
        });
      }
    } catch (error) {
      return res.status(500).json({ error: String(error) });
    }
  };
}
