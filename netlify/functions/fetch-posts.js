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
    ],
  });

  try {
    console.log('Attempting to log in to Discord...');
    await client.login(botToken);
    console.log(`Login successful as ${client.user.tag}.`);

    console.log(`Fetching channel with ID: ${channelId}...`);
    const channel = await client.channels.fetch(channelId);
    console.log('Channel fetched.');

    if (!channel) {
      throw new Error(`Channel with ID ${channelId} could not be found.`);
    }

    if (channel.type !== ChannelType.GuildForum) {
      throw new Error(`Channel "${channel.name}" (ID: ${channelId}) is not a Forum Channel.`);
    }

    console.log('Fetching active threads...');
    const threads = await channel.threads.fetch({ active: true });
    console.log(`Found ${threads.threads.size} active threads.`);

    const posts = threads.threads.map(thread => ({
        id: thread.id,
        name: thread.name,
        messageCount: thread.messageCount,
        createdAt: thread.createdAt,
        owner: thread.ownerId,
        messages: []
    }));

    console.log('Fetching messages for each thread...');
    for (const post of posts) {
        const thread = threads.threads.get(post.id);
        if (thread) {
            const messages = await thread.messages.fetch({ limit: 100 });
            post.messages = messages.map(msg => ({
                id: msg.id,
                content: msg.content,
                author: {
                    id: msg.author.id,
                    username: msg.author.username,
                    avatar: msg.author.displayAvatarURL(),
                },
                createdAt: msg.createdAt,
                attachments: msg.attachments.map(a => a.url)
            }));
        }
    }
    console.log('Message fetching complete.');

    await client.destroy();
    console.log('Client destroyed. Function finished successfully.');

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(posts)
    };
  } catch (error) {
    console.error('--- FUNCTION FAILED ---');
    console.error('The following error occurred:');
    console.error(error);
    console.error('--- END OF ERROR ---');
    
    if (client && client.isReady()) {
        await client.destroy();
        console.log('Client was ready and has been destroyed.');
    }

    return {
        statusCode: 500,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
            message: 'An internal server error occurred.', 
            error: error.message, 
            code: error.code 
        })
    };
  }
};
