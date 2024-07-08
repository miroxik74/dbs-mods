module.exports = {
    name: "Capton Hook",
    author: ["KeksGauner#0624"],
    version: "1.0.0",
    changelog: "nothing",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",

    html: function(data) {
        return `
            <div class="form-group">
                <label>Webhook URL *</label>
            <div class="input-group mb-3">
                <textarea class="form-control needed-field" name="webhookurl" id="webhookurl"></textarea>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="webhookurl">Insert Variable</a>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>Webhook name *</label>
            <div class="input-group mb-3">
                <textarea class="form-control needed-field" name="webhookname" id="webhookname" value="Spidey Bot"></textarea>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="webhookname">Insert Variable</a>
                    </div>
                </div>
            </div>

            <div class="form">
                <label>Hex color</label>
                <input class="form-control jscolor" name="webhookcolor" id="webhookcolor" placeholder="#FFE900" value="#FFE900">
            </div>


            <div class="form">
                <label>Webhook Title *</label>
            <div class="input-group mb-3">
                <textarea class="form-control needed-field" name="webhooktitle" id="webhooktitle" value="Yay we did something right"></textarea>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="webhooktitle">Insert Variable</a>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>Description</label>
            <div class="input-group mb-3">
                <textarea rows="5" class="form-control field" name="webhookdescription" id="webhookdescription"></textarea>
                <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="webhookdescription">Insert Variable</a>
                </div>
            </div>
        </div>

                <div class="row">
                <div class="col">
                    <label>Variable Name</label>
                    <input class="form-control" name="storeresult" id="storeresult" value="myVar"></input><br>
                </div>
                    <div class="col">
                        <label>Variable Type</label>
                        <select name="vartype" class="form-control">
                            <option value="temp">Temp Variable</option>
                            <option value="server">Server Variable</option>
                            <option value="global">Global Variable</option>
                        </select><br>
                    </div>
                </div>

                <p>Having issues? Press <code>Alt + F4</code> and go to Bed<br>
                Create a Webhook; Example https://discord.com/api/webhooks/[ID]/[Token]
                </p>
        `;
    },

    init: async function(DBS) {
        console.log("Loaded Capton Hook");
        DBS.BetterMods.requireModule("webhook-discord");
    },

    mod: async function(DBS, message, action, args, command, index) {
        const { Client, Discord, MessageBuilder, MessageEmbed, GatewayIntentBits, WebhookClient } = require('discord.js');
        const client = DBS.Bot || new Discord.Client({ intents: [GatewayIntentBits.Guilds] });
            try {
                const webhookId = '1179832100057272380';
                const webhookToken = '6LOY0UQoPtwhCXUzdOGYATuk2ENzFxhFMXS2sN7K7QTBbwSFymRzK4-Xcba5iD9jXPi-';
                const webhookClient = new Discord.WebhookClient({ id: webhookId, token: webhookToken });
                
                const embed = new MessageEmbed()
                    .setTitle(DBS.BetterMods.parseAction(action.webhooktitle, message))
                    .setColor(DBS.BetterMods.parseAction(action.webhookcolor))
                    .setDescription(DBS.BetterMods.parseAction(action.webhookdescription, message));

                webhookClient.send({
                    content: '',
                    username: '',
                    avatarURL: '',
                    embeds: [embed],
                });

            } catch (e) {
                console.log(e);
            };
            DBS.callNextAction(command, message, args, index + 1);
        }
};