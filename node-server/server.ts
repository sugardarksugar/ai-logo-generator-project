import express from "express";
import { print } from "listening-on";
import expressSession from "express-session";
import { isLoggedIn } from "./guard";
import { logoGenerationRoutes } from "./routes/logogeneration.routes";
// import { loginRouter } from "./routes/loginRoutes";
// import { leaderBoardRouter } from "./routes/leaderboardRouter";
import { userRouter } from "./routes/user.routes";
import { preferenceRoutes } from "./routes/preference.routes";
// import { googleTrendsRoutes } from "./routes/googletrends.routes";
import { imageRoutes } from "./routes/image.routes";
import { uploadPictureRoutes } from "./routes/uploadspicture.routes";
import { env } from "./env";
import { SessionUser } from "./session";

let app = express();

app.use(
  expressSession({
    secret: env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

declare module "express-session" {
  interface SessionData {
    user?: SessionUser;
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logoGenerationRoutes);
app.use(userRouter);
app.use(preferenceRoutes);
app.use(imageRoutes);
// app.use(googleTrendsRoutes);
app.use(uploadPictureRoutes);

app.use(express.static("data-from-googlecollab"));
app.use(express.static("public"));
app.use("/generated", express.static("data-from-googlecollab"));

app.use(isLoggedIn, express.static("protected"));

let port = 8080;
app.listen(port, () => {
  print(port);
});
