module.exports = {
    name: "Zoom",
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
            <input onchange="change(this.value)" type="range" name="zoom" id="zoom" min="15" max="500">
            <h6 style="color: lightgray;" id="rangeper" name="rangeper"></h6>    
        </div>

        <script>
            function change(value){
                document.getElementById("rangeper").innerHTML = value + "%"
            }

            $(document).on("click", "#saveEditResponseBtn", function(e) {
                if(e.target === this){
                    document.body.style.zoom = document.getElementById("zoom").value + "%"
                }
            })
        </script>
        `;
    },
    init: function () {
    },
    mod: function (DBS, message, action, args, command, index) {
        DBS.callNextAction(command, message, args, index + 1);
    }
};