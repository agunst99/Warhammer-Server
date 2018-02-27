var router = require('express').Router();
var sequelize = require('../db');
var Army = sequelize.import('../models/army');
var User = sequelize.import('../models/user');

router.post('/', function (req, res) {
	console.log(req.user) // Use our sequlize model to create user
	Army
		.create({
			allegiance: req.body.army.allegiance,
			totalPoints: req.body.army.totalPoints,
			hero: req.body.army.hero,
			unit: req.body.army.unit,
			userId: req.user.id
		})
		.then(
			function createSuccess(army) {
				res.json(army);
			},
			function createError(err) {
				res.send(500, err.message);
			}
		);
});

router.get('/', function (req, res) {
	var userid = req.user.id;
	Army
		.findAll({
			where: { userId: userid }
		})
		.then(
			function findAllSuccess(data) {
				// console.log(data);
				res.json(data);
			},
			function findAllError(err) {
				res.send(500, err.message);
			}
		);
});

//This will retrieve one workout specified by the log id
router.get('/:id', function (req, res) {
	var data = req.params.id;
	//console.log(data); here for testing purposes
	Army
		.findOne({
			where: { id: data }
		}).then(
			function getSucces(armyData) {
				res.json(armyData);
			},

			function getError(err) {
				res.send(500, err.message);
			}
		);
});

//This will return the data from the log that was updated
router.put('/', function (req, res) {

	Army
		.update(
			{
				allegiance: req.body.army.allegiance,
				totalPoints: req.body.army.totalPoints,
				hero: req.body.army.hero,
				unit: req.body.army.unit
			},

			{ where: { id: req.body.army.id } }
		).then(
			function updateSuccess(updatedLog) {
				res.json(updatedLog);
			},

			function updateError(err) {
				res.send(500, err.message);
			}
		)
});

router.delete('/', function (req, res) {
	Army
		.destroy({
			where: { id: req.body.army.id }
		}).then(
			function deleteLogSuccess(data) {
				res.send("you removed a log");
			},
			function deleteLogError(err) {
				res.send(500, err.message);
			}
		);
});
module.exports = router;
