module.exports.modalOutput = async function (DBS, interaction) {
    const { MessageEmbed } = require('discord.js');

    const guild = await DBS.Bot.guilds.fetch('GUILD_ID');
    const channel = guild.channels.cache.get('CHANNEL_ID');

    const favoriteColor = interaction.fields.getTextInputValue('favoriteColorInput');
    const hobbies = interaction.fields.getTextInputValue('hobbiesInput');

    try {
        await channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('New form!')
                    .addFields(
                        { name: 'favoriteColor data', value: `\`\`\`${favoriteColor}\`\`\``, inline: false },
                        { name: 'hobbies data', value: `\`\`\`${hobbies}\`\`\``, inline: false },
                    )
            ], allowedMentions: { repliedUser: false }
        });
        interaction.reply({ content: 'Your submission was received successfully!', ephemeral: true });
    } catch (error) {
        interaction.reply({ content: `${error}`, ephemeral: true });
    }
}