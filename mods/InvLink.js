module.exports = {
    name: "Inv Link",
    author: ["Vannzilla#5260"],
    version: "0.1.1",
    changelog: "Added variable support",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",

    html: function(data) {
        return `
            <div class="form-group">
                <label>Client ID *</label>
                <textarea class="form-control needed-field" name="clientid" rows="1" ></textarea>
            </div>
            <div class="form-group">
                <label>Permissions integer (8 = administrator) *</label>
                <textarea class="form-control needed-field" name="permInt" rows="1" ></textarea>
            </div>
            <hr>
            <div class="form-group">
                <label for="varname">Var Name to save link in*</label>
                <input type="text" class="form-control" name="varname" id="varname">
            </div>
            <div class="form-group">
                <label for="vartype">Var Type *</label>
                <select name="vartype" id="vartype" class="form-control">
                    <option value="temp">Temp</option>
                    <option value="server">Server</option>
                    <option value="global">Global</option>
                </select>
            </div>
        `;
    },

    init: function(DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        console.log("Loaded Inv Link");
    },

    mod: function(DBS, message, action, args, command, index) {
        var link = `https://discord.com/api/oauth2/authorize?client_id=${action.clientid}&permissions=${action.permint}&scope=bot`
        DBS.BetterMods.saveVar(action.vartype, action.varname, link, message.guild);

        DBS.callNextAction(command, message, args, index + 1)
    }
};
