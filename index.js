const Discord = require('discord.js');
const client = new Discord.Client();
const Dice = require('./Dice.js');
const data_model_guide = require('./data_model_guide.js')
var fs = require('fs');
const token = fs.readFileSync('token.txt', 'utf8');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	var userId = msg.author.id;

	var words = msg.content.toLowerCase().match(/\S+/g) || [];

	if (msg.content.startsWith(Dice.prefix)) {
		Dice.replyWithRoll(msg);
	}
<<<<<<< HEAD
	else if (words == '!test'){
		msg.reply(data_model_guide.apply_bonus());
	}
=======

>>>>>>> 2009db58018d328f13c99cbd5391fcdd562afaaf
});

client.login(token);