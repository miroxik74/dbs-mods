### **Notes:**

1. Commands with a prefix and slash are combined in one file by default and if used incorrectly, leads to the error
```js
Check Message: [<prefix><command_name>] TypeError: Cannot read properties of undefined (reading 'length')
    at DBS.checkMessage (/.../bot.js:192:42)
    at Client.<anonymous> (/.../mods/AAA_BetterMods.js:196:52)
```
so the command values ​​in this `bot.js` have been updated as well as the files related to it

### **Changes:**

1. Updated client partials and intents

2. Above the line for `DBS.UserFile = __dirname + "/BotData/user/user.json";`
from
```js
DBS.CommandsFile = require("./BotData/commands/commands");
```
into
```js
DBS.PrefixCommandsFile = require("./BotData/commands/prefixcommands");
DBS.SlashCommandsFile = require("./BotData/commands/slashcommands");
```

3. For `DBS.checkMessage = async function (message) {`
from
```js
for (const commandF of DBS.CommandsFile.command) {
```
into
```js
for (const commandF of DBS.PrefixCommandsFile.command) {
```

4. For `DBS.registerButtonsAndSelects = async function () {`
from
```js
DBS.CommandsFile.command
```
into
```js
DBS.PrefixCommandsFile.command
```

5. For `DBS.registerSlashCommands = async function() {`
from
```js
DBS.CommandsFile.command
```
into
```js
DBS.PrefixCommandsFile.command
```