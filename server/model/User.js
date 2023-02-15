const User = (Sequelize, DataTypes) => {
  return Sequelize.define(
    'User',
    {
      user_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },

      user_pw: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },

      user_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      tableName: 'User',
      freezeTableName: true,
      timestamps: false,
    }
  );
};

module.exports = User;
