const { EmbedBuilder } = require('discord.js')
module.exports = {
name: "myardım",
description: "Bot ve komutlar hakkında bilgi almanıza yardımcı olur.",
permissions: "0x0000000000000800",
options: [],
showHelp: false,
run: async (client, interaction) => {

const commands = client.commands.filter(x => x.showHelp !== false);

const embed = new EmbedBuilder()
.setColor('007fff')
.setTitle(client.user.username)
.setThumbnail(client.user.displayAvatarURL())
.setDescription("SA:MP Türkiye CnR")
.addFields([
    { name: `Bot Komutları`, value: commands.map(x => `\`/${x.name}\``).join(' | ') }
])
.setTimestamp()
.setFooter({text: `_CJ` })
interaction.reply({ embeds: [embed] }).catch(e => { })
},
};
