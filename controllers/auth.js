const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/Users');

require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

const signin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password)
            return res.status(400).json({ message: "all fields are required" });

        const oldUser = await UserModel.findOne({ email })
        if (!oldUser) return res.status(400).json({ message: `User doesn't exist!` })

        confirmPassword = bcrypt.compare(password, oldUser.password)
        if (!confirmPassword) return res.status(400).json({ message: "Invalid credentials!" })

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, SECRET_KEY, { expiresIn: '2h'})

        res.status(200).json({ message: "user loggedin successfully!", data: token})

    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

const signup= async (req, res) => {
  try {
      const { firstname, lastname, email, password } = req.body;

      if (!firstname || !lastname || !email || !password)
          return res.status(400).json({ message: "all fields are required" });

      const oldUser = await UserModel.findOne({ email })
      if (oldUser) return res.status(400).json({ message: "User already exist!" })

      const hashedPassword = await bcrypt.hash(password, 12)

      const result = await UserModel.create({
          firstname,
          lastname,
          email,
          password: hashedPassword
      })

      const token = await jwt.sign({ email: result.email, id: result._id }, SECRET_KEY, { expiresIn: '2h' })

      res.status(201).json({ message: "user created successfully!", data: token})
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { signin, signup}
