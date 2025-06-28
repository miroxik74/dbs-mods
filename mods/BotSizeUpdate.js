module.exports = {
    name: "Bot Size Update",
    author: ["Electraboss", "slithey"],
    version: "1.1.0",
    changelog: "Updated bot size ~ Slithey",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",
    html: function (data) {
        return `
        <small>Currently <strong>Using Bot Size Updated mod v1.1.0</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span> You need BetterMods v2.0.0!<br> <span style="color: orange; font-weight: bold;">Any issues?</span>Please DM Electraboss or slithey</label>
            <div class="form-group">
                <label>Bot size message use $$BotSize$$ to insert bot size *</label>
                <textarea class="form-control needed-field" name="bsm" rows="3" ></textarea>
            </div>
        `;
    },
    init: function () {
        console.log("Loaded Bot Size update");
    },
    mod: function (DBS, message, action, args, command, index) {
        const client = DBS? DBS.Bot : DBS;
        var botSizeMessage = (action.bsm)
        botSizeMessage = botSizeMessage.replace("$$BotSize$$", client.guilds.cache.size)
        message.channel.send(botSizeMessage);
        DBS.callNextAction(command, message, args, index + 1);
    }
};