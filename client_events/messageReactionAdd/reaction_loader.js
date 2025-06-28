module.exports = {
    name: "ready",
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
    mod: async function (DBS) {

        // *** MANUALLY CONFIGURE THESE VALUES BELOW: ***
        const channelID = 'CHANNEL_ID';
        const messageID = 'MESSAGE_ID';
        // ***********************************************

        if (!channelID || !messageID) return;
        const client = DBS? DBS.Bot : DBS;
        try {
            const channel = await client.channels.fetch(channelID);
            const message = await channel.messages.fetch(messageID);
            const reactions = await message.reactions.cache.get();
        } catch (error) {
            console.log(error);
        }
    }
};