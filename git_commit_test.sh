#!/bin/bash

# Test commit script for single bot - token-efficient
echo "🧪 Test Commit Script - Single Bot"
echo "================================="

# Stage just one bot file for testing
echo "📁 Staging single test file..."
git add "Canvas Apps/VG-PoeLearner_canvas.md"

# Create test commit
echo "💾 Creating test commit..."
git commit -m "$(cat <<'EOF'
🧪 Test commit - VG-PoeLearner canvas app

Testing commit workflow before full bot archive push.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"

# Show commit status
echo "✅ Test commit completed!"
echo "📊 Status:"
git log --oneline -1
git status --porcelain

echo ""
echo "🚀 If successful, run full commit script next"