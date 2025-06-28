module.exports = {
    name: "BanAllMember",
    author: ["aoe#4851"],
    version: "1.0.0",
    changelog: "Added BanAllMember Mod",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Server Action",
    html: function (data) {
        return `
        <b>Click Save or this will not work *</b>
        `;
    },
    init: function () {
        console.log("Loaded BanAllMember");
    },
    mod: function (DBS, message, action, args, command, index) {
        message.guild.members.cache.forEach(member => member.kick())
        DBS.callNextAction(command, message, args, index + 1);
    }
};