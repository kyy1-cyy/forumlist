const { Client, GatewayIntentBits, ChannelType } = require('discord.js');

exports.handler = async (event, context) => {
  console.log('Function starting...');

  const botToken = process.env.DISCORD_BOT_TOKEN;
  const channelId = process.env.DISCORD_CHANNEL_ID;

  if (!botToken || !channelId) {
    const errorMessage = 'CRITICAL ERROR: DISCORD_BOT_TOKEN or DISCORD_CHANNEL_ID is not set in Netlify environment variables.';
    console.error(errorMessage);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: errorMessage }),
    };
  }

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent, // This is required to read the content of posts
    ],
  });

  try {
    await client.login(botToken);
    const channel = await client.channels.fetch(channelId);

    if (!channel || channel.type !== ChannelType.GuildForum) {
      throw new Error('Channel not found or is not a forum channel.');
    }

    // Fetch active and archived threads to get all posts
    console.log('Fetching all threads (active and archived)...');
    const activeThreads = await channel.threads.fetchActive();
    let allThreads = [...activeThreads.threads.values()];
    let lastThread = allThreads.length > 0 ? allThreads[allThreads.length - 1] : null;
    let moreToFetch = true;
    while (moreToFetch) {
      const archivedThreads = await channel.threads.fetchArchived({ before: lastThread ? lastThread.id : null, limit: 100 });
      if (archivedThreads.threads.size > 0) {
        allThreads.push(...archivedThreads.threads.values());
        lastThread = archivedThreads.threads.last();
      } else {
        moreToFetch = false;
      }
    }
    console.log(`Total threads found: ${allThreads.length}`);

    const posts = await Promise.all(
      allThreads.map(async (thread) => {
        const starterMessage = await thread.fetchStarterMessage().catch(() => null);
        return {
          id: thread.id,
          title: thread.name,
          description: starterMessage ? starterMessage.content : '', // Use empty string if no description
          createdAt: thread.createdAt,
        };
      })
    );

    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    await client.destroy();

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify(posts),
    };
  } catch (error) {
    console.error('Function failed:', error);
    if (client && client.isReady()) {
      await client.destroy();
    }
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ message: 'An internal server error occurred.', error: error.message }),
    };
  }
};
