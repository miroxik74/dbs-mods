module.exports = {
    name: "Edited Author Only Channel",
    author: ["STR1KE#4115", "."],
    version: "2.0.1",
    changelog: "nothing",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Channel Action",
    html: function(data) {
        return `
        <small>Currently <strong>Using Edited Author Only Channel mod v2.0.0</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span> You need BetterMods v2.0.0!<br> <span style="color: orange; font-weight: bold;">Any issues?</span>Please DM STR1KE</label>
        </div>
        <hr>    
        <div class="form-group">
                <label>Channel name: *</label>
                <textarea class="form-control needed-field" name="chname1" rows="1" ></textarea>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="chname1">Insert Variable</a>
                </div>
            </div>
            <div class="form-group">
                <label>Catogory id: *</label>
                <textarea class="form-control needed-field" name="chcatogory" rows="1" ></textarea>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="chcategory1">Insert Variable</a>
                </div>
            </div>
            <div class="form-group">
                <label>Role id: *</label>
                <textarea class="form-control needed-field" name="chrole1" rows="1"></textarea>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="chrole1">Insert Variable</a>
                </div>
            </div>
        `;
    },
    init: async function(DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        try {
            require("discord.js");
        } catch {
            DBS.BetterMods.requireModule("discord.js");
        }
        console.log(">> Loaded Edited Author Only Channel 2.0");
    },
    mod: function(DBS, message, action, args, command, index) {
        const { Guild, Client } = require("discord.js");
        counter = 0;
        counter++;
        const chname = DBS.BetterMods.parseAction(action.chname1, message)
        const chcategory = DBS.BetterMods.parseAction(action.chcategory1, message)
        const chrole = DBS.BetterMods.parseAction(action.chrole1, message) 
        message.guild.channels.create(action.chname + counter, {
            type: 'text',
        }).then(channel => {
            channel.setParent(action.chcatogory);
            channel.updateOverwrite(message.guild.roles.everyone, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false
            })
            channel.updateOverwrite(message.author.id, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true
            })
            channel.updateOverwrite(action.chrole, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true
            })
        });
        DBS.callNextAction(command, message, args, index + 1);
    }
};
