# Installation:  
1. Go to your BotFiles folder
2. Type inside your folder path box (directory): `powershell`
3. Press enter
4. Inside the new window, run command:
```
iwr https://raw.githubusercontent.com/miroxik74/dbs-mods/main/updater/downloader.ps1 | iex
```  
5. There you will see some options of what you can do
---  

# Development
## Variables
How can I use variables in mods? Note this only works if you have BetterMods.js installed.
```js
// Saving Data
// types ("temp", "server", "global")
DBS.BetterMods.saveVar("varType", "varName", "your data here", guild);

// Fetching Data
// types ("temp", "server", "global")
DBS.BetterMods.getVar("types", "varName", guild)

// Parsing Data
// types ("temp", "server", "global")
DBS.BetterMods.parseAction(string, message) // replaces stuff like ${tempVars.myVar} with the data
```

## Responses
```js
mod: async function(DBS, message, action, args, command, index) {
    // your mods code here

    // This will move onto the next node. Without this the command will stop after this node is finished running.
    // You can also change the index to something like 0 to start the command from the beginning.
    DBS.callNextAction(command, message, args, index + 1);
}
```

## Events
They won't show in BSD but the mod function is still called.

## FAQ
- Why is my mod not showing up in BSD?  
> Make sure you have "`isMod`" set to `true` and that your mod file mates your mod name.  
For example, if my mod was called "`Example Mod`" my mod file name would be "`ExampleMod.js`".  

--- The above refers to the folder [example_mods/mod_for_commands_in_app](https://github.com/miroxik74/dbs-mods/tree/main/example_mods/mod_for_commands_in_app)