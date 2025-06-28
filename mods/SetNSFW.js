module.exports = {
    name: "Set NSFW",
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
        <small>Currently <strong>Using Set NSFW v0.0.1</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span>A.<br> <span style="color: orange; font-weight: bold;">.</span>.</label>
        </div>
        <hr>
        <style>
            #authormark { margin-top:5px; }
        </style>
        <div class="form-group">
            <textarea class="form-control needed-field" name="channelname" rows="1" placeholder="Text Channel Name"></textarea>
        </div>
        <div class="form-group">
            <select class="form-control" name="bool">
                <option value="true" selected>True</option>
                <option value="false" selected>False</option>
            </select>
            <label id="authormark">|| .</label>
        </div
        `;
    },
    init: function () {
        console.log(">> Voice Channel Propeties Mod loaded");
    },
    mod: function (DBS, message, action, args, command, index) {
        var name = action.channelname;
        var guild = message.guild;
        const channel = guild.channels.cache.find((channel) => {
            return channel.name === name;
        })
        if (!channel) {
            return;
        }
        switch (action.bool) {
            case "true":
                channel.edit({ nsfw: true })
                break;
            case "false":
                channel.edit({ nsfw: false })
                break;
        }
        DBS.callNextAction(command, message, args, index + 1);
    }
};
