#!/bin/bash

# Git commit script for Poe bots - no file reading to save tokens
echo "🤖 Poe Bots Commit Script - Token-Efficient"
echo "=========================================="

# Stage all new bot files and scripts
echo "📁 Staging files..."
git add "Canvas Apps/" "prompt-bots/" "roleplay-bots/" "server-bot/" *.js *.md

# Remove the old canvas-apps file that was deleted
git add canvas-apps/VG-IMGrok.md 2>/dev/null || true

# Create commit with standardized message
echo "💾 Creating commit..."
git commit -m "$(cat <<'EOF'
🤖 Complete Poe Bot Archive - 37 Bots Extracted

- Canvas Apps: 20 interactive HTML/CSS/JS applications
- Prompt Bots: 12 instruction-based bots  
- Roleplay Bots: 5 character-driven bots
- Server Bot: 1 secure server bot (DRBanger)
- Tampermonkey Scripts: 3 extraction tools

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"

# Show commit status
echo "✅ Commit completed!"
echo "📊 Repository status:"
git log --oneline -1
git status --porcelain

echo ""
echo "🚀 Ready to push to GitHub:"
echo "   git push origin main"