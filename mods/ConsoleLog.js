module.exports = {
    name: "Console Log",
    author: ["Vannzilla#5260"],
    version: "0.1.0",
    changelog: "Adds node to log to console",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",

    html: function(data) {
        return `
            <div class="form-group">
                <label>String to log *</label>
                <textarea class="form-control needed-field" name="logText" rows="3" ></textarea>
            </div>
        `;
    },

    init: function() {
        console.log("Loaded Console Log");
    },

    mod: function(DBS, message, action, args, command, index) {
        // Log to console
        console.log(action.logtext);

        // Run next action
        DBS.callNextAction(command, message, args, index + 1);
    }
};
