const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
let persos = {
  'Karadoc': new Discord.Client(),
  'Bohort': new Discord.Client(),
  'Perceval': new Discord.Client(),
  'Le tavernier': new Discord.Client()
}

exports.quote = function(client, channel, quote) {
  const quotes = JSON.parse(fs.readFileSync('./quotes.json', 'utf8'));
  let channels = {};

  if (quotes[quote]) {
    let q = quotes[quote];

    for (let i = 0; i < q.length; i++) {
      let name = q[i].name;
      let text = q[i].text;

      channels[name] = channels[name] || persos[name].channels.get(channel.id);
    }

    send(channels, q, 0);

  }
}

function send(channels, quote, pos) {
  let name = quote[pos].name;
  let text = quote[pos].text;
  let channel = channels[name];
  let time = (text.length / 20) * 1000;
  channel.startTyping();

  setTimeout(() => {
    channel.stopTyping();

    let promise = channel.send(`${text}`);

    if (quote[pos+1]) {
      promise.then((message) => {
        let timeout = name != quote[pos+1].name ? 2000 : 0;
        pos++;
        setTimeout(()=>{send(channels, quote, pos)}, timeout);
      });
    }
  }, time);

}

persos['Karadoc'].login(config.kaamelott.karadoc);
persos['Bohort'].login(config.kaamelott.bohort);
persos['Perceval'].login(config.kaamelott.perceval);
persos['Le tavernier'].login(config.kaamelott.leTavernier);
