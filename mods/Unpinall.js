module.exports = {
    name: "Unpin All",
    author: ["Miro#6969"],
    version: "1.0.0",
    changelog: "None",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Channel Action",
    html: function (data) {
        return `
            <p>Click save for me to work!</p>
            <p3><strong>NOTE:</strong>This mod unpins everything within an channel!</p3>
        `;
    },
    init: function (DBS) {
        console.log("Loaded Unpin all");
    },
    mod: async function (DBS, message, action, args, command, index) {
        message.channel.messages
            .fetchPinned()
            .then((pinnedMessages) => {
                pinnedMessages.each((msg) => msg.unpin());
            })
        DBS.callNextAction(command, message, args, index + 1);
    }
};