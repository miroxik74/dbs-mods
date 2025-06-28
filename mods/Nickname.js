module.exports = {
    name: "Nickname",
    author: ["STR1KE#6969"],
    version: "0.1.1",
    changelog: "nothing",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "User Action",
    html: function(data) {
        return `
        <small>Currently <strong>Using Nicknames v0.1.0</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span>Any Issues?<br> <span style="color: orange; font-weight: bold;">Any issues?</span>Please Contact STR1KE#6969</label>
        </div>
        <hr>
            <div class="form-group">
                <label>Nickname: Use $$args$$ to change the nickname to a mentioned nickname(ex1: -nickname IlikeDBS ex2: -nickname Stin Is The Best) *</label>
                <textarea class="form-control needed-field" name="nick" rows="1" ></textarea>
            </div>
           \
        `;
    },
    init: async function(DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        try {
            require("discord.js");
        } catch {
            DBS.BetterMods.requireModule("discord.js");
        }
        console.log("Loaded Nickname");
    },
    mod: function(DBS, message, action, args, command, index) {
        const { Guild, Client } = require("discord.js");
        var id = action.nick;
        id = id.replace("$$args$$", args);
        message.member.setNickname(id);
        DBS.callNextAction(command, message, args, index + 1);
    }
};