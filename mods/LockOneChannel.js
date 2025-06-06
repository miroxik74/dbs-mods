module.exports = {
    name: "Lock One Channel",
    author: [".", "Miro#5410"],
    version: "0.0.1",
    changelog: "Nothing",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Channel Action",
    html: function(data) {
        return `
        <small>Currently <strong>Using Lock One Channel v1.0.0</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span>Any Issues?<br> <span style="color: orange; font-weight: bold;">Any issues?</span>Please Contact Miro#5410</label>
        </div>
        <hr>
        <div class="form-group">
            <select class="form-control" name="torv">
                <option value="text" selected>Text Channel</option>
                <option value="voice">Voice Channel</option>
            </select>
        </div>
        <div class="form-group">
        <label> Channel ID*</label>
            <textarea class="form-control needed-field" name="channelname" rows="1" placeholder="Channel Name"></textarea>
            <div class="input-group-append">
            <a class="btn btn-outline-primary" role="button" id="variables" forinput="channelname">Insert Variable</a>
            </div>
            <label id="authormark">|| .</label>
        </div>
        `;
    },
    init: function() {
        console.log(">> Lock One Channel");
    },
    mod: function(DBS, message, action, args, command, index) {
        var name = DBS.BetterMods.parseAction(action.channelname, message);
        var guild = message.guild
        const channel = guild.channels.cache.find((channel) => {
            return channel.id === name;
        })
        if (!channel) {
            return;
        }
        switch (action.torv) {
            case "text":
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                })
                break;
            case "voice":
                channel.updateOverwrite(message.guild.roles.everyone, {
                    CONNECT: false
                })
                break;
        }
        DBS.callNextAction(command, message, args, index + 1);
    }
};
