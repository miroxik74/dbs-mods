module.exports = {
    name: "Check Category ID",
    author: ["Big D#1129", "Hectoliters#0595"],
    version: "0.1.0",
    changelog: "Modified it to check the category instead",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Channel Action",
    html: function (data) {
        return `
        <small>Currently <strong>Using Check Category ID mod v1.0.1</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span> You need BetterMods v2.0.0!<br> <span style="color: orange; font-weight: bold;">Any issues?</span>Please DM Hectoliters#7743</label>
        </div>
        <hr>    
        <div class="form-group">
                <label>The ID of the category you want the command to work in *</label>
                <textarea class="form-control needed-field" name="categoryid" rows="1" ></textarea>
            </div>
            <div class="form-group">
                <label>Incorrect category message *</label>
                <textarea rows="2" class="form-control needed-field" name="nomatch"></textarea>
            </div>
        `;
    },
    init: function () {
        console.log("Loaded Channel Check");
    },
    mod: function (DBS, message, action, args, command, index) {
        var categoryID = action.categoryid;
        var NoMatch = action.nomatch;
        if (message.channel.parentID === categoryID) {
            DBS.callNextAction(command, message, args, index + 1)
        } else {
            if (NoMatch) {
                message.channel.send(NoMatch)
            }
        }
    }
};