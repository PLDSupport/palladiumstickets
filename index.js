const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js')
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [ Partials.Message ]
})

client.on('ready', () => {
    console.log('Bot Is Ready !!', client.user.username)
})

const fs = require('fs')
client.slashCommands = new Collection()
client.Çʍɗ = new Collection()
fs.readdirSync('./Handler/').forEach((Handler) => require(`./Handler/${Handler}`)(client))
module.exports = client;
client.config = require('./config.json')


client.login('your token here')