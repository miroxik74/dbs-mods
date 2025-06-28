module.exports = {
    name: "messageReactionAdd",
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

        // *** MANUALLY CONFIGURE THESE VALUES BELOW: ***
        const channelID = 'CHANNEL_ID';
        const messageID = 'MESSAGE_ID';
        const roleID = 'ROLE_ID';
        const em = 'EMOJI_NAME_OR_PASTE_IF_UNICODE';
        // ***********************************************

        if (!channelID || !messageID || !roleID || !em) return;
        const message = reaction.message;
        const emoji = reaction.emoji.name;
        const guild = await message.guild.fetch();
        const channel = await guild.channels.fetch(channelID);
        await channel.messages.fetch(messageID);

        try {
            if (message.id === messageID && channel.id === channelID) {
                const userHasReacted = await message.guild.members.fetch(user.id);

                if (emoji === em) {
                    const role = userHasReacted.guild.roles.cache.get(roleID);
                    if (role && userHasReacted) {
                        await userHasReacted.roles.add(role);
                    }
                }

            }
        } catch (error) {
            console.log(error);
        }
    }
};