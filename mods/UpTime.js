module.exports = {
    name: "Up Time",
    author: ["Big D#1129"],
    version: "0.1.0",
    changelog: "Added up time command",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",

    html: function (data) {
        return `
        <div class="form-group">
            <div class="row">
                <div class="col">
                    <label>Collect *</label>
                    <select name="collectType" class="form-control">
                        <option value="1">Seconds</option>
                        <option value="2">Minutes</option>
                        <option value="3">Hours</option>
                        <option value="4">Days</option>
                    </select><br>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label>Variable Type *</label>
                    <select name="varType" class="form-control">
                        <option value="temp">Temp Variable</option>
                        <option value="server">Server Variable</option>
                        <option value="global">Global Variable</option>
                    </select><br>
                </div>

                <div class="col">
                    <label>Variable Name *</label>
                    <input class="form-control" name="varName"></input><br>
                </div>
            </div>
        </div>
        `;
    },

    init: function () {
        console.log("Loaded UpTime");
    },

    mod: function (DBS, msg, action, args, command, index) {
        const { error } = require("console");
        const client = DBS? DBS.Bot : DBS;
        const bottime = client.uptime;
        console.log(action)
        switch (action.collecttype) {
            case "1":
                DBS.BetterMods.saveVar(action.vartype, action.varname, Math.floor(bottime / 1000) % 60, msg.guild);
                break
            case "2":
                DBS.BetterMods.saveVar(action.vartype, action.varname, Math.floor(bottime / 60000) % 60, msg.guild);
                break
            case "3":
                DBS.BetterMods.saveVar(action.vartype, action.varname, Math.floor(bottime / 3600000) % 24, msg.guild);
                break
            case "4":
                DBS.BetterMods.saveVar(action.vartype, action.varname, Math.floor(bottime / 86400000), msg.guild);
                break
        }

        DBS.callNextAction(command, msg, args, index + 1);
    }
};