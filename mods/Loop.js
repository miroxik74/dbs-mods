module.exports = {
    name: "Loop",
    author: ["Hectoliters#7743"],
    version: "0.1.0",
    changelog: "Created Loop",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Bot Action",

    html: function(data) {
        return `
            <div class="form-group">
                <label>Ammount of nodes to loop (Before this one) * </label>
                <textarea class="form-control needed-field" name="Nodes" rows="1" ></textarea>
            </div>
            <div class="form-group">
            <label>Delay between nodes (In Seconds) * </label>
            <textarea class="form-control needed-field" name="timedelay" rows="1" ></textarea>
        </div>
        `;
    },

    init: function(DBS) {
        console.log("Loaded Loop");
    },

    mod: function (DBS, message, action, args, command, index) {
        // counting each second as 1.1 because otherwise it stops itself
        var delay = action.timedelay * 1100;

        setTimeout(function() {
            DBS.callNextAction(command, message, args, parseInt(index - action.nodes));
        }, delay);
    }
};
