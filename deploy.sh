#!/bin/bash

EXCLUDE="deploy.sh|.git|.gitignore|README.md|node_modules"

SERVER=lfi
DESTINATION=/home/uer_mt/sites/bebras

rsync -av --exclude-from <(echo $EXCLUDE | tr '|' '\n') ./* $SERVER:$DESTINATION

ssh $SERVER "cd $DESTINATION && npm install"
