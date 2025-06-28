module.exports = {
    name: "Rename Bot",
    author: ["PlayboyPrime#3839"],
    version: "1.0.0",
    changelog: "Relase",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Control",
    html: function (data) {
        return `
        <label style="margin-top: 15px" for="bots">Current Bot</label>
        <select onchange="document.getElementById('newbotname').value = this.value" onclick="loadbots()" class="form-control" name="bots" id="bots"></select>
        <label style="margin-top: 15px" for="newbotname">New bot name</label>
        <textarea class="form-control" name="newbotname" id="newbotname" cols="30" rows="1"></textarea>
        <script>
            bp = remote.getGlobal("sharedObj").configdir + "/bots.json"
            br = fs.readFileSync(bp)
            bj = JSON.parse(br)
            var loaded = false
                
            function loadbots(){
                if(loaded == false){
                    bj.bots.forEach(bot => {
                        document.getElementById("bots").append(new Option(bot.name, bot.name))
                    });
                    loaded = true
                }
            }
            $(document).on("click", "#saveEditResponseBtn", function(e) {
                if(e.target === this){
                    for (i = 0; i < bj.bots.length; i++) {
                        var temp = bj
                        if(temp.bots[i].name == document.getElementById("bots").value){
                            temp.bots[i].name = document.getElementById("newbotname").value
                            fs.writeFileSync(remote.getGlobal("sharedObj").configdir + "/bots.json", JSON.stringify(temp, null, 4))
                            window.location.reload()
                            break
                        }
                    }
                }
            })
        </script>
        `;
    },

    init: function () {
        console.log("Loaded RenameBot");
    },

    mod: async function (DBS, message, action, args, command, index) {
        DBS.callNextAction(command, message, args, index + 1);
    }
};