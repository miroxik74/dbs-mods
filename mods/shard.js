// sharding.js
const Discord = require('discord.js');
const Manager = new Discord.ShardingManager('./bot.js');

Manager.spawn(4);
Manager.on("shardCreate", async (shard) => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Launched shard #${shard.id}`);
});