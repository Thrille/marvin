const Discord = require('discord.js');
const fs = require('fs');
const trombi = JSON.parse(fs.readFileSync('./trombi.json', 'utf8'));

exports.generate = function(bot, member) {
  const embed = new Discord.RichEmbed()
    .setTitle(`Who is ${member.displayName} ?`)
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setColor(3447003)
    .setDescription(`Voici la description de ${member.displayName}`)
    .addField('Nom', trombi[member.id].name);

  if (trombi[member.id].avatar) {
    console.log('Found an avatar!');
    embed.setImage(trombi[member.id].avatar);
  }

  return embed;
}
