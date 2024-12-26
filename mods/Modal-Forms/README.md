**Note:**  
1. Discord allows only for 5 questions in modals.
2. It works only for slash command because the instruction was created for slash but you can do it for button too
  
Let's start then:  
1. Make sure you have installed `discord.js@13.17.1`
- if not, open cmd within your botfiles folder and run `npm install discord.js@13.17.1`

2. `BotFiles` -> `BotData` -> `commands` -> Create folder `command-functions` and there add 2 files:
- [`modalForm.js`](https://github.com/miroxik74/dbs-mods/blob/main/mods/Modal%20-%20Forms/modalForm.js) - the form that user will get after interacting with slash command
- [`modalOutput.js`](https://github.com/miroxik74/dbs-mods/blob/main/mods/Modal%20-%20Forms/modalOutput.js) - the results of what is executed after the user sent the form

3. In BSD app, create new slash command with name `modal` and Save changes

4. If downloaded, open [`AAA_BetterMods.js`](https://github.com/miroxik74/dbs-mods/blob/main/mods/AAA_BetterMods.js) and find
```
DBS.Bot.on("interactionCreate", async interaction => {
```

5. Above the line `//interaction.followUp({ content: "hello" });`, but under `else {` , press Enter to start new line and paste:
```
            if (interaction.commandName === 'modal') {
                const { modalForm } = require("./BotData/commands/command-functions/modalForm");
                return modalForm(DBS, interaction);
            }
            if (interaction.customId === 'myModal' && interaction.isModalSubmit()) {
                const { modalOutput } = require("./BotData/commands/command-functions/modalOutput");
                return modalOutput(DBS, interaction);
            }
```

6. Remember to update id of guild and channel in `modalOutput` !

7. Start your bot and use the slash command that was created in p.3