const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '!roll') {
    msg.reply(random());
  }
});

function random() {
  d= Math.random() * (20 - 1) + 1;
  return parseInt(d, 10);
}

client.login('NTcwNzEzOTc3ODM1ODgwNDQ4.XRAFsA.jQI2_h2tS1PbT36jbshc_gSMdqU');

