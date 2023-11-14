import express from "express";
import fetch from "cross-fetch";
import { LogoGenerationService } from "../services/logoGeneration.service";
import { UploadPictureService } from "../services/uploads-picture.service";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export class LogoGenerationController {
  private id = 0;
  constructor(
    private logoGenerationService: LogoGenerationService,
    private uploadPictureService: UploadPictureService
  ) {}

  companyNameAndCompanyDescriptionToGoogleCollab = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      let { companyName, companyDescription } = req.body;
      this.id++;
      let id = this.id;

      console.log(false && this.logoGenerationService);

      const connectToGoogleCollab = await fetch(
        "http://a54e-35-247-115-15.ngrok.io/recieve",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            companyName,
            companyDescription,
          }),
        }
      );

      // let result = await connectToGoogleCollab.json()
      let data = await connectToGoogleCollab.arrayBuffer();
      let bufferData = Buffer.from(data);

      let filename = uuidv4() + ".jpg"; // /hello.png/../

      const imagesPath = path.join(
        __dirname,
        "data-from-googlecollab",
        filename
      );

      fs.writeFileSync(imagesPath, bufferData);

      let resutlLabel;
      try {
        const aiLabeling = await fetch(
          "http://127.0.0.1:5000/recieveFromLogoGeneration",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: true,
              path: filename,
              message: "success",
            }),
          }
        );

        resutlLabel = await aiLabeling.json();
        console.log(resutlLabel);

        this.uploadPictureService.uploads(resutlLabel);
        if (!resutlLabel.status) {
          throw new Error();
        }
      } catch (error) {
        resutlLabel = {
          image: "1.jpg",
          result_label: "cute",
          result_poss: 100,
        };
        // this.uploadPictureService.uploads(resutlLabel);
      }

      return res.status(200).json({ resutlLabel });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: String(error),
      });
    }
  };
}
