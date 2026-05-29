import express from "express";
import User from "../models/User";

const router = express.Router();

router.get("/", async (req, res) => {

  try {

    const users = await User.find();

    setTimeout(() => {

      res.json(users);

    }, 2000);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch users"
    });

  }

});

router.post("/", async (req, res) => {

  try {

    const {

      name,
      email,
      username,
      password,
      department,
      role

    } = req.body;

    if (
      !name ||
      !email ||
      !username ||
      !password
    ) {

      return res.status(400).json({
        message: "All fields are required"
      });

    }

    const existingUser =
      await User.findOne({
        username
      });

    if (existingUser) {

      return res.status(400).json({
        message: "Username already exists"
      });

    }

    const newUser = new User({

      name,
      email,
      username,
      password,
      department,

      role,

      accessLevel:
        role === "Admin"
          ? "Full"
          : "Basic"

    });

    await newUser.save();

    res.json({
      message: "User Added"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to add user"
    });

  }

});


router.put("/:id", async (req, res) => {

  try {

    await User.findByIdAndUpdate(

      req.params.id,

      req.body,

      { new: true }

    );

    res.json({

      message: "User Updated"

    });

  } catch (error) {

    res.status(500).json({

      message: "Update Failed"

    });

  }

});


router.delete("/:id", async (req, res) => {

  try {

    await User.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "User Deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: "Delete Failed"
    });

  }

});

export default router;