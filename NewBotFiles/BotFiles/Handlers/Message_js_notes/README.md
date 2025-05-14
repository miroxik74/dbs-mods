### Changes:

for
```js
module.exports.Wait_Handle = async function (dbs, msg, command, index, args, action) {
```
in `default:`
added "t" for "imeMultiplier = 1;" since imeMultiplier doesn't exist


for 
```js
module.exports.RunAction = async function (client, msg, action) {
```
added `//` in:
```js
infoLog("parsed:");
```
```js
infoLog(parsedAction);
```


for 
```js
module.exports.EditMessage_Handle = async function(msg, client, action) {
```
added `//` in
```js
console.log(chan);
```


for
```js
module.exports.SendEmbed_Handle = async function (msg, client, action) {
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
module.exports.KickUser_Handle = function (msg, client, action) {
```
added `//` in
```js
console.log("Kicked member");
```


for
```js
module.exports.BanUser_Handle = function (msg, client, action) {
```
added `//` in
```js
console.log("Banned member");
```


for
```js
module.exports.RoleReactionMenu_Handle = function (msg, client, action) {
```
changed format of `Embed.addField`
in `if (emo) {` into
```js
Embed.addFields({ name: role.role, value: `${emo}` });
```
and in `} else {` into
```js
Embed.addFields({ name: role.role, value: role.emoji });
```


for
```js
module.exports.DeleteMessage_Handle = async function (msg, client, action) {
```
added `//` in
```js
console.log(chan);
```


for
```js
module.exports.CreateCategory_Handle = async function (msg, client, action) {
```
changed format of `type:` into
```js
type: "GUILD_CATEGORY"
```