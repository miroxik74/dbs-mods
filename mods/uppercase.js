module.exports = {
    name: "uppercase",
    author: ["Black Tiger#3050"],
    version: "1.0.0",
    changelog: "Release",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Variable",

    html: function (data) {
        return `
        <label>Variable *</label>
        <div class="input-group mb-3">
            <input class="form-control needed-field" id="input" name="input"></input><br>
            <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="input">Insert Variable</a>
            </div>
        </div>
        <hr>
        <div class="form-group">
            <label>New Variable *</label>
            <input class="form-control needed-field" name="varname"></input>
            <small class="form-text text-muted">Name of new variable</small>
        </div>
        <label>Variable Type *</label>
        <div class="form-group">
                <select class="form-control" name="vartype">
                <option value="temp" selected>Temp Variable</option>
                <option value="server">Server Variable</option>
                <option value="global">Global Variable</option>
            </select>
        </div>
        `;
    },

    init: function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        console.log("Loaded uppercase Mod");
    },

    mod: function (DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        const text = DBS.BetterMods.parseAction(action.input, message)
        DBS.BetterMods.saveVar(action.vartype, action.varname, text.toUpperCase(), message.guild);
        DBS.callNextAction(command, message, args, index + 1);
    }
};