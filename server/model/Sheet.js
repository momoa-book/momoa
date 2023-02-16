const Sheet = (Sequelize, DataTypes) => {
  return Sequelize.define(
    'Sheet',
    {
      sheet_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },

      sheet_name: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },

      user_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },

      goal: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'Sheet',
      freezeTableName: true,
      timestamps: false,
    }
  );
};

module.exports = Sheet;
