const { Client, GatewayIntentBits, ChannelType } = require('discord.js');

exports.handler = async (event, context) => {
  // These values MUST be set in your Netlify site's environment variables.
  const botToken = process.env.DISCORD_BOT_TOKEN;
  const channelId = process.env.DISCORD_CHANNEL_ID;

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  try {
    // A promise to ensure the bot is logged in and ready
    await new Promise((resolve, reject) => {
      client.once('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
        resolve();
      });
      client.login(botToken).catch(reject);
    });

    const channel = await client.channels.fetch(channelId);

    if (!channel || channel.type !== ChannelType.GuildForum) {
      client.destroy();
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Channel not found or is not a forum channel.' }),
      };
    }

    // Fetch all threads, handling pagination for archived threads to get everything
    const activeThreads = await channel.threads.fetchActive();
    let allThreads = [...activeThreads.threads.values()];

    let lastThread = allThreads.length > 0 ? allThreads[allThreads.length - 1] : null;
    let moreToFetch = true;
    while(moreToFetch) {
        const archivedThreads = await channel.threads.fetchArchived({ before: lastThread ? lastThread.id : null, limit: 100 });
        if (archivedThreads.threads.size > 0) {
            allThreads.push(...archivedThreads.threads.values());
            lastThread = archivedThreads.threads.last();
        } else {
            moreToFetch = false;
        }
    }

    const posts = await Promise.all(
      allThreads.map(async (thread) => {
        // Fetch the very first message to get the post's content
        const starterMessage = await thread.fetchStarterMessage().catch(() => null);
        return {
          id: thread.id,
          title: thread.name,
          description: starterMessage ? starterMessage.content : 'No description available.',
          createdAt: thread.createdAt,
        };
      })
    );

    // Sort posts by creation date, newest first
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Disconnect the bot
    client.destroy();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(posts),
    };
  } catch (error) {
    console.error('Error fetching Discord posts:', error);
    client.destroy();
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch posts from Discord.', details: error.message }),
    };
  }
};
