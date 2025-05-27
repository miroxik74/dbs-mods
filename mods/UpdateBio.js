module.exports = {
    name: "Update Bio",
    author: ["@miroxik74"],
    version: "1.0.1",
    changelog: "",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Bot Action",

    html: function (data) {
        return `
        </div>
            </div>
                <div class="col">
                <label>Provide the text</label>
                    <div class="input-group mb-3">
                        <input class="form-control needed-field" name="new_bio"></input><br>
                        <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="new_bio">Insert Variable</a>
                </div>
            </div>
            <label>Click below if you want to receive any of those messages</label>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" name="confirmation">
                <label class="form-check-label">Confirmation</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" name="error">
                <label class="form-check-label">Error</label>
            </div>
        </div>
        `;
    },

    init: async function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        try {
            require("axios");
        } catch {
            DBS.BetterMods.requireModule("axios");
        }
        console.log("Loaded Update Bio");
    },

    mod: async function (DBS, message, action, args, command, index) {

        const client = DBS ? DBS.Bot : DBS;
        const axios = require('axios');
        const new_bio = DBS.BetterMods.parseAction(action.new_bio, message);

        async function conf(option) {
            if (option !== "false") {
                await message.reply({ content: `About me has been successfully updated!\n-# If you cannot see the changes, refresh your discord app!`, allowedMentions: { repliedUser: false } });
            }
            return;
        }
        async function err(option, error) {
            console.log(error);
            if (option !== "false") {
                await message.reply({ content: `${error}` });
            }
            return;
        }

        try {
            const response = await axios.patch(
                `https://discord.com/api/v10/applications/${client.user.id}`,
                {
                    description: new_bio
                },
                {
                    headers: {
                        'Authorization': `Bot ${client.token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            await conf(action.confirmation);
        } catch (error) {
            await err(action.error, error);
        }

        DBS.callNextAction(command, message, args, index + 1);
    }
};