module.exports = {
name: "kapat",
description: "Önceki müziği tekrar çalar.",
permissions: "0x0000000000000800",
options: [],
run: async (client, interaction) => {
const queue = client.player.getQueue(interaction.guild.id);

if (!queue || !queue.playing) return interaction.reply({ content: `Şu anda çalan müzik yok!. ❌`, ephemeral: true }).catch(e => { })

queue.destroy();

interaction.reply({ content: `
Bu sunucuda çalan müzik kapatıldı, bir dahaki sefere görüşürüz✅` }).catch(e => { })
},
};
