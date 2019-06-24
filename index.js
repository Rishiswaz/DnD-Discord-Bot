const Discord = require('discord.js');
const client = new Discord.Client();
const Dice = require('Dice.js');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	var words = msg.toLowerCase().match(/\S+/g) || [];

	if (words.length > 0 && words[0] == '!roll') {
		if (words.length != 2) {
			msg.reply("Invalid command: expected !roll <count>d<value>");
		} else {
			msg.reply(Dice.roll(words[1]));
		}
	}

});

client.login('NTcwNzEzOTc3ODM1ODgwNDQ4.XRAFsA.jQI2_h2tS1PbT36jbshc_gSMdqU');