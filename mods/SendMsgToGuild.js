module.exports = {
    name: "Send Msg To Guild",
    author: ["PlayboyPrime#3839"],
    version: "1.0.3",
    changelog: "fix vars",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",
    html: function (data) {
        return `
        <div class="form-group">
            <label">Guild ID: *</label>
            <div class="input-group mb-3">
                <input class="form-control needed-field" id="gid" name="gid"></input>
                <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="gid">Insert Variable</a>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label>Channel ID: *</label>
            <div class="input-group mb-3">
                <input class="form-control needed-field" id="chid" name="chid"></input>
                <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="chid">Insert Variable</a>
                </div>
            </div>
        </div>

        <label>Message Type</label>
        <div class="form-group">
        <select onchange="change(this.value)" class="form-control" name="msgtype">
            <option value="msg" selected>Message</option>
            <option value="embed">Embed</option>
        </select>

        <div stlye="margin-top: 15px" id="msgblock">
            <div class="form-group">
                <label>Message: *</label>
                <div class="input-group mb-3">
                <textarea class="form-control needed-field" name="msg" rows="3"></textarea>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="msg">Insert Variable</a>
                    </div>
                </div>
            </div>
        </div>

        <div id="embedblock" style="display: none; margin-top:15px">
            <p>Embed</p>
            <div class="form-group">
                <label>Color</label>
                <input class="form-control jscolor" name="color" id="color" placeholder="#FFFFFF">
                <small class="form-text text-muted">Hex color</small>
            </div>
        
            <div class="form-group">
                <label>Title</label>
                <div class="input-group mb-3">
                    <textarea class="form-control field" name="title" id="title" rows="1" ></textarea>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="title">Insert Variable</a>
                    </div>
                </div>
            </div>
        
            <div class="form-group">
                <label>Url</label>
                <div class="input-group mb-3">
                    <textarea class="form-control field" name="url" id="url" rows="1" ></textarea>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="url">Insert Variable</a>
                    </div>
                </div>
            </div>
        
            <div class="form-group">
                <label>Author</label>
                <div class="input-group mb-3">
                    <textarea class="form-control field" name="author" id="author" rows="1" ></textarea>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="author">Insert Variable</a>
                    </div>
                </div>
            </div>
        
            <div class="form-group">
                <label>Description</label>
                <div class="input-group mb-3">
                    <textarea rows="5" class="form-control field" name="description" id="description"></textarea>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="title">Insert Variable</a>
                    </div>
                </div>
            </div>
        
            <div class="form-group">
                <label>Image Url</label>
                <div class="input-group mb-3">
                    <textarea class="form-control field" name="image" id="image" rows="1" ></textarea>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="url">Insert Variable</a>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>Timestamp</label>
                <div class="input-group mb-3">
                    <input type="checkbox" id="timestamp" name="timestamp"></input>
                </div>
            </div>
        </div>
        
        <script>
            function change(value){
                if(value == "msg"){
                    document.getElementById('msgblock').style.display = "block"
                    document.getElementById('embedblock').style.display = "none"
                } else {
                    document.getElementById('msgblock').style.display = "none"
                    document.getElementById('embedblock').style.display = "block"
                }
            }
        </script>
        
        `;
    },
    init: async function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        try {
            require("discord.js");
        } catch {
            DBS.BetterMods.requireModule("discord.js");
        }
        console.log("Loaded SendMsgToGuild");
    },
    mod: async function (DBS, message, action, args, command, index) {
        const Discord = require("discord.js");
        const client = DBS? DBS.Bot : DBS;
        await client.guilds.fetch()
        const guild = client.guilds.cache.get(DBS.BetterMods.parseAction(action.gid, message))
        await guild.channels.fetch()
        const channel = guild.channels.cache.get(DBS.BetterMods.parseAction(action.chid, message))
        const msg = DBS.BetterMods.parseAction(action.msg, message)

        if (action.msgtype == "msg") {
            channel.send(msg)
        } else {
            const Embed = new Discord.MessageEmbed()
                .setColor(DBS.BetterMods.parseAction(action.color, message))
                .setTitle('')
                .setURL(DBS.BetterMods.parseAction(action.url, message))
                .setDescription(DBS.BetterMods.parseAction(action.description, message))
                .setThumbnail('')
                .setImage(DBS.BetterMods.parseAction(action.image, message))
            if (action.timestamp == "BOOL_TRUE@@") {
                Embed.setTimestamp();
            }
            channel.send({ embeds: [Embed] })
        }


        DBS.callNextAction(command, message, args, index + 1);
    }
};