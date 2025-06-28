module.exports = {
    name: "Bot Type",
    author: ["koki1019#0005", "@miroxik74"],
    version: "1.0.1",
    changelog: "Fixed",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",
    html: function(data) {
        return `
        <small>Currently <strong>Using Bot Type mod v1.0.1</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span> You need BetterMods v2.0.0!<br> <span style="color: orange; font-weight: bold;">Any issues?</span>Please DM koki1019#0005</label>
           <div class="col">
                <label>How long (seconds) to type</label>
                <input class="form-control" name="time" value="1"></input><br>
           </div>
        `;
    },
    init: function() {
        console.log("Loaded typing");
    },
    mod: async function(DBS, message, action, args, command, index) {
        var delay = action.time * 1000
        await message.channel.sendTyping();
        setTimeout(async function() {
            await message.channel.sendTyping();
            DBS.callNextAction(command, message, args, index + 1);
        }, delay);
    }
};