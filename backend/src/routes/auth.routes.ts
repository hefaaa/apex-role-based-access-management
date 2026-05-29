import express from "express";
import User from "../models/User";

const router = express.Router();

router.post("/login", async (req, res) => {

  try {

    const {
      username,
      password,
      role
    } = req.body;

    const user = await User.findOne({
      username,
      password,
      role
    });

    // Simulate API Delay
    setTimeout(() => {

      if (user) {

        res.json({

          token: "dummy-jwt-token",

          user

        });

      } else {

        res.status(401).json({

          message: "Invalid Credentials"

        });

      }

    }, 3000);

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

});

export default router;