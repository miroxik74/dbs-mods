//Required: BetterModsV2 | AAA_BetterMods\\
module.exports = {
    name: "sRoulette",
    author: ["Snorlaxmon#7278"],
    version: "1.0.0",
    changelog: "",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Bot Action",
    //<---------------------------------------------------------------------------------------------->\\
    html: function (data) {
        return `
    <div class="form-group">
        <label>Amount:</label>
        <div class="input-group mb-3">
            <input class="form-control needed-field" name="amount"></input>
            <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="amount">Insert Variable</a>
            </div>
        </div>
        <small class="form-text text-muted" style="margin-top: -10px;">Amount of currency to bet</small>
    </div>
    <hr>
    <div class="form-group">
        <label>Space:</label>
        <div class="input-group mb-3">
            <input class="form-control needed-field" name="space"></input>
            <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="space">Insert Variable</a>
            </div>
        </div>
        <small class="form-text text-muted" style="margin-top: -10px;">Space to bet on. More information here:
            https://discord.com/channels/595001449696591873/1023257316943986828/1023258035780583424</small>
    </div>
    <hr>
    <div class="form-group">
        <label>Save amount in a variable called:</label>
        <input class="form-control needed-field" name="variablename"></input>
        <small class="form-text text-muted">NAME of the variable where the amount of currency the user won will be
            stored</small>
    </div>
    <div class="form-group">
        <label>Variable type:</label>
        <select name="variabletype" class="form-control">
            <option value="temp">Temporary Variable</option>
            <option value="server">Server Variable</option>
            <option value="global">Global Variable</option>
        </select>
    </div>
    <hr>
    <div class="form-group">
        <label>Save result of the bet in a variable called:</label>
        <input class="form-control needed-field" name="variablename2"></input>
        <small class="form-text text-muted">NAME of the variable where the result of the bet will be stored</small>
    </div>
    <div class="form-group">
        <label>Variable type:</label>
        <select name="variabletype2" class="form-control">
            <option value="temp">Temporary Variable</option>
            <option value="server">Server Variable</option>
            <option value="global">Global Variable</option>
        </select>
    </div>
    <hr>
    <div class="form-group">
        <label>Save status of the bet in a variable called:</label>
        <input class="form-control needed-field" name="variablename3"></input>
        <small class="form-text text-muted">NAME of the variable where the status of the bet will be stored: [Win /
            Loose]</small>
    </div>
    <div class="form-group">
        <label>Variable type:</label>
        <select name="variabletype3" class="form-control">
            <option value="temp">Temporary Variable</option>
            <option value="server">Server Variable</option>
            <option value="global">Global Variable</option>
        </select>
    </div>
    `},
    //<---------------------------------------------------------------------------------------------->\\
    init: function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        console.log('[MOD]' + '\x1b[36m' + ' ' + `${this.name}` + '\x1b[0m' + '\x1b[32m' + ' ' + `was successfully loaded on ` + '\x1b[0m' + '\x1b[31m' + `v${this.version}` + '\x1b[0m');
    },
    //<---------------------------------------------------------------------------------------------->\\
    mod: async function (DBS, message, action, args, command, index) {
        //⚠️Note: This simple mod was made in two days as a temp-fix. Many things make the code inefficient⚠️\\
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        const numbers = {
            "0": {
                "dozen": "Empty",
                "column": "Empty",
                "halve": "Empty",
                "odd_even": "Even",
                "color": "Green"
            },
            "1": {
                "dozen": "1-12",
                "column": "1st",
                "halve": "1-18",
                "odd_even": "Odd",
                "color": "Red"
            },
            "2": {
                "dozen": "1-12",
                "column": "2nd",
                "halve": "1-18",
                "odd_even": "Even",
                "color": "Black"
            },
            "3": {
                "dozen": "1-12",
                "column": "3rd",
                "halve": "1-18",
                "odd_even": "Odd",
                "color": "Red"
            },
            "4": {
                "dozen": "1-12",
                "column": "1st",
                "halve": "1-18",
                "odd_even": "Even",
                "color": "Black"
            },
            "5": {
                "dozen": "1-12",
                "column": "2nd",
                "halve": "1-18",
                "odd_even": "Odd",
                "color": "Red"
            },
            "6": {
                "dozen": "1-12",
                "column": "3rd",
                "halve": "1-18",
                "odd_even": "Even",
                "color": "Black"
            },
            "7": {
                "dozen": "1-12",
                "column": "1-18",
                "halve": "1st",
                "odd_even": "Odd",
                "color": "Red"
            },
            "8": {
                "dozen": "1-12",
                "column": "2nd",
                "halve": "1-18",
                "odd_even": "Even",
                "color": "Black"
            },
            "9": {
                "dozen": "1-12",
                "column": "3rd",
                "halve": "1-18",
                "odd_even": "Odd",
                "color": "Red"
            },
            "10": {
                "dozen": "1-12",
                "column": "1st",
                "halve": "1-18",
                "odd_even": "Even",
                "color": "Black"
            },
            "11": {
                "dozen": "1-12",
                "column": "2nd",
                "halve": "1-18",
                "odd_even": "Odd",
                "color": "Black"
            },
            "12": {
                "dozen": "1-12",
                "column": "3rd",
                "halve": "1-18",
                "odd_even": "Even",
                "color": "Red"
            },
            "13": {
                "dozen": "13-24",
                "column": "1st",
                "halve": "1-18",
                "odd_even": "Odd",
                "color": "Black"
            },
            "14": {
                "dozen": "13-24",
                "column": "2nd",
                "halve": "1-18",
                "odd_even": "Even",
                "color": "Red"
            },
            "15": {
                "dozen": "13-24",
                "column": "3rd",
                "halve": "1-18",
                "odd_even": "Odd",
                "color": "Black"
            },
            "16": {
                "dozen": "13-24",
                "column": "1st",
                "halve": "1-18",
                "odd_even": "Even",
                "color": "Red"
            },
            "17": {
                "dozen": "13-24",
                "column": "2nd",
                "halve": "1-18",
                "odd_even": "Odd",
                "color": "Black"
            },
            "18": {
                "dozen": "13-24",
                "column": "3rd",
                "halve": "1-18",
                "odd_even": "Even",
                "color": "Red"
            },
            "19": {
                "dozen": "13-24",
                "column": "1st",
                "halve": "19-36",
                "odd_even": "Odd",
                "color": "Red"
            },
            "20": {
                "dozen": "13-24",
                "column": "2nd",
                "halve": "19-36",
                "odd_even": "Even",
                "color": "Black"
            },
            "21": {
                "dozen": "13-24",
                "column": "3rd",
                "halve": "19-36",
                "odd_even": "Odd",
                "color": "Red"
            },
            "22": {
                "dozen": "13-24",
                "column": "1st",
                "halve": "19-36",
                "odd_even": "Even",
                "color": "Black"
            },
            "23": {
                "dozen": "13-24",
                "column": "2nd",
                "halve": "19-36",
                "odd_even": "Odd",
                "color": "Red"
            },
            "24": {
                "dozen": "13-24",
                "column": "3rd",
                "halve": "19-36",
                "odd_even": "Even",
                "color": "Black"
            },
            "25": {
                "dozen": "25-36",
                "column": "1st",
                "halve": "19-36",
                "odd_even": "Odd",
                "color": "Red"
            },
            "26": {
                "dozen": "25-36",
                "column": "2nd",
                "halve": "19-36",
                "odd_even": "Even",
                "color": "Black"
            },
            "27": {
                "dozen": "25-36",
                "column": "3rd",
                "halve": "19-36",
                "odd_even": "Odd",
                "color": "Red"
            },
            "28": {
                "dozen": "25-36",
                "column": "1st",
                "halve": "19-36",
                "odd_even": "Even",
                "color": "Black"
            },
            "29": {
                "dozen": "25-36",
                "column": "2nd",
                "halve": "19-36",
                "odd_even": "Odd",
                "color": "Black"
            },
            "30": {
                "dozen": "25-36",
                "column": "3rd",
                "halve": "19-36",
                "odd_even": "Even",
                "color": "Red"
            },
            "31": {
                "dozen": "25-36",
                "column": "1st",
                "halve": "19-36",
                "odd_even": "Odd",
                "color": "Black"
            },
            "32": {
                "dozen": "25-36",
                "column": "2nd",
                "halve": "19-36",
                "odd_even": "Even",
                "color": "Red"
            },
            "33": {
                "dozen": "25-36",
                "column": "3rd",
                "halve": "19-36",
                "odd_even": "Odd",
                "color": "Black"
            },
            "34": {
                "dozen": "25-36",
                "column": "1st",
                "halve": "19-36",
                "odd_even": "Even",
                "color": "Red"
            },
            "35": {
                "dozen": "25-36",
                "column": "2nd",
                "halve": "19-36",
                "odd_even": "Odd",
                "color": "Black"
            },
            "36": {
                "dozen": "25-36",
                "column": "3rd",
                "halve": "19-36",
                "odd_even": "Even",
                "color": "Red"
            }
        };

        //User inputted data\\
        let space = DBS.BetterMods.parseAction(action.space, message).toLowerCase();
        let amount = parseInt(DBS.BetterMods.parseAction(action.amount, message));

        //Check if amount is a number\\
        if (isNaN(amount)) {
            DBS.logError({
                level: 'error',
                message: '[sRoulette] An invalid amount (to bet) was inputted',
            });
            return console.log('[sRoulette] An invalid amount (to bet) was inputted')
        };

        //Check format\\
        let possibilities = ['1-12', '13-24', '25-36', '1st', '2nd', '3rd', '1-18', '19-36', 'odd', 'even', 'red', 'black'].concat(Object.keys(numbers));
        if (!possibilities.includes(space)) {
            DBS.logError({
                level: 'error',
                message: '[sRoulette] An invalid space (to bet) was inputted',
            });
            return console.log('[sRoulette] An invalid space (to bet) was inputted')
        };

        //Random number and his properties\\
        let random_number = Math.floor(Math.random() * Object.keys(numbers).length);
        let key = Object.keys(numbers)[random_number];
        let values = Object.values(numbers)[random_number];
        let dozen = values.dozen;
        let column = values.column;
        let halve = values.halve;
        let odd_even = values.odd_even;
        let color = values.color;
        let result = `Number: ${key}, Dozen: ${dozen}, Column: ${column}, Halve: ${halve}, Odd/Even: ${odd_even}, Color: ${color}`;

        //Function\\
        async function saveVariables(value_one, value_two, value_three) {
            await DBS.BetterMods.saveVar(action.variabletype, action.variablename, value_one, message.guild)
            await DBS.BetterMods.saveVar(action.variabletype2, action.variablename2, value_two, message.guild)
            await DBS.BetterMods.saveVar(action.variabletype3, action.variablename3, value_three, message.guild)
        };

        //Compare results with user inputted data\\
        if (/^(?:[0-9]|[1-2][0-9]|3[0-6])$/.test(space)) {
            if (space == key) {
                saveVariables(amount * 36, result, "Win")
            } else {
                saveVariables(amount * 0, result, "Loose")
            };
        } else if (space == dozen) {
            saveVariables(amount * 3, result, "Win")
        } else if (space == column.toLowerCase()) {
            saveVariables(amount * 3, result, "Win")
        } else if (space == halve) {
            saveVariables(amount * 2, result, "Win")
        } else if (space == odd_even.toLowerCase()) {
            saveVariables(amount * 2, result, "Win")
        } else if (space == color.toLowerCase()) {
            saveVariables(amount * 2, result, "Win")
        } else {
            saveVariables(amount * 0, result, "Loose")
        };

        DBS.callNextAction(command, message, args, index + 1);
    },
};