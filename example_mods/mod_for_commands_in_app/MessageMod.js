module.exports = {
    name: "Message Mod",
    author: ["Discord Bot Studio"],
    version: "1.0.0",
    changelog: "Created Send Message ~ Great Plains Modding",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",

    html: function (data) {
        return `
            <div class="form-group">
                <label>Send To *</label>
                <select class="form-control">
                    <option value="SameChannel" selected>Same Channel</option>
                    <option value="MessageAuthor">Message Author</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div class="form-group">
                <label>Response message text *</label>
                <textarea class="form-control needed-field" name="messageText" rows="3" ></textarea>
            </div>
        `;
    },

    init: function () {
        console.log("Loaded Message Mod");
    },

    mod: function (DBS, message, action, args, command, index) {

        // Note DBS stores all data from the HTML field into lowercase. messageText = messagetext
        switch (action.channelname) {
            case "sameChannel":
                message.channel.send(action.messagetext);
                break;
            case "messageAuthor":
                message.author.send(action.messagetext);
                break;
            case "mentionedUser":
                message.mentions.first().send(action.messagetext);
                break;
        }

        // Remember to use callNextAction or the bot wont continue any actions after this mod.
        DBS.callNextAction(command, message, args, index + 1);
    }
};
