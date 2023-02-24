const { sequelize } = require('../model');
const { Op } = require('sequelize');
const { User, Sheet, DBhub, Info } = require('../model');
//가계부 정보 불러오기
exports.getsheetdata = async (req, res) => {
  //현재 연도 구하기
  let today = new Date();
  let nowYear = today.getFullYear();
  //날짜, 금액 불러오기 (조건 : 수입, 연도=현재연도, 요청한 가계부 id와 동일)
  //수입
  let findIncome = await Info.findAll({
    order: [['input_date', 'ASC']],
    attributes: ['input_date', 'money'],
    where: {
      [Op.and]: [
        { sheet_id: req.query.sheet_id },
        { type: 1 },
        sequelize.where(
          sequelize.fn('YEAR', sequelize.col('input_date')),
          nowYear
        ),
      ],
    },
  });

  //지출
  let findSpend = await Info.findAll({
    attributes: ['input_date', 'money'],
    where: {
      [Op.and]: [
        { sheet_id: req.query.sheet_id },
        { type: 2 },
        sequelize.where(
          sequelize.fn('YEAR', sequelize.col('input_date')),
          nowYear
        ),
      ],
    },
  });

  //결과 배열 정리하기
  let incomeData = [];
  let months = [];
  findIncome.forEach((element) => {
    const { input_date, ...otherdata } = element.dataValues;
    otherdata.month = element.dataValues.input_date.split('-')[1];
    incomeData.push(otherdata);
    months.includes(element.dataValues.input_date.split('-')[1])
      ? months
      : months.push(element.dataValues.input_date.split('-')[1]);
  });

  console.log('수입 데이터 : ', incomeData);

  // 같은 키값 합치기
  const incomeValues = incomeData.reduce((acc, cur) => {
    acc[cur.month] = acc[cur.month] || [];
    acc[cur.month].push(cur.money);
    return acc;
  }, {});

  const add = function (arr) {
    return arr.reduce((a, b) => a + b, 0);
  };
  const income = Object.keys(incomeValues).map((key) => {
    return {
      month: key,
      money: add(incomeValues[key]),
    };
  });

  console.log(income);
  /////////////////////////////////////////지출/////////////////////////////////////
  //결과 배열 정리하기
  let spendData = [];
  let spendmonths = [];
  console.dir(findSpend);
  findSpend.forEach((element) => {
    const { input_date, ...otherdata } = element.dataValues;
    console.log(element.dataValues.input_date);
    otherdata.month = element.dataValues.input_date.split('-')[1];
    spendData.push(otherdata);
    spendmonths.includes(element.dataValues.input_date.split('-')[1])
      ? spendmonths
      : spendmonths.push(element.dataValues.input_date.split('-')[1]);
  });

  console.log('지출 데이터 : ', spendData);

  // 같은 키값 합치기
  const spendValues = spendData.reduce((acc, cur) => {
    acc[cur.month] = acc[cur.month] || [];
    acc[cur.month].push(cur.money);
    return acc;
  }, {});

  const addSpend = function (arr) {
    return arr.reduce((a, b) => a + b, 0);
  };
  const spend = Object.keys(spendValues).map((key) => {
    return {
      month: key,
      money: addSpend(spendValues[key]),
    };
  });

  console.log(spend);

  res.json({ incomeArr: income, spendArr: spend });
};
