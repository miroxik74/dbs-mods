module.exports = {
    name: "BotSystemInfo",
    author: ["aoe#4851"],
    version: "0.0.1",
    changelog: "Added BotSystemInfo Mod",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Bot Action",
    html: function (data) {
        return `
        <div class="row">
        <div class="col">
            <label>Get *</label>
            <select name="main" class="form-control">
                <option value="totalram">Total RAM</option>
                <option value="freeram">Free RAM</option>
                <option value="usedram">Used RAM</option>
                <option value="botplatform">Bot Platform</option>
                <option value="hostname">Bot Host Name</option>
                <option value="cpuusage">CPU Usage</option>
        </select><br>
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
        console.log("Loaded BotSystemInfo");
    },
    mod: function (DBS, message, action, args, command, index) {
        var os = require('os');
        switch (action.main) {
            case "totalram":
                const totalram = ((os.totalmem() / 10 ** 6 + " ").split('.')[0])
                DBS.BetterMods.saveVar(action.vartype, action.varname, totalram, message.guild);
                DBS.callNextAction(command, message, args, index + 1);
                break
            case "freeram":
                const freeram = ((os.freemem() / 10 ** 6 + " ").split('.')[0]);
                DBS.BetterMods.saveVar(action.vartype, action.varname, freeram, message.guild);
                DBS.callNextAction(command, message, args, index + 1);
                break
            case "usedram":
                const usedram = (((os.totalmem() - os.freemem()) / 10 ** 6 + " ").split('.')[0]);
                DBS.BetterMods.saveVar(action.vartype, action.varname, usedram, message.guild);
                DBS.callNextAction(command, message, args, index + 1);
                break
            case "botplatform":
                const botplatform = process.platform;
                DBS.BetterMods.saveVar(action.vartype, action.varname, botplatform, message.guild);
                DBS.callNextAction(command, message, args, index + 1);
                break
            case "hostname":
                const oshostname = os.hostname();
                DBS.BetterMods.saveVar(action.vartype, action.varname, oshostname, message.guild);
                DBS.callNextAction(command, message, args, index + 1);
                break
            case "cpuusage":
                const cpu1 = Math.round(process.cpuUsage().system) / 1024;
                const cpuusage = Math.trunc(cpu1);
                DBS.BetterMods.saveVar(action.vartype, action.varname, cpuusage, message.guild);
                DBS.callNextAction(command, message, args, index + 1);
                break
        }
    }
};