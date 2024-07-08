module.exports = {
    name: "Channel Properties",
    author: ["Hectoliters#7743"],
    version: "0.1.1",
    changelog: "Updated to fix some bugs",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Channel Action",

    html: function(data) {
        return `
        <div class="form-group">
        <labelProperty to edit *</label>
        <select class="form-control" name="channelprop">
            <option value="CategoryParent" selected>Channel Category</option>
            <option value="ChannelName">Channel Name</option>
            <option value="ChannelDescription">Channel Description</option>
        </select>
    </div>
            <div class="form-group">
                <label>Set property to (this will be the reason if you selected delete channel)* </label>
                <textarea class="form-control needed-field" name="channelInfo" rows="1" ></textarea>
            </div>
            <div class="form-group">
            <label>This will take effect on the channel the command is executed in</label>
        </div>
        `;
    },

    init: function(DBS) {
        console.log("Loaded channel properties");
    },

    mod: function(DBS, message, action, args, command, index) {
        switch (action.channelprop) {
            case "CategoryParent":
                message.channel.setParent(action.channelinfo, { lockPermissions: false });
                break;
            case "ChannelName":
                message.channel.setName(action.channelinfo);
                break;
            case "ChannelDescription":
                message.channel.setTopic(action.channelinfo)
                 break;
        }
        DBS.callNextAction(command, message, args, index + 1);
    }
};
