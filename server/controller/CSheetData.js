const { sequelize } = require('../model');
const { Op } = require('sequelize');
const { User, Sheet, DBhub, Info } = require('../model');
//가계부 정보 불러오기
exports.getsheetdata = async (req, res) => {
  //현재 연도 구하기
  let today = new Date();
  let nowYear = today.getFullYear();

  //월, 금액 불러오기 (조건 : 수입, 연도=현재연도, 요청한 가계부 id와 동일)
  let income = await Info.findAll({
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

  //월 별 합계 구하기
  //월 추출
  console.log(income[0].dataValues.input_date.split('-')[1]);
  //[{month: income[i].dataValues.input_date.split('-')[1], income: income[0].dataValues.money}]
  //
  //

  // 1-2. 월별 지출 합계
  //Info 테이블에서 현재 날짜가 속해 있는 연도의, 월 별 수입 금액 데이터 추출
  let spend = await Info.findAll({
    attributes: ['money', sequelize.fn('MONTH', sequelize.col('input_date'))],
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
  console.dir(spend);

  //2. 달력에 뿌려질 데이터

  res.send(income);
};
