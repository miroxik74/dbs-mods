module.exports = {
    name: "One Member Channel Perms",
    author: ["DeepInMind#1864"],
    version: "0.0.1",
    changelog: "Nothing",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Channel Action",
    html: function(data) {
        return `
        <small>Currently <strong>Using One Member Channel Perms v0.0.1</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span>Any Issues?<br> <span style="color: orange; font-weight: bold;">Any issues?</span>Please Contact DeepInMind#1864</label>
        </div>
        <hr>
        <style>
            #authormark { margin-top:5px; }
        </style>
        <div class="form-group">
            <select class="form-control" name="torv">
                <option value="text" selected>Text Channel</option>
                <option value="voice">Voice Channel</option>
            </select>
        </div>
        <div class="form-group">
            <textarea class="form-control needed-field" name="channelname" rows="1" placeholder="Channel Name"></textarea>
            <label id="authormark">|| .</label>
        </div>
        `;
    },
    init: function() {
        console.log(">> One Member Channel Perms Mod loaded.");
    },
    mod: function(DBS, message, action, args, command, index) {
        var name = action.channelname;
        var guild = message.guild;
        const channel = guild.channels.cache.find((channel) => {
            return channel.name === name;
        })
        if (!channel) {
            return;
        }
        switch (action.torv) {
            case "text":
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false,
                    VIEW: false
                }),
                channel.updateOverwrite(message.member, {
                    SEND_MESSAGES: true,
                    VIEW: true
                })
                break;
            case "voice":
                channel.updateOverwrite(message.guild.roles.everyone, {
                    CONNECT: false,
                    VIEW: false
                })
                break;
        }
        DBS.callNextAction(command, message, args, index + 1);
    }
};