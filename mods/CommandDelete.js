module.exports = {
    name: "Command Delete",
    author: ["Snorlax"],
    version: "0.0.0",
    changelog: "(Command Delete) => CREATED",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",
    html: function (data) {
        return `
        <small>Currently <strong>Using Command Delete mod v1.0.1</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span> You need BetterMods v2.0.0!<br> <span style="color: orange; font-weight: bold;">Any issues?</span>Please DM Snorlax</label>
        <h3 style="text-align: center;"><strong><span style="color: #ffffff;"><span style="background-color: #000000;">PLACE THIS MOD AT THE BEGINNING OF YOUR COMMAND. AND PRESS SAVE</span></span></strong></h3>
        <p><strong><img style="display: block; margin-left: auto; margin-right: auto;" src="https://gblobscdn.gitbook.com/spaces%2F-M0L1z_JwGF9x5j-YBBE%2Favatar.png?alt=media" alt="Discord Bot Studio Documentation (1.3) - Discord Bot Studio" width="37" height="37" /></strong></p>`;
    },
    init: function () {
        console.log("(Command Delete) => LOADED");
    },
    mod: function(DBS, message, action, args, command, index) {
         message.delete()
         DBS.callNextAction(command, message, args, index + 1);
  }
}