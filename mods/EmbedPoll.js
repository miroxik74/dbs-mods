module.exports = {
    name: "Embed Poll",
    author: ["Discord Bot Studio"],
    version: "1.0.0",
    changelog: "Created Poll Mod",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",

    html: function (data) {
        return `<p><strong>Max of 10 options</strong></p>
                <div class="form-group">
                    <label>Title *</label>
                    <input class="form-control needed-field" name="title" />
                </div>
    
                <div class="form-group">
                    <label>Color</label>
                    <input class="form-control jscolor" id="color" placeholder="#FFFFFF" name="color">
                    <small class="form-text text-muted">Hex color</small>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea rows="5" class="form-control" id="description" name="description"></textarea>
                </div>
                <div class="form-group">
                    <label>Thumbnail</label>
                    <input class="form-control" id="thumbnail" name="thumbnail">
                    <small class="form-text text-muted">Url of thumbnail image</small>
                </div>
                <div class="form-group">
                    <label>Image</label>
                    <input class="form-control" id="image" name="image">
                    <small class="form-text text-muted">Main embed image url</small>
                </div>
                <div class="form-group">
                    <label>Poll options * (max of 10)</label>
                    <input class="form-control needed-field" id="options" name="options">
                    <small class="form-text text-muted">Separate poll choices with comma here</small>
                </div>`;
    },

    init: function (DBS) {
        console.log("Loaded Poll Mod");
    },

    mod: async function (DBS, message, action, args) {
        const emojiArray = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
        try {
            // Replaces %%variables%% with their value from cache
            var newaction = DBS.Cache.ParseAction(action, message.guild);

            // Get array of poll options based on comma separated list
            var options = newaction.options.split(",");
            if (options.length > 0 && options.length < 11) {
                const Embed = new DBS.Discord.RichEmbed()
                    .setColor(newaction.color)
                    .setTitle(newaction.title)
                    .setDescription(newaction.description)
                    .setThumbnail(newaction.thumbnail)
                    .setImage(newaction.image);

                for (var i = 0; i < options.length; i++) {
                    Embed.addField(options[i], emojiArray[i], true);
                }

                var poll = await message.channel.send(Embed);
                
                for (var j = 0; j < options.length; j++) {
                    await poll.react(emojiArray[j]);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
};
