module.exports = {
    name: "messageCreate",
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
    mod: async function (DBS, message) {

        // *** MANUALLY CONFIGURE THESE VALUES BELOW: ***
        const guildID = 'GUILD_ID';
        const em = 'EMOJI_NAME_OR_PASTE_IF_UNICODE';
        // ***********************************************

        if (!guildID || !em) return;
        try {
            if (message.guild.id === guildID) {
                await message.react(`${em}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
};