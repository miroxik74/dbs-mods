To make it work:

1. If downloaded, open [`AAA_BetterMods.js`](https://github.com/miroxik74/dbs-mods/blob/main/mods/AAA_BetterMods.js)

2. Find
```
DBS.Bot = new Client({
```

3. Make new line and paste
```
partials: [
    "CHANNEL",
    "MESSAGE",
    "REACTION"
],
```

4. Results
```
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
```

5. Download those two files and add them to the `mods` folder:  
- [`reaction_executor.js`](https://github.com/miroxik74/dbs-mods/blob/main/client_events/messageReactionAdd/reaction_executor.js) - the actual code that is executed when someone added reaction
- [`reaction_loader.js`](https://github.com/miroxik74/dbs-mods/blob/main/client_events/messageReactionAdd/reaction_loader.js) - loader to fetch desired channel, message and reactions from it

6. For unicode emoji, you can use:
+ [getemoji.com](https://getemoji.com)
+ [piliapp.com](https://pl.piliapp.com/emoji/list)

That's all you need to know, thanks for reading and good luck :)