module.exports = function (sequelize, DataTypes) {
    return sequelize.define('army', {
        hero: DataTypes.STRING,
        unit: DataTypes.STRING,
        allegiance: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        totalPoints:DataTypes.INTEGER
    });
};