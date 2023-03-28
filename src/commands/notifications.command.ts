import {SlashCommandBuilder} from "discord.js";
import {config} from "../config";
import axios from 'axios';
import {GitHubNotification} from "../types/github-notification";
import {createNotificationsReply} from "../utils/createNotificationsReply";

export const data = new SlashCommandBuilder()
    .setName("notifications")
    .setDescription("Get Github User Notifications");

export const execute = async (interaction) => {
  await interaction.reply("Fetching all your notifications");

  const response = await axios.get('https://api.github.com/notifications', {
    headers: {"Authorization": `Bearer ${config.GITHUB_PERSONAL_ACCESS_TOKEN}`}
  })

  if (response.data.length < 1) {
    await interaction.reply("You do not have notifications!");
  }

  const reply = createNotificationsReply(response.data)

  await interaction.followUp(reply);
};