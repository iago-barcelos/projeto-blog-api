module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User',{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    tableName: 'Users',
    underscored: true,
    timestamps: false,
  });
  return User;
}