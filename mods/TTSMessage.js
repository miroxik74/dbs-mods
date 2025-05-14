module.exports = {
    name: "TTS Message",
    author: ["Big D#1129"],
    version: "0.1.0",
    changelog: "Added tts message",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",

    html: function (data) {
        return `
            <div class="form-group">
                <label>Write what you want the bot to say *</label>
                <textarea class="form-control needed-field" name="messagetext" rows="3" ></textarea>
            </div>
        `;
    },

    init: function (DBS) {
        console.log("Loaded TTS Message");
    },

    mod: function (DBS, message, action, args, command, index) {
        message.channel.send(action.messagetext, { tts: true });
        DBS.callNextAction(command, message, args, index + 1);
    }
};