module.exports = {
    name: "ForceBan",
    author: ["aoe#4851"],
    version: "1.0.1",
    changelog: "Added Variable Support ~ PlayboyPrime#3839",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "User Action",
    html: function (data) {
        return `
        <div class="form-group">
            <label>User Object: *</label>
            <textarea class="form-control needed-field" name="user" rows="1" ></textarea>
        </div>
        <div class="form-group">
            <label>The reason for the forceban *</label>
            <textarea class="form-control needed-field" name="reason" rows="1" ></textarea>
        </div>
        `;
    },
    init: function () {
        console.log("Loaded ForceBan");
    },
    mod: function (DBS, message, action, args, command, index) {
        var target = DBS.BetterMods.parseAction(action.user, message);
        var reason = DBS.BetterMods.parseAction(action.reason, message)
        message.guild.members.ban(target, { reason: reason.length < 1 ? 'No reason supplied.' : reason });
        DBS.callNextAction(command, message, args, index + 1);
    }
};