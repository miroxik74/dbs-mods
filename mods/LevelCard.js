module.exports = {
    name: "Level Card",
    author: ["koki1019#1019"],
    version: "1.0.1",
    changelog: "",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",

    html: function (data) {
        return `
            <div class="from-group">
                <label>Needed XP</label>
                <input class="form-control" name="neededxp"></input><br>
            </div>

            <div class="from-group">
                <label>XP User has</label>
                <input class="form-control" name="userxp"></input><br>
            </div>

            <div class="from-group">
                <label>Level User Has</label>
                <input class="form-control" name="userlvl"></input><br>
            </div>

            <div class="from-group">
                <label>Level Color</label>
                <input class="form-control" value="#8feb34" name="lvlcolor"></input><br>
            </div>

            <div class="from-group">
                <label>Progress Bar Color</label>
                <input class="form-control" value="#8feb34" name="barcolor"></input><br>
            </div>

            <div class="form-group">
                <label>Choose Background Type:</label>
                <select class="form-control" name="bgtype">
                    <option value="IMAGE">Image</option>
                    <option value="COLOR">Color</option>
                </select>
            </div>

            <div class="from-group">
                <label>Background Color/Image</label>
                <input class="form-control" name="bg"></input><br>
                <p>If the BG type is Image, type avatarURL Variable, else type hex color</p>
            </div>  
        `;
    },

    init: async function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        try {
            require("discord.js");
        } catch {
            DBS.BetterMods.requireModule("discord.js");
        }
        try {
            require("canvacord");
        } catch {
            DBS.BetterMods.requireModule("canvacord");
        }
        console.log("Level Card Loaded!\n Contact koki1019#1019 For help");
    },

    mod: async function (DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        const Discord = require("discord.js")
        const canvacord = require("canvacord");

        const mention = message.mentions.members.first() || message.member;

        let name = mention.user.username;
        let tag = mention.user.tag.slice(mention.user.username.length + 1);

        let neededXP = DBS.BetterMods.parseAction(action.neededxp, message);
        let userXP = DBS.BetterMods.parseAction(action.userxp, message);
        let userLevel = DBS.BetterMods.parseAction(action.userlvl, message);
        let lvlColor = DBS.BetterMods.parseAction(action.lvlcolor, message);
        let barColor = DBS.BetterMods.parseAction(action.barcolor, message);
        let avatar = mention.user.displayAvatarURL({ format: 'jpg' });
        let background = DBS.BetterMods.parseAction(action.bg, message);
        let bgtype = DBS.BetterMods.parseAction(action.bgtype, message);

        const rank = new canvacord.Rank()
            .setAvatar(avatar)
            .setCurrentXP(parseInt(userXP))
            .setRequiredXP(parseInt(neededXP))
            .setStatus("online")
            .setProgressBar(barColor)
            .setUsername(name)
            .setDiscriminator(tag)
            .setLevel(parseInt(userLevel))
            .setLevelColor(lvlColor)
            .setRank(parseInt(userLevel))
            .setRankColor(lvlColor)
            .setBackground(bgtype, background)

        rank.build()
            .then(data => {
                const attachment = new Discord.MessageAttachment(data, 'lvlCard.png');
                message.reply({ files: [attachment] })
            })

        DBS.callNextAction(command, message, args, index + 1);
    }
};