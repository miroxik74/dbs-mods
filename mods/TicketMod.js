module.exports = {
    name: "Ticket Mod",
    author: [".", "Miro#5410"],
    version: "0.1.1",
    changelog: "insert variable buttons",
    isResponse: true,
    isMod: true,
    isAddon: false,
    isEvent: false,
    section: "Channel Action",
    html: function (data) {
        return `
        <small>Currently <strong>Using Ticket Mod v0.1.0</small> 
        <div class="form-group">
        <label><span style="font-weight: bold">Note:</span>Any Issues?<br> <span style="color: orange; font-weight: bold;">Any issues?</span>Please Contact Miro#5410</label>
        </div>
        <hr>
            <h1>Embed Settings</h1>
            <div class="form-group">
                <label>Embed Colour</label>
                <input class="form-control jscolor" id="color" placeholder="#FFFFFF" name="embed__clr">
                <small class="form-text text-muted">Hex color for the embed</small>
            </div>
            <div class="form-group">
                <label>Title</label>
                <input name="embed__tit" class="form-control" placeholder="Title of the embed"></input>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="embed__tit">Insert Variable</a>
                </div>
            </div>
            <div class="form-group">
                <label>URL</label>
                <input name="embed__url" class="form-control" placeholder="Embed link"></input>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="embed__url">Insert Variable</a>
                </div>
            </div>
            <div class="form-group">
                <label>Author name</label>
                <input name="embed__an" class="form-control"></input>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="embed__an">Insert Variable</a>
                </div>
            </div>
            <div class="form-group">
                <label>Author image</label>
                <input name="embed__ai" class="form-control" placeholder="Url of author image"></input>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="embed__ai">Insert Variable</a>
                </div>
            </div>
            <div class="form-group">
                <label>Author link</label>
                <input name="embed__al" class="form-control" placeholder="Url to set on author"></input>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="embed__al">Insert Variable</a>
                </div>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea name="embed__des" class="form-control" rows="2"></textarea>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="embed__des">Insert Variable</a>
                </div>
            </div>
            <div class="form-group">
                <label>Thumbnail</label>
                <input name="embed__thumb" class="form-control" placeholder="Url of thumbnail image"></input>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="embed__thumb">Insert Variable</a>
                </div>
            </div>
            <div class="form-group">
                <label>Image</label>
                <input name="embed__img" class="form-control" placeholder="Main embed image url"></input>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="embed__img">Insert Variable</a>
                </div>
            </div>
            <div class="form-group">
                <label>Footer text</label>
                <input name="embed__footer" class="form-control"></input>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="embed__footer">Insert Variable</a>
                </div>
            </div>
            
            <div class="form-group">
                <label>Reaction Emoji (Unicode) *</label>
                <input name="embed__emoji" class="form-control needed-field"></input>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="embed__emoji">Insert Variable</a>
                </div>
            </div>
            <hr>
            <h1>Settings</h1>
            <div class="form-group">
                <label>Ticket channel name: *</label>
                <input name="namet" class="form-control needed-field"></input>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="namet">Insert Variable</a>
                </div>
            </div>
            <div class="form-group">
                <label>Catogory id:</label>
                <input name="catogory" class="form-control" placeholder="Leave the field blank to not have them created in any category"></input>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="category">Insert Variable</a>
                </div>
            </div>
            <div class="form-group">
                <label>Trusted roles:</label>
                <input name="roleids" class="form-control" placeholder="Should be ids & separate with space"></input>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="roleids">Insert Variable</a>
                </div>
            </div>
            <div class="form-group">
                <label>Delete ticket after time:</label>
                <input name="timedelete" class="form-control" placeholder="In seconds (Set to 0 to disabling it)"></input>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="timedelete">Insert Variable</a>
                </div>
            </div>
            <hr>
            <h1>Save variable</h1>
            <div class="form-group">
                <label>Save the <span style="background: blue; border-radius: 5px; padding: 3px; color: white; font-size: 14px">channel id</span> to variable with name:</label>
                <input name="var_name" class="form-control"></input>   
            </div>
            <div class="form-group">
                <label>Choose variable type:</label>
                <select class="form-control" name="selection">
                    <option value="temp">Temporary - per server, deleted when the bot stops running</option>
                    <option value="server">Server - per server, are saved to file and do not delete when bot stops</option>
                    <option value="global">Global - are saved to file like Server, but are accessible in all guilds</option>
                </select>
            </div>
        `;
    },

    init: async function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        try {
            require("discord.js");
        } catch {
            DBS.BetterMods.requireModule("discord.js");
        }
        console.log(">> Loaded Ticket mod"); 
    },

    mod: function (DBS, message, action, args, command, index) {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed().setColor(DBS.BetterMods.parseAction(action.embed__clr, message)).setTitle(DBS.BetterMods.parseAction(action.embed__tit, message)).setURL(DBS.BetterMods.parseAction(action.embed__url, message)).setAuthor(DBS.BetterMods.parseAction(action.embed__an, message), DBS.BetterMods.parseAction(action.embed__al, message), DBS.BetterMods.parseAction(action.embed__ai, message)).setDescription(DBS.BetterMods.parseAction(action.embed__des, message)).setThumbnail(DBS.BetterMods.parseAction(action.embed__thumb, message)).setImage(DBS.BetterMods.parseAction(action.embed__img, message)).setFooter(DBS.BetterMods.parseAction(action.embed__footer, message))
        message.channel.send(embed).then(msg => {
            msg.react(DBS.BetterMods.parseAction(action.embed__emoji, message))
            DBS.Bot.on('messageReactionAdd', (reaction, user) => {
                if (reaction.message.id === msg.id) {
                    if (!user.bot) {
                        const allroleid = DBS.BetterMods.parseAction(action.roleids, message).split(" ");
                        const ticketname = DBS.BetterMods.parseAction(action.namet, message)
                        message.guild.channels.create(ticketname.replace('(username)', user.username), {
                            type: 'text',
                            permissionOverwrites: [
                                {
                                    id: message.guild.roles.everyone,
                                    deny: ['VIEW_CHANNEL'],
                                },
                            ],
                        }).then(channel => {
                            if (!action.catogory === "") {
                                channel.setParent(DBS.BetterMods.parseAction(action.catogory, message))
                            }
                            for (i = 0; i < allroleid.length; i++) {
                                channel.updateOverwrite(allroleid[i], {
                                    SEND_MESSAGES: true,
                                    VIEW_CHANNEL: true
                                })
                            }
                            channel.updateOverwrite(user.id, {
                                SEND_MESSAGES: true,
                                VIEW_CHANNEL: true
                            })
                            DBS.BetterMods.saveVar(action.selection, action.var_name, channel.id, message.guild)
                            reaction.message.reactions.cache.get(DBS.BetterMods.parseAction(action.embed__emoji, message)).users.remove(user);
                            DBS.callNextAction(command, message, args, index + 1);

                            setTimeout(() => {
                                channel.delete()
                            }, DBS.BetterMods.parseAction(action.timedelete, message) * 1000)
                        })
                    }
                }
            })
        })
    }
};