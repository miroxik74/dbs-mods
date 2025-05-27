module.exports = {
    name: "If Statement",
    author: ["Discord Bot Studio"],
    version: "1.0.0",
    changelog: "Created Play YouTube Video ~ your a nerd",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Variable",

    html: function (data) {
        return `
            <div class="form-group">
                <div class="row">
                    <div class="col">
                        <label>Variable 1 *</label>
                        <input class="form-control" name="variableOne" value="\${tempVars.var1}"></input><br>
                    </div>

                    <div class="col">
                        <label>Statement *</label>
                        <select name="statement" class="form-control">
                            <option value="==">==</option>
                            <option value="!=">!=</option>
                        </select><br>
                    </div>

                    <div class="col">
                        <label>Variable 2 *</label>
                        <input class="form-control" name="variableTwo" value="\${tempVars.var2}"></input><br>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <label>If True Jump To Node *</label>
                        <input class="form-control" name="ifTrueNodeID"></input><br>
                    </div>

                    <div class="col">
                        <label>If False Jump To Node *</label>
                        <input class="form-control" name="ifFalseNodeID"></input><br>
                    </div>
                </div>
            </div>
        `;
    },

    init: function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        console.log("Loaded If Statement");
    },

    mod: async function (DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        const var1 = DBS.BetterMods.parseAction(action.variableone, message);
        const var2 = DBS.BetterMods.parseAction(action.variabletwo, message);

        switch (action.statement) {
            case "==":
                if (var1 == var2) return DBS.callNextAction(command, message, args, action.iftruenodeid);
                DBS.callNextAction(command, message, args, parseInt(action.iffalsenodeid));
                break
            case "!=":
                if (var1 != var2) return DBS.callNextAction(command, message, args, action.iftruenodeid);
                DBS.callNextAction(command, message, args, parseInt(action.iffalsenodeid));
                break
        }
    }
};