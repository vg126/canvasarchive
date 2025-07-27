#!/bin/bash

# Commit just the directory structure first
echo "📁 Directory Structure Setup"
echo "============================"

# Stage only the directory structure
echo "📂 Staging empty directories..."
git add canvas-apps/.gitkeep prompt-bots/.gitkeep roleplay-bots/.gitkeep server-bot/.gitkeep

# Create commit for directories only
echo "💾 Creating directory structure commit..."
git commit -m "$(cat <<'EOF'
🏗️ Repository structure for Poe bot organization

- canvas-apps/: Interactive HTML/CSS/JS applications
- prompt-bots/: Instruction-based bots  
- roleplay-bots/: Character-driven bots
- server-bot/: Secure server bots

Ready for bot population.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"

# Show status
echo "✅ Directory structure committed!"
git log --oneline -1
echo ""
echo "🚀 Ready to push: git push origin main"