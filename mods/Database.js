module.exports = {
    name: "Database",
    author: ["PlayboyPrime#3839"],
    version: "1.0.0",
    changelog: "Release",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Control",
    html: function (data) {
        return `<label for="action">Action</label>
        <select onchange="change(this.value)" name="action" id="action" class="form-control">
            <option value="save">Save</option>
            <option value="get">Get</option>
            <option value="remove">Remove</option>
        </select>
        <hr>
        <div id="save">
            <div class="form-group">
                <label>Value Name</label>
                <div class="input-group mb-3">
                    <input class="form-control" id="savename" name="savename"></input>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="savename">Insert Variable</a>
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <label>New Value</label>
                <div class="input-group mb-3">
                    <input class="form-control" id="savevalue" name="savevalue"></input>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="savevalue">Insert Variable</a>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="get">
            <div class="form-group">
                <label>Value Name</label>
                <div class="input-group mb-3">
                    <input class="form-control" id="getname" name="getname"></input>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="getname">Insert Variable</a>
                    </div>
                </div>
            </div>
            <hr>
            <div class="form-group">
                <label>Variable Name</label>
                <input onchange="document.getElementById('varlabel').innerHTML = '$\{' + document.getElementById('vartype').value + 'Vars.' + document.getElementById('varname').value + '\}'" class="form-control" id="varname" name="varname"/>
                <h6 id="varlabel"></h6>
            </div>
            <div class="form-group">
                <label>Variable Type</label>
                <select id="vartype" onchange="document.getElementById('varlabel').innerHTML = '$\{' + document.getElementById('vartype').value + 'Vars.' + document.getElementById('varname').value + '\}'" class="form-control" id="vartype" name="vartype">
                    <option value="temp" selected>Temp Variable</option>
                    <option value="server">Server Variable</option>
                    <option value="global">Global Variable</option>
                </select>
            </div>
        </div>
        
        <div id="remove">
            <div class="form-group">
                <label>Value Name</label>
                <div class="input-group mb-3">
                    <input class="form-control" id="removename" name="removename"></input>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="removename">Insert Variable</a>
                    </div>
                </div>
            </div>
        </div>
        
        <script>
            function change(value) {
                switch (value) {
                    case "save":
                        document.getElementById("save").style.display = "block"
                        document.getElementById("get").style.display = "none"
                        document.getElementById("remove").style.display = "none"
                        break;
                    case "get":
                        document.getElementById("save").style.display = "none"
                        document.getElementById("get").style.display = "block"
                        document.getElementById("remove").style.display = "none"
                        break;
                    case "remove":
                        document.getElementById("save").style.display = "none"
                        document.getElementById("get").style.display = "none"
                        document.getElementById("remove").style.display = "block"
                        break;
                }
            }
        
            setTimeout(() => {
                change(document.getElementById("action").value)
                document.getElementById('varlabel').innerHTML = '$\{' + document.getElementById('vartype').value + 'Vars.' + document.getElementById('varname').value + '\}'
            }, 1);
        </script>`;
    },
    init: function () {
        const fs = require("fs")
        if(!fs.existsSync(`${__dirname}/../BotData/variables/Database.json`)){
            fs.writeFileSync(`${__dirname}/../BotData/variables/Database.json`, "{}")
        }
        console.log("Loaded Database");
    },
    mod: function (DBS, message, action, args, command, index) {
        const fs = require("fs")
        try {
            var db = JSON.parse(fs.readFileSync(`${__dirname}/../BotData/variables/Database.json`))
        } catch (error) {
            console.error("[Database] " + error)
            fs.writeFileSync(`${__dirname}/../BotData/variables/Database.json`, "{}")
            var db = JSON.parse(fs.readFileSync(`${__dirname}/../BotData/variables/Database.json`))
        }

        function update(obj) {
            fs.writeFileSync(`${__dirname}/../BotData/variables/Database.json`, JSON.stringify(obj, null, 4))
        }

        switch (action.action) {
            case "save":
                a = action.savename.toString()
                b = action.savevalue.toString()

                db[a] = b
                break;
            case "get":
                a = action.getname.toString()

                DBS.BetterMods.saveVar(action.vartype, action.varname, db[a], message.guild)
                break;
            case "remove":
                a = action.removename.toString()

                delete db[a]
                break;
        }
        update(db)
        DBS.callNextAction(command, message, args, index + 1);
    }
};