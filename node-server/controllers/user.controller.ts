import express from "express";
import { checkPassword, hashPassword } from "../hash";
import { UserService } from "../services/user.service";
import { PreferenceService } from "../services/preference.service";

export class UserController {
  constructor(
    private userService: UserService,
    private preferenceService: PreferenceService
  ) {}

  register = async (req: express.Request, res: express.Response) => {
    try {
      let { username, password } = req.body;
      if (!username) {
        return res.status(400).json({
          status: false,
          message: "Username is required",
        });
      }
      if (!password) {
        return res.status(400).json({
          status: false,
          message: "Password is required",
        });
      }
      if (username.length < 3) {
        return res.status(400).json({
          status: false,
          message: "Username must be at least 3 characters",
        });
      }
      if (password.length < 8) {
        return res.status(400).json({
          status: false,
          message: "Password must be at least 8 characters",
        });
      }

      let user = await this.userService.checkAccountDup(username);
      console.log(user);

      if (user.length >= 1) {
        return res.status(400).json({
          status: false,
          message: "Username already exists",
        });
      }

      let hashedPassword = await hashPassword(password);
      await this.userService.createAccount(username, hashedPassword);

      return res.status(200).json({
        status: true,
        message:
          "Successfully registered. Please login and enjoy our services. Have a nice day!",
      });
    } catch (error) {
      return res.status(500).json({ status: false, error: String(error) });
    }
  };

  checkLogin = async (req: express.Request, res: express.Response) => {
    try {
      let { username, password } = req.body;

      let user = await this.userService.findUser(username);

      if (!user) {
        res.status(400);
        return res.json({
          status: false,
          message: "Username or Password is incorrect",
        });
      }

      const isMatched = await checkPassword(password, user.password_hash);
      if (!isMatched) {
        res.status(400);
        return res.json({
          status: false,
          message: "Username or Password is incorrect",
        });
      } else {
        req.session.user = user;
        console.log(req.session);

        const preference = await this.preferenceService.getPreference(user.id);

        return res.status(200).json({
          status: true,
          message: "Successfully logged in",
          preference: preference.length >= 1,
        });

        // if (!preference) {
        //     return res.status(200).json({
        //         status: true,
        //         message: "Successfully logged in",
        //         preference: false
        //     })
        // }

        // else {
        //     return res.status(200).json({
        //         status: true,
        //         message: "Successfully logged in",
        //         preference: true
        //     });
        // }
      }
    } catch (error) {
      return res.status(500).json({ error: String(error) });
    }
  };

  logout = async (req: express.Request, res: express.Response) => {
    try {
      req.session.destroy(() => {});
      return res.json({
        status: true,
        message: "Successfully logout",
      });
    } catch (error) {
      return res.status(500).json({ error: String(error) });
    }
  };

  getUsername = async (req: express.Request, res: express.Response) => {
    let username = req.session.user?.username;
    return res.json({ username });
  };
}
