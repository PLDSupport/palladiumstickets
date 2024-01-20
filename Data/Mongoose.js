const Mongoose = require('mongoose')

const Data = new Mongoose.Schema({
    guildID: String,
    TicketID: String,
    CategoryID: String,
    SupportID: String,
})

module.exports = Mongoose.model('Ticket-Panel', Data)