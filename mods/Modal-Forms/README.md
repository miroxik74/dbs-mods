**Note:**  
1. Discord allows only for 5 questions in modals.
2. It works only for slash command because the instruction was created for slash but you can do it for button too
  
Let's start then:  
1. Go to your BotFiles folder
2. Type inside your folder path box (directory): `cmd`
3. Press enter
4. Inside the new window, run commands:
```
npm un discord.js
npm i discord.js@13.17.1
```

2. `BotFiles` -> `BotData` -> `commands` -> Create folder `modals` and there add two files:
- [`modalForm.js`](https://github.com/miroxik74/dbs-mods/blob/main/mods/Modal-Forms/modalForm.js) - the form that the user will see when they interact with the slash command
- [`modalOutput.js`](https://github.com/miroxik74/dbs-mods/blob/main/mods/Modal-Forms/modalOutput.js) - the results of what should happen after the user submits the form

3. In BSD app, create new slash command with name `modal` and Save changes

4. If downloaded, open [`AAA_BetterMods.js`](https://github.com/miroxik74/dbs-mods/blob/main/mods/AAA_BetterMods.js) and find
```
DBS.Bot.on("interactionCreate", async interaction => {
```

5. Above the line `//interaction.followUp({ content: "hello" });`, but under `else {` , press Enter to start new line and paste:
```
            if (interaction.commandName === 'modal') {
                const { modalForm } = require("../BotData/commands/modals/modalForm");
                return modalForm(DBS, interaction);
            }
            if (interaction.isModalSubmit()) {
                if (interaction.customId === 'myModal' ) {
                    const { modalOutput } = require("../BotData/commands/modals/modalOutput");
                    return modalOutput(DBS, interaction);
                }
            }
```

6. Remember to update id of guild and channel in `modalOutput` !

7. Start your bot and use the slash command that was created in p.3