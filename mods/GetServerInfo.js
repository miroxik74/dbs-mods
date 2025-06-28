module.exports = {
    name: "Get Server Info",
    author: ["STR1KE#6969"],
    version: "0.1.1",
    changelog: "added back the member counter",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",

    html: function(data) {
        return `
            <div class="form-group">
                <label>Send a message displaying the server's info. Use $$members$$, $$icon$$ and $$date$$ to get the members, icon and creation date*</label>
                <textarea class="form-control needed-field" name="info" rows="1" ></textarea>
            </div>
           \
        `;
    },

    init: function() {
        console.log("Loaded Get Server Info");
    },

    mod: function(DBS, message, action, args, command, index) {
        var serverInf = action.info;
        var serverIcon = message.guild.iconURL();
        var serverMembers = message.guild.memberCount;
        
        var date = message.guild.createdAt;
        serverInf = serverInf.replace("$$members$$", serverMembers);
        serverInf = serverInf.replace("$$icon$$", serverIcon);
        serverInf = serverInf.replace("$$date$$", date);
        message.channel.send(serverInf);
        DBS.callNextAction(command, message, args, index + 1);
    }
};
