const { User, sequelize } = require('../model');
const { Sheet } = require('../model');
const { Info } = require('../model');
const { DBhub } = require('../model');
// const userDatabase = require('../model/Database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//sheet_id에 해당하는 모든 정보 불러오는
exports.get_main = async (req, res) => {
  let result = await Info.findAll({
    attributes: ['type', 'input_date', 'money'],
    // where: { type: req.query.type },
  });
  res.send(result);
};

//가계부 정보 불러오기
exports.getsheetdata = async (req, res) => {
  console.log(req.decoded);
  //가계부 탭을 클릭하면 해당 가계부로 데이터를 담아 보내준다.
  //필요한 data: sheet_id
  //1. 차트 작성에 필요한 데이터
  // 1-1. 월별 수입 합계
  //Info 테이블에서 현재 날짜가 속해 있는 연도의, 월 별 수입 금액 데이터 추출

  //현재 연도 구하기
  let today = new Date();
  let nowYear = today.getFullYear();

  //월, 금액 불러오기 (조건 : 수입, 연도=현재연도, 요청한 가계부 id와 동일)
  let income = await Info.findAll({
    attributes: [
      'money',
      sequelize.where(sequelize.fn('MONTH', sequelize.col('input_date'))),
    ],
    where: {
      sheet_id: req.query.sheet_id,
      type: 1,
      // $and: [
      //   { sheet_id: req.query.sheet_id },
      //   sequelize.where(
      //     sequelize.fn('YEAR', sequelize.col('input_date')),
      //     nowYear
      //   ),
      //   { type: 1 },
      // ],
    },
  });
  console.log(`올해 수입들: ${income}`);
  console.log('가계부 정보 불러오기?');

  // 1-2. 월별 지출 합계
  //Info 테이블에서 현재 날짜가 속해 있는 연도의, 월 별 수입 금액 데이터 추출
  let spend = await Info.findAll({
    attributes: [
      'money',
      sequelize.where(sequelize.fn('MONTH', sequelize.col('input_date'))),
    ],
    where: {
      sheet_id: req.query.sheet_id,
      type: 2,
      // $and: [
      //   { sheet_id: req.query.sheet_id },
      //   sequelize.where(
      //     sequelize.fn('YEAR', sequelize.col('input_date')),
      //     nowYear
      //   ),
      //   { type: 2 },
      // ],
    },
  });
  console.log(`올해 지출들: ${spend}`);
  //2. 달력에 뿌려질 데이터

  res.send(true);
};

//수입지출 등등 입력하는
exports.write_info = (req, res) => {
  let data = {
    input_date: req.body.input_date,
    type: req.body.type,
    money: req.body.money,
    category: req.body.category,
  };

  Info.create(data).then((result) => {
    res.send(result);
  });
};

//목표 입력하는
exports.write_goal = (req, res) => {
  let data = {
    goal: req.body.goal,
  };

  Info.create(data).then((result) => {
    res.send(result);
  });
};

//마이페이지
