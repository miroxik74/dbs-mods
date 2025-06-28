module.exports = {
    name: "Meme Variable",
    author: ["koki1019#1019"],
    version: "1.0.1",
    changelog: "",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Variable",

    html: function (data) {
        return `
           <div class="col">
                <label>Variable Name *</label>
                <input class="form-control" name="storeresult"></input><br>
            </div>
           <div class="col">
                <label>Variable Type *</label>
                    <select name="vartype" class="form-control">
                        <option value="temp">Temp Variable</option>
                        <option value="server">Server Variable</option>
                        <option value="global">Global Variable</option>
                </select><br>
                <label>Data Type *</label>
                    <select name="fetchtype" class="form-control">
                        <option value="text">Subreddit Name</option>
                        <option value="image">Image of the meme</option>
                        <option value="link">Link of the subreddit</option>
                </select><br>
           </div>
        `;
    },

    init: async function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        try {
            require('random-puppy');
        } catch {
            DBS.BetterMods.requireModule("random-puppy");
        }
        console.log("Meme Variable Loaded!\n Contact koki1019#1019 For help");
    },

    mod: async function (DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        const randomPuppy = require("random-puppy")

        const SubReddits = ["dankmeme", "dankmemes", "meme", "me_irl", "memes", "AdviceAnimals", "terriblefacebookmemes", "MemeEconomy", "ComedyCemetery", "PrequelMemes"];
        const random = SubReddits[Math.floor(Math.random() * SubReddits.length)];

        const img = await randomPuppy(random);

        const link = `https://reddit.com/r/${random}`;


        switch (action.fetchtype) {
            case "text":
                DBS.BetterMods.saveVar(action.vartype, action.storeresult, random, message.guild);
                break
            case "link":
                DBS.BetterMods.saveVar(action.vartype, action.storeresult, link, message.guild);
                break
            case "image":
                DBS.BetterMods.saveVar(action.vartype, action.storeresult, img, message.guild);
                break
        }

        DBS.callNextAction(command, message, args, index + 1);
    }
};