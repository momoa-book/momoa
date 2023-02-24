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

// exports.get_personalinfo = async (req, res) => {
//   const user_email = req.decoded.user_email;
//   const user_name = req.decoded.user_name;

//   try {
//     const user = await User.findOne({
//       where: {
//         user_email: user_email,
//       },
//       include: [
//         {
//           model: DBhub,
//           where: {
//             auth: true,
//           },
//           attributes: ['sheet_id'],
//           include: {
//             model: Sheet,
//             attributes: ['sheet_name'],
//           },
//         },
//       ],
//     });

//     res.status(200).json({
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: '정보를 받아올 수 없습니다',
//     });
//   }
// };

// exports.get_personalinfo = async (req, res) => {
//   try {
//     const user_email = req.decoded.user_email;
//     const sheets = await Sheet.findAll({
//       include: [
//         {
//           model: DBhub,
//           where: {
//             user_email,
//             auth: 2,
//           },
//           attributes: ['user_email'],
//           include: {
//             model: User,
//             attributes: ['user_name'],
//           },
//         },
//       ],
//       attributes: ['sheet_id', 'sheet_name', 'creator'],
//     });

//     let data = sheets.map((sheet) => ({
//       sheet_id: sheet.sheet_id,
//       sheet_name: sheet.sheet_name,
//       creator: sheet.creator,
//       user_email: sheet.DBhubs[0].user_email,
//       user_name: sheet.DBhubs[0].User.user_name,
//       auth: 2,
//     }));

//     data = data
//       .filter((el) => el.auth === 2)
//       .map((el) => ({
//         sheet_id: el.sheet_id,
//         sheet_name: el.sheet_name,
//         creator: el.creator,
//         user_email: el.user_email,
//         user_name: el.user_name,
//       }));

//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: '서버 에러' });
//   }
// };

//2. 마이페이지에서 get 요청 (1.초대알림여부를 확인auto값으로 2..sheet name,sheet idsheet,creater, //유저테이블하고 db허브)
exports.get_personalinfo = async (req, res) => {
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

    const sheet_auth = await Sheet.findAll({
      attributes: ['sheet_name', 'sheet_id', 'creator'],
      raw: true,
      include: [
        {
          model: DBhub,
          required: true,
          attributes: ['auth'],
          where: {
            user_email: user_email,
            auth: 2,
          },
        },
      ],
    });

    res.status(200).json({
      sheet,
      user_name,
      user_email,
      sheet_auth,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'ERROR',
    });
  }
};

//수입지출 등등 입력하는

//4. 수입지출 등등 입력하는   post '/writeinfo'

exports.write_info = (req, res) => {
  try {
    let data = {
      sheet_id: req.body.sheet_id,
      input_date: req.body.input_date,
      type: req.body.type,
      money: req.body.money,
      category: req.body.category,
      memo: req.body.memo,
    };

    Info.create(data).then((result) => {
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'ERROR',
    });
  }
};



exports.write_goal = (req, res) => {
  Sheet.update(
    { goal: req.body.goal },
    { where: { sheet_id: req.body.sheet_id } }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
    });

};

//6. 초대받으면 auth값을  t로 update하는 초대버튼 api

//7. 거절하면 auth값을 날려버리는 api

//8. 초대 하면 유저값을 반환해주는 api     get(/getUserByEmail)

exports.getUserByEmail = async (req, res) => {
  // const user_email = req.decoded.user_email;

  try {
    const { user_email } = req.body;
    const user = await User.findOne({
      where: { user_email },
      attributes: ['user_email', 'user_name'],
    });

    if (!user) {
      return res.status(404).json({ message: '유저가 없습니다' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 에러 ' });
  }
};

//9. 초대 버튼을 누르면 auto를 f로 create해주는 api

//10. sheet문서 만들기 api
