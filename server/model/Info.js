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
        type: DataTypes.STRING(4),
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

      sheet_index: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
