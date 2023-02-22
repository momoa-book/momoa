const { User } = require('../model');
// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const user = await User.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user[0]) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const user_email = user[0].user_email;

        const user_name = user[0].user_name;
        const accessToken = jwt.sign(
          { user_email, user_name },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '2m',
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.verifyToken = (req, res) => {
  res.send(true);
};
