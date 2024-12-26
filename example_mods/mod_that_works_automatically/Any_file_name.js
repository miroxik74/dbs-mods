module.exports = {
    name: "messageCreate",
    author: ["PlayboyPrime#3839"],
    version: "1.0.0",
    changelog: "Event Testing ~ PlayboyPrime#3839",
    isEvent: true,
    isResponse: false,
    isMod: true,
    isAddon: false,
    section: "",

    html: function (data) {
        return `
        `;
    },

    init: function () {
        console.log("Loaded a mod");
    },

    mod: async function (DBS, message) { // You can add here the Event Parameters after "DBS,"

        // This is an example
        if (message.content.toLowerCase() == "hello") {
            message.channel.send(`Hey ${message.author}!`)
        }

    }
};