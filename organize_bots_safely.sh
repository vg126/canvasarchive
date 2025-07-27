#!/bin/bash

# SAFE Bot Organization Script - COPY ONLY, NO DELETIONS
echo "🤖 Safe Bot Organization - COPY ONLY MODE"
echo "=========================================="

# Create target directories if they don't exist
echo "📁 Creating target directories..."
mkdir -p "canvas-apps"
mkdir -p "prompt-bots" 
mkdir -p "roleplay-bots"
mkdir -p "server-bot"

# Copy Canvas Apps (20 files)
echo "🎨 Copying Canvas Apps..."
cp ../Dump/*_canvas.md canvas-apps/
echo "   Canvas apps copied: $(ls canvas-apps/*.md 2>/dev/null | wc -l)"

# Copy Prompt Bots 
echo "📝 Copying Prompt Bots..."
cp ../Dump/*_prompt.md prompt-bots/
echo "   Prompt bots copied: $(ls prompt-bots/*.md 2>/dev/null | wc -l)"

# Copy Roleplay Bots
echo "🎭 Copying Roleplay Bots..."
cp ../Dump/*_roleplay.md roleplay-bots/
echo "   Roleplay bots copied: $(ls roleplay-bots/*.md 2>/dev/null | wc -l)"

# Copy Server Bot
echo "🖥️ Copying Server Bot..."
cp ../Dump/*_unknown.md server-bot/ 2>/dev/null || echo "   No server bot files found"
echo "   Server bots copied: $(ls server-bot/*.md 2>/dev/null | wc -l)"

# Show summary
echo ""
echo "📊 COPY SUMMARY:"
echo "   Canvas Apps: $(ls canvas-apps/*.md 2>/dev/null | wc -l) files"
echo "   Prompt Bots: $(ls prompt-bots/*.md 2>/dev/null | wc -l) files" 
echo "   Roleplay Bots: $(ls roleplay-bots/*.md 2>/dev/null | wc -l) files"
echo "   Server Bots: $(ls server-bot/*.md 2>/dev/null | wc -l) files"
echo "   Total: $(($(find canvas-apps prompt-bots roleplay-bots server-bot -name "*.md" 2>/dev/null | wc -l))) files"
echo ""
echo "✅ All files COPIED safely. Original Dump/ folder UNTOUCHED."
echo "🚨 NO DELETIONS performed. Ready for git commit and push."