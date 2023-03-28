import fs from "node:fs";
import path from "node:path";
import {config} from './config'

import {Client, Collection, Events, GatewayIntentBits, Partials} from 'discord.js';
import axios from "axios";
import {createNotificationsReply} from "./utils/createNotificationsReply";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers],
  partials: [Partials.Channel, Partials.Message, Partials.Reaction]
});

client.commands = new Collection()

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.command.ts'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === "/notifications") {
    await message.author.send("Send your personal token access? It needs to have permission to access your notifications")

    const filter = () => { return true }

    const userResponse = await message.channel.awaitMessages({ filter, max: 1, time: 50000, errors: ['time'] })

    try {
      const response = await axios.get('https://api.github.com/notifications', {
        headers: {"Authorization": `Bearer ${userResponse.first().content}`}
      })

      if (response.data.length < 1) {
        await message.reply("You do not have notifications!");
        return;
      }

      const reply = createNotificationsReply(response.data)

      await message.reply(reply)
    } catch (err) {
      if (err.response.status === 401) {
        return message.reply("Unauthorized, make sure you sent the correct token and with the correct permissions.")
      }

      return message.reply("There's been an error or you've timed out! Try again with `start dialogue`!")
    }
  }

  await message.reply("Hello, I'm Github Notifications Bot, you can see all your notifications sending `/notifications` command!. \n\nYou can access the documentation in https://github.com/vinibgoulart/discord-bot-github-notifications#readme")
})

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

(async () => {
  await client.login(config.DISCORD_BOT_TOKEN)
})()