const { Guild, Client } = require("discord.js");
module.exports = {
    name: "Edit Msg",
    author: ["STR1KE#6969"],
    version: "0.1.0",
    changelog: "nothing",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",
    html: function(data) {
        return `
        <small>Currently <strong>Using Edit Msg v0.1.0</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span> You need BetterMods v2.0.0!<br> <span style="color: orange; font-weight: bold;">Any issues?</span>Please DM STR1KE</label>
        </div>
        <hr>   
            <div class="form-group">
                <label>Send a message*</label>
                <textarea class="form-control needed-field" name="mes" rows="1" ></textarea>
            </div>
            <div class="form-group">
            <label>Delay*</label>
            <textarea class="form-control needed-field" name="del" rows="1" ></textarea>
        </div>
        <div class="form-group">
        <label>Edit message to*</label>
        <textarea class="form-control needed-field" name="editmes" rows="1" ></textarea>
    </div>
           \
        `;
    },
    init: function() {
        console.log("Loaded EditMsg");
    },
    mod: function(DBS, message, action, args, command, index) {
    msg = message.channel.send(action.mes);
    const delay = action.del * 1000;
    setTimeout(function() {
        msg.then(((sentMessage) => sentMessage.edit(action.editmes)))
    }, delay);
    DBS.callNextAction(command, message, args, index - action.nodes);
}};
