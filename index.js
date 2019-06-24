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

	if (words.length == 2 && words[0] == '!roll') {
		msg.reply(Dice.parse(words[1]).value);
	}
	else if (words == '!test'){
		msg.reply(data_model_guide.apply_bonus());
	}
});

client.login(token);