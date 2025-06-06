module.exports = {
    name: "Slowmode",
    author: ["Original made by STR1KE#6969", "Edited by tokotoko#1973"],
    version: "0.1.1",
    changelog: "Made it so having a message is no longer required and the bot does not say that is a invalid amount",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Channel Action",

    html: function (data) {
        return `
        <div class="form-group">
            Slowmode time in seconds
            <div class="input-group mb-3">
                <textarea class="form-control needed-field" name="slowmode" id="slowmode" rows="1" ></textarea>
                <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="slowmode">Insert Variable</a>
                </div>
            </div>
        </div>
        <div class="form-group">
            Slowmode message (use $$slowmode$$ to get the seconds)
            <div class="input-group mb-3">
                <textarea class="form-control" name="slowmsg" id="slowmsg" rows="1" ></textarea>
                <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="slowmsg">Insert Variable</a>
                </div>
            </div>
        </div>
        `;
    },

    init: function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        console.log("Loaded Slowmode");
    },

    mod: function (DBS, message, action, args, command, index) {
        var slowmode1 = DBS.BetterMods.parseAction(action.slowmode, message)
        message.channel.setRateLimitPerUser(slowmode1);
        var slowmsg = DBS.BetterMods.parseAction(action.slowmsg, message).replace("$$slowmode$$", slowmode1)

        if (!action.slowmsg == "" && !slowmode1 == "" && slowmode1 >= 0 && slowmode1 <= 21600) {
            message.channel.send(slowmsg);
        }

        DBS.callNextAction(command, message, args, index + 1);
    }
};
