// ==UserScript==
// @name         VG Prompt Bot Extractor
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Extract prompt bot content from Poe edit pages
// @author       VG
// @match        https://poe.com/edit_bot?bot=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // DOM Selectors for Prompt Bots
    const SELECTORS = {
        prompt: 'textarea.textArea_root__HPeK1.BotInfoForm_promptTextArea__eQqKV',
        promptAlt: 'textarea[name="prompt"]',
        botName: '[data-testid="bot-name-input"]',
        description: '[data-testid="bot-description-input"]'
    };

    function downloadAsFile(content, filename) {
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function formatPromptBotMarkdown(botData) {
        return `# ${botData.name}

## Description
${botData.description || 'No description available'}

## Prompt/Instructions
\`\`\`
${botData.prompt || 'No prompt available'}
\`\`\`

## Metadata
- **Extracted**: ${new Date().toISOString()}
- **Source**: ${window.location.href}
- **Bot Type**: Prompt Bot
- **Content Length**: ${botData.prompt ? botData.prompt.length : 0} characters

---
*Extracted using VG Prompt Bot Extractor*
`;
    }

    function extractPromptBotData() {
        const botData = {};
        
        // Get bot name from URL
        const urlParams = new URLSearchParams(window.location.search);
        botData.name = urlParams.get('bot') || 'Unknown Bot';

        // Extract description
        const descElement = document.querySelector(SELECTORS.description);
        botData.description = descElement?.value || '';

        // Extract prompt (try multiple selectors)
        let promptElement = document.querySelector(SELECTORS.prompt);
        if (!promptElement) {
            promptElement = document.querySelector(SELECTORS.promptAlt);
        }
        botData.prompt = promptElement?.value || '';

        // Debug logging
        console.log('🤖 Prompt Bot Extractor:');
        console.log('Prompt element found:', !!promptElement);
        console.log('Prompt content length:', botData.prompt.length);

        return botData;
    }

    function extractCurrentPromptBot() {
        console.log('🤖 VG Prompt Bot Extractor: Extracting...');
        
        const botData = extractPromptBotData();
        const markdown = formatPromptBotMarkdown(botData);
        const filename = `${botData.name.replace(/[^a-zA-Z0-9-_]/g, '_')}_prompt.md`;
        
        downloadAsFile(markdown, filename);
        console.log(`✅ Downloaded: ${filename}`);
        
        return botData;
    }

    function createPromptBotUI() {
        if (document.getElementById('vg-prompt-extractor')) return;

        const panel = document.createElement('div');
        panel.id = 'vg-prompt-extractor';
        panel.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #16a085;
            color: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 9999;
            font-family: monospace;
            min-width: 220px;
        `;

        panel.innerHTML = `
            <h3 style="margin: 0 0 10px 0;">📝 Prompt Bot Extractor</h3>
            <button id="extract-prompt-bot" style="width: 100%; margin: 5px 0; padding: 8px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Extract Prompt Bot
            </button>
            <div id="prompt-status" style="margin-top: 10px; font-size: 12px;"></div>
            <button id="close-prompt-panel" style="position: absolute; top: 5px; right: 8px; background: none; border: none; color: #ecf0f1; cursor: pointer;">✕</button>
        `;

        document.body.appendChild(panel);

        // Event Listeners
        document.getElementById('extract-prompt-bot').onclick = extractCurrentPromptBot;
        document.getElementById('close-prompt-panel').onclick = () => panel.remove();
    }

    // Initialize
    function initialize() {
        if (window.location.pathname.includes('/edit_bot')) {
            setTimeout(createPromptBotUI, 1000);
        }
    }

    initialize();
    console.log('📝 VG Prompt Bot Extractor loaded successfully!');
})();