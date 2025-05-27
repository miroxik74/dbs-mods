module.exports = {
    name: "Voice Move",
    author: ["aoe#4851"],
    version: "1.0.0",
    changelog: "Added VoiceMove Mod",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Bot Action",
    html: function (data) {
        return `
        <small>Currently <strong>Using Voice Move v1.0.0</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span>Any Issues?<br> <span style="color: orange; font-weight: bold;">Any issues?</span>Please Contact aoe#4851</label>
        </div>
        <hr>
        <b>Moves a mentioned Member into the VC</b>
        <hr>
        <div class="form-group">
            <label>The Channel ID where the Member will be moved in *</label>
            <textarea class="form-control needed-field" name="channel" rows="1" ></textarea>
        </div>
        `;
    },
    init: function () {
        console.log("Loaded VoiceMove");
    },
    mod: function (DBS, message, action, args, command, index) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());
        member.voice.setChannel(action.channel);
        DBS.callNextAction(command, message, args, index + 1);

    }
};