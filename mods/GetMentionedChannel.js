module.exports = {
    name: "Get Mentioned Channel",
    author: ["Pokemonultra#2815"],
    version: "1.0.0",
    changelog: "Created Get Mentioned Channel",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Variable",

    html: function (data) {
        return `
        <div class="form-group">
        <label>Store into Variable with Name *</label>
        <input class="form-control needed-field" name="varName"></input>
        <small class="form-text text-muted">This will be used in other references</small>
        </div>
        <hr>
        <label>Store Variable in Type *</label>
        <div class="form-group">
        <select class="form-control" name="varType">
            <option value="temp" selected>Temp Variable</option>
            <option value="server">Server Variable</option>
            <option value="global">Global Variable</option>
        </select>
    </div>
    <label><span style="font-weight: bold">Mod made by:</span> Pokemonultra#2815</label>
        `;
    },

    init: function () {
        console.log("Loaded Get Mentioned Channel");
    },

    mod: function (DBS, message, action, args, command, index) {
        const MChannel = message.mentions.channels.first();

        DBS.BetterMods.saveVar(action.vartype, action.varname, MChannel.id, message.guild);

        DBS.callNextAction(command, message, args, index + 1);
    }
};
