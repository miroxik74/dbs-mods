module.exports = {
    name: "Change Server Icon",
    author: ["aoe#9022", "@miroxik74"],
    version: "1.0.2",
    changelog: "Added variables, checkboxes and fixed getting icon url",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Server Action",
    html: function (data) {
        return `
        </div>
            </div>
                <div class="col">
                <label>Link of the new Server Profile</label>
                    <div class="input-group mb-3">
                        <input class="form-control needed-field" name="icon"></input><br>
                        <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="icon">Insert Variable</a>
                </div>
            </div>
            <p class="text-muted">Note:<br>Some images won't work due to size or format so just use another url</p>
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
            require("node-fetch");
        } catch {
            DBS.BetterMods.requireModule("node-fetch");
        }
        console.log("Loaded Change Server Icon");
    },
    mod: async function (DBS, message, action, args, command, index) {

        const fetch = require('node-fetch');
        const guild = message.guild;
        const attachment = message.attachments.first();
        const icon = DBS.BetterMods.parseAction(action.icon, message);

        async function conf(option) {
            if (option !== "false") {
                await message.reply({ content: `New icon has been successfully set!`, allowedMentions: { repliedUser: false } });
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
            if (attachment) {
                const response = await fetch(attachment.url);
                const buffer = await response.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString('base64');
                const imageType = attachment.contentType.split('/')[1];
                await guild.setIcon(`data:${imageType};base64,${base64Image}`);
                await conf(action.confirmation);
            } else if (icon) {
                await guild.setIcon(icon);
                await conf(action.confirmation);
            }
        } catch (error) {
            await err(action.error, error);
        }

        DBS.callNextAction(command, message, args, index + 1);
    }
};