const { Client, DiscordAPIError } = require("discord.js");
module.exports = {
    name: "Jump To Node",
    author: ["STR1KE#6969"],
    version: "0.1.0",
    changelog: "nothing",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Bot Action",
    html: function(data) {
        return `
        <small>Currently <strong>Using Jump To Node v0.1.0</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span>Any Issues?<br> <span style="color: orange; font-weight: bold;">Any issues?</span>Please Contact STR1KE#6969</label>
        </div>
        <hr>
            <div class="form-group">
                <label>Response name: * </label>
                <textarea class="form-control needed-field" name="value" rows="1" ></textarea>
                </div>       
        `;
    },
    init: function() {
        console.log("Loaded JumpToNode");
    },
    mod: async function(DBS, message, action, args, command, index) {
       DBS.callNextAction(command, message, args, command.actions.indexOf(command.actions.find(e=>e.name==action.value)));
      }
};
