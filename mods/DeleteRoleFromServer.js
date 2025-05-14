module.exports = {
    name: "Delete Role from Server",
    author: ["."],
    version: "1.0.0",
    changelog: "None",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Server Action",

    html: function (data) {
        return `
            <label>Note: You must add me to the end of your command.\n</label>
            <div class="form-group">
                <label>Role *</label>
                <textarea class="form-control needed-field" name="messageText" rows="1" ></textarea>
            </div>
        `;
    },

    init: function (DBS) {
        console.log("Loaded delete role from server");
    },

    mod: function (DBS, message, action, args, command, index) {
        const role = message.guild.roles.cache.find((role) => { return role.name === action.messagetext });
        if (role) role.delete();

        DBS.callNextAction(command, message, args, index + 1);
    }
};