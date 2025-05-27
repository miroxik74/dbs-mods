module.exports = {
    name: "User Info",
    author: ["NickG#9306"],
    version: "1.0.1",
    changelog: "Added User Info Mod",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "User Action",
    html: function (data) {
        return `
            <div class="form-group">
            <label id="label">Set Embed Title</label>
            <div class="input-group mb-3">
                <input class="form-control" name="infotitle"></input>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="infotitle">Insert Variable</a>
                </div>
            </div>
            </div>

            <div class="form-group">
            <label id="label">Set Embed Color</label>
                <input class="form-control jscolor" id="color" placeholder="#FFFFFF" name="infocolour">
            </div>

            <div class="form-group">
            <label id="label">Set Embed Description</label>
            <div class="input-group mb-3">
                <textarea class="form-control" name="infodesc" rows="2"></textarea>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="infodesc">Insert Variable</a>
                </div>
            </div>
            </div>

            <div class="form-group">
            <label id="label">Set Embed Footer</label>
            <div class="input-group mb-3">
                <input class="form-control" name="infofooter"></input>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="infofooter">Insert Variable</a>
                </div>
            </div>
            </div>

            <hr>
            
            <p>User Info Mod ~ Version 1.0.0
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
            require("moment");
        } catch {
            DBS.BetterMods.requireModule("moment");
        }
        console.log("Loaded User Info Mod");
    },
    mod: async function (DBS, message, action, args, command, index) {
        const moment = require('moment');
        const { MessageEmbed } = require('discord.js');

        const target = message.mentions.users.first() || message.author;
        const member = message.guild.members.cache.get(target.id);

        const UserInfo = new MessageEmbed()
            .setColor(action.infocolour)
            .setTitle(DBS.BetterMods.parseAction(action.infotitle, message))
            .setAuthor({ name: `${target.username}`, iconURL: member.displayAvatarURL({ dynamic: true }) })
            .setDescription(DBS.BetterMods.parseAction(action.infodesc, message))
            .setThumbnail(member.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'User Tag', value: `${target.tag}`, inline: false },
                { name: 'User ID', value: `${target.id}`, inline: false },
                { name: 'Roles', value: `${member.roles.cache.map(r => r).join(' ').replace('@everyone', '_ _')}`, inline: false },
                { name: 'Joined Server', value: `${moment(member.joinedAt).format('MMM Do YYYY, h:mm:ss a')} **-** ${moment(member.joinedAt).startOf('day').fromNow()}`, inline: false },
                { name: 'Joined Discord', value: `${moment(target.createdAt).format('MMM Do YYYY, h:mm:ss a')} **-** ${moment(target.createdAt).startOf('day').fromNow()}`, inline: false },
            )
            .setTimestamp()
            .setFooter(DBS.BetterMods.parseAction(action.infofooter, message))
        message.reply({ embeds: [UserInfo] });

        DBS.callNextAction(command, message, args, index + 1);
    }
};