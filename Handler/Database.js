module.exports = async Client => {
    
const Mongoose = require('mongoose')
Mongoose.connect('mongodb+srv://kasrbroxish:2ahr7ibEbsBSLBdg@cluster0.9xidmq2.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log('Database Connected')
}).catch(() => {
    console.log('Filed Connected')
})}