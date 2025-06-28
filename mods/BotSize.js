module.exports = {
    name: "BotSize",
    author: ["Electraboss"],
    version: "1.0.0",
    changelog: "Created Server Size Mod",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Bot Action",

    html: function (data) {
        return `
        <div class="row">
            <div class="col">
                <label>Variable Type *</label>
                <select name="vartype" class="form-control">
                    <option value="temp">Temp Variable</option>
                    <option value="server">Server Variable</option>
                    <option value="global">Global Variable</option>
                </select><br>
            </div>
            <div class="col">
                <label>Variable Name *</label>
                <input class="form-control" name="varname"></input><br>
            </div>
        </div>
        `;
    },

    init: function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        console.log("Loaded Bot Size message");
    },

    mod: function (DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        const client = DBS? DBS.Bot : DBS;

        DBS.BetterMods.saveVar(action.vartype, action.varname, client.guilds.cache.size, message.guild);
        DBS.callNextAction(command, message, args, index + 1);
    }
};