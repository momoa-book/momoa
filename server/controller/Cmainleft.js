const { sequelize } = require('../model');
const { Op } = require('sequelize');
const { User, Sheet, DBhub, Info } = require('../model');

// const userDatabase = require('../model/Database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// //sheet_id에 해당하는 모든 정보 불러오는
// exports.get_main = async (req, res) => {
//   let result = await Info.findAll({
//     attributes: ['type', 'input_date', 'money'],
//     // where: { type: req.query.type },
//   });
//   res.send(result);
// };

//1. 로그인 성공후 가계부 페이지 나올때 DBhub에서 user_email을 찾아서 user의 정보를 가져오고,sheet_id를 기준으로 sheet테이블에서 sheet_name,sheet id를 가져오는 get요청  //
//get  '/getsheetid',

exports.get_sheetid = async (req, res) => {
  console.log(req.decoded);
  const user_email = req.decoded.user_email;
  const user_name = req.decoded.user_name;
  console.log(user_email);

  try {
    const sheet = await Sheet.findAll({
      attributes: ['sheet_name', 'sheet_id', 'DBhubs.sheet_id'],
      raw: true,

      include: [
        {
          model: DBhub,
          required: true,
          attributes: [],
          where: {
            user_email: user_email,
          },
        },
      ],
    });

    // const user = await User.findOne({
    //   where: {
    //     user_email: user_email,
    //   },
    //   include: {
    //     model: DBhub,
    //     attributes: ['sheet_id'],
    //     include: {
    //       model: Sheet,
    //       attributes: ['sheet_name'],
    //     },
    //   },
    //   attributes: ['user_email'],
    // });

    res.status(200).json({
      sheet,
      user_name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'ERROR',
    });
  }
};

//2. 마이페이지에서 get 요청 (1.초대알림여부를 확인auto값으로 2..sheet name,sheet idsheet,creater, //유저테이블하고 db허브)

exports.get_personalinfo = async (req, res) => {
  const userEmail = req.decoded.user_email;

  try {
    const user = await User.findOne({
      where: {
        user_email: userEmail,
      },
      include: [
        {
          model: DBhub,
          where: {
            auth: true,
          },
          attributes: ['sheet_id'],
          include: {
            model: Sheet,
            attributes: ['sheet_name'],
          },
        },
      ],
    });

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: '정보를 받아올 수 없습니다',
    });
  }
};

//수입지출 등등 입력하는

//3. 초대받으면 auth값을  f로 먼저 create하고

//4. 수입지출 등등 입력하는   post '/writeinfo'

exports.write_info = (req, res) => {
  let data = {
    input_date: req.body.input_date,
    type: req.body.type,
    money: req.body.money,
    category: req.body.category,
    memo: req.body.memo,
  };

  Info.create(data).then((result) => {
    res.send(result);
  });
};

//5. 목표 입력하는 .post('/writegoal',
exports.write_goal = (req, res) => {
  let data = {
    goal: req.body.goal,
  };

  Info.create(data).then((result) => {
    res.send(result);
  });
};
