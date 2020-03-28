# News App
A news app using [NewsAPI v2](https://newsapi.org/) powered by ExpressJS and ReactJS

## Prerequisites
- Yarn 1.00+
- Docker and Docker Compose (Optional)

## Installation Guide

### Development
```
git clone https://github.com/isaiahgcruz/news-app-js.git
cd news-app-js
```

```bash
yarn install

# installs dependencies, including dependencies of workspaces on `packages/*/package.json`
```

```bash
yarn run dev

# starts the packages/server and packages/client on localhost:3000 and localhost:3001 concurrently
```

### Build Mode using Docker Compose

```bash
docker-compose up --build
```
