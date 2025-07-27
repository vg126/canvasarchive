# VG-UltimateImageGen

## Description
No description available

## Canvas Code
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Image Reference Studio - Ultimate Edition</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#059669',
                        secondary: '#0D9488',
                        accent: '#10B981',
                        'bg-light': '#FFFFFF',
                        'bg-dark': '#181818',
                        'layer-bg': '#F0FDF4',
                        'layer-bg-dark': '#1F2937'
                    }
                }
            },
            darkMode: 'class'
        }
    </script>
</head>
<body class="bg-bg-light dark:bg-bg-dark text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-200">
    <div class="container mx-auto px-4 py-8 max-w-6xl">
        <!-- Header -->
        <div class="text-center mb-8">
            <h1 class="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI Image Reference Studio
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
                Layered image processing with reference images and AI enhancement
            </p>
        </div>

        <!-- Reference Image Upload -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Reference Image</h2>
                <span class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">Optional</span>
            </div>
            
            <div id="uploadArea" class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <div id="uploadPrompt">
                    <svg class="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Drop image here or click to upload</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">PNG, JPEG, WebP up to 10MB</p>
                </div>
                <div id="imagePreview" class="hidden">
                    <img id="previewImg" class="max-w-full max-h-48 mx-auto rounded-lg mb-4">
                    <div class="flex justify-center space-x-2">
                        <button id="replaceBtn" class="px-3 py-1 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors text-sm">Replace</button>
                        <button id="removeBtn" class="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">Remove</button>
                    </div>
                </div>
            </div>
            <input type="file" id="fileInput" class="hidden" accept="image/*">
        </div>

        <!-- Prompt Section -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Prompt & Enhancement</h2>
            
            <div class="space-y-4">
                <div>
                    <label for="promptInput" class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Base Prompt
                    </label>
                    <textarea 
                        id="promptInput" 
                        rows="3" 
                        placeholder="Describe what you want to generate or edit..."
                        class="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none transition-all duration-200"
                    ></textarea>
                </div>

                <div class="flex items-center space-x-3 flex-wrap gap-y-2">
                    <button id="enhanceBtn" class="flex items-center px-4 py-2 bg-secondary text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        <span id="enhanceText">Enhance Prompt</span>
                        <span id="enhanceLoader" class="hidden ml-2">
                            <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 718-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </span>
                    </button>
                    
                    <button id="analyzeBtn" class="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                        <span id="analyzeText">Read Image</span>
                        <span id="analyzeLoader" class="hidden ml-2">
                            <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 718-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </span>
                    </button>
                    
                    <span class="text-xs text-gray-500">Uses selected enhancement model</span>
                </div>

                <div id="enhancedPromptSection" class="hidden">
                    <label for="enhancedPrompt" class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Enhanced Prompt
                    </label>
                    <textarea 
                        id="enhancedPrompt" 
                        rows="4" 
                        class="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none transition-all duration-200"
                    ></textarea>
                    <button id="useEnhancedBtn" class="mt-2 px-3 py-1 bg-accent text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
                        Use Enhanced Prompt
                    </button>
                </div>
            </div>
        </div>

        <!-- Enhanced Prompt Settings -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">AI Enhancement Mode</h2>
            
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Enhancement Model
                    </label>
                    <select id="enhanceModel" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700">
                        <option value="@VG-LizerBot">VG-LizerBot - Specialized Prompt Enhancer</option>
                        <option value="@GPT-4.1">GPT-4.1 - Advanced Multimodal</option>
                        <option value="@GPT-4o">GPT-4o - OpenAI's Flagship</option>
                        <option value="@Claude-Sonnet-4">Claude Sonnet 4 - Superior Analysis</option>
                        <option value="@Grok-4">Grok 4- Fast & Capable</option>
                        <option value="@Llama-4-Scout-B10">Llama 4 Scout - Ultra Context</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Generation Models -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Image Generation</h2>
            
            <div class="space-y-6">
                <!-- Reference-Based Generation (Dual) -->
                <div class="bg-layer-bg dark:bg-layer-bg-dark rounded-xl p-4">
                    <div class="flex items-center justify-between mb-3">
                        <label class="flex items-center">
                            <input type="checkbox" id="referenceGeneration" class="mr-3 text-primary focus:ring-primary" checked>
                            <span class="font-medium">Reference-Based Generation (Dual Compare)</span>
                        </label>
                        <span class="text-xs px-2 py-1 bg-primary text-white rounded-full">Variable</span>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">Model A</label>
                            <select id="modelA" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700">
                                <option value="@Gemini-2.0-Flash-Preview">Gemini 2.0 Flash Preview</option>
                                <option value="@Flux-Kontext-Pro">FLUX Kontext Pro</option>
                                <option value="@FLUX-schnell">FLUX Schnell</option>
                                <option value="@Ideogram-v3">Ideogram v3</option>
                                <option value="@FLUX-pro">FLUX Pro</option>
                                <option value="@StableDiffusion3.5-L">Stable Diffusion 3.5 Large</option>
                                <option value="@FLUX-dev-finetuner">FLUX Dev Finetuner</option>
                                <option value="@FLUX-dev">FLUX Dev</option>
                                <option value="@GPT-Image-1">GPT Image 1</option>
                                <option value="@Flux-Kontext-Max">FLUX Kontext Max</option>
                                <option value="@StableDiffusion3.5-T">Stable Diffusion 3.5 Turbo</option>
                                <option value="@StableDiffusionXL">Stable Diffusion XL</option>
                                <option value="@Recraft-V3">Recraft V3</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">Model B</label>
                            <select id="modelB" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700">
                                <option value="@Gemini-2.0-Flash-Preview">Gemini 2.0 Flash Preview</option>
                                <option value="@Flux-Kontext-Pro">FLUX Kontext Pro</option>
                                <option value="@FLUX-schnell">FLUX Schnell</option>
                                <option value="@Ideogram-v3">Ideogram v3</option>
                                <option value="@FLUX-pro">FLUX Pro</option>
                                <option value="@StableDiffusion3.5-L">Stable Diffusion 3.5 Large</option>
                                <option value="@FLUX-dev-finetuner">FLUX Dev Finetuner</option>
                                <option value="@FLUX-dev">FLUX Dev</option>
                                <option value="@GPT-Image-1">GPT Image 1</option>
                                <option value="@Flux-Kontext-Max">FLUX Kontext Max</option>
                                <option value="@StableDiffusion3.5-T">Stable Diffusion 3.5 Turbo</option>
                                <option value="@StableDiffusionXL">Stable Diffusion XL</option>
                                <option value="@Recraft-V3">Recraft V3</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Text-Only Generation -->
                <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4">
                    <div class="flex items-center justify-between mb-3">
                        <label class="flex items-center">
                            <input type="checkbox" id="textOnlyGeneration" class="mr-3 text-primary focus:ring-primary">
                            <span class="font-medium">Text-Only Powerhouses (Standalone)</span>
                        </label>
                        <span class="text-xs px-2 py-1 bg-purple-500 text-white rounded-full">No Reference Needed</span>
                    </div>
                    
                    <div>
                        <label class="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">Text-Only Model</label>
                        <select id="textOnlyModel" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700">
                            <option value="@Imagen-4">Imagen 4 - Google's Photorealistic Beast</option>
                            <option value="@FLUX-pro-1.1">FLUX Pro 1.1 - Professional Quality</option>
                            <option value="@FLUX-pro-1.1-ultra">FLUX Pro 1.1 Ultra - Maximum Performance</option>
                            <option value="@StableDiffusion3.5-T">Stable Diffusion 3.5 Turbo</option>
                            <option value="@Imagen-3">Imagen 3</option>
                            <option value="@Imagen-4-Fast">Imagen 4 Fast</option>
                            <option value="@Recraft-V3">Recraft V3</option>
                            <option value="@Luma-Photon">Luma Photon</option>
                            <option value="@StableDiffusion3.5-L">Stable Diffusion 3.5 Large</option>
                            <option value="@Imagen-4-Ultra-Exp">Imagen 4 Ultra Exp</option>
                            <option value="@Seedream-3.0">Seedream 3.0</option>
                            <option value="@Flux-Kontext-Pro">FLUX Kontext Pro</option>
                            <option value="@Flux-Kontext-Max">FLUX Kontext Max</option>
                            <option value="@Ideogram-v3">Ideogram v3</option>
                            <option value="@Hidream-I1-full">Hidream I1 full</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <!-- Generate Buttons -->
        <div class="flex gap-4 mb-6">
            <!-- Enhanced Send Button -->
            <button 
                id="enhancedSendBtn" 
                class="flex-1 bg-secondary hover:bg-teal-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
                <span id="enhancedSendText">Enhanced Send</span>
                <div id="enhancedSendLoader" class="hidden inline-flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 718-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                </div>
            </button>
            
            <!-- Manual Generate Button -->
            <button 
                id="generateBtn" 
                class="flex-1 bg-primary hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
                <span id="btnText">Manual Send</span>
                <div id="btnLoader" class="hidden inline-flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 718-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                </div>
            </button>
        </div>

        <!-- Results Section -->
        <div id="resultsSection" class="hidden">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">Generated Results</h2>
                    <button id="generateAnother" class="inline-flex items-center px-4 py-2 bg-primary hover:bg-green-700 text-white rounded-lg transition-colors duration-200">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                        Generate Another
                    </button>
                </div>
                
                <!-- Multi-result grid -->
                <div id="multiResultGrid" class="grid gap-6"></div>
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
     // DOM elements
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const uploadPrompt = document.getElementById('uploadPrompt');
        const imagePreview = document.getElementById('imagePreview');
        const previewImg = document.getElementById('previewImg');
        const replaceBtn = document.getElementById('replaceBtn');
        const removeBtn = document.getElementById('removeBtn');
        
        const promptInput = document.getElementById('promptInput');
        const enhanceBtn = document.getElementById('enhanceBtn');
        const enhanceText = document.getElementById('enhanceText');
        const enhanceLoader = document.getElementById('enhanceLoader');
        const analyzeBtn = document.getElementById('analyzeBtn');
        const analyzeText = document.getElementById('analyzeText');
        const analyzeLoader = document.getElementById('analyzeLoader');
        const enhancedPromptSection = document.getElementById('enhancedPromptSection');
        const enhancedPrompt = document.getElementById('enhancedPrompt');
        const useEnhancedBtn = document.getElementById('useEnhancedBtn');
        const enhanceModel = document.getElementById('enhanceModel');
        
        const referenceGeneration = document.getElementById('referenceGeneration');
        const textOnlyGeneration = document.getElementById('textOnlyGeneration');
        
        const generateBtn = document.getElementById('generateBtn');
        const btnText = document.getElementById('btnText');
        const btnLoader = document.getElementById('btnLoader');
        const enhancedSendBtn = document.getElementById('enhancedSendBtn');
        const enhancedSendText = document.getElementById('enhancedSendText');
        const enhancedSendLoader = document.getElementById('enhancedSendLoader');
        const resultsSection = document.getElementById('resultsSection');
        const multiResultGrid = document.getElementById('multiResultGrid');
        const generateAnother = document.getElementById('generateAnother');

        // State
        let uploadedFile = null;

        // File upload handling
        uploadArea.addEventListener('click', () => fileInput.click());
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('border-primary');
        });
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('border-primary');
        });
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('border-primary');
            handleFile(e.dataTransfer.files[0]);
        });

        fileInput.addEventListener('change', (e) => {
            handleFile(e.target.files[0]);
        });

        replaceBtn.addEventListener('click', () => fileInput.click());
        removeBtn.addEventListener('click', removeImage);

        function handleFile(file) {
            if (!file || !file.type.startsWith('image/')) return;
            
            if (file.size > 10 * 1024 * 1024) {
                showAlert('File size must be less than 10MB');
                return;
            }

            uploadedFile = file;
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImg.src = e.target.result;
                uploadPrompt.classList.add('hidden');
                imagePreview.classList.remove('hidden');
                updateAnalyzeButtonState();
            };
            reader.readAsDataURL(file);
        }

        function removeImage() {
            uploadedFile = null;
            uploadPrompt.classList.remove('hidden');
            imagePreview.classList.add('hidden');
            fileInput.value = '';
            updateAnalyzeButtonState();
        }

        // Update analyze button state based on image availability
        function updateAnalyzeButtonState() {
            analyzeBtn.disabled = !uploadedFile;
            if (!uploadedFile) {
                analyzeBtn.classList.add('opacity-50', 'cursor-not-allowed');
                analyzeBtn.title = "Requires reference image";
            } else {
                analyzeBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                analyzeBtn.title = "";
            }
        }

        // Enhanced Prompt functionality
        window.Poe.registerHandler("prompt-enhance-handler", (result, context) => {
            const response = result.responses[0];
            
            if (response.status === "error") {
                enhancedPrompt.value = "Error enhancing prompt: " + (response.statusText || "Unknown error");
                enhancedPromptSection.classList.remove('hidden');
                setEnhanceLoading(false);
            } else if (response.status === "complete") {
                enhancedPrompt.value = response.content.trim();
                enhancedPromptSection.classList.remove('hidden');
                setEnhanceLoading(false);
            } else if (response.status === "incomplete") {
                // Handle streaming/partial responses
                enhancedPrompt.value = response.content.trim();
                enhancedPromptSection.classList.remove('hidden');
            }
        });

        // Analyze Image functionality  
        window.Poe.registerHandler("image-analyze-handler", (result, context) => {
            const response = result.responses[0];
            
            if (response.status === "error") {
                enhancedPrompt.value = "Error analyzing image: " + (response.statusText || "Unknown error");
                enhancedPromptSection.classList.remove('hidden');
            } else if (response.status === "complete") {
                enhancedPrompt.value = response.content.trim();
                enhancedPromptSection.classList.remove('hidden');
            }
            
            if (result.status === "complete" || response.status === "error") {
                setAnalyzeLoading(false);
            }
        });

        enhanceBtn.addEventListener('click', async () => {
            const selectedModel = enhanceModel.value;
            const basePrompt = promptInput.value.trim();
            
            setEnhanceLoading(true);
            
            try {
                let enhanceMessage;
                
                // Handle different scenarios
                if (uploadedFile && basePrompt) {
                    // Image + Prompt: Enhanced prompt considering both
                    enhanceMessage = `${selectedModel} Please enhance this image prompt for better AI generation. Consider both the provided image and this text: "${basePrompt}". Provide only the enhanced prompt.`;
                } else if (uploadedFile && !basePrompt) {
                    // Image only: Enhance based on image analysis  
                    enhanceMessage = `${selectedModel} Analyze this image and create an enhanced prompt suitable for AI image generation. Focus on visual elements, style, composition, and mood. Provide only the enhanced prompt.`;
                } else if (!uploadedFile && basePrompt) {
                    // Prompt only: Traditional prompt enhancement
                    enhanceMessage = `${selectedModel} Please enhance this image prompt for better AI generation: "${basePrompt}". Provide only the enhanced prompt.`;
                } else {
                    // Neither: Show error
                    showAlert('Please provide either a base prompt, reference image, or both for enhancement.');
                    setEnhanceLoading(false);
                    return;
                }

                const messageOptions = {
                    handler: "prompt-enhance-handler",
                    stream: false,
                    openChat: false
                };

                if (uploadedFile) {
                    messageOptions.attachments = [uploadedFile];
                }

                await window.Poe.sendUserMessage(enhanceMessage, messageOptions);
            } catch (err) {
                console.error("Error:", err);
                setEnhanceLoading(false);
                showAlert("Error enhancing prompt: " + err.message);
            }
        });

        // Read Image functionality (simplified)
        analyzeBtn.addEventListener('click', async () => {
            if (!uploadedFile) {
                showAlert('Please upload a reference image first.');
                return;
            }

            const selectedModel = enhanceModel.value;
            
            setAnalyzeLoading(true);
            
            try {
                // Simple image description
                const analyzeMessage = `${selectedModel} Tell me what you see in this image. Describe it in detail. Provide only the description.`;

                await window.Poe.sendUserMessage(analyzeMessage, {
                    handler: "image-analyze-handler",
                    stream: false,
                    openChat: false,
                    attachments: [uploadedFile]
                });
            } catch (err) {
                console.error("Error:", err);
                setAnalyzeLoading(false);
                showAlert("Error reading image: " + err.message);
            }
        });

        useEnhancedBtn.addEventListener('click', () => {
            promptInput.value = enhancedPrompt.value;
        });

        function setEnhanceLoading(loading) {
            enhanceBtn.disabled = loading;
            enhanceText.classList.toggle('hidden', loading);
            enhanceLoader.classList.toggle('hidden', !loading);
        }

        function setAnalyzeLoading(loading) {
            analyzeBtn.disabled = loading || !uploadedFile;
            analyzeText.classList.toggle('hidden', loading);
            analyzeLoader.classList.toggle('hidden', !loading);
        }

        // Validation for generation options
        function validateLayers() {
            const hasReference = referenceGeneration.checked;
            const hasTextOnly = textOnlyGeneration.checked;
            
            if (!hasReference && !hasTextOnly) {
                return { valid: false, message: 'Please enable at least one generation type' };
            }
            
            return { valid: true };
        }

        // Create multiple result boxes based on selected models
        function createMultipleResultBoxes(calls) {
            let gridCols = 'grid-cols-1';
            
            // Determine grid layout based on number of calls + reference
            const totalBoxes = calls.length + (uploadedFile ? 1 : 0);
            if (totalBoxes === 2) gridCols = 'md:grid-cols-2';
            else if (totalBoxes === 3) gridCols = 'md:grid-cols-3';
            else if (totalBoxes >= 4) gridCols = 'md:grid-cols-2 lg:grid-cols-4';
            
            multiResultGrid.className = `grid gap-6 ${gridCols}`;
            multiResultGrid.innerHTML = '';
            
            // Add reference image if available
            if (uploadedFile) {
                const referenceBox = document.createElement('div');
                referenceBox.innerHTML = `
                    <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Reference Image</h3>
                    <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                        <img src="${previewImg.src}" class="w-full rounded-lg">
                    </div>
                `;
                multiResultGrid.appendChild(referenceBox);
            }
            
            // Add result boxes for each model
            calls.forEach(call => {
                const resultBox = document.createElement('div');
                resultBox.id = `result-${call.id}`;
                resultBox.innerHTML = `
                    <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">${call.name}</h3>
                    <div id="content-${call.id}" class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 min-h-48 flex items-center justify-center">
                        <div class="text-center text-gray-500">
                            <svg class="animate-spin w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 718-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p>Generating...</p>
                        </div>
                    </div>
                `;
                multiResultGrid.appendChild(resultBox);
            });
        }

        // Call bot with individual result box
        async function callBotWithResultBox(botHandle, prompt, imageFile, resultId, modelName) {
            return new Promise(async (resolve, reject) => {
                const handlerName = `bot-handler-${resultId}-${Date.now()}`;
                const contentElement = document.getElementById(`content-${resultId}`);
                
                window.Poe.registerHandler(handlerName, (result, context) => {
                    const response = result.responses[0];
                    
                    if (response.status === "error") {
                        contentElement.innerHTML = `
                            <div class="text-center text-red-600 dark:text-red-400">
                                <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <p class="text-sm">Generation failed</p>
                                <p class="text-xs mt-1">${response.statusText || "Unknown error"}</p>
                            </div>
                        `;
                        reject(new Error(response.statusText || "Unknown error"));
                    } else if (response.status === "complete") {
                        if (response.attachments?.length > 0) {
                            const imageAttachment = response.attachments[0];
                            contentElement.innerHTML = `
                                <div class="text-center">
                                    <img src="${imageAttachment.url}" alt="Generated by ${modelName}" class="w-full rounded-lg mb-3">
                                    <a href="${imageAttachment.url}" download="${modelName}-${Date.now()}.png" 
                                       class="inline-flex items-center px-3 py-1 bg-primary hover:bg-green-700 text-white rounded text-sm transition-colors">
                                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                        </svg>
                                        Download
                                    </a>
                                </div>
                            `;
                            resolve(imageAttachment);
                        } else {
                            contentElement.innerHTML = `
                                <div class="text-center text-yellow-600 dark:text-yellow-400">
                                    <p class="text-sm">No image generated</p>
                                    <p class="text-xs mt-1">${response.content || 'Unknown reason'}</p>
                                </div>
                            `;
                            reject(new Error("No image was generated"));
                        }
                    }
                });

                // Prepare message options
                const messageOptions = {
                    handler: handlerName,
                    stream: false,
                    openChat: false
                };

                // Add image attachment if provided
                if (imageFile) {
                    messageOptions.attachments = [imageFile];
                }

                // Create the message
                const message = `${botHandle} ${prompt}`;

                console.log(`📤 Calling ${modelName}:`, message, imageFile ? "with attachment" : "text only");
                
                window.Poe.sendUserMessage(message, messageOptions).catch(err => {
                    console.error(`❌ ${modelName} failed:`, err);
                    contentElement.innerHTML = `
                        <div class="text-center text-red-600 dark:text-red-400">
                            <p class="text-sm">Connection failed</p>
                            <p class="text-xs mt-1">${err.message}</p>
                        </div>
                    `;
                    reject(err);
                });
            });
        }

        // Multi-model generation logic with multiple result boxes
        async function processLayers() {
            const prompt = promptInput.value.trim();
            
            console.log("🚀 Starting multi-model generation...");
            console.log("- Reference Generation:", referenceGeneration.checked);
            console.log("- Text-Only Generation:", textOnlyGeneration.checked);
            console.log("- Has reference image:", !!uploadedFile);

            // Prepare calls array
            const calls = [];
            
            // Add reference-based generations
            if (referenceGeneration.checked) {
                const modelA = document.getElementById('modelA').value;
                const modelB = document.getElementById('modelB').value;
                
                console.log("📝 Adding Model A:", modelA);
                console.log("📝 Adding Model B:", modelB);
                
                calls.push({
                    id: 'modelA',
                    name: modelA.replace('@', ''),
                    bot: modelA,
                    prompt: prompt,
                    imageFile: uploadedFile
                });
                
                calls.push({
                    id: 'modelB', 
                    name: modelB.replace('@', ''),
                    bot: modelB,
                    prompt: prompt,
                    imageFile: uploadedFile
                });
            }
            
            // Add text-only generation
            if (textOnlyGeneration.checked) {
                const textModel = document.getElementById('textOnlyModel').value;
                console.log("📝 Adding Text Model:", textModel);
                
                calls.push({
                    id: 'textOnly',
                    name: textModel.replace('@', ''),
                    bot: textModel,
                    prompt: prompt,
                    imageFile: null
                });
            }

            console.log("🎯 Total calls to make:", calls.length);

            // Create multiple result boxes
            createMultipleResultBoxes(calls);
            
            // Start all calls simultaneously
            const promises = calls.map(call => 
                callBotWithResultBox(call.bot, call.prompt, call.imageFile, call.id, call.name)
            );
            
            try {
                await Promise.allSettled(promises); // Use allSettled to handle individual failures
                setGenerateLoading(false);
                console.log("✅ All generations completed!");
            } catch (err) {
                setGenerateLoading(false);
                console.error("❌ Some generations failed:", err);
            }
        }
    // Enhanced Send Handler for prompt transformation
        window.Poe.registerHandler("prompt-transform-handler", (result, context) => {
            const response = result.responses[0];
            
            if (response.status === "error") {
                console.error("Prompt transformation error:", response.statusText);
                setEnhancedSendLoading(false);
                showAlert("Error transforming prompt: " + (response.statusText || "Unknown error"));
            } else if (response.status === "complete") {
                const transformedPrompt = response.content.trim();
                console.log("Transformed prompt received:", transformedPrompt);
                
                // Continue with the actual generation using transformed prompt
                window.enhancedPromptReady = transformedPrompt;
                window.dispatchEvent(new CustomEvent('enhancedPromptReady'));
            }
        });

        // Enhanced Send - with multimodal preprocessing
        enhancedSendBtn.addEventListener('click', async () => {
            const prompt = promptInput.value.trim();
            
            // Validate layers
            const validation = validateLayers();
            if (!validation.valid) {
                showAlert(validation.message);
                return;
            }

            // Require prompt
            if (!prompt) {
                showAlert('Please enter a prompt for image generation');
                return;
            }

            // Check which modes are selected
            const hasReference = referenceGeneration.checked;
            const hasTextOnly = textOnlyGeneration.checked;
            
            console.log("Enhanced Send initiated:");
            console.log("- Reference mode:", hasReference);
            console.log("- Text-only mode:", hasTextOnly);
            console.log("- Has image:", !!uploadedFile);

            // Show results section
            resultsSection.classList.remove('hidden');
            setEnhancedSendLoading(true);

            try {
                // If both modes selected, we need to handle dual-path
                if (hasReference && hasTextOnly) {
                    await processEnhancedDualPath(prompt);
                } else if (hasReference) {
                    await processEnhancedReferencePath(prompt);
                } else if (hasTextOnly) {
                    await processEnhancedTextOnlyPath(prompt);
                }
            } catch (err) {
                console.error("Error:", err);
                setEnhancedSendLoading(false);
                showAlert(`Error during enhanced send: ${err.message}`);
            }
        });

        // Manual Send - existing functionality
        generateBtn.addEventListener('click', async () => {
            const prompt = promptInput.value.trim();
            
            // Validate layers
            const validation = validateLayers();
            if (!validation.valid) {
                showAlert(validation.message);
                return;
            }

            // Require prompt
            if (!prompt) {
                showAlert('Please enter a prompt for image generation');
                return;
            }

            // Show results section
            resultsSection.classList.remove('hidden');
            setGenerateLoading(true);

            try {
                await processLayers();
            } catch (err) {
                console.error("Error:", err);
                setGenerateLoading(false);
                showAlert(`Error starting generation: ${err.message}`);
            }
        });

        function setGenerateLoading(loading) {
            generateBtn.disabled = loading;
            btnText.classList.toggle('hidden', loading);
            btnLoader.classList.toggle('hidden', !loading);
        }
        
        function setEnhancedSendLoading(loading) {
            enhancedSendBtn.disabled = loading;
            enhancedSendText.classList.toggle('hidden', loading);
            enhancedSendLoader.classList.toggle('hidden', !loading);
        }

        function resetForm() {
            resultsSection.classList.add('hidden');
            setGenerateLoading(false);
            promptInput.focus();
        }

        generateAnother.addEventListener('click', resetForm);

        // Enhanced Send Helper Functions
        async function processEnhancedReferencePath(basePrompt) {
            const selectedModel = enhanceModel.value;
            
            // Transform prompt for reference-based generation
            const transformMessage = uploadedFile
                ? `${selectedModel} You are an expert prompt engineer. I have a reference image and this base prompt: "${basePrompt}". First, enhance this prompt with rich visual details, composition elements, and technical parameters that would improve AI image generation quality. Then, adapt the enhanced prompt specifically for reference-image-based generation where the model will see both your prompt AND the reference image. Focus on: - How to modify/adapt elements from the reference - What aspects to preserve vs transform - Style transfer or composition guidance - Technical parameters for reference-aware generation Provide only the final enhanced reference-aware prompt.`
                : `${selectedModel} You are an expert prompt engineer. I have a reference image and this base prompt: "${basePrompt}". First, enhance this prompt with rich visual details, composition elements, and technical parameters that would improve AI image generation quality. Then, adapt the enhanced prompt specifically for reference-image-based generation where the model will see both your prompt AND the reference image. Focus on: - How to modify/adapt elements from the reference - What aspects to preserve vs transform - Style transfer or composition guidance - Technical parameters for reference-aware generation Provide only the final enhanced reference-aware prompt.`;
            
            const messageOptions = {
                handler: "prompt-transform-handler",
                stream: false,
                openChat: false
            };
            
            if (uploadedFile) {
                messageOptions.attachments = [uploadedFile];
            }

            // Wait for transformation
            window.addEventListener('enhancedPromptReady', async function handleReady() {
                window.removeEventListener('enhancedPromptReady', handleReady);
                const transformedPrompt = window.enhancedPromptReady;
                delete window.enhancedPromptReady;
                
                // Now process with transformed prompt
                await processLayersWithPrompt(transformedPrompt);
                setEnhancedSendLoading(false);
            });

            await window.Poe.sendUserMessage(transformMessage, messageOptions);
        }

        async function processEnhancedTextOnlyPath(basePrompt) {
            const selectedModel = enhanceModel.value;
            
            // Transform prompt for standalone generation
            const transformMessage = uploadedFile
                ? `${selectedModel} You are an expert prompt engineer. I have this image [attached] and this base prompt: "${basePrompt}". Analyze the image thoroughly, then create a comprehensive standalone prompt that: 1. Incorporates key visual elements from the image 2. Enhances the base prompt with rich details 3. Works perfectly without any reference image 4. Includes style, composition, lighting, mood details 5. Adds technical parameters for optimal generation Provide only the final detailed standalone prompt.`
                : `${selectedModel} You are an expert prompt engineer. I have this base prompt: "${basePrompt}". Create a comprehensive standalone prompt that enhances the base prompt with rich details and works perfectly without any reference image. Include style, composition, lighting, mood details and technical parameters for optimal generation. Provide only the final detailed standalone prompt.`;
            
            const messageOptions = {
                handler: "prompt-transform-handler",
                stream: false,
                openChat: false
            };
            
            if (uploadedFile) {
                messageOptions.attachments = [uploadedFile];
            }

            // Wait for transformation
            window.addEventListener('enhancedPromptReady', async function handleReady() {
                window.removeEventListener('enhancedPromptReady', handleReady);
                const transformedPrompt = window.enhancedPromptReady;
                delete window.enhancedPromptReady;
                
                // Process text-only with transformed prompt
                await processLayersWithPrompt(transformedPrompt);
                setEnhancedSendLoading(false);
            });

            await window.Poe.sendUserMessage(transformMessage, messageOptions);
        }

        async function processEnhancedDualPath(basePrompt) {
            const selectedModel = enhanceModel.value;
            
            // First, get reference-based prompt
            const referenceTransform = uploadedFile
                ? `${selectedModel} You are an expert prompt engineer. I have a reference image and this base prompt: "${basePrompt}". First, enhance this prompt with rich visual details, composition elements, and technical parameters that would improve AI image generation quality. Then, adapt the enhanced prompt specifically for reference-image-based generation where the model will see both your prompt AND the reference image. Focus on: - How to modify/adapt elements from the reference - What aspects to preserve vs transform - Style transfer or composition guidance - Technical parameters for reference-aware generation Provide only the final enhanced reference-aware prompt.`
                : `${selectedModel} You are an expert prompt engineer. I have a reference image and this base prompt: "${basePrompt}". First, enhance this prompt with rich visual details, composition elements, and technical parameters that would improve AI image generation quality. Then, adapt the enhanced prompt specifically for reference-image-based generation where the model will see both your prompt AND the reference image. Focus on: - How to modify/adapt elements from the reference - What aspects to preserve vs transform - Style transfer or composition guidance - Technical parameters for reference-aware generation Provide only the final enhanced reference-aware prompt.`;
            
            let referencePrompt = "";
            let standalonePrompt = "";
            
            // Handler for dual-path
            let callCount = 0;
            window.Poe.registerHandler("dual-path-handler", (result, context) => {
                const response = result.responses[0];
                
                if (response.status === "complete") {
                    callCount++;
                    if (callCount === 1) {
                        referencePrompt = response.content.trim();
                        console.log("Reference prompt received:", referencePrompt);
                    } else if (callCount === 2) {
                        standalonePrompt = response.content.trim();
                        console.log("Standalone prompt received:", standalonePrompt);
                        
                        // Trigger dual generation
                        window.dualPromptsReady = { reference: referencePrompt, standalone: standalonePrompt };
                        window.dispatchEvent(new CustomEvent('dualPromptsReady'));
                    }
                }
            });

            // Wait for both transformations
            window.addEventListener('dualPromptsReady', async function handleDualReady() {
                window.removeEventListener('dualPromptsReady', handleDualReady);
                const prompts = window.dualPromptsReady;
                delete window.dualPromptsReady;
                
                // Process both paths
                await processDualLayersWithPrompts(prompts.reference, prompts.standalone);
                setEnhancedSendLoading(false);
            });

            // Send first transformation (reference)
            const messageOptions1 = {
                handler: "dual-path-handler",
                stream: false,
                openChat: false
            };
            if (uploadedFile) {
                messageOptions1.attachments = [uploadedFile];
            }
            await window.Poe.sendUserMessage(referenceTransform, messageOptions1);

            // Small delay before second call
            await new Promise(resolve => setTimeout(resolve, 500));

            // Send second transformation (standalone)
            const standaloneTransform = uploadedFile
                ? `${selectedModel} You are an expert prompt engineer. I have this image [attached] and this base prompt: "${basePrompt}". Analyze the image thoroughly, then create a comprehensive standalone prompt that: 1. Incorporates key visual elements from the image 2. Enhances the base prompt with rich details 3. Works perfectly without any reference image 4. Includes style, composition, lighting, mood details 5. Adds technical parameters for optimal generation Provide only the final detailed standalone prompt.`
                : `${selectedModel} You are an expert prompt engineer. I have this base prompt: "${basePrompt}". Create a comprehensive standalone prompt that enhances the base prompt with rich details and works perfectly without any reference image. Include style, composition, lighting, mood details and technical parameters for optimal generation. Provide only the final detailed standalone prompt.`;
            
            const messageOptions2 = {
                handler: "dual-path-handler",
                stream: false,
                openChat: false
            };
            if (uploadedFile) {
                messageOptions2.attachments = [uploadedFile];
            }
            await window.Poe.sendUserMessage(standaloneTransform, messageOptions2);
        }

        // Modified processLayers to accept custom prompt
        async function processLayersWithPrompt(customPrompt) {
            const prompt = customPrompt || promptInput.value.trim();
            
            console.log("🚀 Processing with prompt:", prompt);
            
            // Prepare calls array
            const calls = [];
            
            // Add reference-based generations if checked
            if (referenceGeneration.checked) {
                const modelA = document.getElementById('modelA').value;
                const modelB = document.getElementById('modelB').value;
                
                calls.push({
                    id: 'modelA',
                    name: modelA.replace('@', ''),
                    bot: modelA,
                    prompt: prompt,
                    imageFile: uploadedFile
                });
                
                calls.push({
                    id: 'modelB', 
                    name: modelB.replace('@', ''),
                    bot: modelB,
                    prompt: prompt,
                    imageFile: uploadedFile
                });
            }
            
            // Add text-only generation if checked
            if (textOnlyGeneration.checked) {
                const textModel = document.getElementById('textOnlyModel').value;
                
                calls.push({
                    id: 'textOnly',
                    name: textModel.replace('@', ''),
                    bot: textModel,
                    prompt: prompt,
                    imageFile: null
                });
            }

            // Create result boxes and start generation
            createMultipleResultBoxes(calls);
            const promises = calls.map(call => 
                callBotWithResultBox(call.bot, call.prompt, call.imageFile, call.id, call.name)
            );
            
            await Promise.allSettled(promises);
        }

        // Process dual layers with different prompts
        async function processDualLayersWithPrompts(referencePrompt, standalonePrompt) {
            console.log("🚀 Processing dual-path generation");
            console.log("Reference prompt:", referencePrompt);
            console.log("Standalone prompt:", standalonePrompt);
            
            const calls = [];
            
            // Reference-based with reference prompt
            if (referenceGeneration.checked) {
                const modelA = document.getElementById('modelA').value;
                const modelB = document.getElementById('modelB').value;
                
                calls.push({
                    id: 'modelA',
                    name: modelA.replace('@', ''),
                    bot: modelA,
                    prompt: referencePrompt,
                    imageFile: uploadedFile
                });
                
                calls.push({
                    id: 'modelB', 
                    name: modelB.replace('@', ''),
                    bot: modelB,
                    prompt: referencePrompt,
                    imageFile: uploadedFile
                });
            }
            
            // Text-only with standalone prompt
            if (textOnlyGeneration.checked) {
                const textModel = document.getElementById('textOnlyModel').value;
                
                calls.push({
                    id: 'textOnly',
                    name: textModel.replace('@', ''),
                    bot: textModel,
                    prompt: standalonePrompt,
                    imageFile: null
                });
            }

            // Create result boxes and start generation
            createMultipleResultBoxes(calls);
            const promises = calls.map(call => 
                callBotWithResultBox(call.bot, call.prompt, call.imageFile, call.id, call.name)
            );
            
            await Promise.allSettled(promises);
        }

        // Helper function for alerts
        function showAlert(message) {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            modal.innerHTML = `
                <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
                    <p class="text-gray-700 dark:text-gray-300 mb-4">${message}</p>
                    <div class="flex justify-end">
                        <button class="px-4 py-2 bg-primary text-white hover:bg-green-700 rounded" onclick="this.closest('.fixed').remove()">OK</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }

        // Enter key support for textarea
        promptInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                if (!generateBtn.disabled) {
                    generateBtn.click();
                }
            }
        });

        // Initialize
        updateAnalyzeButtonState();
        promptInput.focus();
    </script>
</body>
</html>


```

## Metadata
- **Extracted**: 2025-07-27T19:15:17.555Z
- **Source**: https://poe.com/edit_bot?bot=VG-UltimateImageGen
- **Bot Type**: Canvas App
- **Code Length**: 59726 characters

---
*Extracted using VG Canvas App Extractor*
