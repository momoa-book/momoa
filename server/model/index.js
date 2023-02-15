const Sequelize = require('sequelize');
const config = require('../config/config.js')['development'];
// const env = process.env.NODE_ENV || 'development';

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./User')(sequelize, Sequelize);
module.exports = db;

db.Info = require('./Info')(sequelize, Sequelize);
module.exports = db;

db.Sheet = require('./Sheet')(sequelize, Sequelize);
module.exports = db;

db.User.hasMany(db.Sheet, {
  foreignKey: 'user_id', //Sheet 테이블에있는 거
  sourceKey: 'user_id', //User테이블에있는 user_id
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

//user테이블하고 sheet테이블의 관계설정

db.User.hasMany(db.Sheet, {
  foreignKey: 'user_id', //Sheet 테이블에있는 거
  sourceKey: 'user_id', //User테이블에있는 user_id
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

db.Sheet.belongsTo(db.User, {
  foreignKey: 'user_id', // sheet테이블의 foreignkey
  targetKey: 'user_id', // user테이블의 user_id
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

//sheet테이블하고 info테이블의 관계설정

db.Sheet.hasOne(db.Info, {
  foreignKey: 'sheet_id', //Info 테이블에있는 거
  sourceKey: 'sheet_id', //Sheet테이블에있는 sheet_id
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

db.Info.belongsTo(db.Sheet, {
  foreignKey: 'sheet_id', // info테이블의 foreignkey
  targetKey: 'sheet_id', // sheet테이블의 sheet_id
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
