module.exports = {
    name: "ready", // Named ready for DBS to recognize it on startup.
    author: ["@miroxik74", "@kishirooo"],
    version: "1.0.1",
    changelog: "Release",
    isEvent: true,
    isResponse: false,
    isMod: true,
    isAddon: false,
    section: "",
    html: function (data) { return ` `; },
    init: async function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        try {
            require("discord.js");
        } catch {
            DBS.BetterMods.requireModule("discord.js");
        }
        try {
            require("axios");
        } catch {
            DBS.BetterMods.requireModule("axios");
        }
    },

    mod: async function (DBS) {

        const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
        const fs = require('fs');
        const path = require('path');
        const axios = require('axios');
        const bot = DBS;

        // *** MANUALLY CONFIGURE THESE VALUES BELOW: ***
        const twitchClientid = ''; // Your Twitch API Client ID
        const twitchClientsecret = ''; // Your Twitch API Client Secret
        const streamerName = ''; // The Twitch streamer’s username
        const discordGuildId = ''; // Your Discord server (guild) ID
        const discordChannelId = ''; // The Discord channel ID for notifications
        const livemessage = ``; // The text message it'll send when you/steamer goes live
        // ***********************************************

        if (!twitchClientid || !twitchClientsecret || !streamerName || !discordGuildId || !discordChannelId) return;
        const guildID = await bot.guilds.fetch(discordGuildId);
        const chanID = guildID.channels.cache.get(discordChannelId);

        setInterval(async () => {
            let previousStreamId = [];
            const streamidlocation = "./BotData/nodes/customevents/json/twitchLiveStream.json";
            const filePath = path.join(__dirname, '../', 'BotData', 'nodes', 'customevents', 'json', 'twitchLiveStream.json');
            if (!fs.existsSync(filePath)) {
                console.log('Trying to create filePath...');
                try {
                    fs.mkdirSync(path.dirname(filePath), { recursive: true });
                    fs.writeFileSync(filePath, '[]');
                    console.log(`File created at: ${filePath}`);
                } catch (error) {
                    console.log(error);
                }
            }

            const h = `https://`;
            const ttv = `twitch.tv`;
            const api = `${h}api.${ttv}`;

            try {
                const gettokenresponse = await axios.post(
                    `${h}id.${ttv}/oauth2/token`,
                    {
                        client_id: twitchClientid,
                        client_secret: twitchClientsecret,
                        grant_type: "client_credentials",
                    }
                );
                const tokenresponse = gettokenresponse.data.access_token;
                const usersResponse = await fetch(`${api}/helix/users?login=${streamerName}`, {
                    headers: { 'Client-ID': twitchClientid, Authorization: `Bearer ${tokenresponse}` },
                });
                const usersData = await usersResponse.json();
                const streamerid = usersData.data && usersData.data.length > 0 ? usersData.data[0].id : null;

                const streamresponse = await axios.get(
                    `${api}/helix/streams?user_id=${streamerid}`,
                    {
                        headers: {
                            "Client-ID": twitchClientid,
                            Authorization: `Bearer ${tokenresponse}`,
                        },
                    }
                );
                const stream = streamresponse.data.data[0];

                if (stream && stream.id != previousStreamId) {
                    const userResponse = await axios.get(
                        `${api}/helix/users?id=${stream.user_id}`,
                        {
                            headers: {
                                "Client-ID": twitchClientid,
                                Authorization: `Bearer ${tokenresponse}`,
                            },
                        }
                    );
                    const user = userResponse.data.data[0];
                    const username = stream.user_name;
                    const usericon = user.profile_image_url;
                    const previewimg = `${h}static-cdn.jtvnw.net/previews-ttv/live_user_${streamerName}.jpg?${Date.now()}`;

                    const gameResponse = await axios.get(
                        `${api}/helix/games?id=${stream.game_id}`,
                        {
                            headers: {
                                "Client-ID": twitchClientid,
                                Authorization: `Bearer ${tokenresponse}`,
                            },
                        }
                    );
                    const game = gameResponse.data.data[0];
                    const gameart = game?.box_art_url
                        ? game.box_art_url.replace('{width}', '144').replace('{height}', '192')
                        : previewimg;
                    const gamename = game?.name ? game.name : 'Category not set';

                    let previousStreamId = fs.existsSync(streamidlocation)
                        ? JSON.parse(fs.readFileSync(streamidlocation))
                        : [];

                    const Embed = new MessageEmbed()
                        .setColor('#2f3136')
                        .setTitle(`${stream.title}`)
                        .setAuthor({ name: username, iconURL: usericon, url: `${h}${ttv}/${username}` })
                    if (gameart) {
                        Embed.setThumbnail(gameart);
                    }
                    if (previewimg) {
                        Embed.setImage(previewimg);
                    }
                    if (gamename) {
                        Embed.setFooter({ text: `${gamename}` });
                    }

                    const watch1 = new MessageButton()
                        .setLabel("Browser")
                        .setStyle("LINK")
                        .setURL(`${h}${ttv}/${streamerName}`);
                    const watch2 = new MessageButton()
                        .setLabel("Player")
                        .setStyle("LINK")
                        .setURL(`${h}player.${ttv}/?channel=${streamerName}&parent=${ttv}`);
                    const buttonRow = new MessageActionRow().addComponents([watch1, watch2]);

                    if (!previousStreamId.includes(stream.id) && chanID) {
                        await chanID.send({ content: `${livemessage}`, embeds: [Embed], components: [buttonRow] });
                        previousStreamId.push(stream.id);
                        fs.writeFileSync(
                            streamidlocation,
                            JSON.stringify(previousStreamId)
                        );
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }, 60000);
    }
};