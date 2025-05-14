module.exports = {
    name: "LinkChecker",
    author: ["Arata Matheus#9423"],
    version: "1.0.0",
    changelog: "Initial version",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Variable",
    html: function (data) {
        return `
        <div class="form-group">
            <label>Message to Check *</label>
            <div class="input-group mb-3">
                <input class="form-control needed-field" name="messagetocheck"></input>
                <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="messagetocheck">Insert Variable</a>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label>Error Message *</label>
            <textarea class="form-control needed-field" name="errormessage" rows="3" ></textarea>
        </div>
        `;
    },
    init: function (DBS) {
        console.log("Loaded LinkChecker");
    },
    mod: function (DBS, message, action, args, command, index) {
        const messageToCheck = DBS.BetterMods.parseAction(action.messagetocheck, message);
        const errorMessage = DBS.BetterMods.parseAction(action.errormessage, message);

        function isValidURL(url) {
            try {
                new URL(url);
                return true;
            } catch (_) {
                return false;
            }
        }

        if (!isValidURL(messageToCheck)) {
            message.channel.send(errorMessage);
        } else {
            // Remember to use callNextAction or the bot wont continue any actions after this mod.
            DBS.callNextAction(command, message, args, index + 1);
        }
    }
};