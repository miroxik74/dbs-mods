module.exports = {
    name: "Delete Message By ID",
    author: ["mrballou#9055"],
    version: "0.0.1",
    changelog: "some changelog",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",
    html: function (data) {
        return `
        <small>Currently <strong>Using Delete Message By ID  mod v0.0.1</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span> You need BetterMods v2.0.0!<br> <span style="color: orange; font-weight: bold;">Any issues?</span>Please DM mrballou#9055</label>
        <div class="form-group">
            <label>message</label>
            <textarea rows="1" class="form-control needed-field" id="message" name="message"></textarea>
            <small class="form-text text-muted">Message ID</small>
        </div>
      `;
    },
    init: function () {
        console.log("Loaded delete message by id");
    },
    mod: async function (DBS, message, action, args, command, index) {
        var messageid = DBS.BetterMods.getVar("temp", action.message.replace("${tempVars.", "").replace("}", ""), message.guild)
        for (let c in message.guild.channels.cache._array) {
            var channel = message.guild.channels.cache._array[c]
            if (channel.type === 'text') {
                var Message = await channel.messages.fetch(messageid).catch(err => { })
                if (typeof Message !== 'undefined') {
                    Message.delete()
                    break;
                }
            }
        }
        DBS.callNextAction(command, message, args, index + 1);
    }
};