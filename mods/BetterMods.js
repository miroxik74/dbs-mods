module.exports = {
    name: "Better Mods",
    author: ["Discord Bot Studio", "@miroxik74"],
    version: "1.0.2",
    changelog: "Added retry when installing module failed.",
    isEvent: false,
    isResponse: false,
    isMod: false,
    isAddon: false,
    section: "",

    html: function(data) {
        return ``;
    },

    init: function(DBS) {
        const { join } = require("path")
        const { execSync } = require("child_process")

        DBS.BetterMods = {};
        DBS.BetterMods.Logger = {
            error: (msg) => console.log('\x1b[31m' + msg, '\x1b[0m'),
            success: (msg) => console.log('\x1b[32m' + msg, '\x1b[0m'),
            warn: (msg) => console.log('\x1b[33m' + msg, '\x1b[0m')
        };

        DBS.BetterMods.requireModule = async function(packageName) {
            try {
                const modulePath = join(__dirname, "../node_modules", packageName);
                return require(modulePath);
            } catch (e) {
                DBS.BetterMods.Logger.warn(`[DBS Module Installer] - Installing ${packageName}`);

                try {
                    const cliCommand = 'npm install ' + packageName + ' --save';
                    const f = await execSync(cliCommand, {
                        cwd: join(__dirname),
                        stdio: [0, 1, 2]
                    });
    
                    DBS.BetterMods.Logger.warn(`[DBS Module Installer] - Successfully Installed ${packageName}. Note you may need to restart your bot.`);
                    const modulePath = join(__dirname, "../node_modules", packageName);
                    return require(modulePath);
                } catch (error) {
                    try {
                        await installPackage(packageName);
                        const modulePath = join(__dirname, "../node_modules", packageName);
                        return require(modulePath);
                    } catch (err) {
                        if (err) {
                            console.error(err);
                            DBS.BetterMods.Logger.warn(`[DBS Module Installer] - We ran into an error installing ${packageName}.`);
                            return null;
                        }
                    }
                };
            };
        };

        async function installPackage(packageName) {
            return new Promise((resolve, reject) => {
                execSync(`npm install ${packageName}`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error installing ${packageName}: ${error}`);
                        reject(error);
                    } else {
                        console.log(`${packageName} installed successfully.`);
                        resolve();
                    }
                });
            });
        };

        DBS.BetterMods.parseAction = function(string, msg) {
            let newVal = string;

            if (msg) {
                newVal = newVal.replace("$$CommandChannel$$", msg.channel.name)
                .replace("$$CommandAuthor$$", msg.author.id)
                .replace("$$AuthorDisplayName$$", msg.member.displayName)
                .replace("$$AuthorAvatar$$", msg.author.avatarURL)
                // .replace("$$DefaultChannel$$", Functions.getDefaultChannel(msg.guild))
                .replace("$$ServerIcon$$", msg.guild.iconURL)
                .replace("$$MemberCount$$", msg.guild.memberCount.toString())
                .replace("$$JoinedAt$$", msg.guild.joinedAt.toString())
                .replace("$$ServerName$$", msg.guild.name)
                // .replace("$$ServerOwner$$", msg.guild.owner.id)
                .replace("$$ServerRegion$$", msg.guild.region)
                .replace("${dbsVars.CommandAuthor.user.dmChannel}", "@@MSG_AUTHOR@@")
                .replace("$$VerificationLevel$$", msg.guild.verificationLevel.toString())
                .replace("${dbsVars.CommandAuthor.user.avatarURL}", msg.member.user.displayAvatarURL());
            };

            newVal = newVal.replace(/\${(.*?)}/g, (d) => {
                const match = d.slice(2, d.toString().length - 1);
                if (match.includes("tempVars.")) return DBS.Cache[msg.guild.id].variables[match.split(".")[1]];
                if (match.includes("serverVars.")) return DBS.serverVars[msg.guild.id][match.split(".")[1]];
                if (match.includes("globalVars.")) return DBS.globalVars[msg.guild.id][match.split(".")[1]];
            });

            return newVal;
        };

        DBS.BetterMods.saveVar = function(type, varName, data, guild) {
            switch(type) {
                case "temp":
                    DBS.Cache[guild.id].variables[varName] = data;
                break;
                case "server":
                    DBS.serverVars[guild.id][varName] = data;
                break;
                case "global":
                    DBS.globalVars[guild.id][varName] = data;
                break;
            };
        };

        DBS.BetterMods.getVar = function(type, varName, guild) {
            switch(type) {
                case "temp":
                    return DBS.Cache[guild.id].variables[varName];
                case "server":
                    return DBS.serverVars[guild.id][varName];
                case "global":
                    return DBS.globalVars[guild.id][varName];
            };
        };
    },

    mod: async function(DBS, message, action, args, command, index) {}
};