### Twitch Live Notifier Setup Instructions

1. In Command Prompt, run: `npm i axios`
2. Go to [dev.twitch.tv/console](https://dev.twitch.tv/console) and sign in.
3. Press on `Register Your Application`.
4. Fill in the required fields and note down your `Client ID` and `Client Secret`.
5. Set the `OAuth Redirect URL` to `https://localhost`.
6. Manually edit this mod file (open it in a text editor) and fill in the following variables:
    - twitchClientid: Your Twitch API Client ID
    - twitchClientsecret: Your Twitch API Client Secret
    - streamerName: The Twitch streamer’s username
    - discordGuildId: Your Discord server’s ID
    - discordChannelId: The Discord channel ID to send notifications to
    - livemessage: The message it'll send alongside the embed in the channel you specified (Your decision)
7. Save changes in this file (TwitchLiveNotifier.js) and restart the bot. The mod will check every 60 seconds for the streamer going live.  

Note:  
If you don't know how to get Discord IDs, go here: [support.discord.com/hc/en-us/articles/206346498](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID)
---
Any errors? 
-> [README](https://github.com/miroxik74/dbs-mods/blob/main/README.md)