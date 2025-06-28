### Added:

```js
if (!guild) return;
```
above the
```js
guild = varsE.guild;
```

```js
module.exports.Wait_Handle = async function (client, action) {
```
in `default:`
added "t" for "imeMultiplier = 1;" since imeMultiplier doesn't exist

`//` for `console.log` in:
```js
} else {
    console.log("Failed to find event: " + type);
  }
  console.log(cache[guild.id]);
```
```js
} else if (action.type === "Get Interaction Option") {
```
```js
async function SendMessage(client, action) {
```
```js
module.exports.RunAction = async function (client, action) {
```
```js
module.exports.ReplyToInteractionWithMessage = async function (client, action) {
```
```js
module.exports.EditMessage_Handle = async function (client, action) {
```
```js
module.exports.KickUser_Handle = function (client, action) {
```
```js
module.exports.BanUser_Handle = function (client, action) {
```

### Changes:

for
```js
async function SendEmbed(client, action) {
```
changed format of `.setAuthor` into
```js
.setAuthor({ name: action.authorname, iconURL: action.authorimageurl, url: action.authorlink })
```
and `.setFooter` into
```js
.setFooter({ text: action.footer });
```


for
```js
if (field.name !== "" && field.value !== "")
```
changed format of `Embed.addField` into
```js
Embed.addFields({ name: field.name, value: field.value, inline: inlineTrue });
```


for
```js
function RemoveRoleFromUser(client, action) {
```
added `//` in:
```js
console.log("removing role");
```
```js
console.log(typeof action.user);
```


for
```js
module.exports.CreateCategory_Handle = async function (client, action) {
```
changed value of `type:` into
```js
type: "GUILD_CATEGORY"
```


### Removed:

from `if (applicableEvent) {`
```js
case "Guild Member Update":
            vararray["updatedmemberold"] = varsE.oldmember;
            vararray["updatedmembernew"] = varsE.newmember;
            break;
```
```js
case "User Update":
            vararray["updatedusernew"] = varsE.newuser;
            vararray["updateduserold"] = varsE.olduser;
            break;
```