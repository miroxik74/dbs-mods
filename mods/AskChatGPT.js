// Requires BetterMods aka. "AAA_BetterMods.js"
module.exports = {
  name: "Ask ChatGPT",
  author: ["."],
  version: "1.0.1",
  changelog: "None",
  isEvent: false,
  isResponse: true,
  isMod: true,
  isAddon: false,
  section: "Message",

  html: function (data) {
    return `
    <div class="form-group">
  <label>API key *</label>
  <div class="input-group mb-3">
    <input type="text" class="form-control needed-field" name="apikey" />
    <div class="input-group-append">
      <a
        class="btn btn-outline-primary"
        role="button"
        id="variables"
        forinput="apikey"
        >Insert Variable</a
      >
    </div>
  </div>
</div>
<div class="form-group">
  <label>Model *</label>
  <div class="input-group mb-3">
    <input type="text" class="form-control" name="model" />
    <div class="input-group-append">
      <a
        class="btn btn-outline-primary"
        role="button"
        id="variables"
        forinput="model"
        >Insert Variable</a
      >
    </div>
  </div>
  <small class="text-muted">If you don't know what a model is, then just leave this empty.</small>
</div>
<div class="form-group">
  <label>Question *</label>
  <div class="input-group mb-3">
    <input type="text" class="form-control needed-field" name="question" />
    <div class="input-group-append">
      <a
        class="btn btn-outline-primary"
        role="button"
        id="variables"
        forinput="question"
        >Insert Variable</a
      >
    </div>
  </div>
</div>
<div class="form-group">
    <div class="row">
        <div class="col">
            <label>Variable Type *</label>
            <select name="varType" class="form-control">
                <option value="temp">Temp Variable</option>
                <option value="server">Server Variable</option>
                <option value="global">Global Variable</option>
            </select><br>
        </div>
        <div class="col">
            <label>Variable Name *</label>
            <input class="form-control" name="varName"></input><br>
        </div>
    </div>
    <small class="text-muted">The answer of ChatGPT is being saved into the variable.</small>
</div>

        `;
  },

  init: async function (DBS) {
    if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
    try {
      require("openai");
    } catch {
      DBS.BetterMods.requireModule("openai")
    }
    console.log("Loaded Ask GPT Mod");
  },

  mod: async function (DBS, message, action, args, command, index) {
    if (!DBS.BetterMods)
      return console.log(
        `\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`
      );

    async function tryTimes(promiseFn, maxTries = 10) {
      try {
        return await promiseFn();
      } catch (e) {
        if (maxTries > 0) {
          console.log("Failed, retry " + maxTries);
          return tryTimes(promiseFn, maxTries - 1);
        }
        throw e;
      }
    }

    const { Configuration, OpenAIApi } = require("openai");

    const config = new Configuration({
      apiKey: DBS.BetterMods.parseAction(action.apikey, message),
    });

    const openai = new OpenAIApi(config);

    if (DBS.BetterMods.parseAction(action.model, message) == "") {
      var model = "gpt-3.5-turbo";
    } else {
      var model = DBS.BetterMods.parseAction(action.model, message);
    }

    const answer = await tryTimes(
      async () =>
        await openai.createCompletion({
          model: model,
          prompt: DBS.BetterMods.parseAction(action.question, message),
          max_tokens: 3000,
          temperature: 0,
        })
    );

    DBS.BetterMods.saveVar(
      action.vartype,
      action.varname,
      answer.data.choices[0].text,
      message.guild
    );

    DBS.callNextAction(command, message, args, index + 1);
  },
};
