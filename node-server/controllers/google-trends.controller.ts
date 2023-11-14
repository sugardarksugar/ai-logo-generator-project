// import express from "express";
// import { BrowserType } from "playwright";
// import { GoogleTrendService } from "../services/google-trends.service";

// export class GoogleTrendController {
//   browserP = this.firefox.launch({ headless: true });

//   constructor(
//     private firefox: BrowserType,
//     private googleTrendsService: GoogleTrendService
//   ) {}

//   search = async (req: express.Request, res: express.Response) => {
//     let { keywords } = req.body;

//     let browser = await this.browserP;
//     let page = await browser.newPage();

//     await page.goto("https://trends.google.com/trends/?geo=HK");
//     await page.goto(
//       `https://trends.google.com/trends/explore?q=${keywords}&geo=HK`
//     );

//     let url = await new Promise<string>((resolve) => {
//       page.on("response", async (resp) => {
//         if (!resp.url().includes("/multiline")) {
//           return;
//         }
//         let url = resp.url();

//         resolve(url);
//       });
//     });

//     const fetchRes = await fetch(url);
//     const result = await fetchRes.text();

//     let data = JSON.parse(result.substring(5));
//     await this.googleTrendsService.search(data, keywords);

//     // await page.waitForTimeout(5000);
//     await page.close();

//     res.json({});
//   };
// }
