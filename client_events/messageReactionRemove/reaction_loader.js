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
        try {
            const channel = await DBS.channels.fetch('CHANNEL_ID');
            const message = await channel.messages.fetch('MESSAGE_ID');
            const reactions = await message.reactions.cache.get();
        } catch (error) {
            return console.log(error);
        }
    }
};