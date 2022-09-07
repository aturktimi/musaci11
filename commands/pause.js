module.exports = {
name: "durdur",
description: "Çalmakta olan müziğin çalınmasını durdurur.",
permissions: "0x0000000000000800",
options: [],
run: async (client, interaction) => {

const queue = client.player.getQueue(interaction.guild.id);

if (!queue || !queue.playing) return interaction.reply({ content: `Şu anda çalan müzik yok!. ❌`, ephemeral: true }).catch(e => { })

const success = queue.setPaused(true);

return interaction.reply({ content: success ? `Şu anda çalan müzik adlı **${queue.current.title}** Durdu ✅` : `Bir şeyler yanlış gitti. ❌` }).catch(e => { })
},
}
