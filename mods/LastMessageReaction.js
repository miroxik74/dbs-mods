module.exports = {
    name: "LastMessageReaction",
    author: ["Arata Matheus#9423"],
    version: "1.0.0",
    changelog: "Created React with Emoji",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Reaction",
    html: function (data) {
        return `
            <div class="form-group">
                <label>Emoji *</label>
                <input class="form-control needed-field" name="emoji" placeholder="Example: 😄 or :smile:" required>
            </div>
        `;
    },
    init: function () {
        console.log("Loaded React with Emoji");
    },
    mod: async function (DBS, message, action, args, command, index) {
        const emoji = action.emoji;

        try {
            await message.react(emoji);
        } catch (error) {
            console.error(`Failed to react with emoji: ${emoji}`);
        }

        DBS.callNextAction(command, message, args, index + 1);
    },
};
