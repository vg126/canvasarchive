# VGCOrtma

## Description
No description available

## Canvas Code
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Reasoning Aggregator v2</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/marked@4.3.0/marked.min.js"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#5D5CDE'
                    }
                }
            },
            darkMode: 'class'
        }
    </script>
    <style>
        .chat-scroll::-webkit-scrollbar { width: 4px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 2px; }
        .dark .chat-scroll::-webkit-scrollbar-thumb { background: #475569; }
        
        .stage-card {
            transition: all 0.3s ease;
        }
        
        .stage-active {
            transform: scale(1.02);
            box-shadow: 0 4px 20px rgba(93, 92, 222, 0.2);
        }
    </style>
</head>
<body class="bg-white dark:bg-gray-900 transition-colors duration-200">
    <div class="min-h-screen flex flex-col max-w-7xl mx-auto p-4">
        <!-- Header -->
        <div class="text-center mb-6">
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">AI Reasoning Aggregator</h1>
            <p class="text-gray-600 dark:text-gray-400">Enhanced three-stage intelligence pipeline with context preservation</p>
        </div>

        <!-- Model Configuration Panel -->
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Model Configuration</h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Stage 1: Query Preparation -->
                <div class="space-y-3">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Stage 1: Query Optimization
                        <span class="text-xs text-gray-500 block">Analyzes and optimizes your query</span>
                    </label>
                    <select id="stage1Model" class="w-full px-3 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="DeepSeek-V3" selected>DeepSeek-V3 (Default)</option>
                        <option value="Claude-Sonnet-4">Claude-Sonnet-4</option>
                        <option value="GPT-4.1">GPT-4.1</option>
                    </select>
                    <input id="stage1Budget" type="number" min="0" max="30768" placeholder="Thinking budget (optional)" class="w-full px-3 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
                </div>

                <!-- Stage 2: Web Search -->
                <div class="space-y-3">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Stage 2: Web Search
                        <span class="text-xs text-gray-500 block">Searches for relevant information</span>
                    </label>
                    <select id="stage2Model" class="w-full px-3 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="Web-Search" selected>Web-Search</option>
                        <option value="Claude-Sonnet-4-Search">Claude-Sonnet-4-Search</option>
                        <option value="Gemini-2.5-Flash">Gemini-2.5-Flash</option>
                        <option value="Gemini-2.5-Pro">Gemini-2.5-Pro</option>
                    </select>
                </div>

                <!-- Stage 3: Final Synthesis -->
                <div class="space-y-3">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Stage 3: Final Synthesis
                        <span class="text-xs text-gray-500 block">Combines all information for final answer</span>
                    </label>
                    <select id="stage3Model" class="w-full px-3 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="Grok-4" selected>Grok-4 (Default)</option>
                        <option value="o3-pro">o3-pro</option>
                        <option value="Claude-Opus-4-Reasoning">Claude-Opus-4-Reasoning</option>
                    </select>
                    <select id="stage3Effort" class="w-full px-3 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="">No special reasoning</option>
                        <option value="low">Low reasoning effort</option>
                        <option value="medium">Medium reasoning effort</option>
                        <option value="high">High reasoning effort</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1 grid grid-cols-1 xl:grid-cols-3 gap-6">
            <!-- Input Panel -->
            <div class="xl:col-span-1 order-1 xl:order-1">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Query</h3>
                    
                    <div class="space-y-4">
                        <textarea 
                            id="userInput" 
                            rows="6" 
                            placeholder="Enter your complex query here. The system will optimize it, search for information, and provide a comprehensive synthesis..."
                            class="w-full px-3 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        ></textarea>
                        
                        <button 
                            id="startButton"
                            onclick="startReasoningProcess()"
                            class="w-full px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                        >
                            <span id="startButtonText">Start Reasoning Process</span>
                        </button>

                        <button 
                            id="resetButton"
                            onclick="resetProcess()"
                            class="w-full px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 hidden"
                        >
                            Reset & Start New Query
                        </button>
                    </div>

                    <!-- Progress Indicator -->
                    <div id="progressSection" class="hidden mt-6">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                            <span id="progressText" class="text-sm text-gray-500 dark:text-gray-400">Stage 1 of 3</span>
                        </div>
                        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div id="progressBar" class="bg-primary h-2 rounded-full transition-all duration-500" style="width: 0%"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Results Panel -->
            <div class="xl:col-span-2 order-2 xl:order-2">
                <div class="space-y-6">
                    <!-- Welcome Message -->
                    <div id="welcomeMessage" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                        <div class="text-6xl mb-4">🧠</div>
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Welcome to Enhanced AI Reasoning</h3>
                        <p class="text-gray-600 dark:text-gray-400">Enter your query to begin the three-stage intelligence pipeline with improved context preservation and error handling.</p>
                    </div>

                    <!-- Stage 1: Query Optimization -->
                    <div id="stage1Card" class="stage-card bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hidden">
                        <div class="p-6">
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center space-x-3">
                                    <div id="stage1Icon" class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                        <span class="text-blue-600 dark:text-blue-300 font-medium">1</span>
                                    </div>
                                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Query Optimization</h3>
                                </div>
                                <span id="stage1Status" class="text-sm text-gray-500 dark:text-gray-400">Preparing...</span>
                            </div>
                            
                            <div id="stage1Content" class="prose prose-sm dark:prose-invert max-w-none mb-4"></div>
                            
                            <div id="stage1Controls" class="hidden flex flex-wrap gap-2">
                                <button onclick="editOptimizedQuery()" class="px-4 py-2 text-sm bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-700">
                                    Edit Query
                                </button>
                                <button onclick="proceedToStage2()" class="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary/90">
                                    Proceed to Search
                                </button>
                                <button onclick="retryStage(1)" class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-500">
                                    Retry Stage 1
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Query Editor -->
                    <div id="queryEditor" class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700 p-6 hidden">
                        <h4 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-3">Edit Optimized Query</h4>
                        <textarea id="editedQuery" rows="3" class="w-full px-3 py-2 text-base border border-yellow-300 dark:border-yellow-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-3"></textarea>
                        <div class="flex gap-2">
                            <button onclick="cancelQueryEdit()" class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-500">
                                Cancel
                            </button>
                            <button onclick="proceedToStage2(true)" class="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary/90">
                                Search with Edited Query
                            </button>
                        </div>
                    </div>

                    <!-- Stage 2: Web Search -->
                    <div id="stage2Card" class="stage-card bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hidden">
                        <div class="p-6">
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center space-x-3">
                                    <div id="stage2Icon" class="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                        <span class="text-green-600 dark:text-green-300 font-medium">2</span>
                                    </div>
                                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Web Search</h3>
                                </div>
                                <span id="stage2Status" class="text-sm text-gray-500 dark:text-gray-400">Searching...</span>
                            </div>
                            
                            <div id="stage2Content" class="prose prose-sm dark:prose-invert max-w-none mb-4"></div>
                            
                            <div id="stage2Controls" class="hidden flex flex-wrap gap-2">
                                <button onclick="proceedToStage3()" class="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary/90">
                                    Proceed to Synthesis
                                </button>
                                <button onclick="retryStage(2)" class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-500">
                                    Retry Search
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Stage 3: Final Synthesis -->
                    <div id="stage3Card" class="stage-card bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hidden">
                        <div class="p-6">
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center space-x-3">
                                    <div id="stage3Icon" class="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                                        <span class="text-purple-600 dark:text-purple-300 font-medium">3</span>
                                    </div>
                                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Final Synthesis</h3>
                                </div>
                                <span id="stage3Status" class="text-sm text-gray-500 dark:text-gray-400">Synthesizing...</span>
                            </div>
                            
                            <div id="stage3Content" class="prose prose-sm dark:prose-invert max-w-none mb-4"></div>
                            
                            <div id="stage3Controls" class="hidden flex flex-wrap gap-2">
                                <button onclick="retryStage(3)" class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-500">
                                    Retry Synthesis
                                </button>
                                <button onclick="exportResults()" class="px-4 py-2 text-sm bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 rounded hover:bg-green-200 dark:hover:bg-green-700">
                                    Export Results
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Status Bar -->
        <div id="statusBar" class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400"></div>
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
        let currentStage = 0;
        let originalQuery = '';
        let optimizedQuery = '';
        let searchResults = '';
        let isProcessing = false;

        // System prompts with proper context preservation
        const SYSTEM_PROMPTS = {
            stage1: `You are a query optimization specialist. Your job is to analyze the user's query and create optimized search terms for web search.

IMPORTANT: You are Stage 1 of a 3-stage reasoning system:
- Stage 1 (You): Optimize the query for web search
- Stage 2: Web search using your optimized terms
- Stage 3: Final synthesis combining all information

Your response should include:
1. **Analysis**: Brief understanding of what information is needed
2. **Optimized Search Terms**: Specific, targeted search query (put this in quotes)
3. **Search Strategy**: Why these terms will find the best information

Format your optimized search terms clearly so they can be easily extracted. Be specific and use relevant technical terms.`,

            stage2: `You are conducting a focused web search as part of a 3-stage reasoning system.

CONTEXT:
- Original Question: "{originalQuery}"
- Optimized Search Terms: "{optimizedQuery}"
- Your Role: Find comprehensive, relevant information to answer the original question

INSTRUCTIONS:
1. Search for information that directly addresses the original question
2. Focus on authoritative sources and current information
3. Gather diverse perspectives and technical details
4. Structure your findings clearly for the final synthesis stage

Your search results will be used by Stage 3 to provide the final comprehensive answer.`,

            stage3: `You are the final synthesis specialist in a 3-stage reasoning system. You have access to:

CONTEXT:
- Original Question: "{originalQuery}"
- Optimized Search Terms: "{optimizedQuery}"
- Web Search Results: "{searchResults}"

INSTRUCTIONS:
Provide a comprehensive, well-reasoned response that:
1. Directly answers the original question
2. Synthesizes information from the web search results
3. Provides actionable insights and recommendations
4. Maintains accuracy and cites relevant sources when possible

This is the final stage - provide a complete, authoritative answer.`
        };

        // Poe API handlers
        window.Poe?.registerHandler('stage1-handler', (result) => {
            const msg = result.responses[0];
            updateStageResponse(1, msg);
        });

        window.Poe?.registerHandler('stage2-handler', (result) => {
            const msg = result.responses[0];
            updateStageResponse(2, msg);
        });

        window.Poe?.registerHandler('stage3-handler', (result) => {
            const msg = result.responses[0];
            updateStageResponse(3, msg);
        });

        // Main functions
        async function startReasoningProcess() {
            const userQuery = document.getElementById('userInput').value.trim();
            if (!userQuery) {
                showStatus('Please enter a query');
                return;
            }

            originalQuery = userQuery;
            currentStage = 1;
            isProcessing = true;
            
            // Update UI
            document.getElementById('welcomeMessage').classList.add('hidden');
            document.getElementById('startButton').disabled = true;
            document.getElementById('startButtonText').textContent = 'Processing...';
            document.getElementById('resetButton').classList.remove('hidden');
            document.getElementById('progressSection').classList.remove('hidden');
            
            updateProgress(1);
            await executeStage1(userQuery);
        }

        async function executeStage1(query) {
            showStageCard(1);
            updateStageStatus(1, 'Optimizing query...', 'loading');
            
            const model = document.getElementById('stage1Model').value;
            const budget = document.getElementById('stage1Budget').value;
            
            let prompt = `@${model} ${SYSTEM_PROMPTS.stage1}\n\nUser Query: "${query}"`;
            
            if (budget && ['Claude-Sonnet-4', 'o3-mini'].includes(model)) {
                prompt += ` --thinking_budget ${budget}`;
            }
            
            try {
                await window.Poe.sendUserMessage(prompt, {
                    handler: 'stage1-handler',
                    stream: true,
                    openChat: false
                });
            } catch (err) {
                handleStageError(1, err);
            }
        }

        async function proceedToStage2(useEditedQuery = false) {
            if (useEditedQuery) {
                const editedQueryElement = document.getElementById('editedQuery');
                optimizedQuery = editedQueryElement.value.trim();
                document.getElementById('queryEditor').classList.add('hidden');
            }
            
            if (!optimizedQuery) {
                showStatus('No optimized query available');
                return;
            }

            currentStage = 2;
            updateProgress(2);
            hideStageControls(1);
            showStageCard(2);
            updateStageStatus(2, 'Searching the web...', 'loading');
            
            const model = document.getElementById('stage2Model').value;
            
            // Simplified prompt to avoid parsing errors
            const prompt = `@${model} Please search for information to answer this question: "${originalQuery}"

Search terms to use: ${optimizedQuery}

Find comprehensive information from authoritative sources that directly addresses the original question above.`;
            
            try {
                await window.Poe.sendUserMessage(prompt, {
                    handler: 'stage2-handler',
                    stream: true,
                    openChat: false
                });
            } catch (err) {
                handleStageError(2, err);
            }
        }

        async function proceedToStage3() {
            if (!searchResults) {
                showStatus('No search results available');
                return;
            }

            currentStage = 3;
            updateProgress(3);
            hideStageControls(2);
            showStageCard(3);
            updateStageStatus(3, 'Synthesizing final answer...', 'loading');
            
            const model = document.getElementById('stage3Model').value;
            const effort = document.getElementById('stage3Effort').value;
            
            // Enhanced prompt with full context
            const contextualPrompt = SYSTEM_PROMPTS.stage3
                .replace('{originalQuery}', originalQuery)
                .replace('{optimizedQuery}', optimizedQuery)
                .replace('{searchResults}', searchResults);
            
            let prompt = `@${model} ${contextualPrompt}`;
            
            if (effort && model === 'o3-pro') {
                prompt += ` --reasoning_effort ${effort}`;
            }
            
            try {
                await window.Poe.sendUserMessage(prompt, {
                    handler: 'stage3-handler',
                    stream: true,
                    openChat: false
                });
            } catch (err) {
                handleStageError(3, err);
            }
        }

        // Retry functions
        async function retryStage(stage) {
            if (stage === 1) {
                await executeStage1(originalQuery);
            } else if (stage === 2) {
                await proceedToStage2();
            } else if (stage === 3) {
                await proceedToStage3();
            }
        }

        // Edit functions
        function editOptimizedQuery() {
            const editor = document.getElementById('queryEditor');
            const textarea = document.getElementById('editedQuery');
            textarea.value = optimizedQuery;
            editor.classList.remove('hidden');
            textarea.focus();
        }

        function cancelQueryEdit() {
            document.getElementById('queryEditor').classList.add('hidden');
        }

        // UI helper functions
        function showStageCard(stage) {
            const card = document.getElementById(`stage${stage}Card`);
            card.classList.remove('hidden');
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        function updateStageStatus(stage, status, type) {
            const statusElement = document.getElementById(`stage${stage}Status`);
            const iconElement = document.getElementById(`stage${stage}Icon`);
            
            statusElement.textContent = status;
            
            // Update icon styling based on type
            iconElement.className = 'w-8 h-8 rounded-full flex items-center justify-center ';
            
            switch(type) {
                case 'loading':
                    iconElement.className += 'bg-primary text-white animate-pulse';
                    document.getElementById(`stage${stage}Card`).classList.add('stage-active');
                    break;
                case 'complete':
                    iconElement.className += 'bg-green-500 text-white';
                    document.getElementById(`stage${stage}Card`).classList.remove('stage-active');
                    break;
                case 'error':
                    iconElement.className += 'bg-red-500 text-white';
                    document.getElementById(`stage${stage}Card`).classList.remove('stage-active');
                    break;
            }
        }

        function updateStageResponse(stage, message) {
            const contentDiv = document.getElementById(`stage${stage}Content`);
            const controlsDiv = document.getElementById(`stage${stage}Controls`);
            
            if (message.status === 'error') {
                contentDiv.innerHTML = `<div class="text-red-600 dark:text-red-400 p-4 bg-red-50 dark:bg-red-900/20 rounded">
                    <strong>Error:</strong> ${message.statusText || 'Unknown error occurred'}
                </div>`;
                updateStageStatus(stage, 'Error occurred', 'error');
                if (controlsDiv) controlsDiv.classList.remove('hidden');
            } else if (message.status === 'incomplete') {
                contentDiv.innerHTML = marked.parse(message.content || 'Processing...');
            } else if (message.status === 'complete') {
                contentDiv.innerHTML = marked.parse(message.content);
                updateStageStatus(stage, 'Completed', 'complete');
                
                // Handle stage-specific completion logic
                if (stage === 1) {
                    optimizedQuery = extractOptimizedQuery(message.content);
                    if (controlsDiv) controlsDiv.classList.remove('hidden');
                } else if (stage === 2) {
                    searchResults = message.content;
                    if (controlsDiv) controlsDiv.classList.remove('hidden');
                } else if (stage === 3) {
                    isProcessing = false;
                    document.getElementById('startButton').disabled = false;
                    document.getElementById('startButtonText').textContent = 'Start New Process';
                    if (controlsDiv) controlsDiv.classList.remove('hidden');
                    showStatus('Reasoning process completed successfully!');
                }
            }
        }

        function extractOptimizedQuery(content) {
            // Improved extraction with multiple patterns
            const patterns = [
                /"([^"]+)"/g,                          // Quoted text
                /search terms?[:\s]+["']?([^"'\n]+)["']?/gi,  // "Search terms: ..."
                /optimized query[:\s]+["']?([^"'\n]+)["']?/gi, // "Optimized query: ..."
                /search for[:\s]+["']?([^"'\n]+)["']?/gi,      // "Search for: ..."
            ];
            
            for (const pattern of patterns) {
                const matches = content.match(pattern);
                if (matches && matches.length > 0) {
                    // Clean up the matched text
                    let extracted = matches[0].replace(/^[^"]*"|"[^"]*$/g, '').trim();
                    extracted = extracted.replace(/^[^:]*:\s*/, '').trim();
                    if (extracted.length > 10) { // Ensure it's substantial
                        return extracted;
                    }
                }
            }
            
            // Fallback: use original query
            return originalQuery;
        }

        function hideStageControls(stage) {
            const controlsDiv = document.getElementById(`stage${stage}Controls`);
            if (controlsDiv) controlsDiv.classList.add('hidden');
        }

        function updateProgress(stage) {
            const progress = (stage / 3) * 100;
            document.getElementById('progressBar').style.width = `${progress}%`;
            document.getElementById('progressText').textContent = `Stage ${stage} of 3`;
        }

        function handleStageError(stage, error) {
            console.error(`Stage ${stage} error:`, error);
            const contentDiv = document.getElementById(`stage${stage}Content`);
            contentDiv.innerHTML = `<div class="text-red-600 dark:text-red-400 p-4 bg-red-50 dark:bg-red-900/20 rounded">
                <strong>Error:</strong> ${error.message || 'An error occurred during processing. Please try again.'}
                <br><br>
                <button onclick="retryStage(${stage})" class="px-4 py-2 text-sm bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-700 mt-2">
                    Retry Stage ${stage}
                </button>
            </div>`;
            updateStageStatus(stage, 'Error - Click retry', 'error');
            
            // Show controls for manual recovery
            const controlsDiv = document.getElementById(`stage${stage}Controls`);
            if (controlsDiv) controlsDiv.classList.remove('hidden');
            
            isProcessing = false;
            document.getElementById('startButton').disabled = false;
            document.getElementById('startButtonText').textContent = 'Start New Process';
        }

        function resetProcess() {
            // Reset all state
            currentStage = 0;
            originalQuery = '';
            optimizedQuery = '';
            searchResults = '';
            isProcessing = false;
            
            // Reset UI
            document.getElementById('userInput').value = '';
            document.getElementById('startButton').disabled = false;
            document.getElementById('startButtonText').textContent = 'Start Reasoning Process';
            document.getElementById('resetButton').classList.add('hidden');
            document.getElementById('progressSection').classList.add('hidden');
            document.getElementById('progressBar').style.width = '0%';
            
            // Hide all stage cards
            for (let i = 1; i <= 3; i++) {
                document.getElementById(`stage${i}Card`).classList.add('hidden');
                document.getElementById(`stage${i}Card`).classList.remove('stage-active');
            }
            
            // Hide query editor
            document.getElementById('queryEditor').classList.add('hidden');
            
            // Show welcome message
            document.getElementById('welcomeMessage').classList.remove('hidden');
            
            showStatus('Reset complete. Ready for new query.');
        }

        function exportResults() {
            const results = {
                originalQuery,
                optimizedQuery,
                searchResults,
                finalSynthesis: document.getElementById('stage3Content').textContent,
                timestamp: new Date().toISOString()
            };
            
            const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `reasoning-results-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
        }

        function showStatus(message) {
            const statusBar = document.getElementById('statusBar');
            statusBar.textContent = message;
            setTimeout(() => statusBar.textContent = '', 4000);
        }

        // Input handling
        document.getElementById('userInput').addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey && !isProcessing) {
                e.preventDefault();
                startReasoningProcess();
            }
        });
    </script>
</body>
</html>

```

## Metadata
- **Extracted**: 2025-07-27T19:15:14.256Z
- **Source**: https://poe.com/edit_bot?bot=VGCOrtma
- **Bot Type**: Canvas App
- **Code Length**: 34292 characters

---
*Extracted using VG Canvas App Extractor*
