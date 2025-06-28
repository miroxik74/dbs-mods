module.exports.modalOutput = async function (DBS, interaction) {
    const i = interaction;

    // *** MANUALLY CONFIGURE THESE VALUES BELOW: ***
    const guildID = 'GUILD_ID';
    const channelID = 'CHANNEL_ID';
    // ***********************************************

    if (!guildID || !channelID) {
        return i.reply({ content: 'Check output file!', fetchReply: true, ephemeral: true });
    }

    const { MessageEmbed } = require('discord.js');
    const client = DBS? DBS.Bot : DBS;
    const guild = await client.guilds.fetch(guildID);
    const channel = guild.channels.cache.get(channelID);

    const favoriteColor = i.fields.getTextInputValue('favoriteColorInput');
    const hobbies = i.fields.getTextInputValue('hobbiesInput');

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
        i.reply({ content: 'Your submission was received successfully!', fetchReply: true, ephemeral: true });
    } catch (error) {
        i.reply({ content: `${error}`, ephemeral: true });
    }
}