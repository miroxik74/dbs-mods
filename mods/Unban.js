module.exports = {
    name: "Unban",
    author: ["STR1KE#6969"],
    version: "0.1.1",
    changelog: "added the option to unban a mentioned person",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "User Action",

    html: function (data) {
        return `
            <div class="form-group">
                <label>User to unban. Use $$id$$ to unban a mentioned id or tag: ex1: -unban 4576587568568 ex2: -unban <@!4576587568568> *</label>
                <textarea class="form-control needed-field" name="id" rows="1" ></textarea>
            </div>
           \
        `;
    },

    init: function () {
        console.log("Loaded Unban");
    },

    mod: function (DBS, message, action, args, command, index) {
        action.id = action.id.replace("$$id$$", args)
            .replace("@", "")
            .replace("!", "")
            .replace("<", "")
            .replace(">", "");

        message.guild.members.unban(action.id);

        DBS.callNextAction(command, message, args, index + 1);
    }
};
