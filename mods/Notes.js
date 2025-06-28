module.exports = {
    name: "Notes",
    author: ["Hectoliters#0001"],
    version: "0.1.0",
    changelog: "Just notes lol",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Spreadsheet",

    html: function (data) {
        return `<div class="form-group">
                    <label>Note *</label>
                    <input class="form-control needed-field" name="note" />
                </div>`;
    },

    init: function () {
        console.log("Notes Loaded");
    },

    mod: async function (DBS, message, action, args, command, index) {
        console.log(action.note)
        DBS.callNextAction(command, message, args, index + 1);
    }
};
