import express from "express";
import { ImageService } from "../services/image.service";
import { PreferenceService } from "../services/preference.service";

export class ImageController {
  constructor(
    private imageService: ImageService,
    private preferenceService: PreferenceService
  ) {}

  getImage = async (req: express.Request, res: express.Response) => {
    try {
      let user_id = req.session.user?.id;

      if (!user_id) {
        res.status(401);
        res.json({ error: "this api is not available to guest" });
        return;
      }

      //   let { preference } = req.body; //preference is an array, e.g [2,4,5,6]

      let preference = await this.preferenceService.getPreference(user_id); //preference is an array, e.g [2,4,5,6]

      let searchResult = await this.imageService.getImage(preference);

      return res.status(200).json({
        status: true,
        images: searchResult, //images is an array fill with objects: [{file_name: 123.png, XXX: YYY},{...},{...}, ...]
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        status: false,
        error: String(error),
      });
    }
  };

  getImagesByKeyword = async (req: express.Request, res: express.Response) => {
    try {
      let { keyword } = req.body; //keyword = user's input

      let searchResult = await this.imageService.getImagesByKeyword(keyword);
      // console.log(searchResult);

      return res.status(200).json({
        status: true,
        images: searchResult, //images is an array fill with objects: [{file_name: 123.png, XXX: YYY},{...},{...}, ...]
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        error: String(error),
      });
    }
  };
}
