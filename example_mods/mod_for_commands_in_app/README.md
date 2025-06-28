**Note:**  
The `.js` file:  
`>` has to be inside `mods` folder  
`>` name must be `name` value but with spaces removed  

-- Example:  
if value === `name: "Message Mod"`  
then file name should be === `MessageMod.js`

---  

**Values:**  
`name` - Set this to the name of the mod. This is what will be shown inside of BSD.  

`author` - Place the author of the mod here but not required. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]

`version` - Place the version of the mod here.

`changelog` - Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding

`isEvent` - Set this to true if this will be an event. Note events wont show up in DBS.

`isResponse` - ???

`isMod` - Set this to true if this will be a response mod.

`isAddon` - If you want to modify a core feature, set this to true.

`section` - Here you can define where you want your mod to show up inside of the app

`html` - Place your html to show inside of the app when they select your mod.

`init` - When the bot is first started, this code will be ran.

`mod` - Place your mod here.