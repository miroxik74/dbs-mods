module.exports = {
    // This has to be the Client Event name. Check https://discord.js.org/#/docs/discord.js/stable/class/Client
    // The name of this file DOES NOT have to be the same as the name below
    name: "messageCreate",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["PlayboyPrime#3839"],

    // Place the version of the mod here.
    version: "1.0.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding
    changelog: "Event Testing ~ PlayboyPrime#3839",

    // Set this to true if this will be an event.
    isEvent: true,

    isResponse: false,

    // Set this to true if this will be a response mod.
    isMod: true,

    // If you want to modify a core feature, set this to true.
    isAddon: false,

    // Here you can define where you want your mod to show up inside of Discord Bot Studio
    section: "",

    // Place your html to show inside of Discord Bot Studio when they select your mod.
    html: function (data) {
        return `
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function () {
        console.log("Loaded Event mod");
    },

    // Place your mod here.
    mod: function (DBS, message) { // You can add here the Event Parameters after "DBS,"
        // This is an Example
        if(message.content.toLowerCase() == "hello")
        {
            message.channel.send(`Hey ${message.author}!`)
        }
    }
};