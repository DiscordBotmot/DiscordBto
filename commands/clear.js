module.exports = {
    name: "청소",
    description: "메시지 청소",

    async run (client, message, args) {

        const amount = args.join(" ");

        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('당신은 현재 권한이 없습니다.')

        if(!amount) return message.reply('메시지를 지울 만큼의 수를 입력해 주세요')

        if(amount > 100) return message.reply(`100이상의 수는 지울수 없습니다`)

        if(amount < 1) return message.reply(`1보다 작은 수는 지울수 없습니다`)

        await message.channel.messages.fetch({limit: amount}).then(messages => {
            message.channel.bulkDelete(messages
    )});


    message.channel.send(`**${amount}개**의 메시지를 삭제 했습니다`)

    }
}