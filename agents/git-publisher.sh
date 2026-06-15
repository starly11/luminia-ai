#!/bin/bash
# Sub-Agent 7: Git Publisher
# Commits and pushes project to GitHub
# Usage: bash git-publisher.sh <project-path> "<commit message>" <github-pat> <repo-name>
PROJECT=${1:-"/workspace/projects/current"}
MESSAGE=${2:-"feat: production build"}
PAT=${3:-"$GITHUB_PAT"}
REPO=${4:-"project"}
GITHUB_USER="starly101"

echo ""
echo "============================================================"
echo "GIT PUBLISHER AGENT"
echo "Project: $PROJECT"
echo "Message: $MESSAGE"
echo "============================================================"

cd "$PROJECT" || { echo "ERROR: Cannot cd to $PROJECT"; exit 1; }

# Safety check — never commit PAT
if grep -r "$PAT" . --include="*.ts" --include="*.tsx" --include="*.js" --include="*.env" 2>/dev/null | grep -v ".git"; then
    echo "🚨 ABORT: PAT found in source files. Fix before pushing."
    exit 1
fi

git init -q 2>/dev/null
git add .
git commit -m "$MESSAGE" 2>&1 | tail -5

if [ -n "$PAT" ] && [ "$PAT" != "\$GITHUB_PAT" ]; then
    REMOTE="https://${PAT}@github.com/${GITHUB_USER}/${REPO}.git"
    git remote remove origin 2>/dev/null
    git remote add origin "$REMOTE"
    git branch -M main
    git push -u origin main --force 2>&1 | tail -10
    echo ""
    echo "✅ Published: https://github.com/${GITHUB_USER}/${REPO}"
else
    echo "⚠️ No PAT provided. Committed locally only."
    echo "To push: git remote add origin https://PAT@github.com/${GITHUB_USER}/${REPO}.git && git push -u origin main"
fi
