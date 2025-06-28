//Required: BetterModsV2
module.exports = {
    name: "Save Message",
    author: ["Snorlaxmon#2007", 'Tested by Pokemonultra#2815'],
    version: "1.0.1",
    changelog: "",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",
    //<---------------------------------------------------------------------------------------------->//
    html: function (data) {
        return `
    <div class="form-group">
        <label>Channel ID:</label>
        <div class="input-group mb-3">
            <input class="form-control needed-field" name="channelid"></input>
            <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="channelid">Insert Variable</a>
            </div>
        </div>
        <small class="form-text text-muted" style="margin-top: -10px;">ID of the channel where the user is going to send the message</small>
    </div>  
    <div class="form-group">
        <label>User ID:</label>
        <div class="input-group mb-3">
            <input class="form-control needed-field" name="userid"></input>
            <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="userid">Insert Variable</a>
            </div>
        </div>
        <small class="form-text text-muted" style="margin-top: -10px;">ID of the user who is going to send the message</small>
    </div>
    <hr>
    <div class="form-group">
        <label>Save message </label>
        <select name="dropdown" required>
            <option value="content">content</option>
            <option value="id">id</option>
            <option value="type">type</option>
            <option value="url">url</option>
        </select>
        <label>in variable called:</label>
        <input class="form-control needed-field" name="variablename"></input>
        <small class="form-text text-muted">NAME of the variable where message content will be stored</small>
    </div>
    <div class="form-group">
        <label>Variable type:</label>
        <select name="variabletype" class="form-control">
            <option value="temp">Temporary Variable</option>
            <option value="server">Server Variable</option>
            <option value="global">Global Variable</option>
        </select>
    </div>
    `},
    //<---------------------------------------------------------------------------------------------->//
    init: function () {
        console.log('[MOD]' + "\x1b[32m" + ` ${this.name} was successfully loaded on v${this.version}` + "\x1b[36m");
    },
    //<---------------------------------------------------------------------------------------------->//
    mod: async function (DBS, message, action, args, command, index) {
        const channel = message.guild.channels.cache.find(channel => channel.id === DBS.BetterMods.parseAction(action.channelid, message));
        const user = message.guild.members.cache.find(user => user.id === DBS.BetterMods.parseAction(action.userid, message));
        const filter = (msg) => msg.author.id === user.id;
        let data;

        channel.messages.fetch({
            filter,
            max: 1
        })
            .then(msg => {
                switch (action.dropdown) {
                    case 'content':
                        data = msg.first().content
                        break;
                    case 'id':
                        data = msg.first().id
                        break;
                    case 'type':
                        data = msg.first().type
                        break;
                    case 'url':
                        data = msg.first().url
                        break;
                }
                DBS.BetterMods.saveVar(action.variabletype, action.variablename, data, message.guild);
                DBS.callNextAction(command, message, args, index + 1)
            })
            .catch(error => {
                DBS.logError({
                });
            });
    },
};