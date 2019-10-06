const botconfig = require("../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let info = new Discord.RichEmbed()
    .setTitle("Bot Info:")
    .setColor(botconfig.blue)
    .setThumbnail("https://cdn.discordapp.com/avatars/629851363274260516/45f144193f28c4d9427599db90c817f6.png?size=128")
    .addField("Created On: ", "October 5th, 2019")
    .addField("About me: ", "Discord Bot with simple moderation tools and fun commands!")
    .setFooter("Created by: fox#6859");
    message.channel.send(info);
}

module.exports.help = {
    name: "botinfo"
}