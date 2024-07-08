module.exports = {
    name: "Edit Embed",
    author: ["STR1KE#6969, Miro#6969"],
    version: "1.0.1",
    changelog: "fixed",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",

    html: function(data) {
        return `
        <div class="form-group">
            <p><strong>Note You Need BetterMods for Variable Support</strong></p>
            <label>𝐒𝐞𝐭 𝐓𝐢𝐭𝐥𝐞:</label>
            <div class="input-group mb-3">
                <textarea class="form-control field" name="title" rows="1" ></textarea>
                    <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="title">Insert Variable</a>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label>𝐒𝐞𝐭 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐃𝐢𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧:</label>
            <div class="input-group mb-3">
                <textarea class="form-control field" name="desc" rows="1" ></textarea>
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="desc">Insert Variable</a>
            </div>
        </div>

        <div class="form-group">
            <label>𝐒𝐞𝐭 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐓𝐢𝐦𝐞𝐬𝐭𝐚𝐦𝐩:</label>
            <div class="input-group mb-3">
                <textarea class="form-control field" name="timestamp" rows="1" ></textarea>
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="timestmp">Insert Variable</a>
            </div>
        </div>

        <div class="form-group">
            <label>𝐒𝐞𝐭 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐅𝐨𝐨𝐭𝐞𝐫:</label>
            <div class="input-group mb-3">
                <textarea class="form-control field" name="foot" rows="1" ></textarea>
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="foot">Insert Variable</a>
            </div>
        </div>

        <div class="form-group">
            <label>𝐒𝐞𝐭 𝐀𝐮𝐭𝐡𝐨𝐫:</label>
            <div class="input-group mb-3">
                <textarea class="form-control field" name="auth" rows="1" ></textarea>
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="auth">Insert Variable</a>
            </div>
        </div>

        </div>
            <div class="form-group">
            <label>𝐒𝐞𝐭 𝐈𝐦𝐚𝐠𝐞:</label>
            <div class="input-group mb-3">
                <textarea class="form-control field" name="img" rows="1" ></textarea>
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="img">Insert Variable</a>
            </div>
        </div>
        
        <div class="form-group">
            <label>𝐒𝐞𝐭 𝐓𝐡𝐮𝐦𝐛𝐧𝐚𝐢𝐥:</label>
            <div class="input-group mb-3">
                <textarea class="form-control field" name="thumb" rows="1" ></textarea>
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="thumb">Insert Variable</a>
            </div>
        </div>

        <div class="form-group">
            <label>𝐒𝐞𝐭 𝐂𝐨𝐥𝐨𝐫(𝐦𝐚𝐤𝐞 𝐬𝐮𝐫𝐞 𝐢𝐭 𝐢𝐬 𝐢𝐧 𝐜𝐚𝐩𝐬 𝐥𝐨𝐜𝐤)</label>
            <input class="form-control jscolor" id="color" placeholder="#FFFFFF" name="col">
            <small class="form-text text-muted">Hex color</small>
        </div> 

        <div class="form-group">
            <label>𝐃𝐞𝐥𝐚𝐲 𝐛𝐞𝐟𝐨𝐫𝐞 𝐞𝐝𝐢𝐭𝐢𝐧𝐠 𝐭𝐡𝐞 𝐞𝐦𝐛𝐞𝐝</label>
            <div class="input-group mb-3">
                <textarea class="form-control needed-field" name="del" rows="1" ></textarea>
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="del">Insert Variable</a>
            </div>
        </div>

        <div class="form-group">
            <label>𝐄𝐝𝐢𝐭 𝐓𝐢𝐭𝐥𝐞 𝐓𝐨:</label>
            <div class="input-group mb-3">
                <textarea class="form-control field" name="edittitle" rows="1" ></textarea>
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="edittile">Insert Variable</a>
            </div>
        </div>
        
        <div class="form-group">
            <label>𝐄𝐝𝐢𝐭 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧 𝐓𝐨:</label>
            <div class="input-group mb-3">
                <textarea class="form-control field" name="editdesc" rows="1" ></textarea>
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="editdesc">Insert Variable</a>
            </div>
        </div>

        <div class="form-group">
            <label>𝐄𝐝𝐢𝐭 𝐓𝐢𝐦𝐞𝐬𝐭𝐚𝐦𝐩 𝐓𝐨:</label>
            <div class="input-group mb-3">
                <textarea class="form-control field" name="edittimestamp" rows="1" ></textarea>
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="edittimestamp">Insert Variable</a>
            </div>
        </div>

        <div class="form-group">
            <label>𝐄𝐝𝐢𝐭 𝐅𝐨𝐨𝐭𝐞𝐫 𝐓𝐨:</label>
            <div class="input-group mb-3">
                <textarea class="form-control field" name="editfoot" rows="1" ></textarea>
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="editfoot">Insert Variable</a>
            </div>
        </div>

        <div class="form-group">
            <label>𝐄𝐝𝐢𝐭 𝐀𝐮𝐭𝐡𝐨𝐫 𝐓𝐨:</label>
            <div class="input-group mb-3">
                <textarea class="form-control field" name="editauth" rows="1" ></textarea>
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="editauth">Insert Variable</a>
            </div>
        </div>

        <div class="form-group">
            <label>𝐄𝐝𝐢𝐭 𝐈𝐦𝐚𝐠𝐞 𝐓𝐨:</label>
            <div class="input-group mb-3">
                <textarea class="form-control field" name="editimg" rows="1" ></textarea>
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="editimg">Insert Variable</a>
            </div>
        </div>

        <div class="form-group">
            <label>𝐄𝐝𝐢𝐭 𝐓𝐡𝐮𝐦𝐛𝐧𝐚𝐢𝐥 𝐓𝐨:</label>
            <div class="input-group mb-3">
                <textarea class="form-control field" name="editthumb" rows="1" ></textarea>
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="editthumb">Insert Variable</a>
            </div>
        </div>

        <div class="form-group">
            <label>𝐄𝐝𝐢𝐭 𝐄𝐦𝐛𝐞𝐝 𝐂𝐨𝐥𝐨𝐫 𝐓𝐨:</label>
            <input class="form-control jscolor" id="color" placeholder="#FFFFFF" name="editcol">
            <small class="form-text text-muted">Hex color</small>
        </div>
`;
},

init: function(DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        console.log("Loaded Edit Embed v1.0.1");
    },

    mod: function (DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        const Discord = require("discord.js")
        const embed = new Discord.MessageEmbed()
            .setTitle(DBS.BetterMods.parseAction(action.title, message))
            .setDescription(DBS.BetterMods.parseAction(action.desc, message))
            .setTimestamp(DBS.BetterMods.parseAction(action.timestamp, message))
            .setFooter(DBS.BetterMods.parseAction(action.foot, message))
            .setAuthor(DBS.BetterMods.parseAction(action.auth, message))
            .setImage(DBS.BetterMods.parseAction(action.img, message))
            .setThumbnail(DBS.BetterMods.parseAction(action.thumb, message))
            .setColor(action.col)
        const delay = action.del * 1000;
        const msg = message.channel.send({ embeds: [embed] });
        const editembed = new Discord.MessageEmbed()
            .setTitle(DBS.BetterMods.parseAction(action.edittitle, message))
            .setDescription(DBS.BetterMods.parseAction(action.editdesc, message))
            .setTimestamp(DBS.BetterMods.parseAction(action.edittimestamp, message))
            .setFooter(DBS.BetterMods.parseAction(action.editfoot, message))
            .setAuthor(DBS.BetterMods.parseAction(action.editauth, message))
            .setImage(DBS.BetterMods.parseAction(action.editimg, message))
            .setThumbnail(DBS.BetterMods.parseAction(action.editthumb, message))
            .setColor(action.editcol)
        setTimeout(function () {
            msg.then(((sentMessage) => sentMessage.edit({embeds: [editembed]})))
        }, delay);
        DBS.callNextAction(command, message, args, index - action.nodes);
    }
}; 
