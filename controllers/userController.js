const userModel = require('../models/user');
const fs = require('fs');

exports.createUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const files = req.files;

    const user = await userModel.find({ email });

    const emailRan1 = Math.floor(Math.random() * 1000);
    const emailRan2 = Math.floor(Math.random() * 100);

    if (user.length === 1) {
      // const imagePath = `./images`;
      // console.log(imagePath);

      // fs.unlinkSync(imagePath);
      return res.status(400).json({
        message: `${email} has already been used by another user. Try ${email.slice(0, -10).toLowerCase()
          + emailRan1 + email.slice(-10)} or ${email.slice(0, -10).toLowerCase() + emailRan2 + email.slice(-10)}`
      })
    };

    const newUser = await userModel.create({
      fullName,
      email,
      password,
      profileImage: files.profileImage[0].filename,
      catalogs: files.catalogs.map((e) => e.filename)
    });

    res.status(201).json({
      message: 'User created successfully',
      data: newUser
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}


exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      message: 'List of all users',
      total: users.length,
      data: users
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}


exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    };

    res.status(200).json({
      message: 'Check user below',
      data: user
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}


exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    };

    const file = user.catalogs.map((e) => { return e });
    
    const filePath = `./images/${file.forEach((e) => {return e})}`
    console.log(fs.existsSync(filePath));
    


    // const deletedUser = await userModel.findByIdAndDelete(id);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}