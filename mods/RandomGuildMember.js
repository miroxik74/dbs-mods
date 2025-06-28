module.exports = {
    name: "Random Guild Member",
    author: ["Miro#6969"],
    version: "1.0.0",
    changelog: "None",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Server Action",
    html: function (data) {
        return `
        <small>Currently <strong>Using Random Guild Member v0.0.1</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span>Any Issues?<br> <span style="color: orange; font-weight: bold;">Any issues?</span>Please Contact Miro#6969</label>
        </div>
        <hr>
        <div class="form-group">
        <label>Save the <span style="background: blue; border-radius: 5px; padding: 3px; color: white; font-size: 14px">random user</span> to variable with name:</label>
        <input name="var_name" class="form-control"></input>  
        <small>The variable will not show up within the Insert Variable List!</small> 
        </div>
        <div class="form-group">
        <label>Choose variable type:</label>
        <select class="form-control" name="varselection">
            <option value="temp">Temporary - per server, deleted when the bot stops running</option>
            <option value="server">Server - per server, are saved to file and do not delete when bot stops</option>
            <option value="global">Global - are saved to file like Server, but are accessible in all guilds</option>
        </select>
    </div>
        `;
    },
    init: function () {
        console.log("Loaded Random Guild Member");
    },
    mod: function (DBS, message, action, args, command, index) {
        let user = message.guild.members.random();
        console.log(`${user.user}`);
        DBS.BetterMods.saveVar(action.varselection, action.var_name, channel.id, message.guild)
        DBS.callNextAction(command, message, args, index + 1)
    },
};