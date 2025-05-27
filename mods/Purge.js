module.exports = {
    name: "Purge",
    author: ["PlayboyPrime#3839"],
    version: "1.0.0",
    changelog: "Release",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",

    html: function (data) {
        return `
        <div class="form-group">
            <label>Channel ID *</label>
            <div class="input-group mb-3">
                <input class="form-control needed-field" name="chid"></input>
                <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="chid">Insert Variable</a>
                </div>
            </div>
            <hr>
        </div>
        <div class="form-group">
            <label>Purge Type *</label>
            <select id="select" name="select" onchange="change()" class="form-control">
                <option value="user" selected>User</option>
                <option value="amount">Amount</option>
            </select>
            <hr>
        </div>
        <div class="form-group">
            <label id="label">User ID (Only messages posted after the bot was online will be deleted) *</label>
            <div class="input-group mb-3">
                <input class="form-control needed-field" name="input"></input>
                <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="input">Insert Variable</a>
                </div>
            </div>
        </div>
        
        <script>
            function change(){
                var label = document.getElementById('label')
                var select = document.getElementById('select')

                if(select.value == 'user'){
                    label.innerText = 'User ID (Only messages posted after the bot was online will be deleted) *'
                } else {
                    label.innerText = 'Amount of messages to delete (Limit is 100) *'
                }
            }
        </script>
        `;
    },

    init: function (DBS) {
        console.log("Loaded Purge");

        if (!DBS.BetterMods) {
            DBS.BetterMods.parseAction = function (string, msg) {
                let dbsVars = {}
                dbsVars["CommandAuthor"] = msg.member
                dbsVars["CommandChannel"] = msg.channel
                dbsVars["guild"] = msg.guild
                let tempVars = DBS.Cache[msg.guild.id].variables
                let serverVars = DBS.serverVars[msg.guild.id]
                let globalVars = DBS.globalVars[msg.guild.id]
                let vars = {
                    tempVars: tempVars,
                    serverVars: serverVars,
                    globalVars: globalVars,
                    dbsVars: dbsVars,
                }
                let varRegex = /\${(.*?)}/g;
                let newVal = string;
                for (let i = 0; i < string.match(varRegex)?.length; i++) {
                    newVal = newVal.replace(string.match(varRegex)[i], getDescendantProp(vars, string.match(varRegex)[i].split("${").join("").split("}").join("")))
                }
                return newVal
            }
        }
    },


    mod: async function (DBS, message, action, args, command, index) {

        var input = DBS.BetterMods.parseAction(action.input, message)
        var ch = message.guild.channels.cache.get(DBS.BetterMods.parseAction(action.chid, message))

        if (action.select == "user") {
            ch.messages.cache.forEach(message => {
                if (message.author.id == input) {
                    if (message.deletable) {
                        message.delete()
                    }
                }
            });
        } else {
            if (input > 99) {
                ch.bulkDelete(100, true)
            } else ch.bulkDelete(input, true)
        }

        DBS.callNextAction(command, message, args, index + 1);
    }
};