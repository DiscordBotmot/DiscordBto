const math = require('mathjs')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: ['계산'],
  minArgs: 1,
  errormsg: `계산하고 싶은 수학식을 입력해 주세요!`,
  callback: async (message, arguments) => {

    let resp;

    try {
      resp = math.evaluate(arguments.join(" "))
    } catch (e) {
      let error = new MessageEmbed()
      .setTitle('오류 ❌')
      .setDescription(`계산 불가능한 식입니다!`)
      .setColor('FF0000')
      return message.channel.send(error)
    }

    const embed = new MessageEmbed()
    .setColor('#2AF598')
    .setTitle('계산기')
    .addField('수학식', `\`\`\`css\n${arguments.join(' ')}\`\`\``)
    .addField('답', `\`\`\`css\n${resp}\`\`\``)

    message.channel.send(embed);
  }
}