const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const embed = require('./embed.js')

client.on('ready', (message) => {
  console.log('I am ready!');
});

client.on('message', (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  switch (command) {
  case 'ping':
    message.channel.send('pong!');
    break;
  case 'whois':
    let members = message.mentions.members.array();
    for (let i = 0; i < members.length; i++) {
      let member = members[i];
      console.log(`Who is ${member.displayName} ?`);
      message.channel.send({embed: embed.generate(client, member)});
    }
    break;
  case 'whoami':
    message.channel.send({embed: embed.generate(client, message.member)});
    break;
  }
});

client.login(config.token);
