module.exports = {
    name: "messageReactionRemove",
    author: [""],
    version: "1.0.0",
    changelog: "",
    isEvent: true,
    isResponse: false,
    isMod: true,
    isAddon: false,
    section: "",
    html: function (data) {
        return `
        `;
    },
    init: async function (DBS) {
    },
    mod: async function (DBS, reaction, user) {
        const channelId1 = 'CHANNEL_ID';
        const messageId1 = 'MESSAGE_ID';
        
        const message = reaction.message;
        const emoji = reaction.emoji.name;
        const guild = await message.guild.fetch();
        const channel = await guild.channels.fetch(channelId1);
        await channel.messages.fetch(messageId1);

        try {
            if (message.id === messageId1 && channel.id === channelId1) {
                const userHasReacted = await message.guild.members.fetch(user.id);

                if (emoji === 'EMOJI_NAME_OR_PASTE_IF_UNICODE') {
                    const role = userHasReacted.guild.roles.cache.get('ROLE_ID');
                    if (role && userHasReacted) {
                        await userHasReacted.roles.remove(role);
                    }
                }

            }
        } catch (error) {
            return console.log(error);
        }
    }
};