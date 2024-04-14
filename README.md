# XMTP GPT Bot Starter

Starter to connect a XMTP powered boy to GPT API

## Getting started

> ⚠️ Ensure you're using `Yarn 4` for dependency management. Check with `yarn --version`.

To install dependencies:

```bash
yarn
```

To run:

```bash
yarn build
yarn start
```

To run with hot-reload:

```bash
yarn build:watch
yarn start:watch
```

### Environment

```bash
cp .env.example .env
```

then populate the environment variables accordingly

```bash
KEY= # Your main key here
XMTP_ENV= # XMTP environment (e.g., production, development)
OPEN_AI_API_KEY= # Your OpenAI API key here
PUBLIC_BOT_ADDRESS= # Your public bot address here
HEARTBEAT_BOT_KEY= # Your heartbeat bot key here
DEBUG= #debug mode
```

Powered by <a href="https://openai.com">OpenAI</a>
