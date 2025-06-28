module.exports = {
    name: "Author Only Channel",
    author: ["STR1KE#4115"],
    version: "0.1.1",
    changelog: "nothing",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Channel Action",
    html: function(data) {
        return `
		<small>Currently <strong>Using Author Only Channel mod v0.1.0</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span> You need BetterMods v2.0.0!<br> <span style="color: orange; font-weight: bold;">Any issues?</span>Please DM STR1KE#2895!</label>
            <div class="form-group">
                <label>Channel name: *</label>
                <textarea class="form-control needed-field" name="chname" rows="1" ></textarea>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="channelid">Insert Variable</a>
                </div>
            </div>
           \
        `;
    },
    init: async function(DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        try {
            require("discord.js");
        } catch {
            DBS.BetterMods.requireModule("discord.js")
        }
        console.log("Loaded Author Only Channel");
    },
    mod: function(DBS, message, action, args, command, index) {
        const { Guild, Client } = require("discord.js");
        message.guild.channels.create(action.chname, {
            type: 'text',
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                },
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                },
            ],
        });
        DBS.callNextAction(command, message, args, index + 1);
    }
};