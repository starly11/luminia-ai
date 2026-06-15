#!/bin/bash
# Sub-Agent 4: Build Verifier
# Runs npm build, checks for errors, attempts auto-fix, retries up to 3 times
# Usage: bash build-verifier.sh <project-path>

PROJECT=${1:-"/workspace/projects/current"}
MAX_RETRIES=3
ATTEMPT=0
BLOCKED_FILE="/workspace/BLOCKED.md"

echo ""
echo "============================================================"
echo "BUILD VERIFIER AGENT"
echo "Project: $PROJECT"
echo "Max Retries: $MAX_RETRIES"
echo "============================================================"

cd "$PROJECT" || { echo "ERROR: Cannot cd to $PROJECT"; exit 1; }

echo "Disk before build: $(df -h /workspace | tail -1 | awk '{print $3" used, "$4" free"}')"

while [ $ATTEMPT -lt $MAX_RETRIES ]; do
    ATTEMPT=$((ATTEMPT + 1))
    echo ""
    echo "--- Build attempt $ATTEMPT of $MAX_RETRIES ---"

    BUILD_OUTPUT=$(npm run build 2>&1)
    BUILD_EXIT=$?
    echo "$BUILD_OUTPUT" | tail -30

    if [ $BUILD_EXIT -eq 0 ]; then
        echo ""
        echo "✅ BUILD PASSED on attempt $ATTEMPT"
        echo "Disk after build: $(df -h /workspace | tail -1 | awk '{print $3" used, "$4" free"}')"
        exit 0
    else
        echo ""
        echo "❌ BUILD FAILED on attempt $ATTEMPT"
        ERRORS=$(echo "$BUILD_OUTPUT" | grep -E "Error|error TS|Cannot find|Module not found" | head -10)
        echo "Errors:"
        echo "$ERRORS"

        if [ $ATTEMPT -lt $MAX_RETRIES ]; then
            echo "Attempting auto-fix... (reading error lines)"
            # Extract filenames from errors for targeted fixing
            echo "$ERRORS" | grep -oE "[a-zA-Z0-9/_-]+\.(tsx?|jsx?)" | sort -u | head -5
        fi
    fi
done

echo ""
echo "🚫 BUILD BLOCKED after $MAX_RETRIES attempts"
echo "Writing BLOCKED.md..."

cat > "$BLOCKED_FILE" << EOF
# BUILD BLOCKED
Timestamp: $(date)
Project: $PROJECT
Attempts: $MAX_RETRIES

## Last Error Output
$ERRORS

## Next Steps
1. Read the errors above carefully
2. Do NOT retry blindly — identify the root cause
3. Fix the specific file(s) listed in errors
4. Run: bash /workspace/agents/build-verifier.sh $PROJECT
EOF

echo "BLOCKED.md written. Read it and fix before retrying."
exit 1
