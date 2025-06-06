module.exports = {
    name: "Command Cooldown",
    author: ["Vannzilla", "STR1KE#6969", "Subcher", "@miroxik74"],
    version: "2.1.2",
    changelog: "After using a command on one server by the user, the cooldown does not affect the other server if the command was not used by the same user",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Control",

    html: function (data) {
        return `<h5>Must be placed at the beginning of a command</h5>
                </br>
                    <div class="form-group">
                        <label>Seconds *</label>
                        <input class="form-control needed-field" name="seconds" />
                    </div> 
                    <div class="form-group">
                        <label>Type of remaining Time</label>
                        <select name="remainingtype" class="form-control">
                            <option value="onlyseconds" selected>Only Seconds</option>
                            <option value="hoursminutesandseconds">Hours, Minutes and Seconds</option>
                            <option value="hoursandminutes">Hours and Minutes</option>
                            <option value="onlyhours">Only Hours</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Cooldown message (use $$TimeLeft$$ to insert the remaining time in seconds) *</label>
                        <textarea rows="3" class="form-control needed-field" name="cooldownmessage" ></textarea>
                    </div>
                    <div class="form-group">
                        <label>Cooldown ended message channel</label>
                        <select name="endchannel" class="form-control">
                            <option value="messagechannel" selected>Message Channel</option>
                            <option value="dmchannel">DM Channel</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Cooldown ended message</label>
                        <textarea rows="3" class="form-control field" name="endmessage" ></textarea>
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
        const { Collection } = require('discord.js');
        DBS.Bot.cooldowns = new Collection();
        console.log("Loaded Command Cooldown Mod");
    },

    mod: async function (DBS, message, action, args, command, index) {
        const { Collection } = require('discord.js');
        const { cooldowns } = DBS.Bot;

        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Collection());
        }
        
        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (action.seconds) * 1000;
        const user = message.author.id | message.guild.id;
        
        if (timestamps.has(user)) {
            const expirationTime = timestamps.get(user) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                const cooldownMessage = action.cooldownmessage;
                    var hours = Math.floor(timeLeft / (60 * 60));
                
                    var divisor_for_minutes = timeLeft % (60 * 60);
                    var minutes = Math.floor(divisor_for_minutes / 60);
                 
                    var divisor_for_seconds = divisor_for_minutes % 60;
                    var seconds = Math.ceil(divisor_for_seconds);
                
                    if (action.remainingtype === "onlyhours") {
                        var TimeRemaining = hours + 'h';
                    } else if (action.remainingtype === "hoursandminutes") {
                        var TimeRemaining = hours + 'h ' + minutes + 'm';
                    } else if (action.remainingtype === "hoursminutesandseconds") {
                        var TimeRemaining = hours + 'h ' + minutes + 'm ' + seconds + 's';
                    } else if (action.remainingtype === "onlyseconds") {
                        var TimeRemaining = seconds + 's';
                    }
                    return message.reply(cooldownMessage.replace("$$TimeLeft$$", TimeRemaining));
            }
        } else {
            timestamps.set(user, now);

            function cooldownEnd() {
                timestamps.delete(user)
                if (action.endmessage) {
                    if (action.endchannel === "messagechannel") {
                        message.reply(action.endmessage);
                    } else if (action.endchannel === "dmchannel") {
                        message.author.send(action.endmessage);
                    }
                }
            }
            setTimeout(() => cooldownEnd(), cooldownAmount);
        }

        try {
            DBS.callNextAction(command, message, args, index + 1);
        } catch (error) {
            console.error(error);
        }

    }
};
