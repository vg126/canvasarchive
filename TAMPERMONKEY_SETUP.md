# VG Poe Bot Extractor - Setup & Usage

## 🛠️ Installation

### 1. Install Tampermonkey Extension
- **Chrome**: [Tampermonkey Chrome Extension](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- **Firefox**: [Tampermonkey Firefox Extension](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
- **Edge**: [Tampermonkey Edge Extension](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

### 2. Install the Script
1. Open Tampermonkey Dashboard (click extension icon → Dashboard)
2. Click **"Create a new script"**
3. Replace the default code with the content from `tampermonkey_poe_extractor.js`
4. Press **Ctrl+S** to save

## 🎯 Usage Methods

### Method 1: Individual Bot Extraction
1. Navigate to any bot edit page: `https://poe.com/edit_bot?bot={BOT_NAME}`
2. Wait for the **"🤖 VG Bot Extractor"** panel to appear (top-right)
3. Click **"Extract Current Bot"**
4. The bot data will download as a `.md` file automatically

### Method 2: Bulk Extraction (Recommended)
1. Go to your profile: `https://poe.com/vg126`
2. Click the **"🤖 Start Bot Extraction"** button (bottom-right)
3. This opens the first bot edit page
4. Click **"Start Bulk Extract"** in the extractor panel
5. New tabs will open for each bot - click "Extract Current Bot" in each

### Method 3: Semi-Automated (Advanced)
Add `?auto_extract=true` to any edit URL for automatic extraction:
```
https://poe.com/edit_bot?bot=VG-IMGrok&auto_extract=true
```

## 📋 Bot List (36 Confirmed)
The script includes all bot names from your inventory:
- VG-PoeLearner, VG-IMREF, VG-IMGWIZ, VGRBANGER
- VG-DeepRotsearch_v1, VG-GOGETA, VG-CUL, VG-FTUAI
- VG-Aggrogator, VG-UltimaAI, VGame-Instructme, Piyali-Ghosh
- VG-FUNK, VG-Violet, VG-UltimateImageGen, VGCOrtma
- VG-Chainorama, Neo-DRB, DRB-Legal, VG-4.1_mini_bot
- VG-Haikubot, VG-Flashbot, VG-GPT_o3_pro, VG-Opus
- GMP-this, VGMP-bot, VG-JustSomeBot, BG-Backyarder
- VG-Chaozer, VG-Drainer, VG-Techbot, VG-IMGrok
- VG-Melbot, VG-Rezbot, VG-LizerBot, VG-Secbot

## 📁 Output Format
Each bot downloads as `{BOT_NAME}.md` with:
```markdown
# Bot Name

## Description
[Bot description]

## Prompt/Instructions
[Bot instructions/prompt]

## Canvas Code
[HTML/CSS/JS canvas code if applicable]

## Metadata
- Extracted timestamp
- Source URL
- Bot type classification
```

## 🔧 Troubleshooting

### Script Not Loading
- Check if Tampermonkey is enabled
- Verify the script is active in dashboard
- Refresh the Poe page

### Panel Not Appearing
- Wait 2-3 seconds for page to fully load
- Check browser console for errors (F12)
- Ensure you're on the correct URL pattern

### Download Issues
- Check browser download permissions
- Disable popup blockers for poe.com
- Try different browser if needed

### DOM Selector Changes
If Poe updates their interface, update these selectors in the script:
```javascript
const SELECTORS = {
    canvas: 'textarea.textArea_root__HPeK1.BotInfoForm_canvasTextArea__T25ns',
    botName: '[data-testid="bot-name-input"]',
    description: '[data-testid="bot-description-input"]',
    prompt: '[data-testid="bot-prompt-textarea"]'
};
```

## 🚀 Workflow Recommendation

1. **Start with test bot**: Extract 1-2 bots manually first
2. **Bulk extraction**: Use bulk mode for all 36 bots
3. **Organize files**: Move downloaded .md files to appropriate canvasarchive folders
4. **Sync to cloud**: Use Drive sync script to backup extracted bots

## 📊 Expected Results
- **Canvas Apps**: Large files (2000+ lines) with complete HTML/CSS/JS
- **Prompt Bots**: Smaller files with instructions/prompts only
- **Success Rate**: ~95% with manual intervention for failed extractions

---
*Created for VG's 37-bot Poe archive project*