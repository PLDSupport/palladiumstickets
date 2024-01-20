module.exports = async(Client, Interaction) => {
    if(Interaction.isButton()) {
    Client.emit('openTicket', (Client, Interaction))
    } else if(Interaction.isChatInputCommand()) {
        const Cmd = Client.Çʍɗ.get(Interaction.commandName);
        if(!Cmd) return;
        try {
            Cmd.execute(Interaction, Client);
        } catch(Err) {
            console.log(Err)
        }
    } else if (Interaction.isModalSubmit()) {
      
    }
}