module.exports = {
    name: "Webhook",
    author: ["KeksGauner#0624 (original maker", "koki1019#0005 {modifier}"],
    version: "2.0.1",
    changelog: "Added Footer, Image, Thumbnail, Author, Avatar of the webhook",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",

    html: function (data) {
        return `
            <div class="form-group">
                <div class="row">
                    <div class="col">
                        <label>Webhook Username</label>
                        <input class="form-control" name="webhookusername" value="Spidey Bot"></input><br>
                    </div>
                    <div class="col">
                        <label>Webhook Avatar(Profile Picture)</label>
                        <input class="form-control" name="avatar" value="https://gblobscdn.gitbook.com/spaces%2F-M0L1z_JwGF9x5j-YBBE%2Favatar.png?alt=media"></input><br>
                    </div>
                    <div class="col">
                        <label>Webhook URL</label>
                        <input class="form-control" name="webhookurl" value="https://discord.com/api/webhooks/[ID]/[Thoken]"></input><br>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <label>Webhook Title *</label>
                        <input class="form-control" name="webhooktitle" value="Yay we did something right"></input><br>
                    </div>
                    <div class="col">
                        <label>Webhook Color *</label>
                        <input class="form-control" name="webhookusercolor" value="#17d12a"></input><br>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <label>Description</label>
                        <input class="form-control" name="desc" value="Yay we did something right"></input><br>
                    </div>
                    <div class="col">
                        <label>Thumbnail</label>
                        <input class="form-control" name="thumb" value="Image Link"></input><br>
                    </div>
                    <div class="col">
                        <label>Image</label>
                        <input class="form-control" name="image" value="Image Link"></input><br>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label>Footer Text</label>
                        <input class="form-control" name="footertxt" value="Yay footer textx!"></input><br>
                    </div>
                    <div class="col">
                        <label>Footer Image</label>
                        <input class="form-control" name="footerimage" value="Image Link"></input><br>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label>Author Text</label>
                        <input class="form-control" name="authortxt" value="Yay Author textx!"></input><br>
                    </div>
                    <div class="col">
                        <label>Author Image</label>
                        <input class="form-control" name="authorimage" value="Image Link"></input><br>
                    </div>
                </div>

                <div class="row">
                <div class="col">
                    <label>Variable Type *</label>
                    <select name="vartype" class="form-control">
                        <option value="temp">Temp Variable</option>
                        <option value="server">Server Variable</option>
                        <option value="global">Global Variable</option>
                    </select><br>
                </div>

                <div class="col">
                    <label>Variable Name *</label>
                    <input class="form-control" name="storeresult" value="myVar"></input><br>
                </div>
            </div>

                <p>Having issues? Press <code>Alt + F4</code> and go to Bed<br>
                Create a Webhook; Example https://discord.com/api/webhooks/[ID]/[Thoken]
                </p>
            </div>
        `;
    },

    init: async function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        try {
            require("webhook-discord");
        } catch {
            DBS.BetterMods.requireModule("webhook-discord");
        }
        console.log("Loaded Capton Hook");
    },

    mod: async function (DBS, message, action, args, command, index) {
        const webhook = require("webhook-discord");

        const result = DBS.BetterMods.getVar(action.vartype, action.storeresult, message.guild);

        try {
            const Hook = new webhook.Webhook(action.webhookurl);
            //Hook.success("WEBHOOK TEST","Yay we did something right");


            const msg = new webhook.MessageBuilder()
                .setAvatar(action.avatar)
                .setName(action.webhookusername)
                .setColor(action.webhookusercolor)
                .setTitle(action.webhooktitle)
                .setFooter(action.footertxt, action.footerimage)
                .setImage(action.image)
                .setThumbnail(action.thumb)
                .setAuthor(action.authortxt, action.authorimg)
                .setDescription(action.desc);
            Hook.send(msg);

        } catch (e) {
            console.log('Error trying to send: ', e);
        };

        DBS.callNextAction(command, message, args, index + 1);
    }
};