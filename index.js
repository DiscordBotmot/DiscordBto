const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json');

const { readdirSync } = require('fs');
const { join } = require('path');

client.commands = new Discord.Collection();

const prefix = '/' //자신의 프리픽스


const commandFile = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith("js"));
// 커맨드 파일 불러오는 구문들
for (const file of commandFile) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
  let commands = file.split(".")[0];
  console.log('Loading Commands: ' + commands)
}

client.on("error", console.error);

client.on('ready', () => {
  console.log(`사용자 : ${client.users.cache.size}`) // 봇을 사용 하고있는 모든 유저
  console.log(`시용중인 서버 : ${client.guilds.cache.size}`) //봇이 참가해있는 모든 서버 표시
  console.log(`디스코드 아이디 : ${client.user.tag}로 로그인 성공!`);
  client.user.setActivity(`서버 관리`) //상태메시지
});

client.on('message', message => {
  if(message.content.startsWith(`${prefix}전송`)) {
    const user = message.mentions.users.first() 
    if(!message.member.hasPermission('ADMINISTRATOR')) return;
    try{ 
      let content = message.content.slice(`${prefix}전송` .length);
      const embed = new Discord.MessageEmbed()
      .setTitle("⛔ㅣ답변하지 마세요",)
      .addField(`${user.username}님에게 개인메시지가 도착했습니다!`, `전송자 ${message.author.username}`)
      .setDescription(content)
      .setTimestamp()
      .setColor('RANDOM')
      user.send(embed)
      message.channel.send("메시지를 성공적으로 전송했습니다.")
    }catch(err) { 
      console.log(err)
      message.reply("오류 발생!")
    }
  }
});

client.on('message', message => {
  if (message.content === prefix+'프사') {
    const target = message.mentions.members.first()
    message.reply(message.author.displayAvatarURL());
  }
});

client.on('message', message => {
  if(message.content === prefix+'초기화') {
    if(!message.member.hasPermission('ADMINISTRATOR')) return;
    const embed = new Discord.MessageEmbed()
    .setDescription("펑!")
    .setImage("https://media.giphy.com/media/HhTXt43pk1I1W/giphy.gif")
    .setColor("RANDOM")
    message.channel.delete();
    message.channel.clone().then(channel => {
      channel.send(embed)
    })
  }
});

client.on('message', message => {
  // If the message is "ping"
  if (message.content === '/인증') {
      message.member.roles.add('823400589642694696')
      message.reply("성공적으로 역할을 지급 함!")
  }
});

client.on('message', message => {
  // If the message is "ping"
  if (message.content === '안녕') {
      message.reply("**```안녕하다요! 🤭```**")
  }
});

client.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;

  if(message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);

    const command = args.shift().toLowerCase();

    if(!client.commands.has(command)) return;

    try {
      client.commands.get(command).run(client, message, args);
    } catch (error) {
      console.error(error);
    }
  }
})

client.login(token);