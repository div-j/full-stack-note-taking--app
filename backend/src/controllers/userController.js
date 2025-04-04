import { User } from "../models/userMode.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function createUser(req, res) {
  const { password, email } = req.body;

  try {
    if (!password || password.length < 8) {
      return res.status(401).json({ message: "Invalid password or username" });
    }

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.insertOne({ password: hashedPassword, email });
    res.status(200).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);    
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    //sending jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json({ message: "User found", token: token , user});
  } catch (error) {
    res.status(505).json({ message: error.message });
  }
}

export async function profile(req, res) {
  try {
    const id = req.user.id;
    console.log(id);

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.json({ message: "User not found" });
    }

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(505).json({ message: "Error fecthing user profile" });
  }
}
