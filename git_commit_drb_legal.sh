#!/bin/bash

# Test commit script for DRB-Legal only - first alphabetical canvas app
echo "🧪 Test Commit: DRB-Legal Canvas App"
echo "===================================="

# Stage directory structure and DRB-Legal
echo "📁 Staging directory structure and DRB-Legal..."
git add canvas-apps/.gitkeep prompt-bots/.gitkeep roleplay-bots/.gitkeep server-bot/.gitkeep
git add "Canvas Apps/DRB-Legal_canvas.md"

# Create commit
echo "💾 Creating commit..."
git commit -m "$(cat <<'EOF'
🏗️ Repository structure + DRB-Legal canvas app

- Created directory structure for bot organization
- Added DRB-Legal canvas app (first alphabetically)
- Ready for systematic bot addition

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"

# Show status
echo "✅ Commit completed!"
git log --oneline -1
echo ""
echo "🚀 Ready to push: git push origin main"