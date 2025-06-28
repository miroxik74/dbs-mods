module.exports = {
    name: "Remove Reactions",
    author: ["Miro#6969"],
    version: "1.0.0",
    changelog: "None",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Reaction",
    html: function (data) {
        return `
        <div class="form-group">
            <label>Message to remove reaction from</label>
            <div class="input-group mb-3">
            <textarea class="form-control field" name="reactionmessage" rows="1" ></textarea>
            <div class="input-group-append">
            <a class="btn btn-outline-primary" role="button" id="variables" forinput="reactionmessage">Insert Variable</a>
            </div>
            </div>
        </div>
        <div class="form-group">
        <label>User reaction to remove</label>
        <div class="input-group mb-3">
        <textarea class="form-control field" name="reactionuser" rows="1" ></textarea>
        <div class="input-group-append">
        <a class="btn btn-outline-primary" role="button" id="variables" forinput="reactionuser">Insert Variable</a>
        </div>
        </div>
    </div>
    <div class="form-group">
        <label>Reaction to remove</label>
        <div class="input-group mb-3">
        <textarea class="form-control field" name="reactid" rows="1" ></textarea>
        </div>
        </div>
    </div>
    <div class="form-group">
        <label>Channel of where the Message is</label>
        <div class="input-group mb-3">
        <textarea class="form-control field" name="reactionchannel" rows="1" ></textarea>
        <div class="input-group-append">
        <a class="btn btn-outline-primary" role="button" id="variables" forinput="reactionchannel">Insert Variable</a>
    </div>
    </div>
        `;
    },
    init: function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        console.log("Loaded Remove Reactions");
    },
    mod: async function (DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        DBS.R
        const channel = DBS.BetterMods.parseAction(action.reactionchannel, message)
        const MessageID = DBS.BetterMods.parseAction(action.reactionmessage, message)
        const rmessageuser = DBS.BetterMods.parseAction(action.reactionuser, message)
        const reaction = DBS.BetterMods.parseAction(action.reactid, message)
        const msg = await message.channel.messages.fetch(MessageID);
        msg.reactions.resolve(reaction).users.remove(rmessageuser);
        DBS.callNextAction(command, message, args, index + 1)
    },
};