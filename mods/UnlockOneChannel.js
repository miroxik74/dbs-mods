module.exports = {
    name: "Unlock One Channel",
    author: [".", "Miro#5410"],
    version: "1.0.0",
    changelog: "Nothing",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Channel Action",
    html: function (data) {
        return `
        <small>Currently <strong>Using Unlock One Channel v1.0.0</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span>Any Issues?<br> <span style="color: orange; font-weight: bold;">Any issues?</span>Please contact Miro#5410</label>
        </div>
        <hr>
        <div class="form-group">
            <select class="form-control" name="torv">
                <option value="text" selected>Text Channel</option>
                <option value="voice">Voice Channel</option>
            </select>
        </div>
        <div class="form-group">
            <textarea class="form-control needed-field" name="channelname" rows="1" placeholder="Channel Name"></textarea>
            <div class="input-group-append">
            <a class="btn btn-outline-primary" role="button" id="variables" forinput="channelname">Insert Variable</a>
            </div>
            <label id="authormark">|| .</label>
        </div>
        `;
    },
    init: function () {
        console.log(">> Voice Channel Propeties Mod loaded");
    },
    mod: function (DBS, message, action, args, command, index) {
        var name = DBS.BetterMods.parseAction(action.channelname, message);
        var guild = message.guild;
        const channel = guild.channels.cache.find((channel) => {
            return channel.id === name;
        })
        if (!channel) {
            return;
        }
        switch (action.torv) {
            case "text":
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                })
                break;
            case "voice":
                channel.updateOverwrite(message.guild.roles.everyone, {
                    CONNECT: true
                })
                break;
        }
        DBS.callNextAction(command, message, args, index + 1);
    }
};
