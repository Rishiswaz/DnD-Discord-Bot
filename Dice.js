const rollParser = require('roll-parser');
const Discord = require('discord.js');

const prefix = 'roll ';

const invalidRollFormat = 'fix';
const invalidRollMessage = 'Huh? Try something like:'
	+ '```' + invalidRollFormat + '\n' + prefix + 'd20```'
	+ '```' + invalidRollFormat + '\n' + prefix + '3d6 d20-1```';

const rollResultFormat = 'autohotkey';
const rollResultPrefix = '```' + rollResultFormat + '\n';
const rollResultSuffix = '```';

// Return an embed containing the error message
function getErrorMessageEmbed(guild, user) {
	var embed = new Discord.RichEmbed();
	embed.setDescription(invalidRollMessage);
	return embed;
}

// Execute each roll and return an embed to be sent
function rollAndGetEmbed(guild, user, rolls) {
	var embed = new Discord.RichEmbed()
		.setAuthor(
			guild.members.get(user.id).displayName,
			user.avatarURL
		);

	var sum = 0, min = null, max = null;
	var lines = [];

	// Execute each roll and record the stats
	rolls.forEach(function(roll) {
		var result = rollParser.roll(roll).value;
		sum += result;
		min = min != null ? Math.min(min, result) : result;
		max = max != null ? Math.max(max, result) : result;
		lines.push(roll.toString() + ': ' + result);
	});

	// Set description <-- results of each roll
	embed.setDescription(rollResultPrefix + lines.join('\n') + rollResultSuffix);

	// Set footer <-- stats	
	if (rolls.length > 1) {
		embed.setFooter([
			'Sum: ' + sum,
			'Advantage (Max): ' + max,
			'Disadvantage (Min): ' + min,
		].join(', '));
	}

	return embed;
}

// Execute each roll and return a message
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
		message.channel.send(getErrorMessageEmbed(message.guild, message.author));
	}

	// If rolls were successfully parsed, reply with roll message
	else {
		message.channel.send(rollAndGetEmbed(message.guild, message.author, rolls));
	}
}

module.exports = {
	prefix: prefix,
	replyWithRoll: replyWithRoll,
}
