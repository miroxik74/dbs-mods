module.exports = {
    name: "Bot Info",
    author: ["Discord Bot Studio"],
    version: "1.0.0",
    changelog: "Created Bot Info",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Bot Action",
    html: function (data) {
        return `
        <small>Currently <strong>Using Bot Info mod v1.0.0</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span> You need BetterMods v2.0.0!<br> <span style="color: orange; font-weight: bold;"></label>
        </div>
        <hr>        
        <div class="form-group">
                <label>Get *</label>
                <select name="info" class="form-control">
                    <option value="clientGuildCount">Client Guild Count</option>
                    <option value="clientPing">Client Ping</option>
                    <option value="clientUptimeSeconds">Client Uptime (Seconds)</option>
                    <option value="clientUptimeMinutes">Client Uptime (Minutes)</option>
                    <option value="clientUptimeHours">Client Uptime (Hours)</option>
                    <option value="clientUptimeDays">Client Uptime (Days)</option>
                </select><br>
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
                        <input class="form-control" name="storeResult"></input><br>
                    </div>
                </div>
            </div>
        `;
    },

    init: function () {
        console.log("Loaded BotInfo");
    },

    mod: async function (DBS, message, action, args, command, index) {
        const client = DBS? DBS.Bot : DBS;
        switch (action.info) {
            case "clientGuildCount":
                DBS.BetterMods.saveVar(action.vartype, action.storeresult, client.guilds.size, message.guild)
                break
            case "clientPing":
                DBS.BetterMods.saveVar(action.vartype, action.storeresult, client.ws.ping, message.guild)
                break
            case "clientUptimeSeconds":
                DBS.BetterMods.saveVar(action.vartype, action.storeresult, Math.floor(client.uptime / 1000) % 60, message.guild)
                break
            case "clientUptimeMinutes":
                DBS.BetterMods.saveVar(action.vartype, action.storeresult, Math.floor(client.uptime / 60000) % 60, message.guild)
                break
            case "clientUptimeHours":
                DBS.BetterMods.saveVar(action.vartype, action.storeresult, Math.floor(client.uptime / 3600000) % 24, message.guild)
                break
            case "clientUptimeDays":
                DBS.BetterMods.saveVar(action.vartype, action.storeresult, Math.floor(client.uptime / 86400000), message.guild)
                break
        }

        DBS.callNextAction(command, message, args, index + 1);
    }
};