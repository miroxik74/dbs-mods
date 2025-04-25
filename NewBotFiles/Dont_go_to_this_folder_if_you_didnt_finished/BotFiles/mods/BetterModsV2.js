module.exports = {
    name: "Better Mods V2",
    author: ["Discord Bot Studio", "STR1KE#6969", "@miroxik74"],
    version: "1.0.1",
    changelog: "Added retry when installing module failed.",
    isEvent: false,
    isResponse: false,
    isMod: false,
    isAddon: false,
    section: "",

    html: function (data) {
        return `
        `;
    },

    init: function (DBS) {
        const { join } = require("path")
        const { execSync } = require("child_process")

        DBS.BetterMods = {};
        DBS.BetterMods.Logger = {
            error: (msg) => console.log('\x1b[31m' + msg, '\x1b[0m'),
            success: (msg) => console.log('\x1b[32m' + msg, '\x1b[0m'),
            warn: (msg) => console.log('\x1b[33m' + msg, '\x1b[0m')
        };

        DBS.BetterMods.requireModule = async function (packageName) {
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
                            process.send(`Could not install <b>${packageName}</b> module`);
                            DBS.BetterMods.Logger.warn(`[DBS Module Installer] - We ran into an error installing ${packageName}.`);
                            return null;
                        }
                    }
                }
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

        DBS.BetterMods.parseAction = function (string, msg) {
            let dbsVars = {}
            dbsVars["CommandAuthor"] = msg.member
            dbsVars["CommandChannel"] = msg.channel
            dbsVars["guild"] = msg.guild
            let tempVars = DBS.Cache[msg.guild.id].variables
            let serverVars = DBS.serverVars[msg.guild.id]
            let globalVars = DBS.globalVars[msg.guild.id]
            let vars = {
                tempVars: tempVars,
                serverVars: serverVars,
                globalVars: globalVars,
                dbsVars: dbsVars,
            }
            let varRegex = /\${(.*?)}/g;
            let newVal = string;
            for (let i = 0; i < string.match(varRegex)?.length; i++) {
                newVal = newVal.replace(string.match(varRegex)[i], getDescendantProp(vars, string.match(varRegex)[i].split("${").join("").split("}").join("")))
            }
            return newVal
        }

        DBS.BetterMods.saveVar = function (type, varName, data, guild) {
            switch (type) {
                case "temp":
                    DBS.Cache[guild.id].variables[varName] = data;
                    break
                case "server":
                    DBS.serverVars[guild.id][varName] = data;
                    break
                case "global":
                    DBS.globalVars[guild.id][varName] = data;
                    break
            }
        }

        DBS.BetterMods.getVar = function (type, varName, guild) {
            switch (type) {
                case "temp":
                    return DBS.Cache[guild.id].variables[varName];
                case "server":
                    return DBS.serverVars[guild.id][varName];
                case "global":
                    return DBS.globalVars[guild.id][varName];
            }
        }
        function getDescendantProp(obj, desc) {
            var arr = desc.split(".");
            while (arr.length) {
                obj = obj[arr.shift()];
            }
            return obj;
        }
    },

    mod: async function (DBS, message, action, args, command, index) { }
};