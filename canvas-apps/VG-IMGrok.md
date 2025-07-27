Name: VG-IMGrok
Description: Multi image generation engine aggregator. Choose up to 10 state of the art engines for a single prompt and see the output simultaneously.
Code:<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Prompt Rotator & Multi-Model Image Generator</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#5D5CDE',
                        'bg-light': '#FFFFFF',
                        'bg-dark': '#181818',
                        'tag-bold': '#8B5CF6'
                    }
                }
            },
            darkMode: 'class'
        }
    </script>
</head>
<body class="bg-bg-light dark:bg-bg-dark text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-200">
    <div class="container mx-auto px-4 py-6 max-w-7xl">
        <!-- Header -->
        <div class="text-center mb-6">
            <h1 class="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                AI Prompt Rotator & Multi-Model Image Generator
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
                Systematic prompt variation with multi-model image generation
            </p>
        </div>

        <!-- Main Grid Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            
            <!-- Left Panel: Prompt Rotation & Controls -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h2 class="text-xl font-semibold mb-4">Prompt Rotation & Analysis</h2>
                
                <!-- Original Prompt Input -->
                <div class="mb-4">
                    <div class="flex justify-between items-center mb-2">
                        <label class="block text-sm font-semibold">Original Prompt:</label>
                        <div class="flex gap-2">
                            <button 
                                id="copyOriginalPrompt" 
                                class="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors"
                                title="Copy original prompt"
                            >
                                📋
                            </button>
                            <button 
                                id="clearPrompt" 
                                class="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors"
                            >
                                🗑️ Clear
                            </button>
                        </div>
                    </div>
                    <textarea 
                        id="originalPrompt" 
                        class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-base resize-none"
                        rows="4"
                        placeholder="Enter your prompt here... (e.g., 'A magical forest with glowing mushrooms at sunset')"
                    ></textarea>
                </div>

                <!-- Variable Creation Rules -->
                <div class="mb-4">
                    <label class="block text-sm font-semibold mb-2">Variable Creation Rules (Optional):</label>
                    <textarea 
                        id="variableRules" 
                        class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-base resize-none"
                        rows="2"
                        placeholder="e.g., 'Keep all variations within South Asian context' or 'Focus on modern urban settings only'"
                    ></textarea>
                </div>

                <!-- Analysis Controls -->
                <div class="mb-4">
                    <div class="flex items-center gap-3 mb-3">
                        <label class="text-sm font-medium">Analysis Model:</label>
                        <select id="analysisModel" class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-sm">
                            <option value="VG-IMGWIZ">VG-IMGWIZ</option>
                            <option value="Grok-4">Grok-4</option>
                            <option value="Deepseek-V3-FW">Deepseek-V3-FW</option>
                            <option value="Perplexity-Sonar">Perplexity-Sonar</option>
                            <option value="Mixtral8x22b-Inst-FW">Mixtral8x22b-Inst-FW</option>
                            <option value="Claude-Haiku-3">Claude-Haiku-3</option>
                        </select>
                    </div>
                    
                    <div class="flex gap-2 flex-wrap">
                        <button 
                            id="addChoiceBtn" 
                            class="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                        >
                            ✨ Add "Of Your Choice"
                        </button>
                        <button 
                            id="analyzeBtn" 
                            class="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                            🔍 Analyze Variables
                        </button>

                        <button 
                            id="feedBtn" 
                            class="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                            ⬇️ Feed
                        </button>
                        <button 
                            id="repeatBtn" 
                            class="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
                        >
                            ⬆️ Repeat
                        </button>
                        <button 
                            id="importStateBtn" 
                            class="px-3 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors text-sm"
                        >
                            📥 Import State
                        </button>
                    </div>
                </div>

                <!-- Loading State -->
                <div id="analysisLoading" class="hidden mb-4">
                    <div class="flex items-center text-blue-600">
                        <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                        <span id="analysisStatus">Analyzing prompt...</span>
                    </div>
                </div>

                <!-- Variable Controls Container -->
                <div id="variableControls" class="hidden">
                    <h3 class="text-lg font-medium mb-3">Rotation Variables:</h3>
                    <div id="variableList" class="space-y-3 mb-4 max-h-96 overflow-y-auto">
                        <!-- Variables will be populated here -->
                    </div>
                    
                    <!-- Navigation Controls -->
                    <div class="flex gap-3 items-center">
                        <button id="prevCombo" class="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm">← Prev</button>
                        <span id="comboCounter" class="px-3 py-1 text-center bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium">1 / 1</span>
                        <button id="nextCombo" class="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm">Next →</button>
                    </div>
                    
                    <!-- Add More Variables Button (only visible when variables exist) -->
                    <div class="mb-4">
                        <button 
                            id="addMoreVariablesBtn" 
                            class="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                        >
                            ➕ Add More Variables
                        </button>
                    </div>

                    <!-- Copy Rotated Prompt Button -->
                    <div class="mt-4">
                        <button 
                            id="copyRotatedPrompt" 
                            class="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            📋
                        </button>
                    </div>
                </div>
            </div>

            <!-- Right Panel: Image Generation -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h2 class="text-xl font-semibold mb-4">Multi-Model Image Generation</h2>
                
                <!-- Model Selection -->
                <div class="mb-4">
                    <div class="flex justify-between items-center mb-3">
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Choose AI Models
                        </label>
                        <div class="flex gap-2 flex-wrap">
                            <button id="selectAll" class="text-xs px-3 py-1 bg-primary text-white rounded-lg hover:bg-purple-600 transition-colors">
                                Select All
                            </button>
                            <button id="creatorsChoice" class="text-xs px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors">
                                Creator's Choice
                            </button>
                            <button id="imagenChoice" class="text-xs px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-colors">
                                Ima
                            </button>
                            <button id="clearAll" class="text-xs px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                                Clear All
                            </button>
                        </div>
                    </div>
                    
                    <!-- Model Group -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 mb-3 max-h-80 overflow-y-auto" id="modelGroup">
                        <!-- Models will be populated here -->
                    </div>
                    
                    <div class="text-sm">
                        <div id="selectedCount" class="text-primary font-semibold">0 models selected, 0 points</div>  
                    </div>
                </div>

                <!-- Current Prompt Display -->
                <div class="mb-4">
                    <div class="flex justify-between items-center mb-2">
                        <label for="promptInput" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Current Image Prompt (Editable)
                        </label>
                        <button 
                            id="copyImagePrompt" 
                            class="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors"
                            title="Copy image prompt"
                        >
                            📋
                        </button>
                    </div>
                    <textarea 
                        id="promptInput" 
                        rows="3" 
                        placeholder="Generated prompt will appear here, or enter your own..."
                        class="w-full px-3 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none transition-all duration-200"
                    ></textarea>
                </div>

                <!-- Custom Enhancement Rules -->
                <div class="mb-3">
                    <label for="enhancementRules" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Custom Enhancement Rules (Optional)
                    </label>
                    <textarea 
                        id="enhancementRules"
                        class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm resize-none"
                        rows="2"
                        placeholder="e.g., 'Keep lighting consistent', 'Focus on facial expressions', 'Maintain photorealistic style'"
                    ></textarea>
                </div>

                <!-- Enhance Prompt Buttons -->
                <div class="mb-4 grid grid-cols-2 gap-2">
                    <button 
                        id="formatPromptBtn" 
                        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span id="formatBtnText">📝 Format</span>
                        <div id="formatBtnLoader" class="hidden inline-flex items-center">
                            <svg class="animate-spin -ml-1 mr-1 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span class="text-xs">Formatting...</span>
                        </div>
                    </button>
                    <button 
                        id="hifiEnhanceBtn" 
                        class="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span id="hifiBtnText">🚀 Hi-Fi Enhance</span>
                        <div id="hifiBtnLoader" class="hidden inline-flex items-center">
                            <svg class="animate-spin -ml-1 mr-1 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span class="text-xs">Hi-Fi Enhancing...</span>
                        </div>
                    </button>
                </div>

                <!-- Generate Button -->
                <button 
                    id="generateBtn" 
                    class="w-full bg-primary hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled
                >
                    <span id="btnText">Select Models to Generate Images</span>
                    <div id="btnLoader" class="hidden inline-flex items-center">
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span id="generatingText">Generating with 0 models...</span>
                    </div>
                </button>
            </div>
        </div>

        <!-- Bottom Panel: Generated Images -->
        <div id="resultsSection" class="hidden">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">Generated Images</h2>
                    <div class="flex gap-2">
                        <button id="downloadAssets" class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            <span id="downloadAssetsText">Download Assets</span>
                        </button>
                        <button id="saveState" class="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200">
                            💾 Save State
                        </button>
                        <button id="copyEntireFlow" class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200">
                            📋
                        </button>
                        <button id="generateAnother" class="inline-flex items-center px-4 py-2 bg-primary hover:bg-purple-600 text-white rounded-lg transition-colors duration-200">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                            </svg>
                            Generate More
                        </button>
                    </div>
                </div>
                
                <!-- Images Grid -->
                <div id="imagesGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <!-- Image results will be populated here -->
                </div>

                <!-- Overall Status -->
                <div id="overallStatus" class="text-center py-8">
                    <div class="inline-flex items-center text-gray-600 dark:text-gray-400">
                        <svg class="animate-spin -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <div>
                            <div id="statusText">Starting image generation...</div>
                            <div id="progressText" class="text-sm mt-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Image Modal -->
    <div id="imageModal" class="hidden fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onclick="closeImageModal()">
        <div class="relative max-w-[90vw] max-h-[90vh] bg-white dark:bg-gray-800 rounded-lg p-4">
            <button onclick="closeImageModal()" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold">
                ×
            </button>
            <div class="text-center">
                <h3 id="modalImageTitle" class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100"></h3>
                <img id="modalImage" src="" alt="" class="max-w-full max-h-[75vh] object-contain rounded">
            </div>
        </div>
    </div>

    <script>
        // Dark mode detection
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

        // Available models with detailed information
        const availableModels = {
            '@StableDiffusion3.5-T': {
                name: 'Stable Diffusion 3.5 Turbo',
                description: 'Fast and efficient SD model with good quality',
                cost: 80,
                features: ['Fast generation', 'Efficient', 'Good quality']
            },
            '@Imagen-3': {
                name: 'Imagen 3',
                description: 'Google\'s advanced text-to-image model',
                cost: 100,
                features: ['High quality', 'Google technology', 'Advanced prompting']
            },
            '@Imagen-4-Fast': {
                name: 'Imagen 4 Fast',
                description: 'Faster version of Imagen 4 for quick generation',
                cost: 60,
                features: ['Fast generation', 'High quality', 'Cost effective']
            },
            '@Recraft-V3': {
                name: 'Recraft V3',
                description: 'Advanced vector and design generation',
                cost: 54,
                features: ['Vector graphics', 'Design focused', 'Brand consistency']
            },
            '@Imagen-4': {
                name: 'Imagen 4',
                description: 'Google\'s latest photorealistic model',
                cost: 80,
                features: ['Photorealistic', 'Google technology', 'High fidelity']
            },
            '@Luma-Photon': {
                name: 'Luma Photon',
                description: 'Industry-specific visual excellence',
                cost: 127,
                features: ['Professional standards', 'Industry tailored', 'Multiple aspects']
            },
            '@StableDiffusion3.5-L': {
                name: 'Stable Diffusion 3.5 Large',
                description: 'Most powerful SD model for quality & prompt adherence',
                cost: 369,
                features: ['Highest quality', 'Prompt adherence', 'Large model']
            },
            '@Imagen-4-Ultra-Exp': {
                name: 'Imagen 4 Ultra Exp',
                description: 'DeepMind\'s 2025 model with rich lighting',
                cost: 80,
                features: ['Exceptional adherence', 'Rich lighting', 'Few artifacts']
            },
            '@Seedream-3.0': {
                name: 'Seedream 3.0',
                description: 'ByteDance bilingual text-to-image model',
                cost: 267,
                features: ['Bilingual support', 'Chinese & English', 'High quality']
            },
            '@Flux-Kontext-Pro': {
                name: 'FLUX Kontext Pro',
                description: 'State-of-the-art with flawless typography',
                cost: 267,
                features: ['Photorealistic', 'Typography', 'Image editing']
            },
            '@Flux-Kontext-Max': {
                name: 'FLUX Kontext Max',
                description: 'Premium model with maximum performance',
                cost: 534,
                features: ['Maximum performance', 'Premium quality', 'All aspects']
            },
            '@Ideogram-v3': {
                name: 'Ideogram v3',
                description: 'High-quality images, posters, logos, typography handling',
                cost: 400,
                features: ['High quality', 'Typography', 'Commercial use']
            },
            '@Hidream-I1-full': {
                name: 'Hidream I1 full',
                description: 'State-of-the-art text-to-image model',
                cost: 284,
                features: ['State-of-the-art', 'Aspect ratio support', 'Negative prompt']
            }
        };

        // Global state
        let currentVariables = [];
        let currentCombination = 0;
        let totalCombinations = 0;
        let originalPrompt = '';
        let selectedModels = new Set();
        let generationResults = new Map();
        let isGridInitialized = false;

        // DOM elements
        const elements = {
            originalPrompt: document.getElementById('originalPrompt'),
            analysisModel: document.getElementById('analysisModel'),
            analyzeBtn: document.getElementById('analyzeBtn'),
            addChoiceBtn: document.getElementById('addChoiceBtn'),
            enhancePromptBtn: document.getElementById('enhancePromptBtn'),
            enhanceBtnText: document.getElementById('enhanceBtnText'),
            enhanceBtnLoader: document.getElementById('enhanceBtnLoader'),
            analysisLoading: document.getElementById('analysisLoading'),
            analysisStatus: document.getElementById('analysisStatus'),
            variableControls: document.getElementById('variableControls'),
            variableList: document.getElementById('variableList'),
            prevCombo: document.getElementById('prevCombo'),
            nextCombo: document.getElementById('nextCombo'),
            comboCounter: document.getElementById('comboCounter'),
            copyRotatedPrompt: document.getElementById('copyRotatedPrompt'),
            clearPrompt: document.getElementById('clearPrompt'),
            promptInput: document.getElementById('promptInput'),
            generateBtn: document.getElementById('generateBtn'),
            btnText: document.getElementById('btnText'),
            btnLoader: document.getElementById('btnLoader'),
            generatingText: document.getElementById('generatingText'),
            resultsSection: document.getElementById('resultsSection'),
            imagesGrid: document.getElementById('imagesGrid'),
            overallStatus: document.getElementById('overallStatus'),
            statusText: document.getElementById('statusText'),
            progressText: document.getElementById('progressText'),
            generateAnother: document.getElementById('generateAnother'),
            selectedCount: document.getElementById('selectedCount'),
            selectAll: document.getElementById('selectAll'),
            creatorsChoice: document.getElementById('creatorsChoice'),
            clearAll: document.getElementById('clearAll'),
            modelGroup: document.getElementById('modelGroup'),
            feedBtn: document.getElementById('feedBtn'),
            repeatBtn: document.getElementById('repeatBtn'),
            copyEntireFlow: document.getElementById('copyEntireFlow'),
            downloadAssets: document.getElementById('downloadAssets'),
            downloadAssetsText: document.getElementById('downloadAssetsText')
        };

        // Poe API handlers
        window.Poe.registerHandler("analysis-handler", handleAnalysisResponse);
        window.Poe.registerHandler("multi-image-handler", handleImageResponse);

        // Custom alert function (no alert() allowed)
        function showAlert(message) {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            modal.innerHTML = `
                <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
                    <p class="text-gray-700 dark:text-gray-300 mb-4">${message}</p>
                    <div class="flex justify-end">
                        <button class="px-4 py-2 bg-primary text-white hover:bg-purple-600 rounded" onclick="this.closest('.fixed').remove()">OK</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }

        // Initialize model checkboxes
        function initializeModelGrid() {
            if (isGridInitialized) return;
            const modelEntries = Object.entries(availableModels);
            modelEntries.forEach(([modelId, modelInfo]) => {
                const modelDiv = document.createElement('div');
                modelDiv.className = 'bg-gray-50 dark:bg-gray-700 p-2 rounded border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors';
                
                modelDiv.innerHTML = `
                    <label class="flex items-start cursor-pointer">
                        <input type="checkbox" value="${modelId}" class="model-checkbox mt-0.5 mr-2 text-primary focus:ring-primary focus:ring-1">
                        <div class="flex-1 min-w-0">
                            <div class="font-semibold text-xs text-gray-900 dark:text-gray-100 leading-tight">${modelInfo.name}</div>
                            <div class="text-[10px] text-gray-600 dark:text-gray-400 mt-0.5 leading-tight">${modelInfo.description}</div>
                            <div class="flex flex-wrap gap-0.5 mt-1">
                                ${modelInfo.features.slice(0, 2).map(feature => 
                                    `<span class="text-[9px] bg-tag-bold text-white px-1 py-0.5 rounded leading-none">${feature}</span>`
                                ).join('')}
                            </div>
                        </div>
                    </label>
                `;
                
                elements.modelGroup.appendChild(modelDiv);
            });

            document.querySelectorAll('.model-checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', updateSelectedModels);
            });
            isGridInitialized = true;
        }

        // Update selected models and UI
        function updateSelectedModels() {
            selectedModels.clear();
            document.querySelectorAll('.model-checkbox:checked').forEach(checkbox => {
                selectedModels.add(checkbox.value);
            });

            const count = selectedModels.size;
            const totalPoints = Array.from(selectedModels).reduce((sum, modelId) => sum + (availableModels[modelId]?.cost || 0), 0);
            elements.selectedCount.textContent = `${count} model${count !== 1 ? 's' : ''} selected, ${totalPoints} points`;
            
            if (count === 0) {
                elements.generateBtn.disabled = true;
                setLoadingState(false);
                elements.btnText.textContent = 'Select Models to Generate Images';
            } else {
                elements.generateBtn.disabled = false;
                elements.btnText.textContent = `Generate Images with ${count} Model${count !== 1 ? 's' : ''}`;
            }
        }

        // Model selection buttons
        elements.selectAll.addEventListener('click', () => {
            document.querySelectorAll('.model-checkbox').forEach(checkbox => {
                checkbox.checked = true;
            });
            updateSelectedModels();
        });

        elements.creatorsChoice.addEventListener('click', () => {
            const excludedModels = [
                '@StableDiffusion3.5-T',
                '@StableDiffusion3.5-L',
                '@Flux-Kontext-Pro'
            ];

            document.querySelectorAll('.model-checkbox').forEach(checkbox => {
                checkbox.checked = !excludedModels.includes(checkbox.value);
            });
            updateSelectedModels();
        });

        // "Ima" button - selects all Google Imagen models + Ideogram
        document.getElementById('imagenChoice').addEventListener('click', () => {
            const imagenModels = [
                '@Imagen-3',
                '@Imagen-4-Fast', 
                '@Imagen-4',
                '@Imagen-4-Ultra-Exp',
                '@Ideogram-v3'
            ];

            document.querySelectorAll('.model-checkbox').forEach(checkbox => {
                checkbox.checked = imagenModels.includes(checkbox.value);
            });
            updateSelectedModels();
        });

        elements.clearAll.addEventListener('click', () => {
            document.querySelectorAll('.model-checkbox').forEach(checkbox => {
                checkbox.checked = false;
            });
            updateSelectedModels();
        });

        // Prompt rotation functions
        async function analyzePrompt() {
            const prompt = elements.originalPrompt.value.trim();
            if (!prompt) {
                showAlert('Please enter a prompt to analyze.');
                return;
            }

            originalPrompt = prompt;
            showAnalysisLoading(true, 'Analyzing prompt variables...');

            // Get variable creation rules
            const rules = document.getElementById('variableRules').value.trim();
            const rulesInstruction = rules ? `\n\nIMPORTANT RULES: ${rules}` : '';

            const analysisPrompt = `
Analyze this prompt and identify key variables that could be rotated for systematic research: "${prompt}"${rulesInstruction}

Your task:
1. Identify 6-7 of the most important nouns, adjectives, locations, or concepts that could be varied
2. For each variable, generate exactly 5 diverse, relevant alternatives (keep it lean for cost optimization)
3. Use the EXACT text from the original prompt as current_value for each variable
4. Follow any provided rules strictly when generating alternatives

CRITICAL: Output ONLY pure JSON with NO additional text, explanations, footnotes, citations, or markdown formatting.

{
  "variables": [
    {
      "name": "variable_name",
      "current_value": "exact_text_from_original_prompt", 
      "options": ["option1", "option2", "option3", "option4", "option5"]
    }
  ]
}

Limit to 6-7 variables maximum. Each variable should have exactly 5 options for cost efficiency. NO additional text or formatting.`;

            try {
                const selectedModel = elements.analysisModel.value;
                await window.Poe.sendUserMessage(`@${selectedModel} ${analysisPrompt}`, {
                    handler: "analysis-handler",
                    stream: false,
                    openChat: false,
                    handlerContext: { type: 'analyze' }
                });
            } catch (error) {
                showAnalysisLoading(false);
                showAlert('Error sending analysis request: ' + error.message);
            }
        }

        function addChoiceOptions() {
            if (currentVariables.length === 0) {
                showAlert('Please analyze a prompt first to generate variables.');
                return;
            }

            let addedCount = 0;

            currentVariables.forEach((variable, index) => {
                const choiceOption = `${variable.name.toLowerCase()} of your choice`;
                
                // Check if this option already exists
                if (!variable.options.includes(choiceOption)) {
                    variable.options.push(choiceOption);
                    addedCount++;
                }

                // Refresh the dropdown for this variable
                const select = document.querySelector(`[data-variable-index="${index}"]`);
                if (select) {
                    const currentValue = select.value;
                    
                    // Rebuild options
                    let allOptions = [];
                    
                    // Add original value first
                    if (variable.current_value && variable.current_value.trim()) {
                        allOptions.push({
                            value: variable.current_value,
                            display: `${variable.current_value} (Original)`,
                            isOriginal: true
                        });
                    }
                    
                    // Add all other options
                    variable.options.forEach(option => {
                        if (option !== variable.current_value) {
                            allOptions.push({
                                value: option,
                                display: option,
                                isOriginal: false
                            });
                        }
                    });

                    select.innerHTML = allOptions.map(optionObj => 
                        `<option value="${optionObj.value}" ${optionObj.value === currentValue ? 'selected' : ''}>${optionObj.display}</option>`
                    ).join('');
                }
            });

            // Update combinations count
            calculateCombinations();
        }

        function handleAnalysisResponse(result, context) {
            if (result.status === "error") {
                showAnalysisLoading(false);
                showAlert("Analysis error: " + (result.responses[0].statusText || 'Unknown error'));
                return;
            }
            
            if (result.status !== "complete") return;

            const response = result.responses[0].content;
            


            if (context?.type === 'analyze') {
                // Handle variable analysis - generate variables only
                try {
                    // Extract JSON from response
                    const jsonMatch = response.match(/\{[\s\S]*\}/);
                    if (!jsonMatch) {
                        throw new Error('No JSON found in response');
                    }
                    
                    const data = JSON.parse(jsonMatch[0]);
                    
                    if (!data.variables || !Array.isArray(data.variables)) {
                        throw new Error('Invalid variables structure');
                    }

                    // Cap variables to 7 maximum
                    currentVariables = data.variables.slice(0, 7);
                    
                    setupVariableControls();
                    calculateCombinations();
                    updateGeneratedPrompt();
                    showAnalysisLoading(false);
                    
                } catch (error) {
                    showAnalysisLoading(false);
                    showAlert('Error parsing analysis results: ' + error.message);
                }
                return;
            }

            if (context?.type === 'expand') {
                // Handle AI expansion of custom options
                try {
                    const expandedOptions = response.trim().split('\n').map(opt => opt.trim()).filter(opt => opt.length > 0);
                    const variableIndex = context.variableIndex;
                    const originalOptions = context.originalOptions;
                    
                    // Combine original examples with AI-generated options
                    const allNewOptions = [...originalOptions, ...expandedOptions];
                    
                    // Add to the textarea for user to review
                    const customTextArea = document.getElementById(`customText-${variableIndex}`);
                    customTextArea.value = allNewOptions.join('\n');
                    
                    showAnalysisLoading(false);
                    
                } catch (error) {
                    showAnalysisLoading(false);
                    showAlert('Error processing AI expansion: ' + error.message);
                }
                return;
            }

            if (context?.type === 'format') {
                // Handle prompt formatting - update the current image prompt
                const formattedText = response.trim();
                elements.promptInput.value = formattedText;
                setFormatLoadingState(false);
                showAlert('Prompt formatted! Ready for generation.');
                return;
            }

            if (context?.type === 'hifi') {
                // Handle Hi-Fi enhancement - update the current image prompt
                const enhancedText = response.trim();
                elements.promptInput.value = enhancedText;
                setHiFiLoadingState(false);
                showAlert('Prompt enhanced with Hi-Fi details! Ready for generation.');
                return;
            }

            if (context?.type === 'replace') {
                // Handle variable replacement
                try {
                    const jsonMatch = response.match(/\{[\s\S]*\}/);
                    if (!jsonMatch) {
                        throw new Error('No JSON found in response');
                    }
                    
                    const data = JSON.parse(jsonMatch[0]);
                    
                    if (!data.variable || !data.variable.name) {
                        throw new Error('Invalid variable structure');
                    }

                    const variableIndex = context.variableIndex;
                    
                    // Replace the variable at the specified index
                    currentVariables[variableIndex] = data.variable;
                    
                    // Refresh the UI
                    setupVariableControls();
                    calculateCombinations();
                    updateGeneratedPrompt();
                    showAnalysisLoading(false);
                    
                    showAlert('Variable replaced successfully!');
                    
                } catch (error) {
                    showAnalysisLoading(false);
                    showAlert('Error parsing variable replacement: ' + error.message);
                }
                return;
            }

            if (context?.type === 'addMore') {
                // Handle adding more variables - add to existing ones
                try {
                    // Extract JSON from response
                    const jsonMatch = response.match(/\{[\s\S]*\}/);
                    if (!jsonMatch) {
                        throw new Error('No JSON found in response');
                    }
                    
                    const data = JSON.parse(jsonMatch[0]);
                    
                    if (!data.variables || !Array.isArray(data.variables)) {
                        throw new Error('Invalid variables structure');
                    }

                    // Add new variables to existing ones (cap at 3-4 new variables)
                    const newVariables = data.variables.slice(0, 4);
                    currentVariables = [...currentVariables, ...newVariables];
                    
                    setupVariableControls();
                    calculateCombinations();
                    updateGeneratedPrompt();
                    showAnalysisLoading(false);
                    
                    showAlert(`${newVariables.length} new variable${newVariables.length !== 1 ? 's' : ''} added successfully!`);
                    
                } catch (error) {
                    showAnalysisLoading(false);
                    showAlert('Error adding more variables: ' + error.message);
                }
                return;
            }

            // Fallback for old behavior (should not reach here with proper context)
            showAnalysisLoading(false);
            showAlert('Unknown analysis type. Please try again.');
        }

        function setupVariableControls() {
            elements.variableList.innerHTML = '';
            
            currentVariables.forEach((variable, index) => {
                const variableDiv = document.createElement('div');
                variableDiv.className = 'p-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700';
                
                // Ensure original value is always included in options and comes first
                let allOptions = [];
                
                // Add original value first (marked as "Original")
                if (variable.current_value && variable.current_value.trim()) {
                    allOptions.push({
                        value: variable.current_value,
                        display: `${variable.current_value} (Original)`,
                        isOriginal: true
                    });
                }
                
                // Add all other options, but skip if they match the original value
                variable.options.forEach(option => {
                    if (option !== variable.current_value) {
                        allOptions.push({
                            value: option,
                            display: option,
                            isOriginal: false
                        });
                    }
                });
                
                variableDiv.innerHTML = `
                    <div class="flex justify-between items-center mb-1">
                        <label class="block text-xs font-medium">${variable.name}:</label>
                        <button 
                            class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs transition-colors"
                            onclick="removeVariable(${index})"
                            title="Remove this variable"
                        >
                            ✕
                        </button>
                    </div>
                    <div class="flex gap-2">
                        <select 
                            class="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-sm" 
                            data-variable-index="${index}"
                        >
                            ${allOptions.map(optionObj => 
                                `<option value="${optionObj.value}" ${optionObj.isOriginal ? 'selected' : ''}>${optionObj.display}</option>`
                            ).join('')}
                        </select>
                        <button 
                            class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition-colors"
                            onclick="addCustomOption(${index})"
                            title="Add custom options"
                        >
                            +
                        </button>
                    </div>
                    <div id="customInput-${index}" class="hidden mt-2">
                        <div class="flex flex-col gap-2">
                            <textarea 
                                id="customText-${index}"
                                class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-sm resize-none"
                                rows="3"
                                placeholder="Add custom options (one per line)&#10;e.g.:&#10;Indian rasgulla&#10;Indian laddu&#10;Indian jalebi"
                            ></textarea>
                            <div class="flex gap-2">
                                <button 
                                    class="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs"
                                    onclick="confirmCustomOptions(${index})"
                                >
                                    Add Options
                                </button>
                                <button 
                                    class="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-xs"
                                    onclick="aiExpandOptions(${index})"
                                >
                                    AI Expand
                                </button>
                                <button 
                                    class="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded text-xs"
                                    onclick="replaceVariable(${index})"
                                >
                                    Replace Variable
                                </button>
                                <button 
                                    class="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded text-xs"
                                    onclick="cancelCustomOptions(${index})"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                
                const select = variableDiv.querySelector('select');
                select.addEventListener('change', updateGeneratedPrompt);
                
                elements.variableList.appendChild(variableDiv);
            });
            
            elements.variableControls.classList.remove('hidden');
        }

        function calculateCombinations() {
            totalCombinations = Math.min(currentVariables.reduce((total, variable) => total * variable.options.length, 1), 10000);
            currentCombination = 0;
            updateComboCounter();
        }

        function updateGeneratedPrompt() {
            if (currentVariables.length === 0) return;

            let prompt = originalPrompt;
            
            // Replace variables in the prompt
            currentVariables.forEach((variable, index) => {
                const select = document.querySelector(`[data-variable-index="${index}"]`);
                const selectedValue = select ? select.value : variable.current_value;
                
                // Try multiple replacement patterns
                const patterns = [
                    new RegExp(`\\b${escapeRegExp(variable.current_value)}\\b`, 'gi'),
                    new RegExp(escapeRegExp(variable.current_value), 'gi')
                ];
                
                for (const pattern of patterns) {
                    if (pattern.test(prompt)) {
                        prompt = prompt.replace(pattern, selectedValue);
                        break;
                    }
                }
            });

            // Auto-populate the image generation prompt
            elements.promptInput.value = prompt;
        }

        function escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        function navigateCombination(direction) {
            if (currentVariables.length === 0) return;

            const newIndex = currentCombination + direction;
            if (newIndex < 0 || newIndex >= totalCombinations) return;

            currentCombination = newIndex;
            
            // Convert linear index to variable selections
            let remaining = currentCombination;
            currentVariables.forEach((variable, varIndex) => {
                const optionIndex = remaining % variable.options.length;
                remaining = Math.floor(remaining / variable.options.length);
                
                const select = document.querySelector(`[data-variable-index="${varIndex}"]`);
                if (select) {
                    select.selectedIndex = optionIndex;
                }
            });

            updateGeneratedPrompt();
            updateComboCounter();
        }

        function updateComboCounter() {
            elements.comboCounter.textContent = `${currentCombination + 1} / ${totalCombinations}`;
            elements.prevCombo.disabled = currentCombination === 0;
            elements.nextCombo.disabled = currentCombination === totalCombinations - 1;
        }

        async function copyRotatedPrompt() {
            const prompt = elements.promptInput.value;
            if (!prompt) return;

            try {
                await navigator.clipboard.writeText(prompt);
                
                // Visual feedback
                const originalText = elements.copyRotatedPrompt.textContent;
                elements.copyRotatedPrompt.textContent = '✓';
                elements.copyRotatedPrompt.classList.add('bg-green-700');
                
                setTimeout(() => {
                    elements.copyRotatedPrompt.textContent = originalText;
                    elements.copyRotatedPrompt.classList.remove('bg-green-700');
                }, 1500);
            } catch (error) {
                console.error('Copy failed:', error);
            }
        }

        function showAnalysisLoading(loading, status = 'Analyzing prompt...') {
            elements.analysisLoading.classList.toggle('hidden', !loading);
            if (loading) {
                elements.analysisStatus.textContent = status;
            }
        }

        function clearPrompt() {
            elements.originalPrompt.value = '';
            elements.promptInput.value = '';
            elements.variableControls.classList.add('hidden');
            currentVariables = [];
            originalPrompt = '';
        }

        // Image generation functions
        async function generateImages() {
            const prompt = elements.promptInput.value.trim();

            if (!prompt) {
                showAlert('Please enter a prompt for your images');
                return;
            }

            if (selectedModels.size === 0) {
                showAlert('Please select at least one model');
                return;
            }

            // Clear previous results
            generationResults.clear();
            elements.imagesGrid.innerHTML = '';

            // Show loading state
            setLoadingState(true);
            elements.resultsSection.classList.remove('hidden');
            elements.overallStatus.classList.remove('hidden');
            
            elements.statusText.textContent = 'Starting generation...';
            elements.progressText.textContent = `0 of ${selectedModels.size} models completed`;

            try {
                // Create prompt with all selected models
                const modelMentions = Array.from(selectedModels).join(' ');
                const fullPrompt = `${modelMentions} ${prompt}`;

                await window.Poe.sendUserMessage(fullPrompt, {
                    handler: "multi-image-handler",
                    stream: false,
                    openChat: false
                });
            } catch (err) {
                console.error("Error:", err);
                elements.statusText.textContent = "Error starting generation: " + err.message;
                elements.progressText.textContent = '';
                setLoadingState(false);
            }
        }

        function handleImageResponse(result, context) {
            result.responses.forEach(response => {
                const { messageId, senderId, content, status, attachments } = response;
                
                if (!generationResults.has(messageId)) {
                    generationResults.set(messageId, {
                        modelId: senderId,
                        modelName: availableModels[senderId]?.name || senderId,
                        status: status,
                        content: content,
                        attachments: attachments
                    });
                } else {
                    const existing = generationResults.get(messageId);
                    existing.status = status;
                    existing.content = content;
                    existing.attachments = attachments;
                }

                updateImageResult(messageId);
            });

            updateOverallProgress();
        }

        function updateImageResult(messageId) {
            const result = generationResults.get(messageId);
            if (!result) return;

            let resultDiv = document.getElementById(`result-${messageId}`);
            if (!resultDiv) {
                resultDiv = document.createElement('div');
                resultDiv.id = `result-${messageId}`;
                resultDiv.className = 'bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600';
                elements.imagesGrid.appendChild(resultDiv);
            }

            if (result.status === 'error') {
                resultDiv.innerHTML = `
                    <div class="text-center py-8">
                        <div class="text-red-600 dark:text-red-400 mb-2">
                            <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <div class="font-semibold">${result.modelName}</div>
                            <div class="text-sm">Generation failed</div>
                        </div>
                    </div>
                `;
            } else if (result.status === 'incomplete') {
                resultDiv.innerHTML = `
                    <div class="text-center py-8">
                        <div class="text-gray-600 dark:text-gray-400">
                            <svg class="animate-spin w-6 h-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <div class="font-semibold">${result.modelName}</div>
                            <div class="text-sm">Generating...</div>
                        </div>
                    </div>
                `;
            } else if (result.status === 'complete') {
                if (result.attachments?.length > 0) {
                    const imageAttachment = result.attachments[0];
                    resultDiv.innerHTML = `
                        <div class="text-center">
                            <div class="font-semibold text-sm mb-3 text-gray-900 dark:text-gray-100">${result.modelName}</div>
                            <div class="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-600 mb-3 cursor-pointer hover:opacity-90 transition-opacity" onclick="openImageModal('${imageAttachment.url}', '${result.modelName}')">
                                <img src="${imageAttachment.url}" alt="Generated by ${result.modelName}" class="w-full h-48 object-cover">
                                <div class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-30">
                                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                                    </svg>
                                </div>
                            </div>
                            <a href="${imageAttachment.url}" download="${imageAttachment.name || 'generated-image.png'}" 
                               class="inline-flex items-center px-3 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                Download
                            </a>
                        </div>
                    `;
                } else {
                    resultDiv.innerHTML = `
                        <div class="text-center py-8">
                            <div class="text-yellow-600 dark:text-yellow-400">
                                <div class="font-semibold">${result.modelName}</div>
                                <div class="text-sm">No image generated</div>
                            </div>
                        </div>
                    `;
                }
            }
        }

        function updateOverallProgress() {
            const completed = Array.from(generationResults.values()).filter(r => r.status === 'complete' || r.status === 'error').length;
            const total = selectedModels.size;
            
            if (completed === total) {
                elements.overallStatus.classList.add('hidden');
                setLoadingState(false);
            } else {
                elements.statusText.textContent = 'Generating images...';
                elements.progressText.textContent = `${completed} of ${total} models completed`;
            }
        }

        function setLoadingState(loading) {
            elements.generateBtn.disabled = loading || selectedModels.size === 0;
            elements.btnText.classList.toggle('hidden', loading);
            elements.btnLoader.classList.toggle('hidden', !loading);
            elements.generatingText.textContent = loading ? `Generating with ${selectedModels.size} model${selectedModels.size !== 1 ? 's' : ''}...` : 'Select Models to Generate Images';
        }

        function resetForm() {
            elements.resultsSection.classList.add('hidden');
            generationResults.clear();
            setLoadingState(false);
            elements.promptInput.focus();
        }

        // Custom options functionality
        function addCustomOption(variableIndex) {
            const customInput = document.getElementById(`customInput-${variableIndex}`);
            customInput.classList.remove('hidden');
            document.getElementById(`customText-${variableIndex}`).focus();
        }

        function cancelCustomOptions(variableIndex) {
            const customInput = document.getElementById(`customInput-${variableIndex}`);
            customInput.classList.add('hidden');
            document.getElementById(`customText-${variableIndex}`).value = '';
        }

        function confirmCustomOptions(variableIndex) {
            const customText = document.getElementById(`customText-${variableIndex}`).value.trim();
            if (!customText) {
                showAlert('Please enter some custom options.');
                return;
            }

            const newOptions = customText.split('\n').map(opt => opt.trim()).filter(opt => opt.length > 0);
            if (newOptions.length === 0) {
                showAlert('Please enter valid options.');
                return;
            }

            // Add to variable options
            const variable = currentVariables[variableIndex];
            newOptions.forEach(option => {
                if (!variable.options.includes(option)) {
                    variable.options.push(option);
                }
            });

            // Refresh the dropdown
            const select = document.querySelector(`[data-variable-index="${variableIndex}"]`);
            const currentValue = select.value;
            
            // Rebuild options
            let allOptions = [];
            
            // Add original value first
            if (variable.current_value && variable.current_value.trim()) {
                allOptions.push({
                    value: variable.current_value,
                    display: `${variable.current_value} (Original)`,
                    isOriginal: true
                });
            }
            
            // Add all other options
            variable.options.forEach(option => {
                if (option !== variable.current_value) {
                    allOptions.push({
                        value: option,
                        display: option,
                        isOriginal: false
                    });
                }
            });

            select.innerHTML = allOptions.map(optionObj => 
                `<option value="${optionObj.value}" ${optionObj.value === currentValue ? 'selected' : ''}>${optionObj.display}</option>`
            ).join('');

            // Update combinations count
            calculateCombinations();
            
            // Hide input area
            cancelCustomOptions(variableIndex);
        }

        async function aiExpandOptions(variableIndex) {
            const customText = document.getElementById(`customText-${variableIndex}`).value.trim();
            if (!customText) {
                showAlert('Please enter at least one example option for AI to expand on.');
                return;
            }

            const variable = currentVariables[variableIndex];
            const examples = customText.split('\n').map(opt => opt.trim()).filter(opt => opt.length > 0);
            
            showAnalysisLoading(true, 'AI expanding your options...');

            const expandPrompt = `
Based on these examples: ${examples.join(', ')}
And this variable context: "${variable.name}" from original prompt "${originalPrompt}"

Generate exactly 8 more similar options that follow the same pattern/style/category.

Output ONLY a simple list, one option per line, no explanations or formatting:`;

            try {
                const selectedModel = elements.analysisModel.value;
                await window.Poe.sendUserMessage(`@${selectedModel} ${expandPrompt}`, {
                    handler: "analysis-handler",
                    stream: false,
                    openChat: false,
                    handlerContext: { type: 'expand', variableIndex: variableIndex, originalOptions: examples }
                });
            } catch (error) {
                showAnalysisLoading(false);
                showAlert('Error expanding options: ' + error.message);
            }
        }

        // Format prompt functionality (formatting only)
        async function formatPrompt() {
            const prompt = elements.promptInput.value.trim();
            if (!prompt) {
                showAlert('Please enter a prompt to format.');
                return;
            }

            setFormatLoadingState(true);

            // Get custom enhancement rules
            const customRules = document.getElementById('enhancementRules').value.trim();
            const customRulesInstruction = customRules ? `\n\nCUSTOM ENHANCEMENT RULES (HIGHEST PRIORITY): ${customRules}` : '';

            const formatPrompt = `Format and enhance this prompt for optimal image generation: "${prompt}"${customRulesInstruction}

CRITICAL FORMATTING REQUIREMENTS:
- Fix grammar, syntax and flow issues
- Resolve logical conflicts (e.g., character cannot have two different poses simultaneously)
- When variables create contradictions, choose the most coherent interpretation
- Ensure physical and logical possibility (one person cannot be both sitting and standing)
- Maintain readability and natural language flow
- Keep within 1200 characters maximum
- Preserve core intent of all elements while ensuring coherence

OUTPUT RESTRICTIONS:
- NEVER add prefixes like "Here is your prompt:" or "Enhanced prompt:"
- NEVER add suffixes like "Total characters: X" or explanations
- NEVER add quotation marks around the result
- NEVER add any metadata, instructions, or commentary
- Output ONLY the formatted prompt text, absolutely nothing else

Focus on FORMATTING and LOGICAL CONSISTENCY, not content expansion.`;

            try {
                const selectedModel = elements.analysisModel.value;
                await window.Poe.sendUserMessage(`@${selectedModel} ${formatPrompt}`, {
                    handler: "analysis-handler",
                    stream: false,
                    openChat: false,
                    handlerContext: { type: 'format' }
                });
            } catch (error) {
                setFormatLoadingState(false);
                showAlert('Error formatting prompt: ' + error.message);
            }
        }

        // Hi-Fi Enhancement functionality (sophisticated enhancement)
        async function enhancePromptHiFi() {
            const prompt = elements.promptInput.value.trim();
            if (!prompt) {
                showAlert('Please enter a prompt to enhance.');
                return;
            }

            setHiFiLoadingState(true);

            // Get custom enhancement rules
            const customRules = document.getElementById('enhancementRules').value.trim();
            const customRulesInstruction = customRules ? `\n\nCUSTOM ENHANCEMENT RULES (HIGHEST PRIORITY): ${customRules}` : '';

            const hifiPrompt = `Transform this prompt into a hyper-detailed, photorealistic masterpiece: "${prompt}"${customRulesInstruction}

APPLY ADVANCED PROMPT ENGINEERING FRAMEWORK:

ATOMIC DECONSTRUCTION:
- Break down into: Subject, Action, Environment, Lighting
- Describe each component independently before interactions

SPECIFICITY OVER VAGUENESS:
- Transform subjective qualities into objective, physical descriptions
- Instead of "beautiful eyes" → "almond-shaped eyes with defined iris detail and visible limbal ring"
- Instead of "sad expression" → "slight downward turn of outer eye corners, relaxed upper eyelid"

POSE-CONSEQUENCE DYNAMICS:
- Describe underlying causes to achieve visual effects
- Instead of "sweaty skin" → "character has just completed strenuous activity, resulting in visible perspiration"
- Instead of "tense muscles" → "character is mid-exertion, causing visible muscle definition and tension"

GEOMETRIC PRECISION:
- Use anatomical landmarks and proportions
- Define facial features with surgical precision
- Specify body architecture with measurements and ratios

TECHNICAL MARKERS:
- Include photographic details: lens type, lighting setup, composition
- Add era-appropriate technical characteristics if period piece
- Specify material properties: fabric texture, surface reflectivity, wear patterns

ENVIRONMENTAL CONTEXT:
- Layer technical capture markers (how image was created)
- Add cultural/environmental markers (what content depicts)
- Ensure lighting consistency and physical plausibility

OUTPUT RESTRICTIONS:
- NEVER add prefixes like "Here is your enhanced prompt:" 
- NEVER add suffixes like "Total characters: X"
- NEVER add quotation marks or metadata
- Output ONLY the enhanced prompt text, absolutely nothing else

Transform the simple prompt into a sophisticated, technically precise description that will generate stunning photorealistic results.`;

            try {
                const selectedModel = elements.analysisModel.value;
                await window.Poe.sendUserMessage(`@${selectedModel} ${hifiPrompt}`, {
                    handler: "analysis-handler",
                    stream: false,
                    openChat: false,
                    handlerContext: { type: 'hifi' }
                });
            } catch (error) {
                setHiFiLoadingState(false);
                showAlert('Error enhancing prompt: ' + error.message);
            }
        }

        function setFormatLoadingState(loading) {
            document.getElementById('formatPromptBtn').disabled = loading;
            document.getElementById('formatBtnText').classList.toggle('hidden', loading);
            document.getElementById('formatBtnLoader').classList.toggle('hidden', !loading);
        }

        function setHiFiLoadingState(loading) {
            document.getElementById('hifiEnhanceBtn').disabled = loading;
            document.getElementById('hifiBtnText').classList.toggle('hidden', loading);
            document.getElementById('hifiBtnLoader').classList.toggle('hidden', !loading);
        }

        // Replace Variable functionality
        async function replaceVariable(variableIndex) {
            const customText = document.getElementById(`customText-${variableIndex}`).value.trim();
            const rules = customText || 'Generate alternative variables for this prompt section';
            
            if (!originalPrompt) {
                showAlert('Please enter an original prompt first.');
                return;
            }

            const variable = currentVariables[variableIndex];
            showAnalysisLoading(true, 'Replacing variable...');

            const replacePrompt = `
Replace this variable in the prompt: "${originalPrompt}"

Variable to replace: "${variable.name}" (currently: "${variable.current_value}")
Rules: ${rules}

Generate a completely NEW variable name and 10 diverse options that would work better in this context.

CRITICAL: Output ONLY pure JSON with NO additional text, explanations, footnotes, citations, or markdown formatting.

{
  "variable": {
    "name": "new_variable_name",
    "current_value": "exact_text_from_original_prompt", 
    "options": ["option1", "option2", "option3", "option4", "option5", "option6", "option7", "option8", "option9", "option10"]
  }
}

NO additional text or formatting.`;

            try {
                const selectedModel = elements.analysisModel.value;
                await window.Poe.sendUserMessage(`@${selectedModel} ${replacePrompt}`, {
                    handler: "analysis-handler",
                    stream: false,
                    openChat: false,
                    handlerContext: { type: 'replace', variableIndex: variableIndex }
                });
            } catch (error) {
                showAnalysisLoading(false);
                showAlert('Error replacing variable: ' + error.message);
            }
        }

        // Regenerate Analysis functionality - same as analyze for now
        async function regenerateAnalysis() {
            // Just call analyzePrompt - they do the same thing
            analyzePrompt();
        }

        // Remove Variable functionality
        function removeVariable(variableIndex) {
            if (currentVariables.length <= 1) {
                showAlert('Cannot remove the last variable. Use "Clear" to remove all variables.');
                return;
            }
            
            // Remove the variable
            currentVariables.splice(variableIndex, 1);
            
            // Refresh the UI
            setupVariableControls();
            calculateCombinations();
            updateGeneratedPrompt();
        }

        // Add More Variables functionality
        async function addMoreVariables() {
            if (currentVariables.length === 0) {
                showAlert('Please analyze a prompt first to generate initial variables.');
                return;
            }

            const prompt = elements.originalPrompt.value.trim();
            if (!prompt) {
                showAlert('Original prompt is required for adding more variables.');
                return;
            }

            showAnalysisLoading(true, 'Adding more variables...');

            // Get variable creation rules
            const rules = document.getElementById('variableRules').value.trim();
            const rulesInstruction = rules ? `\n\nIMPORTANT RULES: ${rules}` : '';

            // List existing variables to avoid duplicates
            const existingVariables = currentVariables.map(v => `"${v.name}" (focuses on: ${v.current_value})`).join(', ');

            const analysisPrompt = `
Analyze this prompt and identify 3-4 NEW variables that could be rotated for systematic research: "${prompt}"${rulesInstruction}

EXISTING VARIABLES TO AVOID: ${existingVariables}

Your task:
1. Identify 3-4 NEW variables different from existing ones
2. Focus on nouns, adjectives, locations, or concepts NOT already covered
3. For each variable, generate exactly 5 diverse, relevant alternatives
4. Use the EXACT text from the original prompt as current_value for each variable
5. Follow any provided rules strictly when generating alternatives

CRITICAL: Output ONLY pure JSON with NO additional text, explanations, footnotes, citations, or markdown formatting.

{
  "variables": [
    {
      "name": "variable_name",
      "current_value": "exact_text_from_original_prompt", 
      "options": ["option1", "option2", "option3", "option4", "option5"]
    }
  ]
}

Generate 3-4 NEW variables maximum. Each variable should have exactly 5 options. Avoid duplicating existing variable concepts. NO additional text or formatting.`;

            try {
                const selectedModel = elements.analysisModel.value;
                await window.Poe.sendUserMessage(`@${selectedModel} ${analysisPrompt}`, {
                    handler: "analysis-handler",
                    stream: false,
                    openChat: false,
                    handlerContext: { type: 'addMore' }
                });
            } catch (error) {
                showAnalysisLoading(false);
                showAlert('Error adding more variables: ' + error.message);
            }
        }

        // Event listeners
        elements.analyzeBtn.addEventListener('click', analyzePrompt);
        elements.addChoiceBtn.addEventListener('click', addChoiceOptions);
        document.getElementById('formatPromptBtn').addEventListener('click', formatPrompt);
        document.getElementById('hifiEnhanceBtn').addEventListener('click', enhancePromptHiFi);
        elements.prevCombo.addEventListener('click', () => navigateCombination(-1));
        elements.nextCombo.addEventListener('click', () => navigateCombination(1));
        elements.copyRotatedPrompt.addEventListener('click', copyRotatedPrompt);
        elements.clearPrompt.addEventListener('click', clearPrompt);
        elements.generateBtn.addEventListener('click', generateImages);
        elements.generateAnother.addEventListener('click', resetForm);
        document.getElementById('addMoreVariablesBtn').addEventListener('click', addMoreVariables);

        // Feed and Repeat functionality
        function feedPrompt() {
            const originalText = elements.originalPrompt.value.trim();
            if (!originalText) {
                showAlert('Original prompt is empty. Please enter a prompt first.');
                return;
            }
            elements.promptInput.value = originalText;
        }

        function repeatPrompt() {
            const imageText = elements.promptInput.value.trim();
            if (!imageText) {
                showAlert('Image prompt is empty. Please enter a prompt first.');
                return;
            }
            elements.originalPrompt.value = imageText;
        }

        // Copy text flow functionality (no image URLs)
        async function copyEntireFlow() {
            const originalPrompt = elements.originalPrompt.value.trim();
            const imagePrompt = elements.promptInput.value.trim();
            const selectedModelsArray = Array.from(selectedModels);
            
            let flowData = `=== AI Prompt Rotator & Multi-Model Image Generator Text Flow ===\n\n`;
            
            if (originalPrompt) {
                flowData += `ORIGINAL PROMPT:\n${originalPrompt}\n\n`;
            }
            
            if (imagePrompt && imagePrompt !== originalPrompt) {
                flowData += `IMAGE GENERATION PROMPT:\n${imagePrompt}\n\n`;
            }
            
            if (currentVariables.length > 0) {
                flowData += `VARIABLES ANALYZED:\n`;
                currentVariables.forEach((variable, index) => {
                    const select = document.querySelector(`[data-variable-index="${index}"]`);
                    const currentSelection = select ? select.value : variable.current_value;
                    flowData += `- ${variable.name}: ${currentSelection}\n`;
                    flowData += `  Options: ${variable.options.join(', ')}\n`;
                });
                flowData += `\nTotal Combinations: ${totalCombinations}\nCurrent Combination: ${currentCombination + 1}\n\n`;
            }
            
            if (selectedModelsArray.length > 0) {
                flowData += `SELECTED MODELS:\n`;
                selectedModelsArray.forEach(modelId => {
                    const modelInfo = availableModels[modelId];
                    flowData += `- ${modelInfo?.name || modelId} (${modelInfo?.cost || 0} points)\n`;
                });
                
                const totalCost = selectedModelsArray.reduce((sum, modelId) => sum + (availableModels[modelId]?.cost || 0), 0);
                flowData += `Total Cost: ${totalCost} points\n\n`;
            }
            
            if (generationResults.size > 0) {
                flowData += `GENERATION SUMMARY:\n`;
                const completed = Array.from(generationResults.values()).filter(r => r.status === 'complete' && r.attachments?.length > 0).length;
                const failed = Array.from(generationResults.values()).filter(r => r.status === 'error').length;
                flowData += `- Images generated: ${completed}\n`;
                flowData += `- Failed generations: ${failed}\n`;
                flowData += `- Total models used: ${generationResults.size}\n\n`;
                
                flowData += `MODELS USED:\n`;
                Array.from(generationResults.values()).forEach(result => {
                    flowData += `- ${result.modelName}: ${result.status === 'complete' && result.attachments?.length > 0 ? 'Success' : 'Failed'}\n`;
                });
            }
            
            flowData += `\n=== End of Text Flow ===`;
            
            try {
                await navigator.clipboard.writeText(flowData);
                
                // Visual feedback
                const originalText = elements.copyEntireFlow.innerHTML;
                elements.copyEntireFlow.innerHTML = `
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Copied!
                `;
                elements.copyEntireFlow.classList.add('bg-green-700');
                
                setTimeout(() => {
                    elements.copyEntireFlow.innerHTML = originalText;
                    elements.copyEntireFlow.classList.remove('bg-green-700');
                }, 2000);
                
                showAlert('Text workflow copied to clipboard! Use "Download Assets" for images.');
            } catch (error) {
                showAlert('Failed to copy workflow: ' + error.message);
            }
        }

        // Download all images as files
        async function downloadAllAssets() {
            const completedResults = Array.from(generationResults.values()).filter(
                result => result.status === 'complete' && result.attachments?.length > 0
            );
            
            if (completedResults.length === 0) {
                showAlert('No images available to download. Generate some images first!');
                return;
            }

            // Update button state
            elements.downloadAssetsText.textContent = 'Downloading...';
            elements.downloadAssets.disabled = true;

            let downloadedCount = 0;
            const totalImages = completedResults.length;

            try {
                for (const result of completedResults) {
                    const attachment = result.attachments[0];
                    await downloadImage(attachment.url, `${result.modelName.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.png`);
                    downloadedCount++;
                    
                    // Update progress
                    elements.downloadAssetsText.textContent = `Downloaded ${downloadedCount}/${totalImages}`;
                }

                // Success feedback
                elements.downloadAssetsText.textContent = '✓ All Downloaded';
                elements.downloadAssets.classList.add('bg-green-700');
                
                setTimeout(() => {
                    elements.downloadAssetsText.textContent = 'Download Assets';
                    elements.downloadAssets.classList.remove('bg-green-700');
                    elements.downloadAssets.disabled = false;
                }, 3000);

                showAlert(`Successfully downloaded ${downloadedCount} image${downloadedCount !== 1 ? 's' : ''}!`);

            } catch (error) {
                // Error feedback
                elements.downloadAssetsText.textContent = 'Download Failed';
                elements.downloadAssets.disabled = false;
                showAlert('Error downloading images: ' + error.message);
                
                setTimeout(() => {
                    elements.downloadAssetsText.textContent = 'Download Assets';
                }, 3000);
            }
        }

        // Helper function to download individual images
        async function downloadImage(url, filename) {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                
                const blob = await response.blob();
                const downloadUrl = window.URL.createObjectURL(blob);
                
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = filename;
                
                // Trigger download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Clean up
                window.URL.revokeObjectURL(downloadUrl);
                
                // Add small delay to prevent overwhelming the browser
                await new Promise(resolve => setTimeout(resolve, 500));
                
            } catch (error) {
                console.error(`Failed to download ${filename}:`, error);
                throw error;
            }
        }

        // Image modal functionality
        function openImageModal(imageUrl, modelName) {
            const modal = document.getElementById('imageModal');
            const modalImage = document.getElementById('modalImage');
            const modalTitle = document.getElementById('modalImageTitle');
            
            modalImage.src = imageUrl;
            modalTitle.textContent = modelName;
            modal.classList.remove('hidden');
        }

        function closeImageModal() {
            const modal = document.getElementById('imageModal');
            modal.classList.add('hidden');
        }

        // Copy functionality for new buttons
        async function copyOriginalPrompt() {
            const text = elements.originalPrompt.value.trim();
            if (!text) return;
            
            try {
                await navigator.clipboard.writeText(text);
                
                const btn = document.getElementById('copyOriginalPrompt');
                const originalText = btn.textContent;
                btn.textContent = '✓';
                btn.classList.add('bg-green-600');
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.classList.remove('bg-green-600');
                }, 1500);
            } catch (error) {
                console.error('Copy failed:', error);
            }
        }

        async function copyImagePrompt() {
            const text = elements.promptInput.value.trim();
            if (!text) return;
            
            try {
                await navigator.clipboard.writeText(text);
                
                const btn = document.getElementById('copyImagePrompt');
                const originalText = btn.textContent;
                btn.textContent = '✓';
                btn.classList.add('bg-green-600');
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.classList.remove('bg-green-600');
                }, 1500);
            } catch (error) {
                console.error('Copy failed:', error);
            }
        }

        // Save State functionality
        async function saveState() {
            try {
                // Get current variable selections
                const variableSelections = {};
                currentVariables.forEach((variable, index) => {
                    const select = document.querySelector(`[data-variable-index="${index}"]`);
                    if (select) {
                        variableSelections[index] = select.selectedIndex;
                    }
                });

                const state = {
                    version: "1.0",
                    timestamp: new Date().toISOString(),
                    originalPrompt: elements.originalPrompt.value.trim(),
                    variableRules: document.getElementById('variableRules').value.trim(),
                    analysisModel: elements.analysisModel.value,
                    currentVariables: currentVariables,
                    variableSelections: variableSelections,
                    currentCombination: currentCombination,
                    totalCombinations: totalCombinations,
                    selectedModels: Array.from(selectedModels),
                    imagePrompt: elements.promptInput.value.trim()
                };

                const stateJson = JSON.stringify(state);
                
                await navigator.clipboard.writeText(stateJson);
                
                // Visual feedback
                const btn = document.getElementById('saveState');
                const originalText = btn.innerHTML;
                btn.innerHTML = `
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    State Saved!
                `;
                btn.classList.add('bg-green-700');
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.remove('bg-green-700');
                }, 2000);
                
                showAlert('Complete app state saved to clipboard! Paste this to restore your exact setup later.');
            } catch (error) {
                showAlert('Failed to save state: ' + error.message);
            }
        }

        // Import State functionality with confirmation
        async function importState() {
            // Check if there's existing state to warn about
            const hasExistingState = currentVariables.length > 0 || elements.originalPrompt.value.trim() || selectedModels.size > 0;
            
            if (hasExistingState) {
                // Show confirmation first
                const confirmModal = document.createElement('div');
                confirmModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
                confirmModal.innerHTML = `
                    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
                        <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">⚠️ Import State</h3>
                        <p class="text-gray-700 dark:text-gray-300 mb-4">This will replace your current work. Are you sure you want to continue?</p>
                        <div class="flex justify-end gap-3">
                            <button 
                                class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                onclick="this.closest('.fixed').remove()"
                            >
                                Cancel
                            </button>
                            <button 
                                class="px-4 py-2 bg-orange-600 text-white hover:bg-orange-700 rounded transition-colors"
                                onclick="this.closest('.fixed').remove(); showImportDialog()"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                `;
                document.body.appendChild(confirmModal);
            } else {
                showImportDialog();
            }
        }

        function showImportDialog() {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            modal.innerHTML = `
                <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full mx-4">
                    <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Import Saved State</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-4">Paste your saved state JSON here to restore your exact setup:</p>
                    <textarea 
                        id="stateInput"
                        class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm resize-none"
                        rows="8"
                        placeholder="Paste your saved state JSON here..."
                    ></textarea>
                    <div class="flex justify-end gap-3 mt-4">
                        <button 
                            class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                            onclick="this.closest('.fixed').remove()"
                        >
                            Cancel
                        </button>
                        <button 
                            class="px-4 py-2 bg-cyan-600 text-white hover:bg-cyan-700 rounded transition-colors"
                            onclick="processImportState()"
                        >
                            Import State
                        </button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Focus the textarea and select any pasted content
            setTimeout(() => {
                const textarea = document.getElementById('stateInput');
                textarea.focus();
            }, 100);
        }

        // Make showImportDialog globally available
        window.showImportDialog = showImportDialog;

        // Process the imported state
        function processImportState() {
            const stateInput = document.getElementById('stateInput').value.trim();
            
            if (!stateInput) {
                showAlert('Please paste your saved state JSON.');
                return;
            }

            try {
                const state = JSON.parse(stateInput);
                
                // Validate state structure
                if (!state.version || !state.originalPrompt) {
                    throw new Error('Invalid state format');
                }

                // Restore original prompt and rules
                elements.originalPrompt.value = state.originalPrompt || '';
                document.getElementById('variableRules').value = state.variableRules || '';
                
                if (state.analysisModel) {
                    elements.analysisModel.value = state.analysisModel;
                }

                // Restore variables
                if (state.currentVariables && Array.isArray(state.currentVariables)) {
                    currentVariables = state.currentVariables;
                    originalPrompt = state.originalPrompt;
                    
                    if (currentVariables.length > 0) {
                        setupVariableControls();
                        
                        // Restore variable selections
                        if (state.variableSelections) {
                            Object.entries(state.variableSelections).forEach(([index, selectedIndex]) => {
                                const select = document.querySelector(`[data-variable-index="${index}"]`);
                                if (select && selectedIndex < select.options.length) {
                                    select.selectedIndex = selectedIndex;
                                }
                            });
                        }

                        // Restore combination state
                        currentCombination = state.currentCombination || 0;
                        totalCombinations = state.totalCombinations || 1;
                        updateComboCounter();
                        updateGeneratedPrompt();
                    }
                }

                // Restore selected models
                if (state.selectedModels && Array.isArray(state.selectedModels)) {
                    // Clear all checkboxes first
                    document.querySelectorAll('.model-checkbox').forEach(checkbox => {
                        checkbox.checked = false;
                    });
                    
                    // Check the saved models
                    state.selectedModels.forEach(modelId => {
                        const checkbox = document.querySelector(`input[value="${modelId}"]`);
                        if (checkbox) {
                            checkbox.checked = true;
                        }
                    });
                    updateSelectedModels();
                }

                // Restore image prompt
                if (state.imagePrompt) {
                    elements.promptInput.value = state.imagePrompt;
                }

                // Close modal
                document.querySelector('.fixed').remove();
                
                showAlert(`State restored successfully! From: ${new Date(state.timestamp).toLocaleString()}`);

            } catch (error) {
                showAlert('Failed to import state: ' + error.message + '\n\nPlease check that you pasted valid state JSON.');
            }
        }

        // Make processImportState globally available
        window.processImportState = processImportState;

        // Add event listeners for new functionality
        elements.feedBtn.addEventListener('click', feedPrompt);
        elements.repeatBtn.addEventListener('click', repeatPrompt);
        elements.copyEntireFlow.addEventListener('click', copyEntireFlow);
        elements.downloadAssets.addEventListener('click', downloadAllAssets);
        document.getElementById('saveState').addEventListener('click', saveState);
        document.getElementById('importStateBtn').addEventListener('click', importState);
        document.getElementById('copyOriginalPrompt').addEventListener('click', copyOriginalPrompt);
        document.getElementById('copyImagePrompt').addEventListener('click', copyImagePrompt);

        // Enter key support for textareas
        elements.promptInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                if (!elements.generateBtn.disabled) {
                    generateImages();
                }
            }
        });

        // Initialize the app
        initializeModelGrid();
        elements.originalPrompt.focus();
    </script>
</body>
</html>


