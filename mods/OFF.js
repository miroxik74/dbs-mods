//Required: Save the node before using it
module.exports = {
    name: "OFF",
    author: ["Snorlaxmon#7278"],
    version: "1.0.0",
    changelog: "",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Bot Action",
    //<---------------------------------------------------------------------------------------------->\\
    html: function (data) { return `<label>Save this node 👇</label>` },
    //<---------------------------------------------------------------------------------------------->\\
    init: function (DBS) {
        console.log('[MOD]' + '\x1b[36m' + ' ' + `${this.name}.JS` + '\x1b[0m' + '\x1b[32m' + ' ' + `was successfully loaded on ` + '\x1b[0m' + '\x1b[31m' + `v${this.version}` + '\x1b[0m');
    },
    //<---------------------------------------------------------------------------------------------->\\
    mod: function (DBS, message, action, args, command, index) {
        DBS.Bot.destroy()
    },
};