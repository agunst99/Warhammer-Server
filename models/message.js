module.exports = function(sequelize, DataTypes){
	return sequelize.define('message', {
	subject: DataTypes.STRING,
    textField: DataTypes.STRING,
    userId: DataTypes.INTEGER
		});
};
