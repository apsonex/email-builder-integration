#!/bin/bash

PIDS1=$(lsof -i :3099 -t)

for PID in $PIDS1; do
  echo "Killing PID $PID"
  kill -9 $PID
done

PIDS2=$(lsof -i :3088 -t)

for PID in $PIDS2; do
  echo "Killing PID $PID"
  kill -9 $PID
done

MOCK_CMD="(cd ../mockapi && bun run dev)"
DEV_CMD="(cd bun run dev)"

# Run
npx concurrently -n mock,vue -c green,blue \
    "$AI_CMD" \
    "$DEV_CMD"
