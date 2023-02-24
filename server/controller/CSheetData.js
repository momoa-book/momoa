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

  ///데이터 정제 함수
  function makeData(findData) {
    //결과 배열 정리하기
    let arrData = [];
    let months = [];
    findData.forEach((element) => {
      const { input_date, ...otherdata } = element.dataValues;
      otherdata.month = element.dataValues.input_date.split('-')[1];
      arrData.push(otherdata);
      months.includes(element.dataValues.input_date.split('-')[1])
        ? months
        : months.push(element.dataValues.input_date.split('-')[1]);
    });

    // 같은 키값 합치기
    const dataValues = arrData.reduce((acc, cur) => {
      acc[cur.month] = acc[cur.month] || [];
      acc[cur.month].push(cur.money);
      return acc;
    }, {});

    const add = function (arr) {
      return arr.reduce((a, b) => a + b, 0);
    };

    const result = Object.keys(dataValues).map((key) => {
      return {
        month: key,
        money: add(dataValues[key]),
      };
    });

    console.log(result);
  }

  //수입, 지출 데이터 정리해서 보내기
  const income = makeData(findIncome);
  const spend = makeData(findSpend);

  res.json({ incomeArr: income, spendArr: spend });
};

//가계부 공유하기
exports.shareSheet = async (req, res) => {
  try {
    DBhub.update(
      { guest: req.body.guest, auth: 2 },
      {
        where: {
          user_email: req.decoded.user_email,
          sheet_id: req.body.sheet_id,
        },
      }
    );
    res.status(200).json({
      msg: '초대 완료!',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: '가계부 공유하기 도중 오류가 발생했습니다. 다시 시도해주세요.',
    });
  }
};

//초대 승인, 거절 버튼
exports.inviteApproval = async (req, res) => {
  //거절일 경우 = approve값이 false일 경우
  //DBhub의 guest컬럼이 내 이메일이고 해당 가계부인 행을 삭제
  try {
    console.log(req.body.approve);
    if (req.body.approve === 'N') {
      DBhub.destroy({
        where: {
          guest: 'ahfl1129@gmail.com',
          sheet_id: req.body.sheet_id,
        },
      });
    } else {
      DBhub.update(
        { auth: 1 },
        {
          where: {
            guest: 'ahfl1129@gmail.com',
            sheet_id: req.body.sheet_id,
          },
        }
      );
    }
    res.status(200).json({
      msg: '응답 완료',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: '초대 승인/거절 처리 중 오류발생',
    });
  }
};
