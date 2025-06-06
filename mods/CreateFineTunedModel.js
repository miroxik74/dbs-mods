// Requires BetterMods aka. "AAA_BetterMods.js"
module.exports = {
  name: "Create Fine Tuned Model",
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
        <label>Custom model name *</label>
        <div class="input-group mb-3">
        <input type="text" class="form-control needed-field" name="name" />
        <div class="input-group-append">
          <a
            class="btn btn-outline-primary"
            role="button"
            id="variables"
            forinput="name"
            >Insert Variable</a
          >
        </div>
      </div>
      </div>
      <div class="form-group">
        <label>Base Model *</label>
        <select name="baseModel" class="form-control">
            <option value="davinci">davinci</option>
            <option value="curie">curie</option>
            <option value="babbage">babbage</option>
            <option value="ada">ada</option>
        </select>
        <small class="text-muted">Sorted by price: High (davinci) to low (ada)</small>
      </div>
      <div class="form-group">
        <label>Prompt(s) *</label>
        <div class="input-group mb-3">
          <input type="text" class="form-control needed-field" name="prompts" />
          <div class="input-group-append">
            <a
              class="btn btn-outline-primary"
              role="button"
              id="variables"
              forinput="prompts"
              >Insert Variable</a
            >
          </div>
        </div>
        <small class="text-muted">Requires an array: ["prompt1", "prompt2"].</small>
      </div>
      <div class="form-group">
        <label>Completion(s) *</label>
        <div class="input-group mb-3">
          <input type="text" class="form-control needed-field" name="completions" />
          <div class="input-group-append">
            <a
              class="btn btn-outline-primary"
              role="button"
              id="variables"
              forinput="completions"
              >Insert Variable</a
            >
          </div>
        </div>
        <small class="text-muted">Requires an array: ["completion1", "completion2"].</small>
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
        <small class="text-muted">The id of your new fined tuned model is saved in the variable.</small>
    </div>
          `;
  },

  init: async function (DBS) {
    if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
    try {
      require("openai");
    } catch {
      DBS.BetterMods.requireModule("openai");
    }
    if (!DBS.BetterMods) return console.log(`BetterMods isn't loaded.`);
    DBS.BetterMods.requireModule("openai");
    const fs = require("fs");
    const path = require("path");

    if (!fs.readdirSync(path.join(__dirname, "..")).includes("trainingdata"))
      fs.mkdirSync(path.join(__dirname, "..", "trainingdata"));

    console.log("Loaded Create Fine Tuned Model Mod");
  },

  mod: async function (DBS, message, action, args, command, index) {
    if (!DBS.BetterMods) return console.log(`BetterMods isn't loaded.`);

    const fs = require("fs");
    const path = require("path");

    // A function for retrying functions if they fail
    async function tryTimes(promiseFn, maxTries = 10) {
      try {
        return await promiseFn();
      } catch (e) {
        if (maxTries > 0) {
          return tryTimes(promiseFn, maxTries - 1);
        }
        throw e;
      }
    }
    //

    // Array to jsonl
    const title = Date.now();
    const prompts = JSON.parse(
      DBS.BetterMods.parseAction(action.prompts, message)
    );
    if (!typeof prompts === typeof []) throw "Prompts wrong formatted!";
    const completions = JSON.parse(
      DBS.BetterMods.parseAction(action.completions, message)
    );
    if (!typeof completions === typeof []) throw "Completions wrong formatted!";
    const jsonlStream = fs.createWriteStream(
      path.join(__dirname, "..", "trainingdata", `${title}.jsonl`)
    );
    for (const i in prompts) {
      jsonlStream.write(
        `{"prompt": "${prompts[i]}", "completion": "${completions[i]}"}\n`
      );
    }
    await jsonlStream.end();
    //

    const { Configuration, OpenAIApi } = require("openai");
    const config = new Configuration({
      apiKey: DBS.BetterMods.parseAction(action.apikey, message),
    });

    const openai = new OpenAIApi(config);

    const responseData = tryTimes(
      async () =>
        await openai.createFile(
          fs.createReadStream(
            path.join(__dirname, "..", "trainingdata", `${title}.jsonl`)
          ),
          "fine-tune"
        )
    );

    setInterval(async () => {
      const responseModel = await openai.createFineTune({
        training_file: responseData.data.id,
        model: DBS.BetterMods.parseAction(action.basemodel, message),
        suffix: DBS.BetterMods.parseAction(action.name, message),
      });
    }, 1000);

    DBS.BetterMods.saveVar(
      action.vartype,
      action.varname,
      responseModel.data.id,
      message.guild
    );

    DBS.callNextAction(command, message, args, index + 1);
  },
};
