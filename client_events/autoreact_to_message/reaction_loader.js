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
        const guildID = 'GUILD_ID';
        // ***********************************************

        if (!guildID) return;
        const client = DBS? DBS.Bot : DBS;
        try {
            const guild = await client.guilds.fetch(guildID);
            const channels = await guild.channels.fetch();
        } catch (error) {
            console.log(error);
        }
    }
};