<h1 align="center">
  🤖 Discord Bot Github Notifications 🤖
</h1>
<h3 align="center">Get your github notifications by a discord bot</h3>
<p align="center">Use it in a channel by setting an environment variable with a personal token, or use it privately in your DM</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/88122830/228376474-175b471d-f04c-4a14-a9ed-c7d90867ebd7.png" />
</p>

## How To Run
### Requirements
- Have a discord bot with the following Privileged Gateway Intents: PRESENCE INTENT, SERVER MEMBERS INTENT, MESSAGE CONTENT INTENT
- Have a personal access token in Github with the following permissions: notifications

#### Clone this repository, go into and install dependencies
```bash
git clone https://github.com/vinibgoulart/discord-bot-github-notifications
cd discord-bot-github-notifications
yarn
```

#### Create .env based on .env.example variables
```bash
DISCORD_BOT_TOKEN=
DISCORD_CLIENT_ID=
DISCORD_GUILD_ID=
GITHUB_PERSONAL_ACCESS_TOKEN=
```

#### Add the bot in your discord Chanel
- Go to https://discord.com/developers/applications/ > OAuth2 > URL Generator
- Create a **bot** link with `Send Messages` and `Read Messages/View Channels` permissions
- Get generated URL and paste in your browser

#### Deploy the commands
```bash
yarn deploy
```

#### Start the bot
Open a new bash and start the bot
```bash
yarn start
```

## How to use
#### Chanel
Commands in a chanel
- `/notifications`: fetch all github .env account notifications
- `/ping`: just a ping 🙂

#### DM
Commands in a private
- `/notifications`: send your personal access token and to fetch your notifications
