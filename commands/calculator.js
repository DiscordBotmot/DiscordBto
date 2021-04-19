const math = require('mathjs');

const Discord = require('discord.js');

module.exports = {
    name: "계산",
    description: "Get the answer to a math problem",


    async run (client, message, args){

        const noArgs = new Discord.MessageEmbed()
        .setTitle(':x: Missing arguments')
        .setColor(0xFF0000)
        .setDescription('계산한 숫자 + 기호를 입력 해주세요 ex) 계산 4^2')
        .setTimestamp()

        if(!args[0]) return message.channel.send(noArgs);

        let resp;

        try {
            resp = math.evaluate(args.join(" "))
        } catch (e) {
            return message.channel.send('문제를 입력 해주세요')
        }

        const embed = new Discord.MessageEmbed()
        .setColor(0x808080)
        .setTitle('계산기')
        .addField('문제', `\`\`\`css\n${args.join(' ')}\`\`\``)
        .addField('값', `\`\`\`css\n${resp}\`\`\``)

        message.channel.send(embed);

    }
}