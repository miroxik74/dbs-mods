module.exports = {
    name: "EmbedReply",
    author: ["aoe#4851"],
    version: "0.0.1",
    changelog: "Added EmbedReply Mod",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",
    html: function (data) {
        return `
        <small>Currently <strong>Using Edit Msg v0.1.0</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span> You need BetterMods v2.0.0!<br> <span style="color: orange; font-weight: bold;">Any issues?</span>Please DM STR1KE</label>
        </div>
        <hr>  
        <div class="form-group">
        <label>Reply *</label>
        <select name="main" class="form-control">
            <option value="mention">with Mention</option>
            <option value="nomention">without Mention</option>
        </select><br>
        <div class="form-group">
        <label>Set Title</label>
        <textarea class="form-control field" name="title" rows="1" ></textarea>
        </div>
        <div class="form-group">
        <label>Set Description</label>
        <textarea class="form-control field" name="desc" rows="1" ></textarea>
        </div>
        <div class="form-group">
        <label>Set Footer</label>
        <textarea class="form-control field" name="footer" rows="1" ></textarea>
        </div>
        <div class="form-group">
        <label>Set Author </label>
        <textarea class="form-control field" name="author" rows="1" ></textarea>
        </div>
        </div>
        <div class="form-group">
        <label>Set Image </label>
        <textarea class="form-control field" name="image" rows="1" ></textarea>
        </div>
        </div>
        <div class="form-group">
        <label>Set Thumbnail </label>
        <textarea class="form-control field" name="thumb" rows="1" ></textarea>
        </div>
        <div class="form-group">
        <label>Set Color </label>
        <textarea class="form-control field" name="color" rows="1" ></textarea>
        </div>
    `;
    },
    init: function (DBS) {
        console.log("Loaded EmbedReply Mod");
        try {
            require('discord-reply')
        } catch {
            DBS.BetterMods.requireModule("discord-reply");
        }
    },
    mod: async function (DBS, message, action, args, command, index) {
        require('discord-reply');
        const { MessageEmbed } = require("discord.js")
        let embed = new MessageEmbed()
            .setColor(action.color)
            .setTitle(action.title)
            .setDescription(action.desc)
            .setAuthor(action.author)
            .setImage(action.image)
            .setThumbnail(action.thumb)
            .setFooter(action.footer)
        switch (action.main) {
            case "mention":
                message.lineReply(embed); // Reply with mention
                break
            case "nomention":
                message.lineReplyNoMention(embed)
                break
        };

        DBS.callNextAction(command, message, args, index + 1);
    }
};