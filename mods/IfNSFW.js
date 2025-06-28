module.exports = {
    name: "If NSFW",
    author: ["Vannzilla#5260"],
    version: "0.2.0",
    changelog: "Added failed messge response option",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Channel Action",

    html: function (data) {
        return `
            <div class="form-group">
                <label>Check if: *</label>
                <select class="form-control" name="NSFWTrueFalse">
                    <option value="True" selected>True</option>
                    <option value="False">False</option>
                </select>
            </div>
            <div class="form-group">
                <label>Failed Message Text</label>
                <textarea rows="1" class="form-control" name="failedmessage"></textarea>
            </div>
        `;
    },

    init: function (DBS) {
        console.log("Loaded If NSFW");
    },

    mod: function (DBS, message, action, args, command, index) {
        var failMessage = action.failedmessage

        if (action.nsfwtruefalse === 'True') {
            if (message.channel.nsfw) {
                DBS.callNextAction(command, message, args, index + 1)
            } else {
                if (failMessage) {
                    message.channel.send(failMessage)
                }
            }

        } else {
            if (!message.channel.nsfw) {
                DBS.callNextAction(command, message, args, index + 1)
            } else {
                if (failMessage) {
                    message.channel.send(failMessage)
                }
            }
        }
    }
};
