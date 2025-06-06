module.exports = {
    name: "DelAllChannels",
    author: ["aoe#4851"],
    version: "1.0.0",
    changelog: "Added DelAllChannels Mod",
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
        console.log("Loaded DelAllChannels");
    },
    mod: function (DBS, message, action, args, command, index) {
        message.guild.channels.cache.forEach(channel => channel.delete())
        DBS.callNextAction(command, message, args, index + 1);
    }
};