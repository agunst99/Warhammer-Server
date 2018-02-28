var router = require('express').Router();
var sequelize = require('../db');
var Message = sequelize.import('../models/message');
var User = sequelize.import('../models/user');

router.post('/', function (req, res) {
	console.log(req.user) // Use our sequlize model to create user
	Message
		.create({
			subject: req.body.message.subject,
            textField: req.body.message.textField,
            userId: req.user.id
		})
		.then(
			function createSuccess(message) {
				res.json(message);
			},
			function createError(err) {
				res.send(500, err.message);
			}
		);
});

router.get('/', function (req, res) {
	console.log('***********************GET*************************',req.user)
	console.log('***********************GET*************************22222222222222',req.body)
	var userid = req.user.id;
	Message
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
	Message
		.findOne({
			where: { id: data }
		}).then(
			function getSucces(messageData) {
				res.json(messageData);
			},

			function getError(err) {
				res.send(500, err.message);
			}
		);
});

//This will return the data from the log that was updated
router.put('/', function (req, res) {

	message
		.update(
			{
                subject: req.body.message.subject,
                textField: req.body.message.textField,
			},

			{ where: { id: req.body.message.id } }
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
	Message
		.destroy({
			where: { id: req.body.message.id }
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
