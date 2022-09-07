const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
name: "oynatılan",
description: "Çalınan müzik hakkında bilgi verir.",
permissions: "0x0000000000000800",
options: [],
run: async (client, interaction) => {
const queue = client.player.getQueue(interaction.guild.id);

if (!queue || !queue.playing) return interaction.reply({ content: `Şu anda çalan müzik yok!. ❌`, ephemeral: true }).catch(e => { })

const track = queue.current;

const embed = new EmbedBuilder();
embed.setColor('007fff');
embed.setThumbnail(track.thumbnail);
embed.setTitle(track.title)

const methods = ['disabled', 'track', 'queue'];

const timestamp = queue.getPlayerTimestamp();
const trackDuration = timestamp.progress == 'Forever' ? 'Endless (Live)' : track.duration;

embed.setDescription(`Ses **%${queue.volume}**\n
Süre **${trackDuration}**\nURL: ${track.url}\nDöngü Modu **${methods[queue.repeatMode]}**\n${track. requestedBy}`);

embed.setTimestamp();
embed.setFooter({text: `_CJ` })

const saveButton = new ButtonBuilder();
saveButton.setLabel('Müziği Kaydet');
saveButton.setCustomId('saveTrack');
saveButton.setStyle(ButtonStyle.Success);

const row = new ActionRowBuilder().addComponents(saveButton);

interaction.reply({ embeds: [embed], components: [row] }).catch(e => { })
},
};
