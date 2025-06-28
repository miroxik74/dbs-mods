module.exports = {
    name: "Better Ping",
    author: ["mrballou#9055"],
    version: "0.1.1",
    changelog: "",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",
    html: function (data) {
        return `
        <small>Currently <strong>Using Better Ping Mod v0.1.1</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span>Facing any issues?</span>Please DM mrballou#9055</label>
        <div class="form-group">
            <label>Calculating message</label>
            <textarea rows="1" class="form-control needed-field" id="a1" name="a1"></textarea>
        </div>
        <div class="form-group">
            <label>Done Calculating message</label>
            <textarea rows="1" class="form-control" id="a2" name="a2"></textarea>
        </div>
        <div class="form-group">
            <label>Embed title</label>
            <textarea rows="1" class="form-control" id="title" name="title"></textarea>
        </div>

        <div class="form-group">
            <label>Color</label>
            <input class="form-control jscolor" id="color" placeholder="#FFFFFF" name="color">
            <small class="form-text text-muted">Hex color</small>
        </div>
        <div class="form-group">
            <label>Data. use $$ping$$ for bots latency and $$dcping$$ for discords latency</label>
            <textarea rows="5" class="form-control needed-field" id="description" name="description"></textarea>
        </div>
      `;
    },
    init: function () {
        console.log("Loaded Better Ping");
    },
    mod: function (DBS, message, action, args, command, index) {
        const client = DBS? DBS.Bot : DBS;
        var ping
        var dcping = client.ws.ping
        message.channel.send(action.a1).then(mes => {
            ping = Date.now() - mes.createdTimestamp
            var Embed = new DBS.Discord.MessageEmbed()
                .setColor(action.color)
                .setDescription(action.description.replace('$$ping$$', ping).replace('$$dcping$$', dcping))
            if (typeof action.title !== 'undefined') {
                Embed.setTitle(action.title)
            }
            mes.edit(Embed)
            mes.edit(action.a2)
        })
        DBS.callNextAction(command, message, args, index + 1);
    }
};