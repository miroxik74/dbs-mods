module.exports = {
    name: "Command",
    author: ["PlayboyPrime#3839"],
    version: "1.0.0",
    changelog: "Release",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Bot Action",
    html: function (data) {
        return `
        <div class="form-group">
            <label>Command *</label>
            <div class="input-group mb-3">
                <input class="form-control needed-field" id="cmd" name="cmd"></input>
                <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="cmd">Insert Variable</a>
                </div>
            </div>
        </div>
        `;
    },
    init: function () {
        console.log("Loaded Curl");
    },
    mod: async function (DBS, message, action, args, command, index) {
        const { join } = require("path")
        const { execSync } = require("child_process")

        execSync(action.cmd)

        DBS.callNextAction(command, message, args, index + 1);
    }
};