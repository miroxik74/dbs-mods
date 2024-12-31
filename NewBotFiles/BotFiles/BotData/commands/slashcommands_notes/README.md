### Remember:
1. When you create a slash command in BSD, make sure you retrieved the specific data from:  
`>` main `BotFiles\BotData\commands\commands.json` and update in new botfiles `slashcommands.json`  
`>` main `BotFiles\BotData\nodes` `eventnodes.json` + `events.json` and update in new botfiles `eventnodes.json` + `events.json`- there you can copy-paste everything

### Example 1:
1. Create a slash command named `test`
2. go to the `Events` tab
3. for event `Command Interaction` add node `Switch Case`  
`>` Variable to check: `${tempVars.commandinteraction.commandName}`  
`>` Value: `test`  
4. add node `Reply To Interaction With Message`  
`>` Interaction: `${tempVars.commandinteraction}`  
`>` Response message text: `Hello, Testing`

### Example 2:
1. Create a slash command named `say`  
`>` Add option with name `text`  
`>` Set two checkboxes as marked to turn on
2. go to the `Events` tab
3. for event `Command Interaction` add node `Switch Case`  
`>` Variable to check: `${tempVars.commandinteraction.commandName}`  
`>` Value: `say`
4. add node `Get Interaction Option`  
`>` Interaction: `${tempVars.commandinteraction}`  
`>` Option type: `string`  
`>` Option Name: `text`  
`>` Variable Name: `text_to_test`  
`>` Variable type: `Temporary`  
5. add node `Send Message`  
`>` Channel: `${tempVars.commandinteraction.channelId}`  
`>` Response message text: `${tempVars.text_to_test}`  
6. add node `Reply To Interaction With Message`  
`>` Interaction: `${tempVars.commandinteraction}`  
`>` Response message text: `Done`

After that, start your bot, refresh your Discord to see the commands and try!