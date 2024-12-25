const express = require("express");
const app = express();
const PORT = 1000;
const User = require("./model/model");
const connectDB = require("./config/database");
const validateFunction = require("./utils/validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.json());

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(404).send("something went wrong" + err.message);
  }
});

app.post("/signUp", async (req, res) => {
  try {
    validateFunction(req);
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("user added succesfully...");
  } catch (err) {
    res.status(400).send("something went wrong !  " + err.message);
  }
});

app.post("/logIn", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credential ");
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (isCorrectPassword) {
      const token = await jwt.sign({ _id: user._id }, "DevTinder007", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      res.send("login sucessfull ! ");
    } else {
      res.send("Invalid Credential");
    }
  } catch (err) {
    res.status(404).send("something went wrong!!! " + err.message);
  }
});

app.patch("/updateUser/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["lastName", "password", "skills", "gender"];
    const isAllowedUpdates = Object.keys(data).every((n) =>
      ALLOWED_UPDATES.includes(n)
    );
    if (!isAllowedUpdates) {
      throw new Error("Update Not allowed for this field!! ");
    }
    if (data.skills.length > 2) {
      throw new Error(" Not More than two ");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("user updated sucessfully !!");
  } catch (err) {
    res.status(400).send("something went wrong" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("MongoDb is connected...");
    app.listen(PORT, () => {
      console.log("server started at the PORT - " + PORT);
    });
  })
  .catch((err) => {
    console.log("something went wrong.. mongoDB is not connected...");
  });
