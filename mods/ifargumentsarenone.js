module.exports = {
    name: "if arguments are none",
    author: ["STR1KE#6969"],
    version: "0.1.0",
    changelog: "nothing",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",

    html: function(data) {
        return `
            <div class="form-group">
                <label>Message to send if no arguments provided</label>
                <textarea class="form-control field" name="mes" rows="1" ></textarea>
            </div>
           \
        `;
    },

    init: function(DBS) {
        console.log("Loaded Arguments");
    },

    mod: function(DBS, message, action, args, command, index) {
        if (!args[0] && args[0] != "")  message.channel.send(action.mes);
        DBS.callNextAction(command, message, args, index + 1);
    }
};
