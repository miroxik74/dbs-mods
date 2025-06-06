module.exports = {
    name: "Check Channel Name",
    author: ["NickG#9306"],
    version: "1.0.0",
    changelog: "Added Check Channel",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Channel Action",
    html: function(data) {
        return `
          <div class="form-group">
          <label>Name of Channel To Check *</label>
          <div class="input-group mb-3">
            <input class="form-control needed-field" name="channame"></input><br>
              <div class="input-group-append">
                  <a class="btn btn-outline-primary" role="button" id="variables" forinput="channame">Insert Variable</a>
              </div>
          </div>

          <div class="form-group">
          <label>Message to send if Channel ALREADY Exists *</label>
          <div class="input-group mb-3">
            <textarea rows="2" class="form-control needed-field" name="chanexists"></textarea><br>
              <div class="input-group-append">
                  <a class="btn btn-outline-primary" role="button" id="variables" fortextarea="chanexists">Insert Variable</a>
              </div>
          </div>
      `;
    },
    init: function() {
        console.log("Loaded Check Channel Name Mod");
    },
    mod: async function(DBS, message, action, args, command, index) {
    const channelName = DBS.BetterMods.parseAction(action.channame, message)
    const channelExists = DBS.BetterMods.parseAction(action.chanexists, message)

    const exists = message.guild.channels.cache.find(channel => channel.name === channelName);

    if (exists)
      return message.channel.send(channelExists);
    else DBS.callNextAction(command, message, args, index + 1);
  }
};