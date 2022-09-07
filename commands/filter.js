const { ApplicationCommandOptionType } = require('discord.js');
module.exports = {
  name: "filtre",
  description: "Devam eden müziğe ses filtresi ekler.",
  permissions: "0x0000000000000800",
  options: [{
    name: 'filtre',
    description: 'Uygulamak istediğiniz filtreyi yazın. (bassboost, 8D, nightcore, mono, karaoke)',
    type: ApplicationCommandOptionType.String,
    required: true
  }],
  run: async (client, interaction) => {

    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing) return interaction.reply({ content: `Şu anda çalan müzik yok!. ❌`, ephemeral: true }).catch(e => { })
    const filtre = interaction.options.getString('filtre')

    if (!filtre) return interaction.reply({ content: `Lütfen geçerli bir filtre adı girin. ❌\n\`bassboost, 8D, nightcore\``, ephemeral: true }).catch(e => { })

    
const filters = ["bassboost","8D","nightcore","mono","karaoke"];
//other filters: https://discord-player.js.org/docs/main/master/typedef/AudioFilters 

const filter = filters.find((x) => x.toLowerCase() === filtre.toLowerCase());

if (!filter) return interaction.reply({ content: `Adınıza uygun bir filtre bulamadım. ❌\n\`bassboost, 8D, nightcore\``, ephemeral: true }).catch(e => { })
const filtersUpdated = {};
filtersUpdated[filter] = queue["_activeFilters"].includes(filter) ? false : true;
await queue.setFilters(filtersUpdated);

interaction.reply({ content: `
Uygulanan: **${filter}**, Filtre Durumu: **${queue["_activeFilters"].includes(filter) ? 'Aktif' : 'Aktif Değil'}** ✅\n **Unutmayın, müzik uzunsa filtre uygulama süresi buna göre uzayabilir.**` }).catch(e => { })
},
};
