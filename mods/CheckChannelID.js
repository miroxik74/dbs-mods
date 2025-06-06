module.exports = {
    name: "Check Channel ID",
    author: ["Big D#1129"],
    version: "0.1.0",
    changelog: "Added ability to check if the command was sent in certain channel or not",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Channel Action",

    html: function (data) {
        return `
            <div class="form-group">
                <label>The ID of the channel you want the command to work in *</label>
                <textarea class="form-control needed-field" name="channelid" rows="1" ></textarea>
            </div>
            <div class="form-group">
                <label>Incorrect channel message *</label>
                <textarea rows="2" class="form-control needed-field" name="nomatch"></textarea>
            </div>
        `;
    },

    init: function () {
        console.log("Loaded Channel Check");
    },

    mod: function (DBS, message, action, args, command, index) {
        var channelID = action.channelid;
        var NoMatch = action.nomatch;

        if (message.channel.id === channelID) {
            DBS.callNextAction(command, message, args, index + 1);
        } else message.channel.send(NoMatch);
    }
};