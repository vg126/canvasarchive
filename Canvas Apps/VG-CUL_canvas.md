# VG-CUL

## Description
No description available

## Canvas Code
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Model Aggregator</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/marked@4.0.10/marked.min.js"></script>
    <style>
        .dropdown-container { position: relative; }
        .cost-badge { 
            background: linear-gradient(135deg, #5D5CDE, #7C4DFF);
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
        }
        .response-box {
            min-height: 200px;
            max-height: 400px;
            border: 2px dashed #E5E7EB;
            transition: all 0.3s ease;
            overflow-y: auto;
            overflow-x: hidden;
        }
        .response-box.active {
            border-color: #5D5CDE;
            border-style: solid;
        }
        .loading-spinner {
            border: 3px solid #f3f4f6;
            border-top: 3px solid #5D5CDE;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10B981;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        }
        .notification.show {
            transform: translateX(0);
        }
    </style>
</head>
<body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
    <div class="container mx-auto px-4 py-6 max-w-7xl">
        <header class="text-center mb-8">
            <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-2">
                AI Model Aggregator
            </h1>
            <p class="text-gray-600 dark:text-gray-400">Compare responses from multiple AI models simultaneously</p>
        </header>

        <!-- Model Selection Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <!-- VG's Choice -->
            <div class="dropdown-container">
                <label class="block text-sm font-medium mb-2">VG's Choice</label>
                <div class="flex items-center gap-2">
                    <input type="checkbox" id="enable-vg" class="model-checkbox" data-category="vg">
                    <select id="model-vg" class="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-base">
                        <option value="">Select Model</option>
                        <option value="Claude-Opus-4-Reasoning">Claude-Opus-4-Reasoning</option>
                        <option value="Claude-Sonnet-4-Reasoning">Claude-Sonnet-4-Reasoning</option>
                        <option value="GPT-4.1">GPT-4.1</option>
                        <option value="o3">o3</option>
                        <option value="Gemini-2.5-Pro">Gemini-2.5-Pro</option>
                    </select>
                </div>
                <div id="cost-vg" class="cost-badge text-white text-xs px-2 py-1 rounded-full mt-1 hidden"></div>
            </div>

            <!-- Some good ones -->
            <div class="dropdown-container">
                <label class="block text-sm font-medium mb-2">Some good ones</label>
                <div class="flex items-center gap-2">
                    <input type="checkbox" id="enable-good" class="model-checkbox" data-category="good">
                    <select id="model-good" class="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-base">
                        <option value="">Select Model</option>
                        <option value="Claude-Haiku-3">Claude-Haiku-3</option>
                        <option value="DeepSeek-R1-FW">DeepSeek-R1-FW</option>
                        <option value="GPT-3.5-Turbo">GPT-3.5-Turbo</option>
                        <option value="GPT-4o">GPT-4o</option>
                        <option value="Llama-3-8b-Groq">Llama-3-8b-Groq</option>
                        <option value="Mistral-7B-v0.3-T">Mistral-7B-v0.3-T</option>
                        <option value="Grok-4">Grok-4</option>
                    </select>
                </div>
                <div id="cost-good" class="cost-badge text-white text-xs px-2 py-1 rounded-full mt-1 hidden"></div>
            </div>

            <!-- Gemini Choice -->
            <div class="dropdown-container">
                <label class="block text-sm font-medium mb-2">Gemini Choice</label>
                <div class="flex items-center gap-2">
                    <input type="checkbox" id="enable-gemini" class="model-checkbox" data-category="gemini">
                    <select id="model-gemini" class="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-base">
                        <option value="">Select Model</option>
                        <option value="Llama-4-Scout-B10">Llama-4-Scout-B10</option>
                        <option value="Llama-3.1-405B">Llama-3.1-405B</option>
                        <option value="Mistral-Large-2">Mistral-Large-2</option>
                        <option value="Inception-Mercury-Coder">Inception-Mercury-Coder</option>
                        <option value="Hermes-3-70B">Hermes-3-70B</option>
                        <option value="GPT-Researcher">GPT-Researcher</option>
                        <option value="Claude-Opus-4">Claude-Opus-4</option>
                        <option value="Llama-4-Maverick-B10">Llama-4-Maverick-B10</option>
                        <option value="Gemini-2.5-Flash">Gemini-2.5-Flash</option>
                        <option value="Llama-4-Maverick">Llama-4-Maverick</option>
                        <option value="GPT-4.1-mini">GPT-4.1-mini</option>
                        <option value="MiniMax-M1">MiniMax-M1</option>
                        <option value="Gemini-2.0-Flash">Gemini-2.0-Flash</option>
                        <option value="o1-preview">o1-preview</option>
                        <option value="GPT-4.5-Preview">GPT-4.5-Preview</option>
                        <option value="o3-pro">o3-pro</option>
                        <option value="o1">o1</option>
                        <option value="Perplexity-Sonar-Rsn-Pro">Perplexity-Sonar-Rsn-Pro</option>
                        <option value="Claude-Sonnet-3.7-Reasoning">Claude-Sonnet-3.7-Reasoning</option>
                        <option value="Perplexity-Sonar-Pro">Perplexity-Sonar-Pro</option>
                    </select>
                </div>
                <div id="cost-gemini" class="cost-badge text-white text-xs px-2 py-1 rounded-full mt-1 hidden"></div>
            </div>

            <!-- Exotica -->
            <div class="dropdown-container">
                <label class="block text-sm font-medium mb-2">Exotica</label>
                <div class="flex items-center gap-2">
                    <input type="checkbox" id="enable-exotica" class="model-checkbox" data-category="exotica">
                    <select id="model-exotica" class="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-base">
                        <option value="">Select Model</option>
                        <option value="Llama-3.1-Nemotron">Llama-3.1-Nemotron</option>
                        <option value="Lyria">Lyria</option>
                        <option value="MarkItDown">MarkItDown</option>
                        <option value="Minimax-M1">Minimax-M1</option>
                        <option value="Mixtral8x22b-Inst-FW">Mixtral8x22b-Inst-FW</option>
                        <option value="Phi-4-DI">Phi-4-DI</option>
                        <option value="Python">Python</option>
                        <option value="Qwen-3-235B-T">Qwen-3-235B-T</option>
                        <option value="Reka-Core">Reka-Core</option>
                        <option value="Solar-Pro">Solar-Pro</option>
                        <option value="Tako">Tako</option>
                        <option value="Aya-Expanse-32B">Aya-Expanse-32B</option>
                        <option value="Command-R-Plus">Command-R-Plus</option>
                        <option value="DeepClaude">DeepClaude</option>
                        <option value="DeepSeek-V3">DeepSeek-V3</option>
                        <option value="Gemma-3-27B">Gemma-3-27B</option>
                        <option value="Kimi-K2-Instruct">Kimi-K2-Instruct</option>
                        <option value="Kimi-K2-T">Kimi-K2-T</option>
                    </select>
                </div>
                <div id="cost-exotica" class="cost-badge text-white text-xs px-2 py-1 rounded-full mt-1 hidden"></div>
            </div>

            <!-- Web Search -->
            <div class="dropdown-container">
                <label class="block text-sm font-medium mb-2">Web Search</label>
                <div class="flex items-center gap-2">
                    <input type="checkbox" id="enable-search1" class="model-checkbox" data-category="search1">
                    <select id="model-search1" class="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-base">
                        <option value="">Select Model</option>
                        <option value="Web-Search">Web-Search</option>
                        <option value="Gemini-2.5-Pro">Gemini-2.5-Pro</option>
                        <option value="Gemini-2.5-Flash">Gemini-2.5-Flash</option>
                        <option value="Gemini-2.5-Flash-Lite-Preview">Gemini-2.5-Flash-Lite-Preview</option>
                        <option value="Gemini-2.0-Flash">Gemini-2.0-Flash</option>
                        <option value="GPT-4o-Search">GPT-4o-Search</option>
                        <option value="Claude-Opus-4-Search">Claude-Opus-4-Search</option>
                        <option value="Claude-Sonnet-4-Search">Claude-Sonnet-4-Search</option>
                        <option value="Perplexity-Sonar-Rsn">Perplexity-Sonar-Rsn</option>
                        <option value="Perplexity-Sonar">Perplexity-Sonar</option>
                        <option value="GPT-Researcher">GPT-Researcher</option>
                        <option value="Perplexity-Sonar-Pro">Perplexity-Sonar-Pro</option>
                        <option value="Perplexity-Sonar-Rsn-Pro">Perplexity-Sonar-Rsn-Pro</option>
                    </select>
                    <span class="text-blue-500 text-sm px-2">[Search]</span>
                </div>
                <div id="cost-search1" class="cost-badge text-white text-xs px-2 py-1 rounded-full mt-1 hidden"></div>
            </div>

            <!-- Web Search 2 -->
            <div class="dropdown-container">
                <label class="block text-sm font-medium mb-2">Web Search 2</label>
                <div class="flex items-center gap-2">
                    <input type="checkbox" id="enable-search2" class="model-checkbox" data-category="search2">
                    <select id="model-search2" class="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-base">
                        <option value="">Select Model</option>
                        <option value="Claude-Sonnet-3.7-Search">Claude-Sonnet-3.7-Search</option>
                        <option value="Claude-Sonnet-3.5-Search">Claude-Sonnet-3.5-Search</option>
                        <option value="Claude-Haiku-3.5-Search">Claude-Haiku-3.5-Search</option>
                        <option value="GPT-4o-mini-Search">GPT-4o-mini-Search</option>
                        <option value="Gemini-1.5-Pro-Search">Gemini-1.5-Pro-Search</option>
                        <option value="Gemini-1.5-Flash-Search">Gemini-1.5-Flash-Search</option>
                        <option value="Reka-Research">Reka-Research</option>
                        <option value="ChatGPT-4o-Latest">ChatGPT-4o-Latest</option>
                    </select>
                    <span class="text-blue-500 text-sm px-2">[Search]</span>
                </div>
                <div id="cost-search2" class="cost-badge text-white text-xs px-2 py-1 rounded-full mt-1 hidden"></div>
            </div>
        </div>

        <!-- Cost Summary -->
        <div class="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 p-4 rounded-lg mb-6">
            <div class="flex justify-between items-center">
                <div>
                    <span class="text-lg font-semibold">Total Cost: </span>
                    <span id="total-cost" class="text-2xl font-bold text-purple-600">0 points</span>
                </div>
                <div class="flex gap-2">
                    <button id="select-all" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                        Select All
                    </button>
                    <button id="clear-all" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                        Clear All
                    </button>
                </div>
            </div>
        </div>

        <!-- Input Section -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div class="lg:col-span-2">
                <label for="main-prompt" class="block text-sm font-medium mb-2">Main Prompt</label>
                <textarea id="main-prompt" rows="6" class="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-base" placeholder="Enter your refined query here..."></textarea>
            </div>
            <div>
                <label for="system-prompt" class="block text-sm font-medium mb-2">System Instructions</label>
                <textarea id="system-prompt" rows="6" class="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-base" placeholder="Optional system prompt or instructions..."></textarea>
            </div>
        </div>

        <!-- Generate Buttons -->
        <div class="flex flex-col items-center gap-4 mb-8">
            <div class="flex justify-center gap-4">
                <button id="websearch-btn" class="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                    Web Search
                </button>
                <button id="analysis-btn" class="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                    Analysis
                </button>
                <button id="copy-all-btn" class="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                    Copy All
                </button>
            </div>
        </div>

        <!-- Response Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mb-6">
            <!-- VG's Choice Response -->
            <div class="response-container" data-category="vg">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="font-semibold text-lg">VG's Choice</h3>
                    <button class="copy-individual px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors" data-category="vg">
                        Copy
                    </button>
                </div>
                <div id="response-vg" class="response-box p-4 rounded-lg bg-gray-50 dark:bg-gray-800 overflow-auto">
                    <p class="text-gray-500 dark:text-gray-400 italic">Select a model and generate to see response</p>
                </div>
            </div>

            <!-- Some good ones Response -->
            <div class="response-container" data-category="good">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="font-semibold text-lg">Some good ones</h3>
                    <button class="copy-individual px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors" data-category="good">
                        Copy
                    </button>
                </div>
                <div id="response-good" class="response-box p-4 rounded-lg bg-gray-50 dark:bg-gray-800 overflow-auto">
                    <p class="text-gray-500 dark:text-gray-400 italic">Select a model and generate to see response</p>
                </div>
            </div>

            <!-- Gemini Choice Response -->
            <div class="response-container" data-category="gemini">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="font-semibold text-lg">Gemini Choice</h3>
                    <button class="copy-individual px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors" data-category="gemini">
                        Copy
                    </button>
                </div>
                <div id="response-gemini" class="response-box p-4 rounded-lg bg-gray-50 dark:bg-gray-800 overflow-auto">
                    <p class="text-gray-500 dark:text-gray-400 italic">Select a model and generate to see response</p>
                </div>
            </div>

            <!-- Exotica Response -->
            <div class="response-container" data-category="exotica">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="font-semibold text-lg">Exotica</h3>
                    <button class="copy-individual px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors" data-category="exotica">
                        Copy
                    </button>
                </div>
                <div id="response-exotica" class="response-box p-4 rounded-lg bg-gray-50 dark:bg-gray-800 overflow-auto">
                    <p class="text-gray-500 dark:text-gray-400 italic">Select a model and generate to see response</p>
                </div>
            </div>

            <!-- Web Search Response -->
            <div class="response-container" data-category="search1">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="font-semibold text-lg">Web Search</h3>
                    <button class="copy-individual px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors" data-category="search1">
                        Copy
                    </button>
                </div>
                <div id="response-search1" class="response-box p-4 rounded-lg bg-gray-50 dark:bg-gray-800 overflow-auto">
                    <p class="text-gray-500 dark:text-gray-400 italic">Select a model and generate to see response</p>
                </div>
            </div>

            <!-- Web Search 2 Response -->
            <div class="response-container" data-category="search2">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="font-semibold text-lg">Web Search 2</h3>
                    <button class="copy-individual px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors" data-category="search2">
                        Copy
                    </button>
                </div>
                <div id="response-search2" class="response-box p-4 rounded-lg bg-gray-50 dark:bg-gray-800 overflow-auto">
                    <p class="text-gray-500 dark:text-gray-400 italic">Select a model and generate to see response</p>
                </div>
            </div>
        </div>

        <!-- Debug Log -->
        <div class="mt-8 mb-4">
            <button id="toggle-log" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                Show Debug Log
            </button>
            <div id="debug-log" class="hidden mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border max-h-60 overflow-y-auto">
                <div class="text-xs font-mono" id="log-content">Debug log will appear here...</div>
            </div>
        </div>
    </div>

    <!-- Success Notification -->
    <div id="notification" class="notification">
        Copied to clipboard!
    </div>

    <script>
        // Dark mode handling
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

        // Model cost data
        const modelCosts = {
            'Assistant': 'Variable',
            'App-Creator': '24+',
            'GPT-4.1': '196+',
            'GPT-4o': 'Variable',
            'o3-pro': '4242+',
            'o4-mini': '255+',
            'o3': '425+',
            'Claude-Opus-4': '4951+',
            'Claude-Sonnet-4': '938+',
            'Gemini-2.5-Pro': '335+',
            'Gemini-2.5-Flash': '9+',
            'GPT-Image-1': 'Variable',
            'DeepSeek-V3': '415',
            'Llama-4-Scout-B10': '100',
            'Llama-4-Maverick': '50',
            'Grok-3': '907+',
            'Grok-3-Mini': '39+',
            'Claude-Opus-4-Reasoning': 'N/A',
            'Claude-Sonnet-4-Reasoning': '1628+',
            'Deepseek-V3-FW': '300',
            'GPT-4.5-Preview': '6146+',
            'GPT-4.1-mini': '28+',
            'GPT-4.1-nano': '8+',
            'Llama-4-Scout-T': '35',
            'Llama-3-70b-Groq': '75',
            'Llama-4-Scout-nitro': '350',
            'Claude-Sonnet-3.7': '1044+',
            'Claude-Sonnet-3.5': '297+',
            'Claude-Haiku-3.5': 'N/A',
            'Claude-Opus-4-Search': '1134+',
            'Claude-Sonnet-4-Search': '227+',
            'Gemini-2.0-Flash': '7+',
            'Gemini-2.0-Flash-Preview': '2',
            'Qwen-3-235B-T': '63',
            'MiniMax-M1': '100+',
            'o1': '4120+',
            'o1-pro': '54420+',
            'o1-mini': '385+',
            'ChatGPT-4o-Latest': '345+',
            'GPT-4o-mini': '7+',
            'o3-mini-high': '508+',
            'o3-mini': '244+',
            'Claude-Sonnet-3.7-Reasoning': '2371+',
            'Inception-Mercury-Coder': '14+',
            'Mistral-Medium': '181+',
            'Llama-4-Scout': '30',
            'Llama-3.3-70B-FW': '140',
            'Llama-3.3-70B': '130',
            'DeepSeek-R1': '600',
            'DeepSeek-R1-FW': '600',
            'DeepSeek-R1-DI': '200',
            'GPT-Researcher': 'Variable',
            'Gemini-1.5-Pro': '32+',
            'Web-Search': 'Variable',
            'GPT-4o-Search': '1235+',
            'GPT-4o-mini-Search': '836+',
            'Perplexity-Sonar-Pro': '1667',
            'Perplexity-Sonar-Rsn-Pro': '2967',
            'Perplexity-Sonar-Rsn': '1234',
            'FLUX-pro-1.1-ultra': '2000',
            'DeepSeek-R1-Distill': '150',
            'Claude-Haiku-3': '20+',
            'GPT-3.5-Turbo': '14+',
            'Grok-4': '773+',
            'Mistral-7B-v0.3-T': '45',
            'Llama-3-8b-Groq': '10',
            'Llama-3.1-405B': '65+',
            'Mistral-Large-2': '231+',
            'Hermes-3-70B': 'N/A',
            'Llama-3.1-Nemotron': '200',
            'Llama-4-Maverick-B10': 'N/A',
            'Lyria': 'Variable',
            'MarkItDown': 'Variable',
            'Minimax-M1': '100+',
            'Mixtral8x22b-Inst-FW': '120',
            'Perplexity-R1-1776': 'N/A',
            'Phi-4-DI': 'N/A',
            'Python': 'Variable',
            'Reka-Core': '1250',
            'Solar-Pro': '35',
            'Tako': 'N/A',
            'Aya-Expanse-32B': 'N/A',
            'Command-R-Plus': '1130',
            'DeepClaude': 'N/A',
            'Gemma-3-27B': 'N/A',
            'Kimi-K2-Instruct': 'N/A',
            'Kimi-K2-T': 'N/A',
            'Gemini-2.5-Flash-Lite-Preview': 'N/A',
            'Claude-Sonnet-3.7-Search': 'N/A',
            'Claude-Sonnet-3.5-Search': 'N/A',
            'Claude-Haiku-3.5-Search': 'N/A',
            'Perplexity-Sonar': 'N/A',
            'Gemini-1.5-Pro-Search': '47+',
            'Gemini-1.5-Flash-Search': '4+',
            'Reka-Research': 'N/A',
            'o1-preview': '7242+'
        };

        // Role-specific system instructions using XML framework
        const WEB_SEARCH_INSTRUCTION = `You are an Internet Research Specialist. Search current information about the user query and package findings for analysis by other AI models. Provide ONLY a JSON object in this exact format with no additional text explanations or code block formatting. The JSON should contain research summary as brief overview of what you found, key facts as array of five important facts, current context as essential information other models need to answer this query effectively, sources found as array of three sources, confidence as high medium or low, and search timestamp as current date and time. Focus on finding current relevant information. Package findings so other AI models can use them effectively. Ensure accuracy and relevance. Provide ONLY the raw JSON object.`;

        const ANALYSIS_INSTRUCTION = `<role>Analysis Specialist</role>
<task>Provide comprehensive analysis and response to the user's query</task>
<instructions>
- Analyze thoroughly using provided context when available
- Maintain intellectual rigor and accuracy
- Provide detailed, well-reasoned responses
- Draw insights and conclusions confidently
</instructions>`;

        // Simple notification function
        function showNotification(message) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 2000);
        }

        // Update cost display
        function updateCostDisplay(category) {
            const select = document.getElementById(`model-${category}`);
            const costDiv = document.getElementById(`cost-${category}`);
            const selectedModel = select.value;
            
            if (selectedModel && modelCosts[selectedModel]) {
                costDiv.textContent = `${modelCosts[selectedModel]} pts`;
                costDiv.classList.remove('hidden');
            } else {
                costDiv.classList.add('hidden');
            }
            
            updateTotalCost();
        }

        // Update total cost
        function updateTotalCost() {
            const checkboxes = document.querySelectorAll('.model-checkbox:checked');
            let total = 0;
            let hasVariable = false;
            
            checkboxes.forEach(checkbox => {
                const category = checkbox.dataset.category;
                const select = document.getElementById(`model-${category}`);
                const selectedModel = select.value;
                
                if (selectedModel && modelCosts[selectedModel]) {
                    const cost = modelCosts[selectedModel];
                    if (cost === 'Variable' || cost === 'N/A') {
                        hasVariable = true;
                    } else {
                        const numericCost = parseInt(cost.replace(/[^0-9]/g, '')) || 0;
                        total += numericCost;
                    }
                }
            });
            
            const totalCostEl = document.getElementById('total-cost');
            if (hasVariable) {
                totalCostEl.textContent = `${total}+ points (+ variable costs)`;
            } else {
                totalCostEl.textContent = `${total}+ points`;
            }
        }

        // Copy to clipboard
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification('Copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy: ', err);
                showNotification('Copy failed');
            });
        }

        // Event listeners for model selection
        const categories = ['vg', 'good', 'gemini', 'exotica', 'search1', 'search2'];
        
        categories.forEach(category => {
            const select = document.getElementById(`model-${category}`);
            const checkbox = document.getElementById(`enable-${category}`);
            
            select.addEventListener('change', () => updateCostDisplay(category));
            checkbox.addEventListener('change', updateTotalCost);
        });

        // Select All / Clear All
        document.getElementById('select-all').addEventListener('click', () => {
            const checkboxes = document.querySelectorAll('.model-checkbox');
            checkboxes.forEach(cb => {
                cb.checked = true;
                const category = cb.dataset.category;
                const select = document.getElementById(`model-${category}`);
                if (select.options.length > 1) {
                    select.selectedIndex = 1; // Select first non-empty option
                }
                updateCostDisplay(category);
            });
        });

        document.getElementById('clear-all').addEventListener('click', () => {
            const checkboxes = document.querySelectorAll('.model-checkbox');
            const selects = document.querySelectorAll('select[id^="model-"]');
            checkboxes.forEach(cb => cb.checked = false);
            selects.forEach(select => select.selectedIndex = 0);
            categories.forEach(category => {
                document.getElementById(`cost-${category}`).classList.add('hidden');
            });
            updateTotalCost();
        });

        // Individual copy buttons
        document.querySelectorAll('.copy-individual').forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                const responseEl = document.getElementById(`response-${category}`);
                const content = responseEl.textContent || responseEl.innerText;
                
                if (content.trim() && !content.includes('Select a model')) {
                    copyToClipboard(content);
                } else {
                    showNotification('No response to copy yet');
                }
            });
        });

        // Debug logging functions
        function logToDebug(message) {
            const logContent = document.getElementById('log-content');
            const timestamp = new Date().toLocaleTimeString();
            logContent.innerHTML += `[${timestamp}] ${message}<br>`;
            logContent.scrollTop = logContent.scrollHeight;
            console.log(`[DEBUG] ${message}`);
        }

        // Toggle debug log visibility
        document.getElementById('toggle-log').addEventListener('click', () => {
            const debugLog = document.getElementById('debug-log');
            const toggleBtn = document.getElementById('toggle-log');
            
            if (debugLog.classList.contains('hidden')) {
                debugLog.classList.remove('hidden');
                toggleBtn.textContent = 'Hide Debug Log';
            } else {
                debugLog.classList.add('hidden');
                toggleBtn.textContent = 'Show Debug Log';
            }
        });

        // Copy all responses
        document.getElementById('copy-all-btn').addEventListener('click', () => {
            const mainPrompt = document.getElementById('main-prompt').value;
            const systemPrompt = document.getElementById('system-prompt').value;
            let allContent = '';
            
            if (mainPrompt) {
                allContent += `Query: ${mainPrompt}\n\n`;
            }
            
            if (systemPrompt) {
                allContent += `Instructions: ${systemPrompt}\n\n`;
            }
            
            const responseContainers = document.querySelectorAll('.response-container');
            responseContainers.forEach(container => {
                const category = container.dataset.category;
                const categoryName = container.querySelector('h3').textContent;
                const response = document.getElementById(`response-${category}`);
                const content = response.textContent || response.innerText;
                
                if (content.trim() && !content.includes('Select a model')) {
                    allContent += `${categoryName}:\n${content}\n\n---\n\n`;
                }
            });
            
            if (allContent.trim()) {
                copyToClipboard(allContent);
            } else {
                showNotification('No responses to copy yet');
            }
        });

        // Generate responses for category - FIXED to actually wait for completion
        async function generateResponseForCategory(category, isWebSearchOnly = false) {
            return new Promise(async (resolve, reject) => {
                logToDebug(`ENTERING generateResponseForCategory for ${category}`);
                
                const checkbox = document.getElementById(`enable-${category}`);
                const select = document.getElementById(`model-${category}`);
                const responseEl = document.getElementById(`response-${category}`);
                
                logToDebug(`Elements found - checkbox: ${!!checkbox}, select: ${!!select}, responseEl: ${!!responseEl}`);
                logToDebug(`Checkbox checked: ${checkbox?.checked}, select value: ${select?.value}`);
                
                if (!checkbox.checked || !select.value) {
                    logToDebug(`Skipping ${category} - not enabled or no model selected`);
                    resolve();
                    return;
                }
                
                const mainPrompt = document.getElementById('main-prompt').value;
                const systemPrompt = document.getElementById('system-prompt').value;
                
                logToDebug(`Prompts - main: ${mainPrompt.length} chars, system: ${systemPrompt.length} chars`);
                
                if (!mainPrompt.trim()) {
                    logToDebug(`Empty main prompt for ${category}`);
                    showNotification('Please enter a main prompt');
                    resolve();
                    return;
                }
                
                // Show loading state
                logToDebug(`Setting loading state for ${category}`);
                responseEl.innerHTML = '<div class="flex items-center justify-center"><div class="loading-spinner"></div><span class="ml-2">Generating response...</span></div>';
                responseEl.parentElement.querySelector('.response-box').classList.add('active');
                
                logToDebug(`Starting API generation for ${category} with model ${select.value}`);
                
                try {
                    // Check if Poe API is available
                    logToDebug(`Checking Poe API availability...`);
                    if (!window.Poe) {
                        logToDebug(`window.Poe is not available`);
                        throw new Error('window.Poe not available');
                    }
                    if (!window.Poe.sendUserMessage) {
                        logToDebug(`window.Poe.sendUserMessage is not available`);
                        throw new Error('sendUserMessage not available');
                    }
                    logToDebug(`Poe API is available`);
                    
                    // Construct role-specific XML prompt
                    let cleanPrompt = mainPrompt.replace(/^#+\s/gm, ''); // Remove markdown headers
                    let fullPrompt = `@${select.value} `;
                    
                    // Use role-specific instructions based on category
                    if (isWebSearchOnly) {
                        // Web search models get JSON output instructions
                        fullPrompt += WEB_SEARCH_INSTRUCTION + '\n\n';
                        if (systemPrompt) {
                            fullPrompt += `<additional_context>${systemPrompt}</additional_context>\n\n`;
                        }
                        fullPrompt += `<query>${cleanPrompt}</query>`;
                    } else {
                        // Regular models get analysis instructions
                        fullPrompt += ANALYSIS_INSTRUCTION + '\n\n';
                        if (systemPrompt) {
                            fullPrompt += `<additional_context>${systemPrompt}</additional_context>\n\n`;
                        }
                        
                        // Add web search context if available
                        if (Object.keys(webSearchResults).length > 0) {
                            fullPrompt += '<web_search_findings>\n';
                            Object.entries(webSearchResults).forEach(([searchCategory, content]) => {
                                try {
                                    // Try to parse as JSON first
                                    const jsonData = JSON.parse(content);
                                    fullPrompt += `Research Summary: ${jsonData.research_summary || 'N/A'}\n`;
                                    fullPrompt += `Key Facts: ${Array.isArray(jsonData.key_facts) ? jsonData.key_facts.join(', ') : 'N/A'}\n`;
                                    fullPrompt += `Context: ${jsonData.current_context || 'N/A'}\n`;
                                    fullPrompt += `Confidence: ${jsonData.confidence || 'N/A'}\n\n`;
                                } catch (e) {
                                    // Fallback to raw text if not JSON
                                    const categoryName = searchCategory === 'websearch' ? 'Web Search 1' : 'Web Search 2';
                                    fullPrompt += `${categoryName} Results: ${content}\n\n`;
                                }
                            });
                            fullPrompt += '</web_search_findings>\n\n';
                            logToDebug(`Added structured web search context to ${category}: ${Object.keys(webSearchResults).length} results`);
                        }
                        
                        fullPrompt += `<query>${cleanPrompt}</query>`;
                    }
                    
                    logToDebug(`Final prompt for ${category}: ${fullPrompt.length} chars starting with: ${fullPrompt.substring(0, 100)}...`);
                    
                    // Register unique handler for this response
                    const handlerName = `response-${category}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                    
                    logToDebug(`Registering handler: ${handlerName}`);
                    
                    window.Poe.registerHandler(handlerName, (result) => {
                        logToDebug(`Handler ${handlerName} received result: ${JSON.stringify(result)}`);
                        
                        const msg = result.responses[0];
                        logToDebug(`Message status: ${msg.status}, content length: ${msg.content?.length || 0}`);
                        
                        if (msg.status === 'error') {
                            logToDebug(`Error response for ${category}: ${msg.statusText || msg.content}`);
                            responseEl.innerHTML = `<div class="text-red-500"><strong>Error:</strong> ${msg.statusText || msg.content}</div>`;
                            responseEl.parentElement.querySelector('.response-box').classList.remove('active');
                            // RESOLVE even on error so we don't hang
                            resolve();
                        } else if (msg.status === 'incomplete') {
                            logToDebug(`Incomplete response for ${category}, updating UI`);
                            try {
                                const modelName = msg.senderId || select.value;
                                responseEl.innerHTML = `<div class="text-xs text-gray-500 mb-2"><strong>Model:</strong> ${modelName}</div>` + marked.parse(msg.content);
                            } catch (e) {
                                logToDebug(`Markdown parse error for ${category}: ${e.message}`);
                                responseEl.innerHTML = msg.content; // Fallback to plain text
                            }
                            // Don't resolve yet - wait for complete
                        } else if (msg.status === 'complete') {
                            logToDebug(`Complete response for ${category}`);
                            try {
                                const modelName = msg.senderId || select.value;
                                responseEl.innerHTML = `<div class="text-xs text-gray-500 mb-2"><strong>Model:</strong> ${modelName}</div>` + marked.parse(msg.content);
                            } catch (e) {
                                logToDebug(`Markdown parse error for ${category}: ${e.message}`);
                                responseEl.innerHTML = msg.content;
                            }
                            responseEl.parentElement.querySelector('.response-box').classList.remove('active');
                            // NOW resolve - response is actually complete
                            logToDebug(`RESOLVING Promise for ${category} - response complete`);
                            resolve();
                        }
                    });
                    
                    // Add timeout for stuck responses
                    const timeoutId = setTimeout(() => {
                        logToDebug(`Timeout for ${category} - no response received`);
                        responseEl.innerHTML = '<div class="text-yellow-600"><strong>Timeout:</strong> Response taking longer than expected. This might be a Poe server issue. Try again later.</div>';
                        responseEl.parentElement.querySelector('.response-box').classList.remove('active');
                        // RESOLVE on timeout so we don't hang forever
                        resolve();
                    }, 180000); // 3 minutes timeout
                    
                    // Send the message
                    logToDebug(`Sending message for ${category}...`);
                    const result = await window.Poe.sendUserMessage(fullPrompt, {
                        handler: handlerName,
                        stream: true,
                        openChat: false
                    });
                    
                    logToDebug(`Message sent for ${category}, result: ${JSON.stringify(result)}`);
                    // DON'T resolve here - wait for handler to get 'complete' status
                    
                } catch (error) {
                    logToDebug(`ERROR in generateResponseForCategory for ${category}: ${error.message}`);
                    logToDebug(`Error stack: ${error.stack}`);
                    
                    responseEl.innerHTML = `<div class="text-red-500"><strong>Error:</strong> ${error.message}<br><small>Check debug log for details.</small></div>`;
                    responseEl.parentElement.querySelector('.response-box').classList.remove('active');
                    
                    // Additional debugging info
                    logToDebug(`Available Poe methods: ${window.Poe ? Object.keys(window.Poe).join(', ') : 'Poe not available'}`);
                    logToDebug(`Error type: ${error.constructor.name}`);
                    
                    // RESOLVE on error so we don't hang
                    resolve();
                }
            });
        }

        // Web search result storage
        let webSearchResults = {};

        // Web Search Button - Fire and forget for web search models only
        document.getElementById('websearch-btn').addEventListener('click', () => {
            logToDebug('WEB SEARCH BUTTON CLICKED!');
            
            const mainPrompt = document.getElementById('main-prompt').value;
            if (!mainPrompt.trim()) {
                showNotification('Please enter a main prompt');
                return;
            }
            
            // Clear previous web search results
            webSearchResults = {};
            
            const webSearchCategories = ['search1', 'search2'];
            let activeWebSearches = 0;
            
            webSearchCategories.forEach(category => {
                const checkbox = document.getElementById(`enable-${category}`);
                const select = document.getElementById(`model-${category}`);
                
                if (checkbox.checked && select.value) {
                    activeWebSearches++;
                    logToDebug(`Starting web search for ${category}`);
                    
                    // Fire and forget - no await, no chaining
                    generateResponseForCategory(category, true).then(() => {
                        logToDebug(`Web search completed for ${category}`);
                        
                        // Collect result
                        const responseEl = document.getElementById(`response-${category}`);
                        if (responseEl) {
                            const content = responseEl.textContent || responseEl.innerText;
                            if (content && !content.includes('Select a model') && !content.includes('Generating response')) {
                                webSearchResults[category] = content;
                                logToDebug(`Collected web search result for ${category}: ${content.length} chars`);
                            }
                        }
                    }).catch(error => {
                        logToDebug(`Web search error for ${category}: ${error.message}`);
                    });
                }
            });
            
            if (activeWebSearches === 0) {
                showNotification('Please select at least one web search model');
            } else {
                showNotification(`Running ${activeWebSearches} web search models...`);
            }
        });

        // Analysis Button - Fire and forget for analysis models with cumulative web search results
        document.getElementById('analysis-btn').addEventListener('click', () => {
            logToDebug('ANALYSIS BUTTON CLICKED!');
            
            const mainPrompt = document.getElementById('main-prompt').value;
            if (!mainPrompt.trim()) {
                showNotification('Please enter a main prompt');
                return;
            }
            
            const analysisCategories = ['vg', 'good', 'gemini', 'exotica'];
            let activeAnalyses = 0;
            
            analysisCategories.forEach(category => {
                const checkbox = document.getElementById(`enable-${category}`);
                const select = document.getElementById(`model-${category}`);
                
                if (checkbox.checked && select.value) {
                    activeAnalyses++;
                    logToDebug(`Starting analysis for ${category}`);
                    
                    // Fire and forget - no await, no chaining
                    generateResponseForCategory(category, false).then(() => {
                        logToDebug(`Analysis completed for ${category}`);
                    }).catch(error => {
                        logToDebug(`Analysis error for ${category}: ${error.message}`);
                    });
                }
            });
            
            if (activeAnalyses === 0) {
                showNotification('Please select at least one analysis model');
            } else {
                const webSearchCount = Object.keys(webSearchResults).length;
                if (webSearchCount > 0) {
                    showNotification(`Running ${activeAnalyses} analysis models with ${webSearchCount} web search results...`);
                } else {
                    showNotification(`Running ${activeAnalyses} analysis models...`);
                }
            }
        });

        // Debug: Log when page loads
        console.log('AI Model Aggregator loaded');
        console.log('Poe API available:', !!window.Poe);
        if (window.Poe) {
            console.log('Poe methods:', Object.keys(window.Poe));
        }
    </script>
</body>
</html>

```

## Metadata
- **Extracted**: 2025-07-27T19:15:32.289Z
- **Source**: https://poe.com/edit_bot?bot=VG-CUL
- **Bot Type**: Canvas App
- **Code Length**: 49604 characters

---
*Extracted using VG Canvas App Extractor*
