// ==UserScript==
// @name         VG Roleplay Bot Extractor
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Extract roleplay bot content from Poe edit pages
// @author       VG
// @match        https://poe.com/edit_bot?bot=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // DOM Selectors for Roleplay Bots
    const SELECTORS = {
        characterDef: 'textarea.textArea_root__HPeK1.BotInfoForm_promptTextArea__eQqKV',
        characterDefAlt: 'textarea[name="prompt"]',
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

    function formatRoleplayBotMarkdown(botData) {
        return `# ${botData.name}

## Description
${botData.description || 'No description available'}

## Character Definition
\`\`\`
${botData.characterDefinition || 'No character definition available'}
\`\`\`

## Character Analysis
- **Personality Traits**: ${extractPersonalityTraits(botData.characterDefinition)}
- **Role/Profession**: ${extractRole(botData.characterDefinition)}
- **Communication Style**: ${extractCommunicationStyle(botData.characterDefinition)}

## Metadata
- **Extracted**: ${new Date().toISOString()}
- **Source**: ${window.location.href}
- **Bot Type**: Roleplay Bot
- **Character Definition Length**: ${botData.characterDefinition ? botData.characterDefinition.length : 0} characters

---
*Extracted using VG Roleplay Bot Extractor*
`;
    }

    function extractPersonalityTraits(text) {
        if (!text) return 'Not specified';
        const traits = [];
        if (text.toLowerCase().includes('sharp')) traits.push('Sharp');
        if (text.toLowerCase().includes('observant')) traits.push('Observant');
        if (text.toLowerCase().includes('analytical')) traits.push('Analytical');
        if (text.toLowerCase().includes('serious')) traits.push('Serious');
        if (text.toLowerCase().includes('focused')) traits.push('Focused');
        if (text.toLowerCase().includes('friendly')) traits.push('Friendly');
        if (text.toLowerCase().includes('creative')) traits.push('Creative');
        return traits.length > 0 ? traits.join(', ') : 'General personality';
    }

    function extractRole(text) {
        if (!text) return 'Not specified';
        if (text.toLowerCase().includes('detective')) return 'Detective';
        if (text.toLowerCase().includes('assistant')) return 'Assistant';
        if (text.toLowerCase().includes('teacher')) return 'Teacher';
        if (text.toLowerCase().includes('advisor')) return 'Advisor';
        if (text.toLowerCase().includes('guide')) return 'Guide';
        return 'Character role';
    }

    function extractCommunicationStyle(text) {
        if (!text) return 'Not specified';
        const styles = [];
        if (text.toLowerCase().includes('probing questions')) styles.push('Questioning');
        if (text.toLowerCase().includes('serious')) styles.push('Serious tone');
        if (text.toLowerCase().includes('friendly')) styles.push('Friendly manner');
        if (text.toLowerCase().includes('informative')) styles.push('Informative');
        return styles.length > 0 ? styles.join(', ') : 'Standard communication';
    }

    function extractRoleplayBotData() {
        const botData = {};
        
        // Get bot name from URL
        const urlParams = new URLSearchParams(window.location.search);
        botData.name = urlParams.get('bot') || 'Unknown Bot';

        // Extract description
        const descElement = document.querySelector(SELECTORS.description);
        botData.description = descElement?.value || '';

        // Extract character definition (try multiple selectors)
        let charDefElement = document.querySelector(SELECTORS.characterDef);
        if (!charDefElement) {
            charDefElement = document.querySelector(SELECTORS.characterDefAlt);
        }
        botData.characterDefinition = charDefElement?.value || '';

        // Debug logging
        console.log('🎭 Roleplay Bot Extractor:');
        console.log('Character definition element found:', !!charDefElement);
        console.log('Character definition length:', botData.characterDefinition.length);

        return botData;
    }

    function extractCurrentRoleplayBot() {
        console.log('🎭 VG Roleplay Bot Extractor: Extracting...');
        
        const botData = extractRoleplayBotData();
        const markdown = formatRoleplayBotMarkdown(botData);
        const filename = `${botData.name.replace(/[^a-zA-Z0-9-_]/g, '_')}_roleplay.md`;
        
        downloadAsFile(markdown, filename);
        console.log(`✅ Downloaded: ${filename}`);
        
        return botData;
    }

    function createRoleplayBotUI() {
        if (document.getElementById('vg-roleplay-extractor')) return;

        const panel = document.createElement('div');
        panel.id = 'vg-roleplay-extractor';
        panel.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #8e44ad;
            color: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 9999;
            font-family: monospace;
            min-width: 220px;
        `;

        panel.innerHTML = `
            <h3 style="margin: 0 0 10px 0;">🎭 Roleplay Bot Extractor</h3>
            <button id="extract-roleplay-bot" style="width: 100%; margin: 5px 0; padding: 8px; background: #9b59b6; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Extract Roleplay Bot
            </button>
            <div id="roleplay-status" style="margin-top: 10px; font-size: 12px;"></div>
            <button id="close-roleplay-panel" style="position: absolute; top: 5px; right: 8px; background: none; border: none; color: #ecf0f1; cursor: pointer;">✕</button>
        `;

        document.body.appendChild(panel);

        // Event Listeners
        document.getElementById('extract-roleplay-bot').onclick = extractCurrentRoleplayBot;
        document.getElementById('close-roleplay-panel').onclick = () => panel.remove();
    }

    // Initialize
    function initialize() {
        if (window.location.pathname.includes('/edit_bot')) {
            setTimeout(createRoleplayBotUI, 1000);
        }
    }

    initialize();
    console.log('🎭 VG Roleplay Bot Extractor loaded successfully!');
})();