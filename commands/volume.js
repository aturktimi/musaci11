const { ApplicationCommandOptionType } = require('discord.js');
const maxVol = require("../config.js").opt.maxVol;
module.exports = {
name: "ses",
description: "Müziğin sesini ayarlamanızı sağlar.",
permissions: "0x0000000000000800",
options: [{
name: 'ses',
description: 'Sesi ayarlamak için numarayı yazın.',
type: ApplicationCommandOptionType.Integer,
required: true
}],
run: async (client, interaction) => {
const queue = client.player.getQueue(interaction.guild.id);
if (!queue || !queue.playing) return interaction.reply({ content: `Şu anda çalan müzik yok!. ❌`, ephemeral: true }).catch(e => { })

const vol = parseInt(interaction.options.getInteger('ses'));

if (!vol) return interaction.reply({ content: `Mevcut hacim: **${queue.volume}** 🔊\n**Ses seviyesini değiştirmek için \`1\` ile \`${maxVol}\` arasında bir sayı yazın.**`, ephemeral: true }).catch(e => { })

if (queue.volume === vol) return interaction.reply({ content: `Değiştirmek istediğiniz ses düzeyi zaten mevcut ses düzeyidir ❌`, ephemeral: true }).catch(e => { })

if (vol < 0 || vol > maxVol) return interaction.reply({ content: `**
Bir sayı yazın: \`1\` ile \`${maxVol}\` ses seviyesini değiştirmek için.** ❌`, ephemeral: true }).catch(e => { })

const success = queue.setVolume(vol);

return interaction.reply({ content: success ? `Ses seviyesi değişti: **%${vol}**/**${maxVol}** 🔊` : `Bir şeyler yanlış gitti. ❌` }).catch(e => { })
},
};