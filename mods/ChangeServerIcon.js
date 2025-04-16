module.exports = {
    name: "Change Server Icon",
    author: ["aoe#9022", "@miroxik74"],
    version: "1.0.1",
    changelog: "Added variables, checkboxes and fixed getting icon url",
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
            <p class="text-muted">Note:<br>Some images won't work due to size or format so just use another url</p>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" name="confirmation">
                <label class="form-check-label">Click for confirmation!</label>
            </div>
            <br>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" name="error">
                <label class="form-check-label">Click for error message!</label>
            </div>
        </div>
        `;
    },
    init: async function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        console.log("Loaded ChangeServerIcon");
    },
    mod: async function (DBS, message, action, args, command, index) {

        const icon = DBS.BetterMods.parseAction(action.icon, message);
        try {
            await message.guild.setIcon(icon);
            if (action.confirmation !== "false") {
                await message.reply({ content: `New icon has been successfully set!` });
            }
        } catch (error) {
            console.log(error);
            if (action.error !== "false") {
                await message.reply(`${error}`);
            }
        }

        DBS.callNextAction(command, message, args, index + 1);
    }
};