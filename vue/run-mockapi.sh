#!/bin/bash

PIDS1=$(lsof -i :3088 -t)

for PID in $PIDS1; do
  echo "Killing PID $PID"
  kill -9 $PID
done


cd ../mockapi && bun run dev;
