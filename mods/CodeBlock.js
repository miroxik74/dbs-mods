module.exports = {
    name: "Code Block",
    author: ["Pokemonultra#2815"],
    version: "1.0.0",
    changelog: "Created Code Block",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",

    html: function (data) {
        return `
            <div class="form-group">
                <label>You can enter Custom Code here </label>
                <textarea class="form-control needed-field" name="ownCode" rows="20" placeholder='message.channel.send("This is a Test");'></textarea>
                <p>Need help?, <a href="https://discord.js.org/#/docs/main/main/general/welcome" target="_blank">Click me to open Discord.js Docs</a></p>
            </div>
            <label><span style="font-weight: bold">Mod made by:</span> Pokemonultra#2815</label>
        `;
    },

    init: function (DBS) {
        console.log("Loaded Code Block");
    },

    mod: async function (DBS, message, action, args, command, index) {
        try {
            eval(action.owncode);
        } catch (error) {
            console.log(error);
        };
        DBS.callNextAction(command, message, args, index + 1);
    }
};