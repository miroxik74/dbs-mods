module.exports = {
    name: "Ping Message",
    author: ["Vannzilla#5260"],
    version: "0.1.0",
    changelog: "Added ping message",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",

    html: function (data) {
        return `
            <div class="form-group">
                <label>Ping message use $$ping$$ to insert ping *</label>
                <textarea class="form-control needed-field" name="pingMessage" rows="3" ></textarea>
            </div>
        `;
    },

    init: function () {
        console.log("Loaded ping message");
    },

    mod: function (DBS, message, action, args, command, index) {
        var pingMsg = (action.pingmessage)
        var ping = Date.now() - message.createdTimestamp + " ms";
        pingMsg = pingMsg.replace("$$ping$$", ping)
        message.channel.send(pingMsg);

        DBS.callNextAction(command, message, args, index + 1);
    }
};