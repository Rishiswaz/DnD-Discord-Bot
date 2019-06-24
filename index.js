const Discord = require('discord.js');
const client = new Discord.Client();
const Dice = require('./Dice.js');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	var words = msg.content.toLowerCase().match(/\S+/g) || [];

	if (words.length == 2 && words[0] == '!roll') {
		msg.reply(Dice.roll(words[1]).value);
	}

});

client.login('NTcwNzEzOTc3ODM1ODgwNDQ4.XRAFsA.jQI2_h2tS1PbT36jbshc_gSMdqU');