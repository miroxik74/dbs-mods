module.exports = {
    name: "Edit Channel Name",
    author: ["koki1019#0005"],
    version: "1.0.0",
    changelog: "",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Channel Action",
    html: function(data) {
        return `
        <small>Currently <strong>Using Edit Channel Name mod v1.0.0</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span> You need BetterMods v2.0.0!<br> <span style="color: orange; font-weight: bold;">Any issues?</span>Please DM koki1019</label>
        </div>
        <hr>
        <div class="col">
                <label>Set Name</label>
                <input class="form-control" name="setname" value="no-mic"></input><br>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="setname">Insert Variable</a>
                </div>
                <p>Note: it'll change the name where the command was written/p>
           </div>
        `;
    },
    init: function() {
        console.log("Loaded Edit Channel Name");
    },
    mod: function(DBS, message, action, args, command, index) {
        message.channel.setName(DBS.BetterMods.parseAction(action.setname, message))
        .catch(console.error);
    }
};