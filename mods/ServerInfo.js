module.exports = {
    name: "Server Info",
    author: ["NickG#9306"],
    version: "1.0.1",
    changelog: "Added Server Info Mod",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Server Action",
    html: function (data) {
        return `
            <div class="form-group">
            <label id="label">Set Embed Title</label>
            <div class="input-group mb-3">
                <input class="form-control" name="servertitle"></input>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="servertitle">Insert Variable</a>
                </div>
            </div>
            </div>

            <div class="form-group">
            <label id="label">Set Embed Color</label>
                <input class="form-control jscolor" id="color" placeholder="#FFFFFF" name="servercolour">
            </div>

            <div class="form-group">
            <label id="label">Set Embed Description</label>
            <div class="input-group mb-3">
                <textarea class="form-control" name="serverdesc" rows="2"></textarea>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="serverdesc">Insert Variable</a>
                </div>
            </div>
            </div>

            <div class="form-group">
            <label id="label">Set Embed Footer</label>
            <div class="input-group mb-3">
                <input class="form-control" name="serverfooter"></input>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="serverfooter">Insert Variable</a>
                </div>
            </div>
            </div>

            <hr>

            <div class="row">
            <div class="col">
                <label>Field Name Emoji *</label>
                <input class="form-control" name="nameemoji"></input><br>
            </div>
            <div class="col">
                <label>Field Value Emoji *</label>
                <input class="form-control" name="valueemoji"></input><br>
            </div>
            </div>
            <p>This can either be a copy & pasted unicode emoji or a custom emoji from a server your bot is in.<br>
            Copy & Paste Unicode Emojis: <a href="https://getemoji.com" target="_blank">getemoji.com</a> | How to use Custom Emojis: <a href="https://docs.discordbotstudio.org/misc/how-to-use-custom-emojis" target="_blank">DBS Docs</a><p>
            
            <hr>
            
            <p>Server Info Mod ~ Version 1.0.0
      `;
    },
    init: async function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        try {
            require("discord.js");
        } catch {
            DBS.BetterMods.requireModule("discord.js");
        }
        console.log("Loaded Server Info");
    },
    mod: async function (DBS, message, action, args, command, index) {
        const { MessageEmbed } = require('discord.js');

        const guild = message.guild;
        const owner = await guild.fetchOwner();
        const nameEmoji = DBS.BetterMods.parseAction(action.nameemoji, message)
        const valueEmoji = DBS.BetterMods.parseAction(action.valueemoji, message)

        const ServerInfo = new MessageEmbed()
            .setColor(action.servercolour)
            .setTitle(DBS.BetterMods.parseAction(action.servertitle, message))
            .setAuthor({
                name: guild.name,
                iconURL: guild.iconURL({ dynamic: true })
            })
            .setDescription(DBS.BetterMods.parseAction(action.serverdesc, message))
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                {
                    name: `${nameEmoji} GENERAL`,
                    value: [
                        `${valueEmoji} Name: ${guild.name}`,
                        `${valueEmoji} Created: <t:${parseInt(guild.createdTimestamp / 1000)}:R>`,
                        `${valueEmoji} Owner: ${owner}`,
                    ].join('\n')
                },
                {
                    name: `${nameEmoji} USER COUNTS`,
                    value: [
                        `${valueEmoji} Members: ${guild.members.cache.filter((m) => !m.user.bot).size}`,
                        `${valueEmoji} Bots: ${guild.members.cache.filter((m) => m.user.bot).size}`,

                        `${valueEmoji} Total Members: ${guild.memberCount}`
                    ].join('\n')
                },
                {
                    name: `${nameEmoji} CHANNELS & ROLES`,
                    value: [
                        `${valueEmoji} Text: ${guild.channels.cache.filter((c) => c.type === 'GUILD_TEXT').size}`,
                        `${valueEmoji} Voice: ${guild.channels.cache.filter((c) => c.type === 'GUILD_VOICE').size}`,
                        `${valueEmoji} Threads: ${guild.channels.cache.filter((c) => c.type === 'GUILD_NEWS_THREAD' && 'GUILD_PRIVATE_THREAD' && 'GUILD_PUBLIC_THREAD').size}`,
                        `${valueEmoji} Categories: ${guild.channels.cache.filter((c) => c.type === 'GUILD_CATEGORY').size}`,
                        `${valueEmoji} Stages: ${guild.channels.cache.filter((c) => c.type === 'GUILD_STAGE_VOICE').size}`,
                        `${valueEmoji} News: ${guild.channels.cache.filter((c) => c.type === 'GUILD_NEWS').size}`,

                        `${valueEmoji} Total Roles: ${guild.roles.cache.size}`,
                        `${valueEmoji} Total Channels: ${guild.channels.cache.size}`
                    ].join('\n')
                },
                {
                    name: `${nameEmoji} EMOJIS & STICKERS`,
                    value: [
                        `${valueEmoji} Static: ${guild.emojis.cache.filter((e) => !e.animated).size}`,
                        `${valueEmoji} Animated: ${guild.emojis.cache.filter((e) => e.animated).size}`,
                        `${valueEmoji} Stickers: ${guild.stickers.cache.size}`,

                        `${valueEmoji} Total: ${guild.stickers.cache.size + guild.emojis.cache.size}`
                    ].join('\n')
                },
                {
                    name: `${nameEmoji} SERVER STATISTICS`,
                    value: [
                        `${valueEmoji} Tier: ${guild.premiumTier.replace('Tier_', '')}`,
                        `${valueEmoji} Boosts: ${guild.premiumSubscriptionCount}`,
                        `${valueEmoji} Boosters: ${guild.members.cache.filter((m) => m.premiumSince).size}`
                    ].join('\n')
                }
            )
            .setTimestamp()
            .setFooter(DBS.BetterMods.parseAction(action.serverfooter, message))
        message.reply({ embeds: [ServerInfo] });

        DBS.callNextAction(command, message, args, index + 1);
    }
};