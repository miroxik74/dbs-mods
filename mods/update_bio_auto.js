module.exports = {
    name: "ready", // Named ready for DBS to recognize it on startup.
    author: ["@miroxik74"],
    version: "1.0.1",
    changelog: "Release",
    isEvent: true,
    isResponse: false,
    isMod: true,
    isAddon: false,
    section: "",
    html: function (data) { return ` `; },
    init: async function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        try {
            require("axios");
        } catch {
            DBS.BetterMods.requireModule("axios");
        }
    },

    mod: async function (DBS) {

        // *** MANUALLY CONFIGURE THESE VALUES BELOW: ***
        const bios = [
            'Text 1',
            'Text 2',
            'Text 3',
            'Text 4',
            'Text 5',
        ];
        const seconds = ''; // Use seconds
        // ex. 120 if you want to update it every 2 mins
        // ***********************************************

        if (!bios || !seconds) return;
        const client = DBS ? DBS.Bot : DBS;
        const axios = require('axios');

        let currentIndex = 0;
        setInterval(async () => {
            currentIndex = (currentIndex + 1) % bios.length;
            try {
                const response = await axios.patch(
                    `https://discord.com/api/v10/applications/${client.user.id}`,
                    {
                        description: bios[currentIndex]
                    },
                    {
                        headers: {
                            'Authorization': `Bot ${client.token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
            } catch (error) {
                console.log(error);
            }
        }, seconds * 1000);
    }
};