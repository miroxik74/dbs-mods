# To install mods:
1. [Click here to start](https://github.com/miroxik74/dbs-mods/releases/download/mods/mods.zip) - the folder `Modals-Forms` is **not** included
2. Choose the location where you have `mods` folder.
3. Extract the downloaded `.zip` file.
4. Now open BSD / restart the app / or just switch to the Home tab and again to the Commands to load them, and you will be able to add responses of the type of mod(s) you added.
5. If you don't need some mods, delete them after extraction
6. Done!


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
- Why is my mod not showing up in DBS?  
> Make sure you have "`isMod`" set to `true` and that your mod file mates your mod name. For an example if my mod was called "`Example Mod`" my mod file name would be "`ExampleMod.js`".