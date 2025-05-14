module.exports = {
    name: "Check Role ID",
    author: ["Big D#1129"],
    version: "0.1.0",
    changelog: "Added ability to check if the command was sent by a certain role or not",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "User Action",

    html: function(data) {
        return `
            <div class="form-group">
                <label>The role ID *</label>
                <textarea class="form-control needed-field" name="roleid" rows="1" ></textarea>
            </div>
            <div class="form-group">
                <label>Send message if user doesn't have role *</label>
                <textarea rows="2" class="form-control needed-field" name="blacklisted"></textarea>
            </div>
        `;
    },

    init: function(DBS) {
        console.log("Loaded Role Check mod");
    },

    mod: function(DBS, message, action, args, command, index) {
        const roleid = action.roleid;
        const blacklisted = action.blacklisted;

        if (message.member.roles.cache.has(roleid)) {
            DBS.callNextAction(command, message, args, index + 1);
        } else if (blacklisted) message.channel.send(blacklisted);
    }
};