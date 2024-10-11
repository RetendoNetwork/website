#!/bin/bash

if [ -z "$1" ]; then
    read -p "Please enter a commit message: " commit_message
else
    commit_message="$1"
fi

if [ -z "$2" ]; then
    read -p "Please enter a branch name: " branch_name
else
    branch_name="$2"
fi

git status

git add .

if git diff-index --quiet HEAD --; then
    echo "No changes to commit."
    exit 0
fi

git status

git commit -m "$commit_message"
if [ $? -ne 0 ]; then
    echo "Commit failed. Aborting."
    exit 1
fi

git push origin "$branch_name"
if [ $? -ne 0 ]; then
    echo "Push failed. Aborting."
    exit 1
fi

echo "Changes pushed to branch $branch_name successfully!"
