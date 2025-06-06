module.exports = {
    name: "Emoji",
    author: ["aoe#4851"],
    version: "1.0.1",
    changelog: "You can now get the mentioned name",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Server Action",

    html: function (data) {
        return `
        <div class="form-group">
            <label>The URL of the emoji *</label>
            <textarea class="form-control needed-field" name="url" rows="1" ></textarea>
        </div>
        <div class="form-group">
            <label>The Name of the emoji *</label>
            <textarea class="form-control needed-field" name="emojiname" rows="1" ></textarea>
        </div>
        `;
    },

    init: function (DBS) {
        console.log("Loaded Emoji");
    },

    mod: function (DBS, message, action, args, command, index) {
        message.guild.emojis.create(action.url, action.emojiname);
        DBS.callNextAction(command, message, args, index + 1);
    }
};
