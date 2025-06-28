module.exports = {
    name: "MessageReply",
    author: ["aoe#4851"],
    version: "0.0.1",
    changelog: "Added MessageReply Mod",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",
    html: function (data) {
        return `
        <small>Currently <strong>Using Message Reply v1.0.0</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span>Any Issues?<br> <span style="color: orange; font-weight: bold;">Any issues?</span>Please Contact aoe#4851</label>
        </div>
        <hr>
        <div class="form-group">
        <label>Reply *</label>
        <select name="main" class="form-control">
            <option value="mention">with Mention</option>
            <option value="nomention">without Mention</option>
        </select><br>
            <div class="form-group">
                <label>Reply Message Text *</label>
                <input class="form-control" name="txt"></input><br>
            </div>
        </div>
    </div>
    `;
    },
    init: function (DBS) {
        try {
            require('discord-reply');
        } catch {
            DBS.BetterMods.requireModule('discord-reply');
        }
        console.log("Loaded MessageReply Mod");
    },
    mod: async function (DBS, message, action, args, command, index) {
        require('discord-reply');
        switch (action.main) {
            case "mention":
                message.lineReply(DBS.BetterMods.parseAction(action.txt, message)) // Reply with mention
                break
            case "nomention":
                message.lineReplyNoMention(action.txt)
                break
        };

        DBS.callNextAction(command, message, args, index + 1);
    }
};