const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: "ping",
  aliases: ["latency"],
  usage: '',
  description: "Gives you information on how fast the Bot can respond to you",
  category: "info",
  cooldown: 10,
  userPermissions: "",
  botPermissions: "",
  ownerOnly: false,
  toggleOff: false,

  /**
   * @param {Client} client 
   * @param {Message} message
   * @param {String[]} args
   */

  async execute(client, message, args, ee) {
    try {
      message.reply({ embeds:[new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`🔍 Checking Ping...`)]}).then(msg => {
        const ping = msg.createdTimestamp - message.createdTimestamp;
        msg.edit({embeds:[new MessageEmbed()
              .setImage("https://media.discordapp.net/attachments/1161291359739707514/1161295628664578048/20231010_190301_0000.png?ex=6537c7d5&is=652552d5&hm=960498f80298d85f562d57a4afffd7bec3ed4e8836016fc96d2ba185478a11bd&")
          .setColor(ee.color)
          .setDescription(`🤖 **Bot Ping:** \`${(Date.now() - message.createdTimestamp)}ms\`\n\n⌛ **Api Latency:** \`${Math.round(client.ws.ping)}ms\``)]}
        );
      }).catch(e => message.channel.send(e));
    } catch (e) {
      console.log(e)
    }
  },
};