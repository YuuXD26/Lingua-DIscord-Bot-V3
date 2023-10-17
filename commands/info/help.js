const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  MessageButton
} = require('discord.js');
const eec = require(`${process.cwd()}/structures/botconfig/embed.json`);

module.exports = {
  name: "help",
  aliases: ['h'],
  usage: '[command]',
  description: "Sends a menu with options!",
  category: "info",
  cooldown: 0,
  userPermissions: "",
  botPermissions: "",
  ownerOnly: false,
  toggleOff: false,

  /**
   * @param {Client} client 
   * @param {Message} message
   * @param {String[]} args
   */

  async execute(client, message, args, ee, prefix) {

    try {
      if (args[0]) {
        const embed = new MessageEmbed()
          .setColor(ee.color)

        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        if (!cmd) {
          return message.reply({
            embeds: [embed
              .setColor(ee.wrongcolor)
              .setDescription(`${client.allEmojis.x} No Information found for the command **${args[0].toLowerCase()}**`)
            ]
          });
        }
        if (cmd.name) embed.setTitle(`${client.allEmojis.y} Information About the Commands`);
        if (cmd.name) embed.addField("** Command name**", `\`\`\`${cmd.name}\`\`\``);
        if (cmd.description) embed.addField("** Description**", `\`\`\`${cmd.description}\`\`\``);
        if (cmd.aliases) try {
          embed.addField("**Aliases**", `\`\`\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\`\`\``);
        } catch {}
        if (cmd.cooldown) embed.addField("** Cooldown**", `\`\`\`${cmd.cooldown} Seconds\`\`\``);
        if (cmd.usage) {
          embed.addField("**Usage**", `\`\`\`${prefix}${cmd.usage}\`\`\``);
          // embed.setFooter("Syntax: <> = required, [] = optional");
        }
        return message.reply({
          embeds: [embed]
        });
      } else {
        // Main Buttons
        let button_home = new MessageButton().setStyle('SECONDARY').setCustomId('Home').setEmoji("<:orangeP:1160768265300234340>").setLabel("Home")
        let button_cmd_list = new MessageButton().setStyle('SECONDARY').setCustomId('Command_List').setEmoji("<:vps:1160768557135704134>").setLabel("Commands List")
        let button_button_menu = new MessageButton().setStyle('SECONDARY').setCustomId('Button_Menu').setEmoji("<:CrownPermissionCommands:1160768767907860502>").setLabel("Buttons Menu")

        // Category Buttons
        let button_overview = new MessageButton().setStyle('SECONDARY').setCustomId('Overview').setEmoji("1064407258164887562")
        let button_info = new MessageButton().setStyle('SECONDARY').setCustomId('Information').setEmoji("1064433487337242665")
        let button_music = new MessageButton().setStyle('SECONDARY').setCustomId('Music').setEmoji("1064440924190539888")
        let button_setup = new MessageButton().setStyle('SECONDARY').setCustomId('Setup').setEmoji("1069995603381211146")
        let button_mod = new MessageButton().setStyle('SECONDARY').setCustomId('Moderation').setEmoji("1064433468009881630")
        let button_level = new MessageButton().setStyle('SECONDARY').setCustomId('Ranking').setEmoji('1064440926996541491')
        let button_giveaway = new MessageButton().setStyle('SECONDARY').setCustomId('Giveaway').setEmoji("1064433461831680060")
        let button_ticket = new MessageButton().setStyle('SECONDARY').setCustomId('Ticket').setEmoji("1069998245608181800")
        let button_utility = new MessageButton().setStyle('SECONDARY').setCustomId('Utility').setEmoji("1075040201195393074")

        let menuOptions = [{
            label: 'Overview',
            description: 'My Overview of me!',
            value: 'Overview',
            emoji: '1064407258164887562',
          },
          {
            label: 'Information',
            description: 'Commands to share Information',
            value: 'Information',
            emoji: '1064433487337242665',
          },
          {
            label: 'Music',
            description: 'Commands to play Music',
            value: 'Music',
            emoji: '1064440924190539888',
          },
          {
            label: 'Setup',
            description: 'Commands to setup Systems',
            value: 'Setup',
            emoji: '1069995603381211146',
          },
          {
            label: 'Moderation',
            description: 'Commands to Moderate the Server',
            value: 'Moderation',
            emoji: '1064433468009881630',
          },
          {
            label: 'Ranking',
            description: 'Commands to show Ranks',
            value: 'Ranking',
            emoji: '1064440926996541491',
          },
          {
            label: 'Giveaway',
            description: 'Giveaway Commands',
            value: 'Giveaway',
            emoji: '1064433461831680060',
          },
          {
            label: 'Ticket',
            description: 'Ticket Commands',
            value: 'Ticket',
            emoji: '1069998245608181800',
          },
          {
            label: 'Utility',
            description: 'Utility Commands',
            value: 'Utility',
            emoji: '1075040201195393074',
          },
        ];

        let menuSelection = new MessageSelectMenu()
          .setCustomId("MenuSelection")
          .setPlaceholder("Anxious Wick Clone Menu")
          .setMinValues(1)
          .setMaxValues(5)
          .addOptions(menuOptions.filter(Boolean))

        let allbuttons_home_list_Button = new MessageActionRow()
          .addComponents([button_home, button_cmd_list, button_button_menu])

        //   let buttonhome = new MessageActionRow()
        //   .addComponents([button_home.setDisabled(true), button_cmd_list.setDisabled(false), button_button_menu.setDisabled(false)])

        // let allbuttonscommand_commant = new MessageActionRow()
        //   .addComponents([button_home.setDisabled(false), button_cmd_list.setDisabled(true), button_button_menu.setDisabled(false)])

        // let allbuttonsbuttons = new MessageActionRow()
        //   .addComponents([button_home.setDisabled(false), button_cmd_list.setDisabled(false), button_button_menu.setDisabled(true)])

        let buttonCategory = new MessageActionRow()
          .addComponents([button_overview, button_info, button_music, button_setup, button_mod])

        let buttonCategory2 = new MessageActionRow()
          .addComponents([button_level, button_giveaway, button_ticket])

        let buttonCategory3 = new MessageActionRow()
          .addComponents([button_utility])

        let menuCategory = new MessageActionRow()
          .addComponents([menuSelection])

        const allbuttons_home = [allbuttons_home_list_Button, menuCategory]
        const allbuttons_command_commant = [allbuttons_home_list_Button]
        const allbuttons_buttons = [allbuttons_home_list_Button, buttonCategory, buttonCategory2, buttonCategory3]

        let OverviewEmbed = new MessageEmbed()
          .setColor(ee.color)
          .setImage("https://media.discordapp.net/attachments/1161291359739707514/1161295628664578048/20231010_190301_0000.png?ex=6537c7d5&is=652552d5&hm=960498f80298d85f562d57a4afffd7bec3ed4e8836016fc96d2ba185478a11bd&")
          .setFooter(`${client.user.username}`)
          //.setAuthor(`${client.user.username} Help Menu`, client.user.displayAvatarURL())
          .setTitle(`Anxious ${client.user.username}'s Help Menu`)

    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))      
          .setDescription(" **__About Wick Clone__** \n Wick Clone Is Multipurpose Discord Bot That Has Been Coded By **__Ash Coder & -H Dev__**\n\n > <:crown_orange:1160888151447982142> **__Wick Clone Commands__** :\n\n>>> <:orange_reply:1160888587814965300> <a:Orange:1160888807730724936> `:` Information\n<:orange_reply:1160888587814965300> <a:Orange:1160888807730724936> `:`  Music\n<:orange_reply:1160888587814965300> <a:Orange:1160888807730724936> `:`  Setup\n<:orange_reply:1160888587814965300> <a:Orange:1160888807730724936> `:`  Moderation\n<:orange_reply:1160888587814965300> <a:Orange:1160888807730724936> `:`  Ranking\n<:orange_reply:1160888587814965300> <a:Orange:1160888807730724936> `:` Giveaway\n<:orange_reply:1160888587814965300> <a:Orange:1160888807730724936> `:` Ticket\n<:orange_reply:1160888587814965300> <a:Orange:1160888807730724936>`:` Utility")
        .addField("<:crown_orange:1160888151447982142> **__Wick Clone Stats__**",
  `>>> <:orange_reply:1160888587814965300> <:Guilds:1160891702857453589> Joined **${client.guilds.cache.size} Servers**\n<:orange_reply:1160888587814965300> <a:Latency:1160891420257816656>  **\`${Math.floor(client.ws.ping)}ms\` Ping**`)
        var edited = false;

        let helpmsg = await message.reply({
          embeds: [OverviewEmbed],
          components: allbuttons_home
        }).catch(e => {
          console.log(e)
          return
        });

        const collector = helpmsg.createMessageComponentCollector({
          filter: (i) => (i.isButton() || i.isSelectMenu()) && i.user && i.message.author.id == client.user.id,
          time: 180e3
        });

        collector.on('collect', async b => {
          try {
            if (b.isButton()) {
              if (b.user.id !== message.author.id)
                return b.reply({
                  content: `${client.allEmojis.x} **Only the one who typed \`${prefix}help\` is allowed to react!**`,
                  ephemeral: true
                });

              if (b.customId == "Home") {
                await helpmsg.edit({
                  embeds: [OverviewEmbed],
                  components: allbuttons_home,
                  // ephemeral: true
                }).catch(e => {})
                b.deferUpdate().catch(e => {})
              }
              if (b.customId == "Command_List") {
                await helpmsg.edit({
                  embeds: [new MessageEmbed()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                    .setColor(ee.color)
                    .setAuthor(`${client.user.username} Help Menu`, client.user.displayAvatarURL())
                    .addFields({
                      name: `🔰┃Information`,
                      value: `${client.commands.filter((cmd) => cmd.category === "info").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`
                    }, {
                      name: `<a:Playing_Audio:936546598379487242>┃Music`,
                      value: `${client.commands.filter((cmd) => cmd.category === "music").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`
                    }, {
                      name: `💪┃Setup`,
                      value: `${client.commands.filter((cmd) => cmd.category === "setup").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`
                    }, {
                      name: `<:Moderator:932487033434296430>┃Moderation`,
                      value: `${client.commands.filter((cmd) => cmd.category === "moderation").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`
                    }, {
                      name: `<:botmaker:906789510996721664>┃Ranking`,
                      value: `${client.commands.filter((cmd) => cmd.category === "leveling").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`
                    }, {
                      name: `🎉┃Giveaway`,
                      value: `${client.commands.filter((cmd) => cmd.category === "giveaway").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`
                    }, {
                      name: `<:ticket:944621574508646481>┃Ticket`,
                      value: `${client.commands.filter((cmd) => cmd.category === "ticket").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`
                    }, {
                      name: `🔨┃Utility`,
                      value: `${client.commands.filter((cmd) => cmd.category === "utility").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`
                    })
                  ],
                  components: allbuttons_command_commant,
                  // ephemeral: true
                }).catch(e => {})
                b.deferUpdate().catch(e => {})
              }
              if (b.customId == "Button_Menu") {
                await helpmsg.edit({
                  embeds: [OverviewEmbed],
                  components: allbuttons_buttons,
                  // ephemeral: true
                }).catch(e => {})
                b.deferUpdate().catch(e => {})
              }

              let embeds = allotherembeds_eachcategory();

              if (b.customId == "Overview") {
                return b.reply({
                  embeds: [OverviewEmbed],
                  ephemeral: true
                })
              }
              if (b.customId == "Information") {
                return b.reply({
                  embeds: [embeds[0]],
                  ephemeral: true
                })
              }
              if (b.customId == "Music") {
                return b.reply({
                  embeds: [embeds[1]],
                  ephemeral: true
                })
              }
              if (b.customId == "Setup") {
                return b.reply({
                  embeds: [embeds[2]],
                  ephemeral: true
                })
              }
              if (b.customId == "Moderation") {
                return b.reply({
                  embeds: [embeds[3]],
                  ephemeral: true
                })
              }
              if (b.customId == "Ranking") {
                return b.reply({
                  embeds: [embeds[4]],
                  ephemeral: true
                })
              }
              if (b.customId == "Giveaway") {
                return b.reply({
                  embeds: [embeds[7]],
                  ephemeral: true
                })
              }
              if (b.customId == "Ticket") {
                return b.reply({
                  embeds: [embeds[8]],
                  ephemeral: true
                })
              }
              if (b.customId == "Utility") {
                return b.reply({
                  embeds: [embeds[9]],
                  ephemeral: true
                })
              }
            }
            if (b.isSelectMenu()) {
              let index = 0;
              let vembeds = []
              let theembeds = [OverviewEmbed, ...allotherembeds_eachcategory()];
              for (const value of b.values) {
                switch (value.toLowerCase()) {
                  case "overview":
                    index = 0;
                    break;
                  case "information":
                    index = 1;
                    break;
                  case "music":
                    index = 2;
                    break;
                  case "setup":
                    index = 3;
                    break;
                  case "moderation":
                    index = 4;
                    break;
                  case "ranking":
                    index = 5;
                    break;
                  case "giveaway":
                    index = 8;
                    break;
                  case "ticket":
                    index = 9;
                    break;
                  case "utility":
                    index = 10;
                    break;
                }
                vembeds.push(theembeds[index])
              }
              b.reply({
                embeds: vembeds,
                ephemeral: true
              });
            }
          } catch (e) {
            console.log(e)
          }
        });

        // let d_menurow = new MessageActionRow()
        //   .addComponents([menuSelection.setDisabled(true)])

        // let d_menurow4 = new MessageActionRow()
        //   .addComponents([button_home.setDisabled(true), button_cmd_list.setDisabled(true), button_button_menu.setDisabled(true)])

        // let d_buttonrow = new MessageActionRow()
        //   .addComponents([button_overview.setDisabled(true), button_info.setDisabled(true), button_music.setDisabled(true), button_setup.setDisabled(true), button_mod.setDisabled(true)])

        // let d_buttonrow2 = new MessageActionRow()
        //   .addComponents([button_level.setDisabled(true), button_utility.setDisabled(true)])

        // // const alldisablemenu = [d_menurow]
        // const alldisablemenu = [d_menurow4, d_menurow, d_buttonrow, d_buttonrow2]

        collector.on('end', collected => {
          if (!edited) {
            edited = true;
            helpmsg.edit({
              content: `${client.allEmojis.x} **This Help Menu is expired! Please retype \`${prefix}help\` to view again.**`,
              embeds: [helpmsg.embeds[0]],
              components: []
            }).catch((e) => {})
          }
        });
      }

      function allotherembeds_eachcategory(filterdisabled = false) {

        var embeds = [];

        var embed0 = new MessageEmbed()
          .addField(`🔰┃__**INFORMATION**__`,
            `>>> ${client.commands.filter((cmd) => cmd.category === "info").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`)
        embeds.push(embed0)

        var embed1 = new MessageEmbed()
          .addField(`┃__**MUSIC**__`,
            `>>> ${client.commands.filter((cmd) => cmd.category === "music").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`)
        embeds.push(embed1)

        var embed2 = new MessageEmbed()
          .addField(`┃__**SETUP**__`,
            `>>> ${client.commands.filter((cmd) => cmd.category === "setup").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`)
        embeds.push(embed2)

        var embed3 = new MessageEmbed()
          .addField(`┃__**MODERATION**__`,
            `>>> ${client.commands.filter((cmd) => cmd.category === "moderation").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`)
        embeds.push(embed3)

        var embed4 = new MessageEmbed()
          .addField(`┃__**RANKING**__`,
            `>>> ${client.commands.filter((cmd) => cmd.category === "leveling").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`)
        embeds.push(embed4)

        var embed7 = new MessageEmbed()
          .addField(`┃__**GIVEAWAY**__`,
            `>>> ${client.commands.filter((cmd) => cmd.category === "giveaway").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`)
        embeds.push(embed7)

        var embed8 = new MessageEmbed()
          .addField(`┃__**TICKET**__`,
            `>>> ${client.commands.filter((cmd) => cmd.category === "ticket").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`)
        embeds.push(embed8)

        var embed9 = new MessageEmbed()
          .addField(`┃__**UTILITY**__`,
            `>>> ${client.commands.filter((cmd) => cmd.category === "utility").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`)
        embeds.push(embed9)

        return embeds.map((embed, index) => {
          return embed
            .setColor(ee.color)
            .setImage(eec.gif)
            // .setThumbnail(ee.footericon)
            .setFooter(`Page ${index + 1} / ${embeds.length}\nTo see command Descriptions and Information, type: ${process.env.PREFIX}help [CMD NAME]`, ee.footericon);
        })
      }
    } catch (e) {
      console.log(String(e.stack).bgRed)
      const errorLogsChannel = client.channels.cache.get(config.botlogs.errorLogsChannel);
      return errorLogsChannel.send({
        embeds: [new MessageEmbed()
          .setAuthor(message.guild.name, message.guild.iconURL({
            dynamic: true
          }))
          .setColor("RED")
          .setTitle(`${client.allEmojis.x} Got a Error:`)
          .setDescription(`\`\`\`${e.stack}\`\`\``)
          .setFooter(`Having: ${message.guild.memberCount} Users`)
        ]
      })
    }
  }
}
