    // ==UserScript==
// @name         VG Canvas App Extractor
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Extract canvas app content from Poe edit pages
// @author       VG
// @match        https://poe.com/edit_bot?bot=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // DOM Selectors for Canvas Apps
    const SELECTORS = {
        canvas: 'textarea.textArea_root__HPeK1.BotInfoForm_canvasTextArea__I25ns',
        canvasAlt: 'textarea[name="canvasContent"]',
        botName: '[data-testid="bot-name-input"]',
        description: '[data-testid="bot-description-input"]'
    };

    // Utility Functions
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

    function formatCanvasAppMarkdown(botData) {
        return `# ${botData.name}

## Description
${botData.description || 'No description available'}

## Canvas Code
\`\`\`html
${botData.canvas || 'No canvas code available'}
\`\`\`

## Metadata
- **Extracted**: ${new Date().toISOString()}
- **Source**: ${window.location.href}
- **Bot Type**: Canvas App
- **Code Length**: ${botData.canvas ? botData.canvas.length : 0} characters

---
*Extracted using VG Canvas App Extractor*
`;
    }

    function extractCanvasAppData() {
        const botData = {};
        
        // Get bot name from URL
        const urlParams = new URLSearchParams(window.location.search);
        botData.name = urlParams.get('bot') || 'Unknown Bot';

        // Extract description
        const descElement = document.querySelector(SELECTORS.description);
        botData.description = descElement?.value || '';

        // Extract canvas code (try multiple selectors)
        let canvasElement = document.querySelector(SELECTORS.canvas);
        if (!canvasElement) {
            canvasElement = document.querySelector(SELECTORS.canvasAlt);
        }
        botData.canvas = canvasElement?.value || '';
        
        // Debug logging
        console.log('🎨 Canvas App Extractor:');
        console.log('Canvas element found:', !!canvasElement);
        console.log('Canvas content length:', botData.canvas.length);

        return botData;
    }

    function extractCurrentCanvasApp() {
        console.log('🎨 VG Canvas App Extractor: Extracting...');
        
        const botData = extractCanvasAppData();
        const markdown = formatCanvasAppMarkdown(botData);
        const filename = `${botData.name.replace(/[^a-zA-Z0-9-_]/g, '_')}_canvas.md`;
        
        downloadAsFile(markdown, filename);
        console.log(`✅ Downloaded: ${filename}`);
        
        return botData;
    }

    function createCanvasAppUI() {
        if (document.getElementById('vg-canvas-extractor')) return;

        const panel = document.createElement('div');
        panel.id = 'vg-canvas-extractor';
        panel.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #3498db;
            color: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 9999;
            font-family: monospace;
            min-width: 220px;
        `;

        panel.innerHTML = `
            <h3 style="margin: 0 0 10px 0;">🎨 Canvas App Extractor</h3>
            <button id="extract-canvas-app" style="width: 100%; margin: 5px 0; padding: 8px; background: #2980b9; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Extract Canvas App
            </button>
            <div id="canvas-status" style="margin-top: 10px; font-size: 12px;"></div>
            <button id="close-canvas-panel" style="position: absolute; top: 5px; right: 8px; background: none; border: none; color: #ecf0f1; cursor: pointer;">✕</button>
        `;

        document.body.appendChild(panel);

        // Event Listeners
        document.getElementById('extract-canvas-app').onclick = extractCurrentCanvasApp;
        document.getElementById('close-canvas-panel').onclick = () => panel.remove();
    }

    // Initialize
    function initialize() {
        if (window.location.pathname.includes('/edit_bot')) {
            setTimeout(createCanvasAppUI, 1000);
        }
    }

    initialize();
    console.log('🎨 VG Canvas App Extractor loaded successfully!');
})();
