const rollParser = require('roll-parser');

const prefix = 'roll ';

const invalidRollFormat = 'fix';
const invalidRollMessage = 'Huh? Try something like:'
	+ '```' + invalidRollFormat + '\n' + prefix + 'd20```'
	+ '```' + invalidRollFormat + '\n' + prefix + '3d6 d20-1```';

const rollResultFormat = 'yaml';
const rollResultLinePrefix = '```' + rollResultFormat + '\n';
const rollResultLineSuffix = '```';

function rollAndGetMessage(rolls, doAggregate) {
	var sum = 0;
	var message = '\n';
	rolls.forEach(function(roll) {
		roll.result = rollParser.roll(roll).value;
		sum += roll.result;
		message += rollResultLinePrefix + roll.toString() + ': ' + roll.result + rollResultLineSuffix;
	});
	if (doAggregate && rolls.length > 1) {
		message += rollResultLinePrefix + 'Total: ' + sum + rollResultLineSuffix;
	}
	return message;
}

function replyWithRoll(message) {
	// Get the list of words after the prefix
	var words = message.content
		.toLowerCase()
		.replace(prefix, '')
		.match(/\S+/g)
		|| [];

	// Create a list of rolls
	var rolls = [];
	try {
		words.forEach(function(word){
			var roll = rollParser.parse(word);
			var count = roll.count;
			roll.count = 1;
			for (var i = 0; i < count; i++) {
				rolls.push(roll);
			}
		});
	} catch(error) { rolls = []; }

	// If no rolls or invalid rolls, reply with error message
	if (rolls.length == 0) {
		message.reply(invalidRollMessage);
	}

	// If rolls were successfully parsed, reply with roll message
	else {
		message.reply(rollAndGetMessage(rolls, true));
	}
}

module.exports = {
	prefix: prefix,
	replyWithRoll: replyWithRoll,
}
