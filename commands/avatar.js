const botconfig = require("../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];

    if(cmd === `${prefix}avatar`){
        return message.channel.send("Here is your avatar: " + message.author.avatarURL);
    }
}

module.exports.help = {
    name: "avatar"
}