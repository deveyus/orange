const botconfig = require("./botconfig.json");
const bottoken = require("./bottoken.json")
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
bot.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <=0){
        console.log("Couldn't find commands");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
});

bot.on("ready", async () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity("your commands!", {type: "LISTENING"});

    bot.on('guildMemberAdd', member => {
        // Send the message to a designated channel on a server:
        const channelJoin = member.guild.channels.find(ch => ch.name === 'member-leave-join');
        // Do nothing if the channel wasn't found on this server
        if (!channelJoin) return;
        // Send the message, mentioning the member
        channelJoin.send(`Welcome to the server, ${member}`);
      });

    bot.on('guildMemberRemove', member => {
        const channelLeave = member.guild.channels.find(ch => ch.name === 'member-leave-join');
        if(!channelLeave) return;
        channelLeave.send(`${member} has left the server.`);
    })
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(botconfig.prefix)) return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args)
    
});


bot.login(bottoken.token);