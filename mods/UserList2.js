module.exports = {
    name: "messageReactionAdd",
    author: ["PlayboyPrime#3839"],
    version: "1.0.3",
    changelog: "Release",
    isEvent: true,
    isResponse: false,
    isMod: true,
    isAddon: false,
    init: function () {
        console.log("Loaded UserList2");
    },

    mod: function (DBS, reaction, user) {
        const fs = require("fs")
        const share = JSON.parse(fs.readFileSync(`${__dirname}/../BotData/ModData/UserList.json`))
        if(user.bot) return
        if(share.id !== reaction.message.id) return

        function update() {
            fs.writeFileSync(`${__dirname}/../BotData/ModData/UserList.json`, JSON.stringify(share, null, 4))
        }

        if(reaction.emoji.name == "◀️" && share.currentsite !== 0){
            share.currentsite --
            //reaction.message.edit(share.list[share.currentsite])
            reaction.message.edit({ content: `${share.list[share.currentsite]}`, allowedMentions: { repliedUser: false }})
            update() 
        } else if(reaction.emoji.name == "◀️" && share.currentsite === 0){
            share.currentsite = (share.list.length - 1)
            //reaction.message.edit(share.list[share.currentsite])
            reaction.message.edit({ content: `${share.list[share.currentsite]}`, allowedMentions: { repliedUser: false }})
            update() 
        }
        if(reaction.emoji.name == "▶️" && share.currentsite !== (share.list.length - 1)){
            share.currentsite ++
            //reaction.message.edit(share.list[share.currentsite])
            reaction.message.edit({ content: `${share.list[share.currentsite]}`, allowedMentions: { repliedUser: false }})
            update() 
        } else if(reaction.emoji.name == "▶️" && share.currentsite == (share.list.length - 1)){
            share.currentsite = 0
            //reaction.message.edit(share.list[share.currentsite])
            reaction.message.edit({ content: `${share.list[share.currentsite]}`, allowedMentions: { repliedUser: false }})
            update() 
        }
        reaction.users.remove(user)
    }
};
