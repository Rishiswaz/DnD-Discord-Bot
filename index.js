const Discord = require('discord.js');
const client = new Discord.Client();
const Dice = require('./Dice.js');
var fs = require('fs');
const token = fs.readFileSync('token.txt')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	var words = msg.content.toLowerCase().match(/\S+/g) || [];

	if (words.length == 2 && words[0] == '!roll') {
		msg.reply(Dice.roll(words[1]).value);
	}

});

client.login(token);