# VG-Chainorama

## Description
No description available

## Canvas Code
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Reasoning Aggregator</title>
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
        /* Custom scrollbar for chat */
        .chat-scroll::-webkit-scrollbar { width: 4px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 2px; }
        .dark .chat-scroll::-webkit-scrollbar-thumb { background: #475569; }
    </style>
</head>
<body class="bg-white dark:bg-gray-900 transition-colors duration-200">
    <div class="min-h-screen flex flex-col max-w-6xl mx-auto p-4">
        <!-- Header -->
        <div class="text-center mb-6">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">AI Reasoning Aggregator</h1>
            <p class="text-gray-600 dark:text-gray-400">Three-stage intelligence pipeline: Query Prep → Web Search → Final Synthesis</p>
        </div>

        <!-- Model Selection Panel -->
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Model Configuration</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Stage 1: Query Preparation -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Stage 1: Query Preparation
                        <span class="text-xs text-gray-500">(Low cost)</span>
                    </label>
                    <select id="stage1Model" class="w-full px-3 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
                        <!-- === STAGE 1 MODELS - ADD NEW QUERY PREP MODELS HERE === -->
                        <option value="DeepSeek-V3" selected>DeepSeek-V3 (Default)</option>
                        <option value="Claude-Sonnet-4">Claude-Sonnet-4</option>
                        <option value="GPT-4.1">GPT-4.1</option>
                        <!-- Add new Stage 1 models above this line -->
                    </select>
                </div>

                <!-- Stage 2: Web Search -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Stage 2: Web Search
                        <span class="text-xs text-gray-500">(Medium cost)</span>
                    </label>
                    <select id="stage2Model" class="w-full px-3 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
                        <!-- === STAGE 2 MODELS - ADD NEW WEB SEARCH MODELS HERE === -->
                        <option value="Web-Search" selected>Web-Search (Default)</option>
                        <option value="Claude-Sonnet-4-Search">Claude-Sonnet-4-Search</option>
                        <option value="Gemini-2.5-Flash">Gemini-2.5-Flash</option>
                        <option value="Gemini-2.5-Pro">Gemini-2.5-Pro</option>
                        <!-- Add new Stage 2 models above this line -->
                    </select>
                </div>

                <!-- Stage 3: Final Synthesis -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Stage 3: Final Synthesis
                        <span class="text-xs text-gray-500">(High cost)</span>
                    </label>
                    <select id="stage3Model" class="w-full px-3 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
                        <!-- === STAGE 3 MODELS - ADD NEW REASONING MODELS HERE === -->
                        <option value="Grok-4" selected>Grok-4 (Default)</option>
                        <option value="o3-pro">o3-pro</option>
                        <option value="Claude-Opus-4-Reasoning">Claude-Opus-4-Reasoning</option>
                        <!-- Add new Stage 3 models above this line -->
                    </select>
                </div>
            </div>

            <!-- Advanced Parameters -->
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Thinking Budget (Stage 1)</label>
                    <input id="stage1Budget" type="number" min="0" max="30768" placeholder="Optional (0-30768)" class="w-full px-3 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reasoning Effort (Stage 3)</label>
                    <select id="stage3Effort" class="w-full px-3 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="">None</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Chat Interface -->
        <div class="flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <!-- Chat Messages -->
            <div id="chatContainer" class="flex-1 p-4 overflow-y-auto chat-scroll">
                <div id="welcomeMessage" class="text-center text-gray-500 dark:text-gray-400 py-8">
                    <div class="text-4xl mb-4">🤖</div>
                    <h3 class="text-lg font-medium mb-2">Welcome to AI Reasoning Aggregator</h3>
                    <p>Enter your query below to start the three-stage reasoning process</p>
                </div>
                
                <!-- Current Exchange Container -->
                <div id="currentExchange" class="hidden space-y-4">
                    <!-- User message will appear here -->
                    <div id="userMessage" class="hidden"></div>
                    
                    <!-- Stage indicators -->
                    <div id="stageIndicators" class="hidden flex justify-center space-x-4 my-6">
                        <div id="stage1Indicator" class="flex items-center space-x-2">
                            <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                                <span class="text-sm font-medium">1</span>
                            </div>
                            <span class="text-sm text-gray-600 dark:text-gray-400">Query Prep</span>
                        </div>
                        <div class="flex-1 h-px bg-gray-200 dark:bg-gray-600 mt-4"></div>
                        <div id="stage2Indicator" class="flex items-center space-x-2">
                            <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                                <span class="text-sm font-medium">2</span>
                            </div>
                            <span class="text-sm text-gray-600 dark:text-gray-400">Web Search</span>
                        </div>
                        <div class="flex-1 h-px bg-gray-200 dark:bg-gray-600 mt-4"></div>
                        <div id="stage3Indicator" class="flex items-center space-x-2">
                            <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                                <span class="text-sm font-medium">3</span>
                            </div>
                            <span class="text-sm text-gray-600 dark:text-gray-400">Final Synthesis</span>
                        </div>
                    </div>

                    <!-- Stage 1 Response -->
                    <div id="stage1Response" class="hidden">
                        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                            <div class="flex items-center justify-between mb-2">
                                <h4 class="font-medium text-blue-900 dark:text-blue-100">Stage 1: Query Optimization</h4>
                                <span id="stage1Model" class="text-xs text-blue-700 dark:text-blue-300"></span>
                            </div>
                            <div id="stage1Content" class="prose prose-sm dark:prose-invert max-w-none"></div>
                            <div id="stage1Controls" class="hidden mt-4 flex justify-end space-x-2">
                                <button onclick="editQuery()" class="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-700">Edit Query</button>
                                <button onclick="proceedToStage2()" class="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/90">Proceed to Search</button>
                            </div>
                        </div>
                    </div>

                    <!-- Query Editor -->
                    <div id="queryEditor" class="hidden">
                        <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                            <h4 class="font-medium text-yellow-900 dark:text-yellow-100 mb-2">Edit Search Query</h4>
                            <textarea id="editedQuery" rows="3" class="w-full px-3 py-2 text-base border border-yellow-300 dark:border-yellow-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"></textarea>
                            <div class="mt-2 flex justify-end space-x-2">
                                <button onclick="cancelEdit()" class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-500">Cancel</button>
                                <button onclick="proceedToStage2()" class="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/90">Search with Edited Query</button>
                            </div>
                        </div>
                    </div>

                    <!-- Stage 2 Response -->
                    <div id="stage2Response" class="hidden">
                        <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                            <div class="flex items-center justify-between mb-2">
                                <h4 class="font-medium text-green-900 dark:text-green-100">Stage 2: Web Search Results</h4>
                                <span id="stage2ModelName" class="text-xs text-green-700 dark:text-green-300"></span>
                            </div>
                            <div id="stage2Content" class="prose prose-sm dark:prose-invert max-w-none"></div>
                            <div id="stage2Controls" class="hidden mt-4 flex justify-end">
                                <button onclick="proceedToStage3()" class="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/90">Proceed to Final Synthesis</button>
                            </div>
                        </div>
                    </div>

                    <!-- Stage 3 Response -->
                    <div id="stage3Response" class="hidden">
                        <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                            <div class="flex items-center justify-between mb-2">
                                <h4 class="font-medium text-purple-900 dark:text-purple-100">Stage 3: Final Synthesis</h4>
                                <span id="stage3ModelName" class="text-xs text-purple-700 dark:text-purple-300"></span>
                            </div>
                            <div id="stage3Content" class="prose prose-sm dark:prose-invert max-w-none"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Input Area -->
            <div class="border-t border-gray-200 dark:border-gray-700 p-4">
                <div class="flex space-x-2">
                    <textarea 
                        id="userInput" 
                        rows="3" 
                        placeholder="Enter your query for the three-stage reasoning process..."
                        class="flex-1 px-3 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    ></textarea>
                    <button 
                        id="sendButton"
                        onclick="startReasoningProcess()"
                        class="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Start Process
                    </button>
                </div>
                <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Stage 1 → Query optimization • Stage 2 → Web search • Stage 3 → Final synthesis
                </div>
            </div>
        </div>

        <!-- Status -->
        <div id="statusBar" class="mt-4 text-center text-sm text-gray-500 dark:text-gray-400"></div>
    </div>

    <script>
        // === DARK MODE SETUP - DON'T MODIFY === 
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

        // === GLOBAL STATE - DON'T MODIFY STRUCTURE ===
        let currentStage = 0;
        let originalQuery = '';
        let optimizedQuery = '';
        let searchResults = '';
        let isProcessing = false;

        // === SYSTEM PROMPTS - MODIFY INSTRUCTIONS HERE ===
        const SYSTEM_PROMPTS = {
            stage1: `You are a query optimization specialist in a three-stage AI reasoning system. Your job is to analyze the user's query and create an optimized search query for web search.

IMPORTANT: You are Stage 1 of 3 in this system:
- Stage 1 (You): Optimize the query for web search
- Stage 2: Web search with your optimized query  
- Stage 3: Final reasoning synthesis with search results

Your response should contain:
1. Brief analysis of what information is needed
2. An optimized search query (be specific and targeted)
3. Explanation of why this search query will be effective

Keep your response concise and focused on query optimization.`,

            stage3: `You are the final synthesis specialist in a three-stage AI reasoning system. You have access to:
1. The original user query
2. The optimized search query from Stage 1
3. Web search results from Stage 2

Your job is to provide a comprehensive, well-reasoned response that synthesizes all available information to thoroughly answer the user's original question.

IMPORTANT: This is Stage 3 (final stage) - provide a complete, authoritative answer using all the context available.`
        };

        // === POE API HANDLERS - DON'T MODIFY ===
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

        // === MAIN FUNCTIONS - SAFE TO MODIFY CAREFULLY ===
        async function startReasoningProcess() {
            const userQuery = document.getElementById('userInput').value.trim();
            if (!userQuery) {
                showStatus('Please enter a query');
                return;
            }

            originalQuery = userQuery;
            currentStage = 1;
            isProcessing = true;
            
            // Reset UI
            document.getElementById('welcomeMessage').classList.add('hidden');
            document.getElementById('currentExchange').classList.remove('hidden');
            document.getElementById('stageIndicators').classList.remove('hidden');
            
            // Show user message
            showUserMessage(userQuery);
            
            // Clear input
            document.getElementById('userInput').value = '';
            document.getElementById('sendButton').disabled = true;
            
            // Start Stage 1
            await executeStage1(userQuery);
        }

        async function executeStage1(query) {
            updateStageIndicator(1, 'active');
            showStageResponse(1, 'loading');
            
            const model = document.getElementById('stage1Model').value;
            const budget = document.getElementById('stage1Budget').value;
            
            let prompt = `@${model} ${SYSTEM_PROMPTS.stage1}\n\nUser Query: "${query}"`;
            
            // Add thinking budget if specified
            if (budget && model !== 'GPT-4.1') {
                prompt += ` --thinking_budget ${budget}`;
            }
            
            try {
                await window.Poe.sendUserMessage(prompt, {
                    handler: 'stage1-handler',
                    stream: true,
                    openChat: false
                });
            } catch (err) {
                handleError(1, err);
            }
        }

        async function proceedToStage2() {
            // Get the optimized query (either original response or edited)
            const editedQueryElement = document.getElementById('editedQuery');
            if (!editedQueryElement.classList.contains('hidden') && editedQueryElement.value.trim()) {
                optimizedQuery = editedQueryElement.value.trim();
            }
            
            if (!optimizedQuery) {
                showStatus('No optimized query available');
                return;
            }

            currentStage = 2;
            updateStageIndicator(2, 'active');
            showStageResponse(2, 'loading');
            
            // Hide Stage 1 controls
            document.getElementById('stage1Controls').classList.add('hidden');
            document.getElementById('queryEditor').classList.add('hidden');
            
            const model = document.getElementById('stage2Model').value;
            let prompt = `@${model} ${optimizedQuery}`;
            
            try {
                await window.Poe.sendUserMessage(prompt, {
                    handler: 'stage2-handler',
                    stream: true,
                    openChat: false
                });
            } catch (err) {
                handleError(2, err);
            }
        }

        async function proceedToStage3() {
            if (!searchResults) {
                showStatus('No search results available');
                return;
            }

            currentStage = 3;
            updateStageIndicator(3, 'active');
            showStageResponse(3, 'loading');
            
            // Hide Stage 2 controls
            document.getElementById('stage2Controls').classList.add('hidden');
            
            const model = document.getElementById('stage3Model').value;
            const effort = document.getElementById('stage3Effort').value;
            
            let prompt = `@${model} ${SYSTEM_PROMPTS.stage3}\n\nOriginal Query: "${originalQuery}"\n\nOptimized Search Query: "${optimizedQuery}"\n\nSearch Results:\n${searchResults}`;
            
            // Add reasoning effort if specified
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
                handleError(3, err);
            }
        }

        function editQuery() {
            const queryEditor = document.getElementById('queryEditor');
            const editedQuery = document.getElementById('editedQuery');
            
            // Pre-fill with optimized query
            editedQuery.value = optimizedQuery;
            queryEditor.classList.remove('hidden');
            editedQuery.focus();
        }

        function cancelEdit() {
            document.getElementById('queryEditor').classList.add('hidden');
        }

        // === UI HELPER FUNCTIONS - MODIFY CAREFULLY ===
        function showUserMessage(message) {
            const userMessageDiv = document.getElementById('userMessage');
            userMessageDiv.innerHTML = `
                <div class="flex justify-end">
                    <div class="bg-primary text-white rounded-lg px-4 py-2 max-w-[80%]">
                        <div class="text-sm font-medium mb-1">You</div>
                        <div>${message}</div>
                    </div>
                </div>
            `;
            userMessageDiv.classList.remove('hidden');
        }

        function showStageResponse(stage, state) {
            const responseDiv = document.getElementById(`stage${stage}Response`);
            const contentDiv = document.getElementById(`stage${stage}Content`);
            const modelSpan = document.getElementById(`stage${stage}ModelName`);
            
            if (state === 'loading') {
                contentDiv.innerHTML = '<div class="flex items-center space-x-2"><div class="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div><span>Processing...</span></div>';
                if (modelSpan) {
                    const model = document.getElementById(`stage${stage}Model`).value;
                    modelSpan.textContent = model;
                }
            }
            
            responseDiv.classList.remove('hidden');
        }

        function updateStageResponse(stage, message) {
            const contentDiv = document.getElementById(`stage${stage}Content`);
            const controlsDiv = document.getElementById(`stage${stage}Controls`);
            
            if (message.status === 'error') {
                contentDiv.innerHTML = `<div class="text-red-600 dark:text-red-400">Error: ${message.statusText || 'Unknown error'}</div>`;
                updateStageIndicator(stage, 'error');
                isProcessing = false;
                document.getElementById('sendButton').disabled = false;
            } else if (message.status === 'incomplete') {
                contentDiv.innerHTML = marked.parse(message.content || 'Processing...');
            } else if (message.status === 'complete') {
                contentDiv.innerHTML = marked.parse(message.content);
                updateStageIndicator(stage, 'complete');
                
                // Extract optimized query from Stage 1 response
                if (stage === 1) {
                    optimizedQuery = extractOptimizedQuery(message.content);
                    if (controlsDiv) controlsDiv.classList.remove('hidden');
                } else if (stage === 2) {
                    searchResults = message.content;
                    if (controlsDiv) controlsDiv.classList.remove('hidden');
                } else if (stage === 3) {
                    isProcessing = false;
                    document.getElementById('sendButton').disabled = false;
                    showStatus('Process complete!');
                }
            }
        }

        function extractOptimizedQuery(content) {
            // Simple extraction - looks for quoted text or common patterns
            const patterns = [
                /"([^"]+)"/g,
                /search query[:\s]+([^\n]+)/gi,
                /query[:\s]+([^\n]+)/gi
            ];
            
            for (const pattern of patterns) {
                const matches = content.match(pattern);
                if (matches && matches[0]) {
                    return matches[0].replace(/^[^"]*"?|"?[^"]*$/g, '').trim();
                }
            }
            
            // Fallback: use original query
            return originalQuery;
        }

        function updateStageIndicator(stage, state) {
            const indicator = document.getElementById(`stage${stage}Indicator`);
            const circle = indicator.querySelector('div');
            
            circle.className = 'w-8 h-8 rounded-full flex items-center justify-center ';
            
            switch(state) {
                case 'active':
                    circle.className += 'bg-primary text-white animate-pulse';
                    break;
                case 'complete':
                    circle.className += 'bg-green-500 text-white';
                    break;
                case 'error':
                    circle.className += 'bg-red-500 text-white';
                    break;
                default:
                    circle.className += 'bg-gray-200 dark:bg-gray-600';
            }
        }

        function handleError(stage, error) {
            console.error(`Stage ${stage} error:`, error);
            const contentDiv = document.getElementById(`stage${stage}Content`);
            contentDiv.innerHTML = `<div class="text-red-600 dark:text-red-400">Error: ${error.message || 'Unknown error occurred'}</div>`;
            updateStageIndicator(stage, 'error');
            isProcessing = false;
            document.getElementById('sendButton').disabled = false;
        }

        function showStatus(message) {
            const statusBar = document.getElementById('statusBar');
            statusBar.textContent = message;
            setTimeout(() => statusBar.textContent = '', 3000);
        }

        // === INPUT HANDLING - DON'T MODIFY ===
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
- **Extracted**: 2025-07-27T20:10:25.168Z
- **Source**: https://poe.com/edit_bot?bot=VG-Chainorama
- **Bot Type**: Canvas App
- **Code Length**: 27746 characters

---
*Extracted using VG Master Bot Automation*
