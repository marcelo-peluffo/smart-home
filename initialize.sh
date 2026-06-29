#!/usr/bin/env bash

# start server
express_app=$(find ./backend -mindepth 1 -type f -name "main.js")
node "$express_app" &


# start website
cd ./frontend
npm run dev 