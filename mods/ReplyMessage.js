module.exports = {
    name: "Reply Message",
    author: ["ni#5375"],
    version: "0.1.0",
    changelog: "Reply to a message",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",

    html: function (data) {
        return `
        <div class="col">
        <label>Message ID *</label>
	<div class="input-group mb-3">
        <input class="form-control needed-field" name="msgid"></input><br>
        <div class="input-group-append">
            <a class="btn btn-outline-primary" role="button" id="variables" forinput="msgid">Insert Variable</a>
                </div>
            </div>
        </div>
            <div class="col">	
            	<div class="form-group">
                <label>Reply text message</label>
                <textarea class="form-control needed-field" name="replytext" rows="3" ></textarea>
            	</div>
            </div>
            <div class="col">
                <label>Mention User?</label>
                    <select name="mentionuser" class="form-control">
                        <option value="true">Enabled</option>
                        <option value="false">Disabled</option>
                    </select>
            </div>
        `;
    },

    init: function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        console.log("Loaded ReplyMessage");
    },

    mod: async function (DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        const msg = await message.channel.messages.fetch(DBS.BetterMods.parseAction(action.msgid, message));
        const mention = action.mentionuser;

        msg.reply({
            content: `${action.replytext}`,
            allowedMentions: {
                repliedUser: mention
            }
        })
        DBS.callNextAction(command, message, args, index + 1);
    }
};
