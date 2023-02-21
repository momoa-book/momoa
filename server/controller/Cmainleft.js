// const { User } = require('../model');
const { Info } = require('../model');
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
