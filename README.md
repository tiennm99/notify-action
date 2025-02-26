# notify-action

A GitHub Action that sends notifications to various messaging platforms when your workflows run.

![GitHub release](https://img.shields.io/github/v/release/tiennm99/notify-action)
![GitHub](https://img.shields.io/github/license/tiennm99/notify-action)

## Features

- Send notifications when run GitHub Actions
- Customizable messages with GitHub context information
- Currently supports:
  - ✅ Telegram
  - 🔜 Discord (coming soon)
  - 🔜 Facebook Messenger (coming soon)

## Setup

### Telegram Setup

1. Create a Telegram bot using [@BotFather](https://t.me/botfather) and obtain the bot token
2. Get your chat ID:
   - Add [@userinfobot](https://t.me/userinfobot) to your chat
   - Start the chat, and it will display your chat ID
3. Store these as secrets in your GitHub repository:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`

## Usage

Add the following to your GitHub workflow:

```yaml
steps:
  # Your workflow steps here...

  - name: Send Notification
    uses: tiennm99/notify-action@v1
    with:
      platform: telegram
      telegram_bot_token: ${{ secrets.TELEGRAM_BOT_TOKEN }}
      telegram_chat_id: ${{ secrets.TELEGRAM_CHAT_ID }}
      message: "🚀 Deployment completed successfully!"
```

### Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `platform` | Messaging platform to use (telegram, discord, messenger) | Yes | telegram |
| `message` | The message content to send | No | Auto-generated based on context |
| `status` | The status of the workflow (success, failure, custom) | No | success |
| `telegram_bot_token` | Telegram Bot API Token | Yes (for Telegram) | - |
| `telegram_chat_id` | Telegram Chat ID to send message to | Yes (for Telegram) | - |


## Examples

### Basic Usage

```yaml
- name: Notify on Success
  uses: tiennm99/notify-action@v1
  if: success()
  with:
    platform: telegram
    message: "<b>Release v1.0.0</b> has been <i>deployed</i> to production! 🎉"
    status: success
    telegram_bot_token: ${{ secrets.TELEGRAM_BOT_TOKEN }}
    telegram_chat_id: ${{ secrets.TELEGRAM_CHAT_ID }}
```

### Custom Message with HTML Formatting (Telegram)

```yaml
- name: Notify with Custom Message
  uses: tiennm99/notify-action@v1
  with:
    platform: telegram
    message: "<b>Release v1.0.0</b> has been <i>deployed</i> to production! 🎉"
    telegram_bot_token: ${{ secrets.TELEGRAM_BOT_TOKEN }}
    telegram_chat_id: ${{ secrets.TELEGRAM_CHAT_ID }}
```

### Notify on Failure

```yaml
- name: Notify on Failure
  uses: tiennm99/notify-action@v1
  if: failure()
  with:
    platform: telegram
    message: "❌ Build failed! Please check the logs."
    status: failure
    telegram_bot_token: ${{ secrets.TELEGRAM_BOT_TOKEN }}
    telegram_chat_id: ${{ secrets.TELEGRAM_CHAT_ID }}
```

## Development

### Setup Local Development

```bash
# Clone the repository
git clone https://github.com/tiennm99/notify-action.git
cd notify-action

# Install dependencies
npm install

# Build the action
npm run build
```

### Running Tests

```bash
npm test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the Apache 2 License - see the [LICENSE](LICENSE) file for details.
