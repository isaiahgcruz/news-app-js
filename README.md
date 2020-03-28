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

### Notes

- News APP Api Key is commited to this branch. Please use responsibly!

### Summary

#### Features

- ExpressJS
  - Unit Testing
  - Cache - [memory-cache](https://www.npmjs.com/package/memory-cache)
- ReactJS
  - Hooks
  - State Management: Combination of useContext and useReducer.
  - MaterialUI
- Docker Compose (Local)

#### Why Yarn Workspace?

Initially, I was planning on creating separate repositories for the server and client but because of docker I figured out why not use try monorepo for docker compose.
Other than that, there are benefits such as:

- Single lock file
- Avoids duplication of dependencies (if axios is installed in client and server, it is only added on node_modules of the root instead of being added to client/node_modules and server/node_modules)

#### Data Persistence/Cache

I ended up with the npm module `memory-cache`. I can use redis and set it up easily with the help of docker but due to the size of the app, I ended up opting for a simple caching mechanism.

#### Why not react-redux?

React-redux is commonly used as a state management for react. But with the existence of context and useReducer hooks, I decided to go with it especially with the size of the app.

## TODO

- [ ] Provide demo link or at least deploy this somewhere.
- [ ] Unit Testing on for the client side
