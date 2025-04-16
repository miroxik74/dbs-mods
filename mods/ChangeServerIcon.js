module.exports = {
    name: "ChangeServerIcon",
    author: ["aoe#9022", "@miroxik74"],
    version: "1.0.1",
    changelog: "Added variables and fixed getting icon url",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Server Action",
    html: function (data) {
        return `
        </div>
            </div>
                <div class="col">
                <label>Link of the new Server Profile(works with gifs too)</label>
                    <div class="input-group mb-3">
                        <input class="form-control needed-field" name="icon"></input><br>
                        <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="icon">Insert Variable</a>
                </div>
            </div>
            <p class="text-muted">Note:<br>Some images just won't work due to size or format so just use another url</p>
        </div>
        `;
    },
    init: async function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        console.log("Loaded ChangeServerIcon");
    },
    mod: async function (DBS, message, action, args, command, index) {

        try {
            const icon = DBS.BetterMods.parseAction(action.icon, message);
            await message.guild.setIcon(icon);
        } catch (error) {
            await message.reply(`${error}`);
            console.log(error);
        }

        DBS.callNextAction(command, message, args, index + 1);
    }
};