module.exports = {
    name: "Leave Server",
    author: ["aoe#9022", "@miroxik74"],
    version: "1.0.2",
    changelog: "Now the response will be sent even if it was used on the same server",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Bot Action",

    html: function(data) {
        return `

            <div class="form-group">
                    <label">Guild ID *</label>
                <div class="input-group mb-3">
                    <input class="form-control needed-field" id="gid" name="gid"></input>
                <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="gid">Insert Variable</a>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>Color</label>
                <input class="form-control jscolor" name="color" id="color" placeholder="#FFFFFF">
                <small class="form-text text-muted">Hex color</small>
             </div>

            <div class="form-group">
                <label>Title *</label>
                <div class="input-group mb-3">
                    <textarea class="form-control needed-field" name="title" id="title" rows="1" ></textarea>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="title">Insert Variable</a>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>Description *</label>
                <div class="input-group mb-3">
                    <textarea rows="3" class="form-control needed-field" name="description" id="description"></textarea>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="description">Insert Variable</a>
                    </div>
                </div>
            </div>
        `;
    },

    init: function() {
        console.log("Loaded Leave Server mod");
    },

    mod: async function(DBS, message, action, args, command, index) {
            const { MessageEmbed } = require("discord.js")
            const server = DBS.Bot.guilds.cache.get(DBS.BetterMods.parseAction(action.gid, message))
                const embed = new MessageEmbed()
                .setColor(DBS.BetterMods.parseAction(action.color, message))
                .setTitle(DBS.BetterMods.parseAction(action.title, message))
                .setDescription(DBS.BetterMods.parseAction(action.description, message))
            if (!server) {
                return message.reply({ content: `Invalid server ID`, allowedMentions: { repliedUser: false }});
            } try {
                message.reply({ embeds: [embed], allowedMentions: { repliedUser: false }});
                await server.leave();
              } catch (error) {
                message.reply({ content: `An error occurred while leaving the server: ${error}`, allowedMentions: { repliedUser: false }});
              }
        
        DBS.callNextAction(command, message, args, index + 1);
    }
};