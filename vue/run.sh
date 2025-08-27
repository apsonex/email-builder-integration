#!/bin/bash

# Mock API server run at port 3088. Stop the previous server and run again.
PIDS2=$(lsof -i :3088 -t)

for PID in $PIDS2; do
  echo "Killing PID $PID"
  kill -9 $PID
done

ONE="(zsh run-ai.sh)"
TWO="(zsh run-mockapi.sh)"
THREE="(zsh run-dev.sh)"

# Run
npx concurrently -n ai,mock,vue -c green,blue,magenta \
    "$ONE" \
    "$TWO" \
    "$THREE"
