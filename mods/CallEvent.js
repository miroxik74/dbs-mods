module.exports = {
    name: "Call Event",
    author: ["PlayboyPrime#3839"],
    version: "1.0.0",
    changelog: "Release",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Control",
    html: function (data) {
        return `
        <div class="form-group">
            <label>Event Name *</label>
            <select class="form-control needed-field" id="en" name="en">
                <option value="Channel Create">Channel Create</option>
                <option value="Channel Delete">Channel Delete</option>
                <option value="Channel Pins Update">Channel Pins Update</option>
                <option value="Channel Update">Channel Update</option>
                <option value="Emoji Create">Emoji Create</option>
                <option value="Emoji Delete">Emoji Delete</option>
                <option value="Emoji Update">Emoji Update</option>
                <option value="Emoji Update">Emoji Update</option>
                <option value="Guild Create">Guild Create</option>
                <option value="Guild Delete">Guild Delete</option>
                <option value="Guild Member Available">Guild Member Available</option>
                <option value="Guild Member Speaking">Guild Member Speaking</option>
                <option value="Guild Member Update">Guild Member Update</option>
                <option value="Guild Unavailable">Guild Unavailable</option>
                <option value="Guild Update">Guild Update</option>
                <option value="Message Delete">Message Delete</option>
                <option value="Message Update">Message Update</option>
                <option value="Role Create">Role Create</option>
                <option value="Role Delete">Role Delete</option>
                <option value="Role Update">Role Update</option>
                <option value="Typing Start">Typing Start</option>
                <option value="User Update">User Update</option>
                <option value="Any Message">Any Message</option>
                <option value="Button Interaction">Button Interaction</option>
                <option value="Select Interaction">Select Interaction</option>
                <option value="Command Interaction">Command Interaction</option>
                <option value="Channel">Channel</option>
                <option value="Channel">Channel</option>
                <option value="Channel">Channel</option>
                <option value="Channel">Channel</option>
                <option value="Bot Initialization">Bot Initialization</option>
            </select>
        </div>
        `;
    },
    init: function () {
        console.log("Loaded CallEvent");
    },
    mod: function (DBS, message, action, args, command, index) {
        if(DBS.BetterMods){
            en = DBS.BetterMods.parseAction(action.en, message)
        }
        else en = action.en.toString()

        if(en){
            DBS.callNextEventAction(en.toString(), message, 0);
        }
        DBS.callNextAction(command, message, args, index + 1);
    }
};