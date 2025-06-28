module.exports = {
    name: "Get Mentioned Role",
    author: ["Pokemonultra#2815"],
    version: "1.0.0",
    changelog: "Created Get Mentioned Role",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Variable",

    html: function (data) {
        return `
            <div class="form-group">
                <label>Variable Name *</label>
                <input class="form-control needed-field" name="varName"></input>
                </div>
                <hr>
                <label>Variable Type *</label>
                <div class="form-group">
                <select class="form-control" name="varType">
                    <option value="temp" selected>Temp Variable</option>
                    <option value="server">Server Variable</option>
                    <option value="global">Global Variable</option>
                </select>
            </div>
        `;
    },

    init: function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        console.log("Loaded Get Mentioned Role");
    },

    mod: function (DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        const MRole = message.mentions.roles.map(r => r.name);
        DBS.BetterMods.saveVar(action.vartype, action.varname, MRole, message.guild);
        DBS.callNextAction(command, message, args, index + 1);
    }
};
