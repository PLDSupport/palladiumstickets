const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const Database = require('../../Data/Mongoose')
module.exports = {
    name: 'send-panel-ticket',
    description: 'ticket setup panel',
    options: [
        { name: 'room-mention-or-id', description: 'قم بوضع ايدي او منشن روم البانل', type: 7, required: true },
        { name: 'category-id-or-mention', description: 'قم بمنشنه الكتاجوري او وضع الايدي', type: 7, required: true },
        { name: 'support-id-or-mention', description: 'قم بمنشنه رتبه السبورت او وضع الايدي', type: 8, required: true },
        { name: 'description', description: 'قم بكتابه وصف الامبد الخاص بك', type: 3, required: true },
        { name: 'button-name', description: 'اسم الزر', type: 3, required: true },
    ],
/**
 * @param { import ('discord.js').Client } Client
 * @param { import ('discord.js').Interaction } Interaction
*/
    run: async( Client, Interaction ) => {
        const room = Interaction.options.getChannel('room-mention-or-id')
        const category = Interaction.options.getChannel('category-id-or-mention')
        const description = Interaction.options.getString('description')
        const Support = Interaction.options.getRole('support-id-or-mention')
        const button = Interaction.options.getString('button-name')
        if (Interaction.member.permissions.has('Administrator')) {
        const Embed = new EmbedBuilder()
        .setAuthor({ name: Interaction.guild.name, iconURL: Interaction.guild.iconURL()})
        .setColor('Random').setDescription(description)
        .setThumbnail(Interaction.guild.iconURL()).setTitle('Ticket')
        const Row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('button').setLabel(button).setStyle(ButtonStyle.Secondary))
        room.send({ embeds: [Embed], components: [Row]}).then(async (msg) => { new Database({ guildID: Interaction.guild.id, TicketID: msg.id, CategoryID: category.id, SupportID: Support.id }).save() })
        Interaction.reply({ content: `**Done Setup Ticket** 🟢`, ephemeral: true })
        } else {
            Interaction.reply({ content: `لا تمتلك صلاحيات كافيه \`Adminstrator\``, ephemeral: true })
        }
    }
}