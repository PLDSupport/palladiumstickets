const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const Database = require('../../Data/Mongoose')
const db = require('../../Data/TicketCreated')
/**
* @param { import ('discord.js').Client } Client 
* @param { import ('discord.js').Interaction } Interaction 
*/

module.exports = async( Client, Interaction ) => {
    if (Interaction.isButton()) {
    if (Interaction.customId === 'button') {
    const User = await db.findOne({ MessageID: Interaction.message.id })
    const data = User?.userID
    if (data === Interaction.user.id) return Interaction.reply({ content: `You already have a ticket <#${User.Ticket}>`, ephemeral: true })
    const Data = await Database.findOne({ TicketID: Interaction.message.id })
    const CategoryID = Data.CategoryID
    Interaction.guild.channels.create({
        name: `ticket-${Interaction.user.username}`,
        parent: CategoryID,
        permissionOverwrites: [ { id: Interaction.guild.id, deny: ['ViewChannel'] }, { id: Interaction.user.id, allow: ['ViewChannel', 'SendMessages'] }, { id: Data.SupportID, allow: ['ViewChannel', 'SendMessages'] } ]
    }).then(async (Channel) => {
        Interaction.reply({ content: `Your ticket has been created ${Channel}`, ephemeral: true })
        const Embed = new EmbedBuilder()
        .setAuthor({ name: Interaction.user.displayName, iconURL: Interaction.user.displayAvatarURL()})
        .setColor('Random').setThumbnail(Interaction.user.displayAvatarURL()).setTimestamp()
        .setDescription(`Welcome to Tickets. If you have opened a ticket by mistake, press the 🔒 button`)
        const Row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('Close').setEmoji('🔒').setLabel('Close').setStyle(ButtonStyle.Secondary))
        Channel.send({ content: `**Welcome to ticket ${Interaction.user}, Support Ticket <@&${Data.SupportID}> **`, embeds: [Embed], components: [Row]})
        new db({ userID: Interaction.user.id, Ticket: Channel.id, MessageID: Interaction.message.id }).save()
    })
    } else if (Interaction.customId === 'Close') {
        Interaction.reply({ content: `**The ticket has been closed successfully**`})
        setTimeout(() => {
            Interaction.channel.delete()
        }, 5000)
    }}
}