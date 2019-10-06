const botconfig = require("../botconfig.json");
const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {
    let prefix = botconfig.prefix;


    // if the message content starts with "[prefix]ban"
    if (message.content.startsWith(`${prefix}ban`)) {
        // Assuming we mention someone in the message, this will return the user
        // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
        const user = message.mentions.users.first();
        // If we have a user mentioned
        if (user) {
          // Now we get the member from the user
          const member = message.guild.member(user);
          // If the member is in the guild
          if (member) {
              let banReason = args[1];
            /**
             * Ban the member
             * Make sure you run this on a member, not a user!
             * There are big differences between a user and a member
             * Read more about what ban options there are over at
             * https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=ban
             */
            member.ban({
              reason: banReason,
            }).then(() => {
              // We let the message author know we were able to ban the person
              message.reply(`Successfully banned ${user.tag} for ` + banReason);
            }).catch(err => {
              // An error happened
              // This is generally due to the bot not being able to ban the member,
              // either due to missing permissions or role hierarchy
              message.reply('I was unable to ban the member');
              // Log the error
              console.error(err);
            });
          } else {
            // The mentioned user isn't in this guild
            message.reply('That user isn\'t in this guild!');
          }
        } else {
        // Otherwise, if no user was mentioned
          message.reply('You didn\'t mention the user to ban!');
        }
      }
}

module.exports.help = {
    name: "ban"
}