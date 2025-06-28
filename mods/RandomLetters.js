module.exports = {
    name: "Random Letters",
    author: ["ByFr0st#0001", "PlayboyPrime#3839"],
    version: "1.0.2",
    changelog: "fixes and added length input ~ PlayboyPrime#3839",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Variable",

    html: function (data) {
        return `
            <div class="col">
                <label>Variable Name *</label>
                <input class="form-control" name="varname"></input><br>
            </div>
            <div class="col">
                <label>Variable Type *</label>
                <select name="vartype" class="form-control">
                    <option value="temp">Temp Variable</option>
                    <option value="server">Server Variable</option>
                    <option value="global">Global Variable</option>
                </select>
                <hr>
                <label>Data Type *</label>
                <select name="fetchtype" class="form-control">
                    <option value="symbols">Only generates symbols and letters</option>
                    <option value="numbers">Only generates numbers</option>
                    <option value="all">Generates a password with letters and symbols</option>
                </select><br>
                <div class="form-group">
                    <label>Length (Number, max 2000) *</label>
                    <div class="input-group mb-3">
                        <input class="form-control needed-field" name="length"></input>
                        <div class="input-group-append">
                            <a class="btn btn-outline-primary" role="button" id="variables" forinput="length">Insert Variable</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init: async function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        try {
            require("generate-password");
        } catch {
            DBS.BetterMods.requireModule("generate-password");
        }
        console.log("Random Letters loaded");
    },

    mod: async function (DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        const generator = require('generate-password');
        if (DBS.BetterMods.parseAction(action.length, message) > 2000) {
            length = 2000
        } else length = DBS.BetterMods.parseAction(action.length, message)

        switch (action.fetchtype) {
            case "symbols":
                password = generator.generate({
                    length: length,
                    numbers: false,
                    symbols: true
                });

                DBS.BetterMods.saveVar(action.vartype, action.varname, password, message.guild);
                break
            case "numbers":
                password = generator.generate({
                    length: length,
                    numbers: true,
                    symbols: false
                });

                DBS.BetterMods.saveVar(action.vartype, action.varname, password, message.guild);
                break
            case "all":
                password = generator.generate({
                    length: length,
                    numbers: true,
                    symbols: true
                });

                DBS.BetterMods.saveVar(action.vartype, action.varname, password, message.guild);
                break
        }
        DBS.callNextAction(command, message, args, index + 1);
    }
};
