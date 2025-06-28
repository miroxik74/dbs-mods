// Requires BetterMods aka. "AAA_BetterMods.js"
module.exports = {
  name: "Grab Count of Messages",
  author: ["."],
  version: "1.0.0",
  changelog: "None",
  isEvent: false,
  isResponse: true,
  isMod: true,
  isAddon: false,
  section: "Message",

  html: function (data) {
    return `
        <div class="form-group">
            <label>Channel *</label>
            <div class="input-group mb-3">
                <input type="text" class="form-control needed-field" name="channel" />
                <div class="input-group-append">
                    <a
                    class="btn btn-outline-primary"
                    role="button"
                    id="variables"
                    forinput="channel"
                    >Insert Variable</a
                    >
                </div>
            </div>
            <small class="text-muted">Enter channel id.</small>
        </div>
        <div class="form-group">
            <label>Count of grabbed messages *</label>
            <div class="input-group mb-3">
                <input type="text" class="form-control needed-field" name="limit" />
                <div class="input-group-append">
                    <a
                    class="btn btn-outline-primary"
                    role="button"
                    id="variables"
                    forinput="limit"
                    >Insert Variable</a
                    >
                </div>
            </div>
            <small class="text-muted">Enter channel id.</small>
        </div>
        <div class="form-group">
          <div class="row">
              <div class="col">
                  <label>Variable Type *</label>
                  <select name="varType" class="form-control">
                      <option value="temp">Temp Variable</option>
                      <option value="server">Server Variable</option>
                      <option value="global">Global Variable</option>
                  </select><br>
              </div>
              <div class="col">
                  <label>Variable Name *</label>
                  <input class="form-control" name="varName"></input><br>
              </div>
          </div>
      </div>
            `;
  },

  init: function (DBS) {
    if (!DBS.BetterMods) return console.log(`BetterMods isn't loaded.`);
    console.log("Loaded Grab Count of Messages");
  },

  mod: async function (DBS, message, action, args, command, index) {
    if (!DBS.BetterMods) return console.log(`BetterMods isn't loaded.`);
    var list = [];
    const messages = await message.channel.guild.channels.cache
      .get(DBS.BetterMods.parseAction(action.channel, message))
      .messages.fetch({
        limit: DBS.BetterMods.parseAction(action.limit, message),
      });
    console.log(messages);
    for (let [key, value] of messages) {
      list.push(`${value.author.username}: ${value}`);
    }
    DBS.BetterMods.saveVar(action.vartype, action.varname, list, message.guild);
    DBS.callNextAction(command, message, args, index + 1);
  },
};
