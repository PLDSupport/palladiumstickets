const Mongoose = require('mongoose')
const Ticket = new Mongoose.Schema({ userID: String, Ticket: String, MessageID: String })
module.exports = Mongoose.model('Tickets', Ticket)