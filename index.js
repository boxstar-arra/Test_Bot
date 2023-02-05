const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions } = require(`discord.js`);

const prefix = '>';

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

client.on("ready", () => {
    console.log("Bot is online!");

    client.user.setActivity('Subscribe to Me', {type: "WATCHING"});
})

client.on("messageCreate", (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);

    const command = args.shift().toLowerCase();

    //message array
    const messageArray = message.content.split(" ");
    const argument = messageArray.slice(1);
    const cmd = messageArray[0];

    //COMMANDs

//test command

if(command === 'test'){
    message.channel.send("Bot is working fine...");
}

//warm command

if(command === 'warm'){
    const member = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => 
        x.user.username.toLowerCase() === argument.slice(0).join(" " || x.user.username.toLocaleLowerCase() === argument[0]));

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`:white_check_mark: ${member.user.tag} has been warmed.`)

        message.channel.send({ embeds: [embed]});
}
//ban command

if(command === 'ban'){
    const member = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => 
        x.user.username.toLowerCase() === argument.slice(0).join(" " || x.user.username.toLocaleLowerCase() === argument[0]));

        //member validation
        if(!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return message.channel.send("You don't have permission to ban people.");
        if(!member) return message.channel.send("You must specify someone in this command!");
        if(message.member === member) return message.channel.send("You cannot ban yourself");
        if(!member.kickable) return message.member.send("You cannot ban this person!");

        //setting channel ban messages
        let reason = arugment.slice(1).join(" ") || "No reason given.";

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`:white_check_mark: ${member.user.tag} has been **banned** | ${reason}`)

        const dmEmbed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`:white_check_mark: You were **banned** from ${message.guild.name} | ${reason}`)

        member.send({ embeds: [dmEmbed]}).catch(err => {
            console.log(`${member.user.tag} has their DMs off and cannot receive the ban message.`);
        })

        member.ban().catch(err => {
            message.channel.send("There was an error banning this member.");
        })

        message.channel.send({ embeds: [embed]});
}

})

client.login("MTA3MTY1OTIzNTEyNzA3MDg4MQ.GE2zP8.V610bpiURE9bbkAVFdElGz0sxdlS8JuJvWCXmg");