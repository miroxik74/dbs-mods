module.exports = {
    name: "Command Message Delete",
      author: ["Snorlax"],
      version: "1.0.0",
      changelog: "CommandMessageDelete",
      isEvent: false,
      isResponse: true,
      isMod: true,
      isAddon: false,
      section: "Message",
    html: function (data) {
        return `
        <small>Currently <strong>Using Command Message Delete mod v1.0.0</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span> You need BetterMods v2.0.0!<br> <span style="color: orange; font-weight: bold;">Any issues?</span>Please DM Snorlax</label>
        <div class="form-group cc_cursor">THIS MOD DELETES THE COMMAND MESSAGE</div>`;
    },
      init: function () {
        console.log("CommandMessageDelete");
    },
      mod: function(DBS, message, action, args, command, index) {
         message.delete()
         DBS.callNextAction(command, message, args, index + 1);
  }
}