module.exports = {
    name: "Get Server Amount",
    author: ["PlayboyPrime#3839"],
    version: "1.0.0",
    changelog: "Release",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Variable",
    html: function (data) {
        return `
            <div class="form-group">
                <label>Variable name to save bot amount in *</label>
                <input class="form-control needed-field" oninput="createvar" id="varname" name="varname"></input>
                </div>
                <hr>
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
    init: function () {
        console.log("Loaded Get Server Amount");
    },
    mod: function (DBS, message, action, args, command, index) {
        const client = DBS? DBS.Bot : DBS;

        DBS.BetterMods.saveVar(action.vartype, action.varname, client.guilds.cache.size, message.guild)

        DBS.callNextAction(command, message, args, index + 1);
    }
};