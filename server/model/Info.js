const User = (Sequelize, DataTypes) => {
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
        allowNull: true,
      },

      money: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      category: {
        type: DataTypes.STRING(5),
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
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
