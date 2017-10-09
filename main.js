const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const embed = require('./embed.js');
const kaamelott = require('./kaamelott.js');

client.on('ready', (message) => {
  console.log('I am ready!');
});

client.on('message', (message) => {
  if (message.mentions.users.get(kaamelott.persos['Kadoc'].user.id)) {
    kaamelott.kadoc(client, message.channel);
  }
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
  case 'kmlt':
    //if (message.channel.guild.id != config.testGuild) return;
    if (message.author.id != config.ownerID) return;

    let channel = message.channel
    message.delete();

    if (args[0].startsWith('_')) return;

    kaamelott.quote(client, channel, args[0]);
    break;
  }
});

client.login(config.token);
