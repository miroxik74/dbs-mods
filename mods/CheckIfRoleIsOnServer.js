module.exports = {
    name: "Check if Role is on Server",
    author: ["Pokemonultra#2815"],
    version: "1.0.0",
    changelog: "Created Check If Role is on Server",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Server Action",

    html: function (data) {
        return `<div class="form-group">
        <div class="input-group mb-3">
            <input class="form-control needed-field" name="RoleID"></input>
            <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="RoleID">Insert Variable</a>
            </div>
        </div>
        <small class="form-text text-muted">Enter Role Name or ID, also supports Variables</small>
        <hr>
        <div class="row">
            <div class="col">
                <label>If true Jump to Node</label>
                <input name="iftrue"></input>
            </div>
            <div class="col">
                <label>If false Jump to Node with Name</label>
               <input name="iffalse"></input>
            </div>
        </div>
    </div>
`;
    },

    init: function () {
        console.log("Loaded Check If Role is on Server");
    },

    mod: function (DBS, message, action, args, command, index) {

        // Note DBS stores all data from the HTML field into lowercase. messageText = messagetext
        var r = DBS.BetterMods.parseAction(action.roleid, message)
        const role = message.guild.roles.cache.find(gr => gr.id == r || gr.name == r);

        if (role) {
            DBS.callNextAction(command, message, args, command.actions.findIndex(node => node.name == action.iftrue));
        } else {
            DBS.callNextAction(command, message, args, command.actions.findIndex(node => node.name == action.iffalse));
        }
    }
};
