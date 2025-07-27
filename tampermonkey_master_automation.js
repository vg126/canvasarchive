// ==UserScript==
// @name         VG Master Bot Automation - 37 Bot Recovery
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Fully automated extraction of all 37 Poe bots with controls
// @author       VG
// @match        https://poe.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Complete bot list for automation
    const ALL_BOTS = [
        'VG-PoeLearner', 'VG-IMREF', 'VG-IMGWIZ', 'VGRBANGER', 'VG-DeepRotsearch_v1',
        'VG-GOGETA', 'VG-CUL', 'VG-FTUAI', 'VG-Aggrogator', 'VG-UltimaAI',
        'VGame-Instructme', 'Piyali-Ghosh', 'VG-FUNK', 'VG-Violet', 'VG-UltimateImageGen',
        'VGCOrtma', 'VG-Chainorama', 'Neo-DRB', 'DRB-Legal', 'VG-4.1_mini_bot',
        'VG-Haikubot', 'VG-Flashbot', 'VG-GPT_o3_pro', 'VG-Opus', 'GMP-this',
        'VGMP-bot', 'VG-JustSomeBot', 'BG-Backyarder', 'VG-Chaozer', 'VG-Drainer',
        'VG-Techbot', 'VG-IMGrok', 'VG-Melbot', 'VG-Rezbot', 'VG-LizerBot', 
        'VG-Secbot', 'DRBanger'
    ];

    // DOM Selectors for all bot types
    const SELECTORS = {
        canvas: 'textarea.textArea_root__HPeK1.BotInfoForm_canvasTextArea__I25ns',
        canvasAlt: 'textarea[name="canvasContent"]',
        prompt: 'textarea.textArea_root__HPeK1.BotInfoForm_promptTextArea__eQqKV',
        promptAlt: 'textarea[name="prompt"]',
        botName: '[data-testid="bot-name-input"]',
        description: '[data-testid="bot-description-input"]'
    };

    // Automation state
    let automationState = {
        isRunning: false,
        isPaused: false,
        currentIndex: 0,
        completedBots: [],
        failedBots: [],
        currentTab: null
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

    function detectBotType() {
        // Check for canvas content first
        const canvasElement = document.querySelector(SELECTORS.canvas) || 
                             document.querySelector(SELECTORS.canvasAlt);
        if (canvasElement && canvasElement.value && canvasElement.value.length > 50) {
            return 'canvas';
        }

        // Check for prompt content
        const promptElement = document.querySelector(SELECTORS.prompt) || 
                             document.querySelector(SELECTORS.promptAlt);
        if (promptElement && promptElement.value) {
            // Simple heuristic: roleplay bots often mention character traits
            const promptText = promptElement.value.toLowerCase();
            if (promptText.includes('you are') && 
                (promptText.includes('character') || promptText.includes('personality') || 
                 promptText.includes('role') || promptText.includes('behave'))) {
                return 'roleplay';
            }
            return 'prompt';
        }

        return 'unknown';
    }

    function extractBotData(botType) {
        const botData = {};
        
        // Get bot name from URL
        const urlParams = new URLSearchParams(window.location.search);
        botData.name = urlParams.get('bot') || 'Unknown Bot';

        // Extract description
        const descElement = document.querySelector(SELECTORS.description);
        botData.description = descElement?.value || '';

        // Extract content based on type
        if (botType === 'canvas') {
            const canvasElement = document.querySelector(SELECTORS.canvas) || 
                                 document.querySelector(SELECTORS.canvasAlt);
            botData.content = canvasElement?.value || '';
        } else {
            const promptElement = document.querySelector(SELECTORS.prompt) || 
                                 document.querySelector(SELECTORS.promptAlt);
            botData.content = promptElement?.value || '';
        }

        return botData;
    }

    function formatMarkdown(botData, botType) {
        const timestamp = new Date().toISOString();
        
        if (botType === 'canvas') {
            return `# ${botData.name}

## Description
${botData.description || 'No description available'}

## Canvas Code
\`\`\`html
${botData.content || 'No canvas code available'}
\`\`\`

## Metadata
- **Extracted**: ${timestamp}
- **Source**: ${window.location.href}
- **Bot Type**: Canvas App
- **Code Length**: ${botData.content ? botData.content.length : 0} characters

---
*Extracted using VG Master Bot Automation*
`;
        } else if (botType === 'roleplay') {
            return `# ${botData.name}

## Description
${botData.description || 'No description available'}

## Character Definition
\`\`\`
${botData.content || 'No character definition available'}
\`\`\`

## Metadata
- **Extracted**: ${timestamp}
- **Source**: ${window.location.href}
- **Bot Type**: Roleplay Bot
- **Definition Length**: ${botData.content ? botData.content.length : 0} characters

---
*Extracted using VG Master Bot Automation*
`;
        } else {
            return `# ${botData.name}

## Description
${botData.description || 'No description available'}

## Prompt/Instructions
\`\`\`
${botData.content || 'No prompt available'}
\`\`\`

## Metadata
- **Extracted**: ${timestamp}
- **Source**: ${window.location.href}
- **Bot Type**: Prompt Bot
- **Content Length**: ${botData.content ? botData.content.length : 0} characters

---
*Extracted using VG Master Bot Automation*
`;
        }
    }

    function extractCurrentBot() {
        const botType = detectBotType();
        const botData = extractBotData(botType);
        
        // HARD STOP: Check if this bot is already extracted
        const alreadyExtracted = [
            'DRB-Legal', 'Neo-DRB', 'VGame-Instructme', 'VG-CUL', 'VG-DeepRotsearch_v1', 
            'VG-FTUAI', 'VG-GOGETA', 'VG-GPT_o3_pro', 'VG-IMGWIZ', 'VG-IMREF', 
            'VG-JustSomeBot', 'VG-Opus', 'VG-PoeLearner', 'VGRBANGER', 'VG-Techbot', 
            'VG-UltimaAI', 'VG-UltimateImageGen', 'VG-Violet'
        ];
        
        if (alreadyExtracted.includes(botData.name)) {
            console.log(`🚫 BLOCKED: ${botData.name} already extracted - NO DOWNLOAD`);
            return { success: false, botType, reason: 'Already extracted' };
        }
        
        // Check if we've already downloaded this in current session
        if (!window.downloadedThisSession) {
            window.downloadedThisSession = new Set();
        }
        
        if (window.downloadedThisSession.has(botData.name)) {
            console.log(`🚫 BLOCKED: ${botData.name} already downloaded this session - NO DUPLICATE`);
            return { success: false, botType, reason: 'Already downloaded this session' };
        }
        
        const markdown = formatMarkdown(botData, botType);
        
        let suffix = '';
        switch(botType) {
            case 'canvas': suffix = '_canvas'; break;
            case 'roleplay': suffix = '_roleplay'; break;
            case 'prompt': suffix = '_prompt'; break;
            default: suffix = '_unknown'; break;
        }
        
        const filename = `${botData.name.replace(/[^a-zA-Z0-9-_]/g, '_')}${suffix}.md`;
        
        // Mark as downloaded BEFORE downloading to prevent race conditions
        window.downloadedThisSession.add(botData.name);
        
        downloadAsFile(markdown, filename);
        updateStatus(`✅ Downloaded: ${botData.name} (${botType})`);
        
        return { success: true, botType, filename };
    }

    function createMasterUI() {
        if (document.getElementById('vg-master-automation')) return;

        const panel = document.createElement('div');
        panel.id = 'vg-master-automation';
        panel.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2c3e50;
            color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.4);
            z-index: 10000;
            font-family: monospace;
            min-width: 300px;
            max-width: 400px;
        `;

        panel.innerHTML = `
            <h3 style="margin: 0 0 15px 0; color: #3498db;">🤖 Master Bot Automation</h3>
            
            <div style="margin-bottom: 15px;">
                <div style="font-size: 14px; margin-bottom: 5px;">
                    Progress: <span id="automation-progress">0/37</span>
                </div>
                <div style="background: #34495e; height: 8px; border-radius: 4px; overflow: hidden;">
                    <div id="progress-bar" style="background: #3498db; height: 100%; width: 0%; transition: width 0.3s;"></div>
                </div>
            </div>

            <div style="margin-bottom: 15px;">
                <div style="font-size: 12px; color: #bdc3c7;">Current Bot:</div>
                <div id="current-bot" style="font-weight: bold; color: #e74c3c;">Ready to start</div>
            </div>

            <div style="margin-bottom: 15px;">
                <button id="start-automation" style="width: 48%; margin-right: 4%; padding: 8px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                    START
                </button>
                <button id="pause-automation" style="width: 48%; padding: 8px; background: #f39c12; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;" disabled>
                    PAUSE
                </button>
            </div>

            <div style="margin-bottom: 15px;">
                <button id="stop-automation" style="width: 48%; margin-right: 4%; padding: 8px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer;" disabled>
                    STOP
                </button>
                <button id="skip-current" style="width: 48%; padding: 8px; background: #95a5a6; color: white; border: none; border-radius: 4px; cursor: pointer;" disabled>
                    SKIP
                </button>
            </div>

            <div style="font-size: 11px; color: #bdc3c7; margin-bottom: 10px;">
                ✅ Completed: <span id="completed-count">0</span> | 
                ❌ Failed: <span id="failed-count">0</span>
            </div>

            <div id="status-log" style="background: #34495e; padding: 8px; border-radius: 4px; font-size: 10px; max-height: 100px; overflow-y: auto;">
                Ready for automation...
            </div>

            <button id="close-master-panel" style="position: absolute; top: 8px; right: 12px; background: none; border: none; color: #bdc3c7; cursor: pointer; font-size: 16px;">✕</button>
        `;

        document.body.appendChild(panel);

        // Event Listeners
        document.getElementById('start-automation').onclick = startAutomation;
        document.getElementById('pause-automation').onclick = pauseAutomation;
        document.getElementById('stop-automation').onclick = stopAutomation;
        document.getElementById('skip-current').onclick = skipCurrent;
        document.getElementById('close-master-panel').onclick = () => panel.remove();
    }

    function updateUI() {
        const progress = document.getElementById('automation-progress');
        const progressBar = document.getElementById('progress-bar');
        const currentBot = document.getElementById('current-bot');
        const completedCount = document.getElementById('completed-count');
        const failedCount = document.getElementById('failed-count');

        if (progress) progress.textContent = `${automationState.currentIndex}/${ALL_BOTS.length}`;
        if (progressBar) progressBar.style.width = `${(automationState.currentIndex / ALL_BOTS.length) * 100}%`;
        if (currentBot) {
            if (automationState.currentIndex < ALL_BOTS.length) {
                currentBot.textContent = ALL_BOTS[automationState.currentIndex];
                currentBot.style.color = automationState.isRunning ? '#e74c3c' : '#95a5a6';
            } else {
                currentBot.textContent = 'Automation Complete!';
                currentBot.style.color = '#27ae60';
            }
        }
        if (completedCount) completedCount.textContent = automationState.completedBots.length;
        if (failedCount) failedCount.textContent = automationState.failedBots.length;

        // Button states
        const startBtn = document.getElementById('start-automation');
        const pauseBtn = document.getElementById('pause-automation');
        const stopBtn = document.getElementById('stop-automation');
        const skipBtn = document.getElementById('skip-current');

        if (startBtn) startBtn.disabled = automationState.isRunning;
        if (pauseBtn) pauseBtn.disabled = !automationState.isRunning;
        if (stopBtn) stopBtn.disabled = !automationState.isRunning && !automationState.isPaused;
        if (skipBtn) skipBtn.disabled = !automationState.isRunning;
    }

    function updateStatus(message) {
        const statusLog = document.getElementById('status-log');
        if (statusLog) {
            const timestamp = new Date().toLocaleTimeString();
            statusLog.innerHTML += `<div>${timestamp}: ${message}</div>`;
            statusLog.scrollTop = statusLog.scrollHeight;
        }
        console.log(`🤖 Master Automation: ${message}`);
    }

    function checkAlreadyExtracted() {
        // Check Downloads folder for already extracted bots
        const alreadyExtracted = [
            'DRB-Legal', 'Neo-DRB', 'VGame-Instructme', 'VG-CUL', 'VG-DeepRotsearch_v1', 
            'VG-FTUAI', 'VG-GOGETA', 'VG-GPT_o3_pro', 'VG-IMGWIZ', 'VG-IMREF', 
            'VG-JustSomeBot', 'VG-Opus', 'VG-PoeLearner', 'VGRBANGER', 'VG-Techbot', 
            'VG-UltimaAI', 'VG-UltimateImageGen', 'VG-Violet'
        ];
        
        // Add to completed list and update index
        alreadyExtracted.forEach(botName => {
            if (ALL_BOTS.includes(botName) && !automationState.completedBots.includes(botName)) {
                automationState.completedBots.push(botName);
                const botIndex = ALL_BOTS.indexOf(botName);
                if (botIndex >= automationState.currentIndex) {
                    updateStatus(`✅ Already extracted: ${botName}`);
                }
            }
        });
        
        // Find next unextracted bot
        while (automationState.currentIndex < ALL_BOTS.length && 
               alreadyExtracted.includes(ALL_BOTS[automationState.currentIndex])) {
            automationState.currentIndex++;
        }
        
        updateStatus(`📊 Found ${alreadyExtracted.length} already extracted bots`);
        updateUI();
    }

    function startAutomation() {
        automationState.isRunning = true;
        automationState.isPaused = false;
        updateStatus('🚀 Starting bot automation...');
        
        // Check for already extracted bots first
        checkAlreadyExtracted();
        
        updateUI();
        processNextBot();
    }

    function pauseAutomation() {
        automationState.isPaused = true;
        updateStatus('⏸️ Automation paused');
        updateUI();
    }

    function stopAutomation() {
        automationState.isRunning = false;
        automationState.isPaused = false;
        if (automationState.currentTab) {
            automationState.currentTab.close();
            automationState.currentTab = null;
        }
        updateStatus('🛑 Automation stopped');
        updateUI();
    }

    function skipCurrent() {
        if (automationState.currentIndex < ALL_BOTS.length) {
            const botName = ALL_BOTS[automationState.currentIndex];
            automationState.failedBots.push(botName);
            updateStatus(`⏭️ Skipped: ${botName}`);
            
            if (automationState.currentTab) {
                automationState.currentTab.close();
                automationState.currentTab = null;
            }
            
            automationState.currentIndex++;
            updateUI();
            
            if (automationState.isRunning && !automationState.isPaused) {
                setTimeout(processNextBot, 2000);
            }
        }
    }

    function processNextBot() {
        if (!automationState.isRunning || automationState.isPaused) return;
        
        // Skip already extracted bots
        const alreadyExtracted = [
            'DRB-Legal', 'Neo-DRB', 'VGame-Instructme', 'VG-CUL', 'VG-DeepRotsearch_v1', 
            'VG-FTUAI', 'VG-GOGETA', 'VG-GPT_o3_pro', 'VG-IMGWIZ', 'VG-IMREF', 
            'VG-JustSomeBot', 'VG-Opus', 'VG-PoeLearner', 'VGRBANGER', 'VG-Techbot', 
            'VG-UltimaAI', 'VG-UltimateImageGen', 'VG-Violet'
        ];
        
        // Find next unextracted bot
        while (automationState.currentIndex < ALL_BOTS.length && 
               alreadyExtracted.includes(ALL_BOTS[automationState.currentIndex])) {
            const skippedBot = ALL_BOTS[automationState.currentIndex];
            updateStatus(`⏭️ Skipping already extracted: ${skippedBot}`);
            automationState.currentIndex++;
            updateUI();
        }
        
        if (automationState.currentIndex >= ALL_BOTS.length) {
            // Automation complete
            automationState.isRunning = false;
            updateStatus('🎉 All bots processed! Automation complete.');
            updateUI();
            return;
        }

        const botName = ALL_BOTS[automationState.currentIndex];
        const editUrl = `https://poe.com/edit_bot?bot=${encodeURIComponent(botName)}`;
        
        updateStatus(`📥 Processing: ${botName}`);
        updateUI();

        // Open bot edit page
        automationState.currentTab = window.open(editUrl, '_blank');
        
        // Wait for page to load and process
        setTimeout(() => {
            if (automationState.currentTab && !automationState.currentTab.closed) {
                // The tab will handle extraction and close itself
                waitForTabCompletion(botName);
            } else {
                updateStatus(`❌ Failed to open: ${botName}`);
                automationState.failedBots.push(botName);
                automationState.currentIndex++;
                updateUI();
                setTimeout(processNextBot, 2000);
            }
        }, 3000);
    }

    function waitForTabCompletion(botName) {
        let completed = false; // Prevent duplicate processing
        
        const checkInterval = setInterval(() => {
            if (!automationState.isRunning || completed) {
                clearInterval(checkInterval);
                return;
            }

            if (automationState.currentTab && automationState.currentTab.closed) {
                // Tab closed, assume success
                completed = true;
                clearInterval(checkInterval);
                automationState.completedBots.push(botName);
                automationState.currentIndex++;
                updateUI();
                
                if (automationState.isRunning && !automationState.isPaused) {
                    setTimeout(processNextBot, 3000); // 3 second delay between bots
                }
            }
        }, 1000);

        // Timeout after 30 seconds
        setTimeout(() => {
            if (!completed && automationState.currentTab && !automationState.currentTab.closed) {
                completed = true;
                clearInterval(checkInterval);
                updateStatus(`⏰ Timeout: ${botName}`);
                automationState.currentTab.close();
                automationState.failedBots.push(botName);
                automationState.currentIndex++;
                updateUI();
                
                if (automationState.isRunning && !automationState.isPaused) {
                    setTimeout(processNextBot, 2000);
                }
            }
        }, 30000);
    }

    // Auto-extraction on edit pages (only if opened by automation)
    function handleEditPage() {
        if (!window.location.pathname.includes('/edit_bot')) return;
        
        // Only auto-extract if this tab was opened by automation
        // Check for automation marker in URL or opener reference
        if (window.opener && window.name !== 'manual_tab') {
            const urlParams = new URLSearchParams(window.location.search);
            const botName = urlParams.get('bot');
            
            // Check if bot is already extracted
            const alreadyExtracted = [
                'DRB-Legal', 'Neo-DRB', 'VGame-Instructme', 'VG-CUL', 'VG-DeepRotsearch_v1', 
                'VG-FTUAI', 'VG-GOGETA', 'VG-GPT_o3_pro', 'VG-IMGWIZ', 'VG-IMREF', 
                'VG-JustSomeBot', 'VG-Opus', 'VG-PoeLearner', 'VGRBANGER', 'VG-Techbot', 
                'VG-UltimaAI', 'VG-UltimateImageGen', 'VG-Violet'
            ];
            
            if (botName && ALL_BOTS.includes(botName)) {
                if (alreadyExtracted.includes(botName)) {
                    console.log(`⏭️ Skipping already extracted: ${botName}`);
                    setTimeout(() => window.close(), 1000);
                    return;
                }
                
                console.log(`🔍 Auto-extracting: ${botName}`);
                
                // Wait for page to fully load
                setTimeout(() => {
                    try {
                        const result = extractCurrentBot();
                        if (result.success) {
                            console.log(`✅ Success: ${botName} (${result.botType})`);
                            // Close tab after successful extraction
                            setTimeout(() => window.close(), 1500);
                        } else {
                            console.log(`❌ Extraction failed: ${botName}`);
                            setTimeout(() => window.close(), 2000);
                        }
                    } catch (error) {
                        console.log(`❌ Error extracting ${botName}: ${error.message}`);
                        setTimeout(() => window.close(), 2000);
                    }
                }, 4000);
            }
        }
    }

    // Initialize
    function initialize() {
        // Show master UI only on non-edit pages
        if (!window.location.pathname.includes('/edit_bot')) {
            setTimeout(createMasterUI, 1000);
        } else {
            // Handle edit pages for auto-extraction (only if opened by automation)
            setTimeout(handleEditPage, 2000);
        }
    }

    initialize();
    console.log('🤖 VG Master Bot Automation loaded - Ready for 37 bot recovery!');
})();