module.exports = {
    name: "Stop Action",
    author: ["Discord Bot Studio"],
    version: "1.0.0",
    changelog: "Created Stop Action ~ your a nerd",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Bot Action",

    html: function (data) {
        return `
            <b>Remember to click save or this node wont work!</b>
        `;
    },

    init: function (DBS) {
        console.log("Loaded Stop Action");
    },

    mod: async function (DBS, message, action, args, command, index) {
        // This mod has to many lines of code
    }
};