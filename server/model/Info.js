const Info = (Sequelize, DataTypes) => {
  return Sequelize.define(
    'Info',
    {
      sheet_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },

      input_date: {
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true,
      },

      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      money: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      category: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      memo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      goal: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'Info',
      freezeTableName: true,
      timestamps: false,
    }
  );
};

module.exports = Info;
