const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const _ = require('lodash');

let persos = {
  'Karadoc': new Discord.Client(),
  'Bohort': new Discord.Client(),
  'Perceval': new Discord.Client(),
  'Le tavernier': new Discord.Client(),
  'Arthur': new Discord.Client(),
  'Kadoc': new Discord.Client(),
  'Loth': new Discord.Client(),
  'Yvain': new Discord.Client(),
  'SylvainDuriff': new Discord.Client()
}

exports.quote = function(client, channel, quote) {
  const quotes = JSON.parse(fs.readFileSync('./kaamelot.json', 'utf8'));
  let channels = {};

  if (quotes[quote]) {
    let q = quotes[quote];

    for (let i = 0; i < q.length; i++) {
      let name = q[i].name;
      let text = q[i].text;
      console.log(`${name}: ${text}`);
      channels[name] = channels[name] || persos[name].channels.get(channel.id);
    }

    send(channels, q, 0);

  }
}

exports.randomQuote = function(client, channel, user) {
  let perso = getPerso(user.id);
  if (perso === null) { return false; }

  let quotes = JSON.parse(fs.readFileSync('./quotes.json', 'utf8'))[_.findKey(persos, perso)];
  if (quotes === undefined) { return false; }

  let quote = randomItem(quotes);
  let chan = perso.channels.get(channel.id);

  chan.send(quote);
}

exports.persos = persos;

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

function getPerso(id) {
  for (key in persos) {
    if (persos[key].user.id == id) {
      return persos[key];
    }
  }
  return null;
}

function randomItem(array) {
  return array[Math.floor(Math.random()*array.length)];
}

function getKey(index, array) {
  return Object.keys(array)[index];
}

persos['Karadoc'].login(config.kaamelott.karadoc);
persos['Bohort'].login(config.kaamelott.bohort);
persos['Perceval'].login(config.kaamelott.perceval);
persos['Le tavernier'].login(config.kaamelott.leTavernier);
persos['Arthur'].login(config.kaamelott.arthur);
persos['Kadoc'].login(config.kaamelott.kadoc);
persos['Loth'].login(config.kaamelott.loth);
persos['Yvain'].login(config.kaamelott.yvain);
persos['SylvainDuriff'].login(config.kaamelott.sylvainDuriff)
