module.exports = {
    name: "Eval",
    author: ["@miroxik74"],
    version: "1.0.0",
    changelog: "Allowed only for bot owner/team, adjusted copy of Code Block mod",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",

    html: function (data) {
        return `
            <div class="col">
                <label>Enter custom code or use variable</label>
                <textarea class="form-control needed-field" name="code" rows="10"></textarea><br>
                    <div class="input-group mb-3">
                        <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="code">Insert Variable</a>
                        </div>
                    </div>
            </div>
            <p>Need help?<br><a href="https://discord.js.org/#/docs/main/main/general/welcome" target="_blank">Click me to open Discord.js Docs</a></p>
        `;
    },

    init: function (DBS) {
        console.log("Loaded Eval");
    },

    mod: async function (DBS, message, action, args, command, index) {
        const member_id = message.member.id;
        const bot_data = await message.client.application.fetch();
        const member_is_team = bot_data?.owner?.members?.map(member => member.user.id)?.includes(member_id);
        const member_is_owner = member_id === bot_data?.owner?.id;
        const dev_confirmation = member_is_team ? member_is_team : member_is_owner || null;

        if (dev_confirmation) {
            const code = DBS.BetterMods.parseAction(action.code, message);
            try {
                let evaled = await eval(code);

                if (evaled !== undefined) {
                    if (typeof evaled !== 'string') {
                        evaled = require('util').inspect(evaled);
                    }
                }

                await message.reply({ content: `\`\`\`js\n${evaled}\`\`\``, allowedMentions: { repliedUser: false } });
            } catch (error) {
                return message.reply({ content: `\`\`\`xl\n${error}\`\`\``, allowedMentions: { repliedUser: false } });
            }
        } else {
            return;
        }
        DBS.callNextAction(command, message, args, index + 1);
    }
};