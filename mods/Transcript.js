module.exports = {
    name: "Transcript",
    author: ["PlayboyPrime#3839"],
    version: "1.0.2",
    changelog: "Added Dm and file name option",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Channel Action",
    html: function (data) {
        return `
        <div class="form-group">
            <label>Channel ID for transcript *</label>
            <div class="input-group mb-3">
                <textarea class="form-control needed-field" name="chid" id="chid" rows="1" ></textarea>
                <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="chid">Insert Variable</a>
                </div>
            </div>
            <hr>
            <label>Channel ID or User ID to send transcript to *</label>
            <div class="input-group mb-3">
                <textarea class="form-control needed-field" name="chid2" id="chid2" rows="1" ></textarea>
                <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="chid2">Insert Variable</a>
                </div>
            </div>
            <hr>
            <label>Transcript file name *</label>
            <div class="input-group mb-3">
                <textarea class="form-control needed-field" name="tfn" id="tfn" rows="1" ></textarea>
                <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="tfn">Insert Variable</a>
                </div>
            </div>
        </div>
        `;
    },
    init: async function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        try {
            require('discord-html-transcripts');
        } catch {
            DBS.BetterMods.requireModule("discord-html-transcripts");
        }
        console.log("Loaded Transcript");
    },
    mod: async function (DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        const transcript = require('discord-html-transcripts');
        const ch = message.channel;

        try {
            const attachment = await transcript.createTranscript(ch, {
                limit: -1,
                returnType: 'attachment',
                fileName: DBS.BetterMods.parseAction(action.tfn, message) + ".html",
                saveImages: true,
                returnBuffer: false,
                poweredBy: false,
                ssr: true
            });
            let ch2 =
                message.guild.channels.cache.get(DBS.BetterMods.parseAction(action.chid2, message)) || message.guild.members.cache.get(DBS.BetterMods.parseAction(action.chid2, message)) || message.channel
            ch2.send({ files: [attachment] })
        } catch (error) {
            DBS.logError({
                level: "error",
                message: "[Transcript] Error: " + error
            });
        }

        DBS.callNextAction(command, message, args, index + 1);
    }
};
