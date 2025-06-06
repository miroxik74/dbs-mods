module.exports = {
    name: "User List",
    author: ["PlayboyPrime#3839"],
    version: "1.0.3",
    changelog: "Added list controlled by reactions",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "User Action",
    html: function (data) {
        return `
        <div class="form-group">
            <label>Variable Name *</label>
            <input onchange="document.getElementById('varlabel').innerHTML = '$\{' + document.getElementById('vartype').value + 'Vars.' + document.getElementById('varname').value + '\}'" class="form-control needed-field" id="varname" name="varname"/>
            <h6 id="varlabel"></h6>
        </div>
        <div class="form-group">
            <label>Variable Type *</label>
            <select id="vartype" onchange="document.getElementById('varlabel').innerHTML = '$\{' + document.getElementById('vartype').value + 'Vars.' + document.getElementById('varname').value + '\}'" class="form-control" id="vartype" name="vartype">
                <option value="temp" selected>Temp Variable</option>
                <option value="server">Server Variable</option>
                <option value="global">Global Variable</option>
            </select>
        </div>
        `;
    },
    init: function () {
        const fs = require("fs")
        if(!fs.existsSync(`${__dirname}/../BotData/ModData`)) fs.mkdirSync(`${__dirname}/../BotData/ModData`)
        if(!fs.existsSync(`${__dirname}/../BotData/ModData/UserList.json`)) fs.writeFileSync(`${__dirname}/../BotData/ModData/UserList.json`, JSON.stringify({list:""}, null, 4))
        const share = JSON.parse(fs.readFileSync(`${__dirname}/../BotData/ModData/UserList.json`))
        share.list = []
        share.id = ""
        share.currentsite = 0
        fs.writeFileSync(`${__dirname}/../BotData/ModData/UserList.json`, JSON.stringify(share, null, 4))

        console.log("Loaded UserList");
    },
    mod: async function (DBS, message, action, args, command, index) {
        const fs = require("fs")
        const share = JSON.parse(fs.readFileSync(`${__dirname}/../BotData/ModData/UserList.json`))
        
        members = await message.guild.members.fetch()
        list = []
        i = 0

        members.forEach(member => {
            list[i] ??=`Strona ${i}\n` 
            if(list[i].length + ("<@"+member.user.id+"> | Tag: **"+member.user.tag+"** | ID: **"+member.user.id+"**\n").length >= 1999){
                i++
            }
            list[i] ??=`Strona ${i}\n`
            list[i] += "<@"+member.user.id+"> | Tag: **"+member.user.tag+"** | ID: **"+member.user.id+"**\n"
        });
        //msg = await message.channel.send(list[0])
        msg = await message.channel.send({ content: `${list[0]}`, allowedMentions: { repliedUser: false }})
        msg.react("◀️"); msg.react("▶️")

        share.list = list
        share.id = msg.id
        share.currentsite = 0
        fs.writeFileSync(`${__dirname}/../BotData/ModData/UserList.json`, JSON.stringify(share, null, 4))

        DBS.callNextAction(command, message, args, index + 1);
    }
};