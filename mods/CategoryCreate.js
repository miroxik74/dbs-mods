module.exports = {
  name: "CategoryCreate",
  author: ["aoe#4851", "NickG#9306"],
  version: "1.0.0",
  changelog: "Renamed to Category Create to avoid conflicts ~ NickG#9306",
  isEvent: false,
  isResponse: true,
  isMod: true,
  isAddon: false,
  section: "Channel Action",
  html: function (data) {
    return `
      <div class="form-group">
        <label id="label">The Category Name *</label>
        <div class="input-group mb-3">
          <input class="form-control needed-field" name="catname"></input>
          <div class="input-group-append">
            <a class="btn btn-outline-primary" role="button" id="variables" forinput="catname">Insert Variable</a>
          </div>
        </div>
      </div>
        `;
  },
  init: function () {
    console.log("Loaded Category Create");
  },
  mod: function (DBS, message, action, args, command, index) {
    var catname = DBS.BetterMods.parseAction(action.catname, message)
    message.guild.channels.create(catname, { type: 'GUILD_CATEGORY' });
    DBS.callNextAction(command, message, args, index + 1);
  }
};