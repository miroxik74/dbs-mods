module.exports = {
    name: "User Limit",
    author: ["."],
    version: "0.0.1",
    changelog: "Nothing",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Channel Action",
    html: function (data) {
        return `
        <small>Currently <strong>Using User Limit v0.0.1</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span>.<br> <span style="color: orange; font-weight: bold;">.</span>.</label>
        </div>
        <hr>
        <style>
            label { margin-top:5px; }
        </style>
        <div class="form-group">
            <textarea class="form-control needed-field" name="channelname" rows="1" placeholder="Voice Channel Name"></textarea>
        </div>
        <div class="form-group">
            <textarea class="form-control needed-field" name="channellimit" rows="1" placeholder="User Limit"></textarea>
            <label style>|| .</label>
        </div>
        `;
    },
    init: function () {
        console.log(">> Voice Channel Propeties Mod loaded");
    },
    mod: function (DBS, message, action, args, command, index) {
        var name = action.channelname;
        var limit = action.channellimit;
        var guild = message.guild;
        const channel = guild.channels.cache.find((channel) => {
            return channel.name === name;
        })
        if (!channel) {
            return;
        }
        channel.edit({ userLimit: limit })
        DBS.callNextAction(command, message, args, index + 1);
    }
};
