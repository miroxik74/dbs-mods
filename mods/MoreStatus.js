module.exports = {
    name: "More Status",
    author: ["Vannzilla#5260, Revised by Big D#1129", "@miroxik74"],
    version: "0.3.2",
    changelog: "Fixed undefined value and added variables",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Bot Action",

    html: function (data) {
        return `
            <div class="form-group">
                <label>Set To *</label>
                <select class="form-control" name="statusOption">
                    <option value="WATCHING" selected>Watching</option>
                    <option value="LISTENING">Listening</option>
                    <option value="PLAYING">Playing</option>
                </select>
            </div>
            <div class="input-group mb-3">
                <label>To show the server or member count, use $$Servers$$ or $$Members$$ *</label>
                    <div class="input-group mb-3">
                        <input class="form-control needed-field" name="statustext"></input><br>
                            <div class="input-group-append">
                                <a class="btn btn-outline-primary" role="button" id="variables" forinput="statustext" rows="1" >Insert Variable</a>
                    </div>
            </div>
            </div>
        `;
    },

    init: async function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        try {
            require("discord.js");
        } catch {
            DBS.BetterMods.requireModule("discord.js");
        }
        console.log("| Loaded More Status");
    },

    mod: async function (DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        var status = action.statustext;

        const { ActivityType } = require('discord.js');
        const client = DBS ? DBS.Bot : DBS;
        let totalUsers = 0;
        client.guilds.cache.forEach(guild => { totalUsers += guild.memberCount; });

        status = (DBS.BetterMods.parseAction(action.statustext, message));
        status = status.replace("$$Servers$$", client.guilds.cache.size);
        status = status.replace("$$Members$$", totalUsers);

        client.user.setActivity(status, { type: action.statusoption })

        DBS.callNextAction(command, message, args, index + 1);
    }
};