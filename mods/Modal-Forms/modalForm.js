module.exports.modalForm = async function (DBS, interaction) {
    const { MessageActionRow, Modal, TextInputComponent } = require('discord.js');

    const modal = new Modal()
        .setCustomId('myModal')
        .setTitle('My Modal');

    const favoriteColorInput = new TextInputComponent()
        .setCustomId('favoriteColorInput')
        .setLabel("What's your favorite color?")
        .setStyle('SHORT')
        .setMinLength(3)
        .setMaxLength(15)
        .setRequired(true);

    const hobbiesInput = new TextInputComponent()
        .setCustomId('hobbiesInput')
        .setLabel("What's some of your favorite hobbies?")
        .setStyle('PARAGRAPH')
        .setMinLength(3)
        .setMaxLength(2048);

    const firstActionRow = new MessageActionRow().addComponents(favoriteColorInput);
    const secondActionRow = new MessageActionRow().addComponents(hobbiesInput);
    modal.addComponents(firstActionRow, secondActionRow);

    await interaction.showModal(modal);
}