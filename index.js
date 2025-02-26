const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

/**
 * Main function that runs the action
 */
async function run() {
  try {
    // Get inputs
    const platform = core.getInput('platform');
    const message = core.getInput('message');
    const status = core.getInput('status');

    // Get GitHub context for enhanced messages
    const context = github.context;
    const repo = context.repo.owner + '/' + context.repo.repo;
    const workflow = context.workflow;
    const runId = context.runId;
    const runNumber = context.runNumber;
    const sha = context.sha.substring(0, 7); // Short SHA

    // Generate a formatted message if not provided
    let messageContent = message;
    if (message === '') {
      messageContent = generateDefaultMessage(repo, workflow, status, sha, runId, runNumber);
    }

    // Send notification based on platform
    switch (platform.toLowerCase()) {
      case 'telegram':
        await sendTelegramMessage(messageContent);
        break;
      case 'discord':
        core.warning('Discord support coming soon!');
        break;
      case 'messenger':
        core.warning('Messenger support coming soon!');
        break;
      default:
        core.setFailed(`Unsupported platform: ${platform}`);
    }

    core.info('Notification sent successfully!');
  } catch (error) {
    core.setFailed(`Action failed: ${error.message}`);
  }
}

/**
 * Send a message via Telegram Bot API
 */
async function sendTelegramMessage(message) {
  const token = core.getInput('telegram_bot_token');
  const chatId = core.getInput('telegram_chat_id');

  if (!token) {
    throw new Error('telegram_bot_token is required when platform is telegram');
  }

  if (!chatId) {
    throw new Error('telegram_chat_id is required when platform is telegram');
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await axios.post(url, {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    });

    if (response.data.ok !== true) {
      throw new Error(`Telegram API error: ${JSON.stringify(response.data)}`);
    }
  } catch (error) {
    if (error.response) {
      throw new Error(`Telegram API error: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
}

/**
 * Generate a default message if none is provided
 */
function generateDefaultMessage(repo, workflow, status, sha, runId, runNumber) {
  const statusEmoji = status === 'success' ? '✅' : status === 'failure' ? '❌' : '🔔';
  const runUrl = `https://github.com/${repo}/actions/runs/${runId}`;

  return `${statusEmoji} <b>GitHub Action</b>: ${workflow} #${runNumber}
<b>Repository</b>: ${repo}
<b>Status</b>: ${status}
<b>Commit</b>: ${sha}
<a href="${runUrl}">View Run Details</a>`;
}

// Run the action
run();
