#!/bin/bash

if [ -z "$1" ]; then
    echo "Please enter a commit message : "
    read commit_message
else
    commit_message="$1"
fi

git status

git add .

git status

git commit -m "$commit_message"

git push origin main