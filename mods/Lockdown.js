module.exports = {
    name: "Lockdown",
    author: ["."],
    version: "0.0.1",
    changelog: "Nothing",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Channel Action",
    html: function(data) {
        return `
        <small>Currently <strong>Using Lockdown v1.0.0</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span>.<br> <span style="color: orange; font-weight: bold;">.</span>.</label>
        </div>
        <hr>
        <style>
            #authormark { margin-top:5px; }
        </style>
        <div class="form-group">
            <select class="form-control" name="bool">
                <option value="on" selected>ON</option>
                <option value="off" selected>OFF</option>
            </select>
            <label id="authormark">|| .</label>
        </div>
        `;
    },
    init: function() {
        console.log("Lockdown Mod loaded");
    },
    mod: function(DBS, message, action, args, command, index) {
        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category')
        switch (action.bool) {
            case "on":
                channels.forEach(channel => {
                    channel.updateOverwrite(message.guild.roles.everyone, {
                        SEND_MESSAGES: false,
                        CONNECT: false
                    })
                })    
            break;
            case "off":
                channels.forEach(channel => {
                    channel.updateOverwrite(message.guild.roles.everyone, {
                        SEND_MESSAGES: true,
                        CONNECT: true
                    })
                })
            break;
        }
        DBS.callNextAction(command, message, args, index + 1);
    }
};
