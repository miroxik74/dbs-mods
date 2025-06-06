module.exports = {
    name: "StartWithCMD",
    author: ["PlayboyPrime#3839"],
    version: "1.0.0",
    changelog: "Release",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Control",
    html: function (data) {
        return `
        <label>Nodejs is needed!</label>
        <button onclick="startcmd()" class="form-control">Start bot with cmd</button>

        <script>
            function startcmd(){
                var child_process = require('child_process')
                let command = 'start cmd.exe /K "node "' + remote.getGlobal("sharedObj").botpath + "/BotFiles/bot.js"
                let process = child_process.spawn(command, [], { shell: true })
            }
        </script>
        `;
    },
    init: function () {
    },
    mod: function (DBS, message, action, args, command, index) {
        DBS.callNextAction(command, message, args, index + 1);
    }
};