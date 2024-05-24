import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (name === "" || email === "" || password === "") {
    return res.status(400).json({ message: "All Fields Are Required" });
  }

  let user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "Already User Registered" });
  } else {
    const hashPass = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashPass });
    res.json({ message: "Registration Successful", user });
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    return res.status(400).json({ message: "All Fields Are Required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "User Not Found" });
  } else {
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.json({ message: "Password Not Correct" });
    }

    const token = jwt.sign({ userId: user._id },process.env.JWT_Secret, { expiresIn: "1d" });

    res.json({ message: `Welcome back ${user.name}`, token });
  }
};
