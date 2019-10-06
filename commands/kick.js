const botconfig = require("../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Cannot find user!")
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission to use this command!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That user cannot be kicked!");


    let kEmbed = new Discord.RichEmbed()
    .setTitle("A User Has Been Kicked")
    .setColor(botconfig.yellow)
    .addField("User Kicked: ", `${kUser} with ID: ${kUser.id}`)
    .addField(`Kicked By: `, `<@${message.author.id}>`)
    .addField("Kicked In: ", message.channel)
    .addField("Time: ", message.createdAt)
    .addField("Reason: ", kReason)

    let kChannel = message.guild.channels.find(ch => ch.name === 'logs');
    if(!kChannel) return message.channel.send("Can\'t find incidents channel")

    await kUser.send(`You have been kicked for: ${kReason}`);
    message.guild.member(kUser).kick(kReason);
    message.reply(`has kicked ${kUser}`);
    kChannel.send(kEmbed);
}

module.exports.help = {
    name: "kick"
}