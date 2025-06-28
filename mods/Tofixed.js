module.exports = {
    name: "To fixed",
    author: ["STR1KE#6969"],
    version: "0.1.1",
    changelog: "nothing",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Variable",
    html: function (data) {
        return `
        <small>Currently <strong>Using To Fixed v0.1.0</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span>Any Issues?<br> <span style="color: orange; font-weight: bold;">Any issues?</span>Please Contact STR1KE#6969</label>
        </div>
        <hr>
            <div class="form-group">
                <label>Value: * </label>
                <textarea class="form-control needed-field" name="value" rows="1" ></textarea>
                </div>
                <div class="form-group">
                <label>Length: * </label>
                <textarea class="form-control needed-field" name="length" rows="1" ></textarea>
               
                        <label>Save to Variable with Type *</label>
                        <select name="varType" class="form-control">
                            <option value="temp">Temp Variable</option>
                            <option value="server">Server Variable</option>
                            <option value="global">Global Variable</option>
                        </select><br>
                    
                    
                    
                        <label>Variable Name *</label>
                        <input class="form-control" name="storeResult"></input><br>
                    
        `;
    },

    // When the bot is first started, this code will be ran.
    init: async function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        try {
            require("discord.js");
        } catch {
            DBS.BetterMods.requireModule("discord.js");
        }
        console.log("Loaded antiraid");
    },

    // Place your mod here.
    mod: async function (DBS, message, action, args, command, index) {

        const { Client, DiscordAPIError } = require("discord.js");
        var msg = await DBS.BetterMods.parseAction(action.value, message);
        DBS.BetterMods.saveVar(action.vartype, action.storeresult, parseFloat(msg).toFixed(await DBS.BetterMods.parseAction(action.length, message)), message.guild)

        await DBS.callNextAction(command, message, args, index + 1);


    }
};
