module.exports = {
    name: "Pin Mod",
    author: ["Hectoliters#7743"],
    version: "0.1.1",
    changelog: "Updated to fix some bugs",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",

    html: function (data) {
        return `
        <div class="form-group">
        <label>Pin Mode *</label>
        <select class="form-control" name="PinMode">
            <option value="Fixed" selected>Fixed</option>
            <option value="Custom">Custom</option>
        </select>
    </div>
        <div class="form-group">
        <label>Text to pin (Only works if you choosed custom and it doesnt work with variables) *</label>
        <textarea class="form-control needed-field" name="messageText" rows="1" ></textarea>
    </div>
        `;
    },

    init: function (DBS) {
        console.log("Loaded Pin Mod");
    },

    mod: function (DBS, message, action, args, command, index) {
        switch (action.pinmode) {
            case "Fixed":
                message.pin([]);
                break;
            case "Custom":
                message.channel.send(action.messagetext).then((message) => message.pin());
                break;
        };

        DBS.callNextAction(command, message, args, index + 1);
    }
};
