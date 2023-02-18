const User = (Sequelize, DataTypes) => {
  return Sequelize.define(
    'User',
    {
      user_email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },

      user_pw: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      user_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },

      refresh_token: {
        type: DataTypes.TEXT,
        defaultValue: null,
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
