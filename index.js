﻿const { Client, Collection } = require("discord.js");
const config = require("./config.json");
const client = new Client();
const { GiveawaysManager } = require('discord-giveaways');

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Zero is sexy'));

app.listen(port, () => console.log(`Bot Listening At http://localhost:${port}, Dm 0_0#6666 Your host link`));



client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "💩"
    }
});

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
    console.log(`Giveaway #${giveaway.messageID} ended! Winners: ${winners.map((member) => member.user.username).join(', ')}`);
});

["aliases", "commands"].forEach(x => client[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(client));


client.login(config["Bot_Info"].token);
