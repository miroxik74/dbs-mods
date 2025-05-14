module.exports = {
    name: "Random User With Role",
    author: ["NickG#9306"],
    version: "1.0.0",
    changelog: "Created Random User With Role",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "User Action",
    html: function (data) {
        return `
            <div class="form-group">
            <label id="label">Role Name *</label>
            <div class="input-group mb-3">
                <input class="form-control required-field" name="roletofind"></input>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="roletofind">Insert Variable</a>
                </div>
            </div>
            </div>
            
            <hr>

            <div class="row">
            <div class="col">
              <label>Save Result in Variable with Name</label>
              <input class="form-control" id="varname" name="varname"><br>
            </div>
            <div class="col">
              <label>Variable Type</label>
              <select class="form-control" id="vartype" name="vartype">
                  <option value="temp" selected>Temp Variable</option>
                  <option value="server">Server Variable</option>
                  <option value="global">Global Variable</option>
              </select>
            </div>
            </div>

            <hr>

            <p>Random User With Role Mod ~ Version 1.0.0
      `;
    },
    init: function (DBS) {
        console.log("Loaded Random User With Role");
    },
    mod: async function (DBS, message, action, args, command, index) {
        await message.guild.members.fetch()
        const findRole = DBS.BetterMods.parseAction(action.roletofind, message)
        const randuser = message.guild.roles.cache.find(role => role.name === findRole).members.random();
        DBS.BetterMods.saveVar(action.vartype, action.varname, randuser, message.guild);
        DBS.callNextAction(command, message, args, index + 1);
    }
};