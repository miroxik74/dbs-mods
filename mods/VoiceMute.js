module.exports = {
    name: "VoiceMute",
    author: ["aoe#4851"],
    version: "1.0.0",
    changelog: "Added VoiceMute",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "User Action",
    html: function (data) {
        return `
        <b>Voice Mutes a Mentioned User </b>
        <hr>
        <div class="form-group">
        <select class="form-control" name="check">
            <option value="true" selected>True</option>
            <option value="false" selected>False</option>
        </select>
    </div>
        `;
    },
    init: function () {
        console.log("Loaded VoiceMute");
    },
    mod: function (DBS, message, action, args, command, index) {
        switch (action.check) {
            case "true":
                message.mentions.members.first().voice.setMute(true)
                break;
            case "false":
                message.mentions.members.first().voice.setMute(false)
                break;
        }
        DBS.callNextAction(command, message, args, index + 1);
    }
};