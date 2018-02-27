var Sequelize = require('sequelize');
var sequelize = new Sequelize('warhammer', 'postgres', 'Agunst10802177^', {
	host: 'localhost',
	dialect: 'postgres'
});



sequelize.authenticate().then(
	function() {
		console.log('connected to warhammer postgres db');
	},
	function(err){
		console.log(err);
	}
);
var User = sequelize.import('./models/user');
var army =sequelize.import('./models/army');

module.exports = sequelize;