const Discord = require('discord.js');

module.exports = {
    name: "킥",
    description: "Kicks a member from the server",

    async run (client, message, args) {

        const permission = new Discord.MessageEmbed()
        .setTitle(':x: [경고]')
        .setColor(0xFF0000)
        .setDescription('**관리자용 커맨드 입니다**')
        .setTimestamp()

        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(permission)
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send(permission)

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        const noArgs = new Discord.MessageEmbed()
        .setTitle(':x: [경고]')
        .setColor(0xFF0000)
        .setDescription('**명령어 뒤에 해당 커맨드를 실행할 유저를 맨션 해주세요**')
        .setTimestamp()

        if(!args[0]) return message.channel.send(noArgs);

        if(!member) return message.channel.send('**이 유저는 킥할 수 없습니다**');
        if(!member.kickable) return message.channel.send('**이 유저는 킥할 수 없습니다**');

        if(member.id === message.author.id) return message.channel.send('자살은 안돼!');

        let reason = args.slice(1).join(" ");

        if(reason === undefined) reason = '**이유 없음**';

        member.kick(reason)
        .catch(err => {
            if(err) return message.channel.send('**오류 발생**')
        })

        const kickembed = new Discord.MessageEmbed()
        .setColor(0xFF0000)
        .setTitle('**킥 목록**')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('**User Kicked**', member)
        .addField('**킥한 사람**', message.author)
        .addField('**이유**', reason)
        .setFooter('킥한 시간', client.user.displayAvatarURL())
        .setTimestamp()

        message.channel.send(kickembed);


    }
}