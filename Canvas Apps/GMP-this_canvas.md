# GMP-this

## Description
No description available

## Canvas Code
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Genesis Mapping Protocol Analyzer</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#5D5CDE',
                    }
                }
            }
        }
    </script>
    <style>
        .accordion-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-out;
        }
        .accordion-content.open {
            max-height: 1000px;
            transition: max-height 0.3s ease-in;
        }
        .stage-card {
            transform: translateY(5px);
            opacity: 0;
            animation: slideInUp 0.3s ease-out forwards;
        }
        @keyframes slideInUp {
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        .stage-card.no-animation {
            animation: none;
            transform: translateY(0);
            opacity: 1;
        }
        .chat-bubble {
            animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
</head>
<body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <div class="min-h-screen">
        <!-- Header -->
        <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div class="max-w-6xl mx-auto px-4 py-4">
                <h1 class="text-2xl font-bold text-primary">Genesis Mapping Protocol Analyzer</h1>
                <p class="text-gray-600 dark:text-gray-400 mt-1">Transform any concept into layered understanding</p>
            </div>
        </header>

        <div class="max-w-6xl mx-auto px-4 py-6">
            <!-- Input Section -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                <h2 class="text-xl font-semibold mb-4">Concept Input</h2>
                
                <!-- Concept Input -->
                <div class="mb-4">
                    <label for="conceptInput" class="block text-sm font-medium mb-2">What concept would you like to analyze?</label>
                    <textarea 
                        id="conceptInput" 
                        placeholder="Enter any concept, idea, tool, theory, or phenomenon..."
                        class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-base focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        rows="3"></textarea>
                </div>

                <!-- GMP Selection -->
                <div class="mb-4">
                    <label for="gmpSelect" class="block text-sm font-medium mb-2">Genesis Mapping Protocol</label>
                    <select id="gmpSelect" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-base focus:ring-2 focus:ring-primary">
                        <option value="ai-recommend">🤖 AI Recommends Best GMP</option>
                        <option value="gmp-o3">1. Genesis Mapping Framework - GPT o3 (GMP-o3)</option>
                        <option value="gmp-gci">2. Genesis Mapping Protocol - Gemini Chat Interface (GMP-GCI)</option>
                        <option value="gmp-co">3. Genesis Mapping Protocol - Claude Opus (GMP-CO)</option>
                        <option value="gmp-ds">4. Genesis Mapping Protocol - DeepSeek (GMP-DS)</option>
                        <option value="gmp-cs">5. Genesis Mapping Protocol - Critical Analysis (GMP-CS)</option>
                        <option value="gmp-gcv">6. Genesis Mapping Protocol - Grok Custom Version (GMP-GCV)</option>
                        <option value="gmp-lumina">7. Genesis Mapping Protocol - Lumina (GMP-Lumina)</option>
                        <option value="gmp-q">8. Genesis Mapping Protocol - Qwen (GMP-Q)</option>
                        <option value="gmp-s">9. Genesis Mapping Protocol - Sonar (GMP-S)</option>
                        <option value="gmp-nexus">10. Genesis Mapping Protocol - Nexus (GMP-NEXUS)</option>
                        <option value="gmp-gj25">11. Genesis Mapping Protocol - Gemini June 25 (GMP-GJ25)</option>
                    </select>
                </div>

                <!-- AI Model Selection -->
                <div class="mb-4">
                    <label for="aiModel" class="block text-sm font-medium mb-2">AI Model</label>
                    <select id="aiModel" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-base focus:ring-2 focus:ring-primary">
                        <option value="Gemini-2.5-Flash">Gemini 2.5 Flash (Recommended)</option>
                        <option value="Gemini-2.0-Flash">Gemini 2.0 Flash</option>
                        <option value="Claude-Sonnet-4">Claude Sonnet 4</option>
                        <option value="GPT-4o">GPT-4o</option>
                    </select>
                </div>

                <!-- File Upload -->
                <div class="mb-4">
                    <label for="gmpFile" class="block text-sm font-medium mb-2">GMP Knowledge File</label>
                    <input 
                        type="file" 
                        id="gmpFile" 
                        accept=".md,.txt,.markdown"
                        class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-base focus:ring-2 focus:ring-primary"
                    >
                    <p class="text-sm text-gray-500 mt-1">Upload the GMP combined file (.md or .txt format)</p>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-3">
                    <button 
                        id="analyzeBtn" 
                        class="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                        disabled
                    >
                        <span id="analyzeText">Analyze Concept</span>
                        <span id="loadingSpinner" class="hidden ml-2">
                            <svg class="animate-spin h-4 w-4 inline" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                        </span>
                    </button>
                    <button 
                        id="clearBtn" 
                        class="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                    >
                        Clear All
                    </button>
                </div>
            </div>

            <!-- Results Section -->
            <div id="resultsSection" class="hidden">
                <!-- GMP Recommendation (if AI selected) -->
                <div id="gmpRecommendation" class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-6 hidden">
                    <h3 class="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">🤖 AI Recommendation</h3>
                    <div id="recommendationContent" class="text-blue-700 dark:text-blue-300"></div>
                    <div id="recommendationOptions" class="mt-4 flex gap-3"></div>
                </div>

                <!-- Controls -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6">
                    <div class="flex justify-between items-center">
                        <h3 class="text-lg font-semibold">Analysis Results</h3>
                        <div class="flex gap-3">
                            <button id="showAllBtn" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                                Show All Stages
                            </button>
                            <button id="compareBtn" class="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors hidden">
                                Compare GMPs
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Stages Container -->
                <div id="stagesContainer" class="space-y-4 mb-6"></div>

                <!-- Chat Interface -->
                <div id="chatInterface" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h3 class="text-lg font-semibold mb-4">💬 Follow-up Questions</h3>
                    <div id="chatMessages" class="space-y-3 mb-4 max-h-96 overflow-y-auto"></div>
                    <div class="flex gap-3">
                        <input 
                            type="text" 
                            id="chatInput" 
                            placeholder="Ask a follow-up question about any stage..."
                            class="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-base focus:ring-2 focus:ring-primary"
                        >
                        <button 
                            id="sendChatBtn" 
                            class="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Dark mode setup
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (event.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        });

        // Global state
        let currentAnalysis = null;
        let currentStages = [];
        let showingAllStages = false;
        let gmpFileContent = null;

        // DOM elements
        const conceptInput = document.getElementById('conceptInput');
        const gmpSelect = document.getElementById('gmpSelect');
        const aiModel = document.getElementById('aiModel');
        const gmpFile = document.getElementById('gmpFile');
        const analyzeBtn = document.getElementById('analyzeBtn');
        const clearBtn = document.getElementById('clearBtn');
        const resultsSection = document.getElementById('resultsSection');
        const gmpRecommendation = document.getElementById('gmpRecommendation');
        const stagesContainer = document.getElementById('stagesContainer');
        const showAllBtn = document.getElementById('showAllBtn');
        const chatInterface = document.getElementById('chatInterface');
        const chatMessages = document.getElementById('chatMessages');
        const chatInput = document.getElementById('chatInput');
        const sendChatBtn = document.getElementById('sendChatBtn');

        // File upload handler
        gmpFile.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    gmpFileContent = e.target.result;
                    updateAnalyzeButton();
                };
                reader.readAsText(file);
            }
        });

        // Input validation
        function updateAnalyzeButton() {
            const hasInput = conceptInput.value.trim().length > 0;
            const hasFile = gmpFileContent !== null;
            analyzeBtn.disabled = !(hasInput && hasFile);
        }

        conceptInput.addEventListener('input', updateAnalyzeButton);

        // Register Poe handlers
        window.Poe.registerHandler("gmp-analysis", (result, context) => {
            const msg = result.responses[0];
            
            if (msg.status === "error") {
                showError("Analysis failed: " + msg.statusText);
                setLoading(false);
            } else if (msg.status === "incomplete") {
                // Show streaming progress
                if (context.type === "recommendation") {
                    updateRecommendation(msg.content);
                } else if (context.type === "analysis") {
                    updateAnalysis(msg.content, false);
                } else if (context.type === "chat") {
                    updateChatMessage(context.messageId, msg.content, false);
                }
            } else if (msg.status === "complete") {
                if (context.type === "recommendation") {
                    finalizeRecommendation(msg.content);
                } else if (context.type === "analysis") {
                    finalizeAnalysis(msg.content);
                } else if (context.type === "chat") {
                    updateChatMessage(context.messageId, msg.content, true);
                }
                setLoading(false);
            }
        });

        // Main analysis function
        async function analyzeConceptWithGMP() {
            const concept = conceptInput.value.trim();
            const selectedGMP = gmpSelect.value;
            const selectedAI = aiModel.value;

            if (!concept || !gmpFileContent) {
                showError("Please enter a concept and upload the GMP file.");
                return;
            }

            setLoading(true);
            resultsSection.classList.remove('hidden');

            try {
                if (selectedGMP === "ai-recommend") {
                    // First get AI recommendation
                    await getGMPRecommendation(concept, selectedAI);
                } else {
                    // Direct analysis with selected GMP
                    await performAnalysis(concept, selectedGMP, selectedAI);
                }
            } catch (error) {
                showError("Error: " + error.message);
                setLoading(false);
            }
        }

        async function getGMPRecommendation(concept, aiModel) {
            const prompt = `Based on this concept: "${concept}"
            
Please analyze which Genesis Mapping Protocols would be most suitable and recommend the top 3 options with brief explanations of why each would work well for this concept.

Focus on:
- The nature of the concept (tangible/intangible, simple/complex)
- Which GMP approaches would yield the most insightful analysis
- Brief rationale for each recommendation

Please format your response as:
1. **[GMP Name]**: [Brief explanation]
2. **[GMP Name]**: [Brief explanation]  
3. **[GMP Name]**: [Brief explanation]`;

            await window.Poe.sendUserMessage(
                `@${aiModel} ${prompt}`,
                {
                    handler: "gmp-analysis",
                    stream: true,
                    openChat: false,
                    handlerContext: { type: "recommendation" },
                    attachments: gmpFileContent ? [new File([gmpFileContent], "gmp-combined.md", { type: "text/markdown" })] : []
                }
            );
        }

        async function performAnalysis(concept, gmpId, aiModel) {
            const prompt = `Using the ${gmpId.toUpperCase()} framework from the attached file, please perform a complete analysis of this concept: "${concept}"

Please follow the exact structure and methodology specified in the ${gmpId.toUpperCase()} protocol. Include all stages/layers as defined in that specific framework.

Present the analysis with:
- Clear stage/layer headers with emojis as specified
- Both analytical and experiential tracks where applicable
- Any unique features specific to this GMP (analogies, edge cases, etc.)
- Progressive depth as outlined in the framework

Format the response in a clear, structured manner that follows the exact template of the selected GMP.`;

            await window.Poe.sendUserMessage(
                `@${aiModel} ${prompt}`,
                {
                    handler: "gmp-analysis",
                    stream: true,
                    openChat: false,
                    handlerContext: { type: "analysis", gmpId: gmpId },
                    attachments: gmpFileContent ? [new File([gmpFileContent], "gmp-combined.md", { type: "text/markdown" })] : []
                }
            );
        }

        function updateRecommendation(content) {
            const recommendationContent = document.getElementById('recommendationContent');
            recommendationContent.innerHTML = formatMarkdown(content);
            gmpRecommendation.classList.remove('hidden');
        }

        function finalizeRecommendation(content) {
            updateRecommendation(content);
            
            // Add selection buttons
            const recommendationOptions = document.getElementById('recommendationOptions');
            recommendationOptions.innerHTML = `
                <button onclick="selectRecommendedGMP('auto')" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    Use First Recommendation
                </button>
                <button onclick="showGMPSelector()" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                    Choose Manually
                </button>
            `;
        }

        function updateAnalysis(content, isComplete) {
            currentAnalysis = content;
            currentProgressiveStage = 1; // Reset progressive counter
            displayStages(parseStages(content), isComplete);
        }

        function finalizeAnalysis(content) {
            updateAnalysis(content, true);
        }

        function parseStages(content) {
            // Remove thinking tags first
            content = content.replace(/<thinking>[\s\S]*?<\/thinking>/g, '');
            
            // Parse the markdown content to extract stages
            const lines = content.split('\n');
            const stages = [];
            let currentStage = null;
            let currentContent = [];

            for (const line of lines) {
                // More flexible regex to catch various stage formats
                const stageMatch = line.match(/^([🌱🟢🟡🟠🔵🟣🟥⚡🔍🌀🧩🌍🚀🔬💡⚙️🎯🧱📜🏛️✨🔁🪶🕸️🪤🛠️🎭💎]+)\s*.*?(?:Stage|Layer|Junction|Pod|Step)/i) ||
                                line.match(/^###?\s*([🌱🟢🟡🟠🔵🟣🟥⚡🔍🌀🧩🌍🚀🔬💡⚙️🎯🧱📜🏛️✨🔁🪶🕸️🪤🛠️🎭💎]+)/i) ||
                                line.match(/^([🌱🟢🟡🟠🔵🟣🟥⚡🔍🌀🧩🌍🚀🔬💡⚙️🎯🧱📜🏛️✨🔁🪶🕸️🪤🛠️🎭💎]+).*?(?:\d+|0|:)/i);
                
                if (stageMatch) {
                    if (currentStage) {
                        currentStage.content = currentContent.join('\n').trim();
                        if (currentStage.content) {
                            stages.push(currentStage);
                        }
                    }
                    currentStage = {
                        title: line.trim(),
                        content: '',
                        id: `stage-${stages.length}`
                    };
                    currentContent = [];
                } else if (currentStage && line.trim()) {
                    currentContent.push(line);
                }
            }

            if (currentStage && currentContent.length > 0) {
                currentStage.content = currentContent.join('\n').trim();
                if (currentStage.content) {
                    stages.push(currentStage);
                }
            }

            // If no stages found with emoji matching, try a fallback approach
            if (stages.length === 0) {
                console.log("No stages found with emoji matching, trying fallback approach...");
                const fallbackStages = [];
                const sections = content.split(/\n(?=#{1,3}\s)/);
                
                sections.forEach((section, index) => {
                    if (section.trim()) {
                        const lines = section.split('\n');
                        const title = lines[0].replace(/^#{1,3}\s*/, '').trim();
                        const content = lines.slice(1).join('\n').trim();
                        
                        if (title && content) {
                            fallbackStages.push({
                                title: title,
                                content: content,
                                id: `stage-${index}`
                            });
                        }
                    }
                });
                
                return fallbackStages;
            }

            console.log(`Parsed ${stages.length} stages:`, stages.map(s => s.title));
            return stages;
        }

        function displayStages(stages, isComplete) {
            currentStages = stages;
            
            if (showingAllStages) {
                displayAllStages();
            } else {
                displayProgressiveStages(isComplete);
            }
        }

        // Track current progressive stage
        let currentProgressiveStage = 1;

        function displayProgressiveStages(isComplete) {
            // Show only up to current progressive stage
            stagesContainer.innerHTML = '';
            
            const visibleStages = Math.min(currentProgressiveStage, currentStages.length);
            
            for (let i = 0; i < visibleStages; i++) {
                const stage = currentStages[i];
                const stageCard = createStageCard(stage, i);
                stageCard.classList.add('no-animation'); // Remove blinking
                stagesContainer.appendChild(stageCard);
            }

            // Show "Next Stage" button if there are more stages
            if (currentProgressiveStage < currentStages.length) {
                addNextStageButton();
            }
        }

        function displayAllStages() {
            stagesContainer.innerHTML = '';
            
            currentStages.forEach((stage, index) => {
                const stageCard = createStageCard(stage, index);
                stageCard.classList.add('no-animation'); // Remove blinking
                stagesContainer.appendChild(stageCard);
            });
        }

        function createStageCard(stage, index) {
            const card = document.createElement('div');
            card.className = 'stage-card bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden';
            card.style.animationDelay = `${index * 0.1}s`;
            
            card.innerHTML = `
                <div class="accordion-header bg-gradient-to-r from-primary to-purple-600 text-white p-4 cursor-pointer" onclick="toggleStage('${stage.id}')">
                    <div class="flex justify-between items-center">
                        <h3 class="text-lg font-semibold">${stage.title}</h3>
                        <svg class="accordion-icon w-5 h-5 transform transition-transform" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                </div>
                <div id="${stage.id}" class="accordion-content">
                    <div class="p-6 prose dark:prose-invert max-w-none">
                        ${formatMarkdown(stage.content)}
                    </div>
                </div>
            `;
            
            return card;
        }

        function addNextStageButton() {
            const nextButton = document.createElement('div');
            nextButton.className = 'text-center py-6';
            nextButton.innerHTML = `
                <button onclick="showNextStage()" class="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    Show Next Stage →
                </button>
            `;
            stagesContainer.appendChild(nextButton);
        }

        function showNextStage() {
            currentProgressiveStage += 1;
            displayProgressiveStages(true);
        }

        function toggleStage(stageId) {
            const content = document.getElementById(stageId);
            const icon = content.previousElementSibling.querySelector('.accordion-icon');
            
            if (content.classList.contains('open')) {
                content.classList.remove('open');
                icon.style.transform = 'rotate(0deg)';
            } else {
                content.classList.add('open');
                icon.style.transform = 'rotate(180deg)';
            }
        }

        // Show all stages toggle
        showAllBtn.addEventListener('click', function() {
            showingAllStages = !showingAllStages;
            
            if (showingAllStages) {
                displayAllStages();
                showAllBtn.textContent = 'Progressive View';
            } else {
                showingAllStages = false;
                displayProgressiveStages(true);
                showAllBtn.textContent = 'Show All Stages';
            }
        });

        // Chat functionality
        sendChatBtn.addEventListener('click', sendChatMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });

        async function sendChatMessage() {
            const message = chatInput.value.trim();
            if (!message) return;

            const messageId = Date.now().toString();
            addChatMessage(message, 'user');
            chatInput.value = '';

            const prompt = `Based on the previous GMP analysis, please answer this follow-up question: "${message}"

Context: The user has received a complete analysis using one of the Genesis Mapping Protocols. Please provide a focused response that relates to the analysis and helps deepen understanding.`;

            await window.Poe.sendUserMessage(
                `@${aiModel.value} ${prompt}`,
                {
                    handler: "gmp-analysis",
                    stream: true,
                    openChat: false,
                    handlerContext: { type: "chat", messageId: messageId }
                }
            );

            addChatMessage('', 'ai', messageId);
        }

        function addChatMessage(content, sender, messageId = null) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-bubble flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`;
            
            const bubble = document.createElement('div');
            bubble.className = `max-w-[80%] p-3 rounded-lg ${
                sender === 'user' 
                    ? 'bg-primary text-white ml-4' 
                    : 'bg-gray-200 dark:bg-gray-700 mr-4'
            }`;
            
            if (messageId) {
                bubble.id = `chat-${messageId}`;
            }
            
            bubble.innerHTML = sender === 'user' ? content : (content || 'Thinking...');
            messageDiv.appendChild(bubble);
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function updateChatMessage(messageId, content, isComplete) {
            const bubble = document.getElementById(`chat-${messageId}`);
            if (bubble) {
                // Remove thinking tags from chat responses
                const cleanContent = content.replace(/<thinking>[\s\S]*?<\/thinking>/g, '').trim();
                bubble.innerHTML = formatMarkdown(cleanContent) || 'Thinking...';
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        }

        // Utility functions
        function formatMarkdown(content) {
            return content
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-700 px-1 rounded">$1</code>')
                .replace(/\n/g, '<br>');
        }

        function setLoading(loading) {
            const loadingSpinner = document.getElementById('loadingSpinner');
            const analyzeText = document.getElementById('analyzeText');
            
            if (loading) {
                loadingSpinner.classList.remove('hidden');
                analyzeText.textContent = 'Analyzing...';
                analyzeBtn.disabled = true;
            } else {
                loadingSpinner.classList.add('hidden');
                analyzeText.textContent = 'Analyze Concept';
                updateAnalyzeButton();
            }
        }

        function showError(message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-4';
            errorDiv.textContent = message;
            resultsSection.insertBefore(errorDiv, resultsSection.firstChild);
            
            setTimeout(() => errorDiv.remove(), 5000);
        }

        // Event listeners
        analyzeBtn.addEventListener('click', analyzeConceptWithGMP);
        
        clearBtn.addEventListener('click', function() {
            conceptInput.value = '';
            gmpSelect.value = 'ai-recommend';
            gmpFile.value = '';
            gmpFileContent = null;
            resultsSection.classList.add('hidden');
            gmpRecommendation.classList.add('hidden');
            stagesContainer.innerHTML = '';
            chatMessages.innerHTML = '';
            currentAnalysis = null;
            currentStages = [];
            showingAllStages = false;
            updateAnalyzeButton();
        });

        // Helper functions for recommendations
        function selectRecommendedGMP(choice) {
            // This would be implemented to parse the recommendation and auto-select
            // For now, just proceed with analysis
            performAnalysis(conceptInput.value.trim(), 'gmp-o3', aiModel.value);
        }

        function showGMPSelector() {
            gmpRecommendation.classList.add('hidden');
            // User can then manually select from dropdown
        }
    </script>
</body>
</html>

```

## Metadata
- **Extracted**: 2025-07-27T19:15:00.122Z
- **Source**: https://poe.com/edit_bot?bot=GMP-this
- **Bot Type**: Canvas App
- **Code Length**: 31262 characters

---
*Extracted using VG Canvas App Extractor*
