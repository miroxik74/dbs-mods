/* To make it work:
1. Open AAA_BetterMods.js
2. Find
3. Make new line and paste
4. Results
5. Create a file with any name, this will be your loader to fetch desired channel, message and reactions from it
6. Create a file with any name, this will be the actual code that is executed when someone removed reaction
> for unicode emoji you can use https://getemoji.com/ or https://pl.piliapp.com/emoji/list/

That's all you need to know, thanks for reading and good luck :)
*/

// 2.
DBS.Bot = new Client({

// 3.
partials: [
    "CHANNEL",
    "MESSAGE",
    "REACTION"
],
            
// 4.
        DBS.Bot = new Client({
            partials: [
                "CHANNEL",
                "MESSAGE",
                "REACTION"
            ],
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_BANS,
                Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                Intents.FLAGS.GUILD_VOICE_STATES,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_TYPING,
                Intents.FLAGS.DIRECT_MESSAGES,
                Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
                Intents.FLAGS.DIRECT_MESSAGE_TYPING,
            ]
        });

// 5.
module.exports = {
    name: "ready",
    author: [""],
    version: "1.0.0",
    changelog: "",
    isEvent: true,
    isResponse: false,
    isMod: true,
    isAddon: false,
    section: "",
    html: function (data) {
        return `
        `;
    },
    init: async function (DBS) {
    },
    mod: async function (DBS) {
        try {
            const channel = await DBS.channels.fetch('CHANNEL_ID');
            const message = await channel.messages.fetch('MESSAGE_ID');
            const reactions = await message.reactions.cache.get();
        } catch (error) {
            return console.log(error);
        }
    }
};

// 6.
module.exports = {
    name: "messageReactionRemove",
    author: [""],
    version: "1.0.0",
    changelog: "",
    isEvent: true,
    isResponse: false,
    isMod: true,
    isAddon: false,
    section: "",
    html: function (data) {
        return `
        `;
    },
    init: async function (DBS) {
    },
    mod: async function (DBS, reaction, user) {
        const channelId1 = 'CHANNEL_ID';
        const messageId1 = 'MESSAGE_ID';
        const message = reaction.message;
        const emoji = reaction.emoji.name;
        const guild = await message.guild.fetch();
        const channel = await guild.channels.fetch(channelId1);
        await channel.messages.fetch(messageId1);

        try {
            if (message.id === messageId1 && channel.id === channelId1) {
                const userHasReacted = await message.guild.members.fetch(user.id);

                if (emoji === 'EMOJI_NAME_OR_PASTE_IF_UNICODE') {
                    const role = userHasReacted.guild.roles.cache.get('ROLE_ID');
                    if (role && userHasReacted) {
                        await userHasReacted.roles.remove(role);
                    }
                }

            }
        } catch (error) {
            return console.log(error);
        }
    }
};