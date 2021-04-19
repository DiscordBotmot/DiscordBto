const { Message } = require('discord.js')

module.exports = {
    name : '인증',
    run : async(client, message, args) => {
        //lets use parameters (optional)
        /**
         * @param {Message} message
         */
        //so firstly we will check whether the author of the message has permissions
        //this line means if the author doesn't have manage roles permission it will stop the process and send the following text
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('당신은 현재 권한이 없습니다.')
        //next we define some variables
        const target = message.mentions.members.first() //member = mentions
        if(!target) return message.channel.send('인증 시킬 멤버를 태그해주세요') //when no member is pinged
        let role = message.guild.roles.cache.find(r=> r.name === "회원")
        //now the code!
        await target.roles.add(role) // adding the role to the user
        message.channel.send(`${target.user.username}님을 인증시켰어요!`)
    }
}
