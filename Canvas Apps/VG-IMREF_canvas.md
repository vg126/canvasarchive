# VG-IMREF

## Description
No description available

## Canvas Code
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grand Unified AI Studio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#5D5CDE',
                        secondary: '#059669', // From image generator
                        accent: '#10B981',
                        // Background colors (always dark)
                        'app-bg-light': '#1a1a1a',
                        'app-bg-dark': '#0f0f0f',
                        // Box/container colors by theme
                        'box-default': '#2a2a2a',
                        'box-mint': '#1a2f26',
                        'box-sky': '#1a2633',
                        'box-lavender': '#2a1f33',
                        'box-rose': '#331a26',
                        // Font colors - always bright white
                        'font-bright': '#FFFFFF',
                    }
                }
            },
            darkMode: 'class'
        }
    </script>
    <style>
        /* Theme-based styling */
        .themed-box {
            background-color: var(--box-color);
            color: var(--font-color);
        }
        
        /* Default theme */
        [data-theme="default"] {
            --box-color: #2a2a2a;
            --font-color: #FFFFFF;
        }
        
        /* Mint theme */
        [data-theme="mint"] {
            --box-color: #1a2f26;
            --font-color: #FFFFFF;
        }
        
        /* Sky theme */
        [data-theme="sky"] {
            --box-color: #1a2633;
            --font-color: #FFFFFF;
        }
        
        /* Lavender theme */
        [data-theme="lavender"] {
            --box-color: #2a1f33;
            --font-color: #FFFFFF;
        }
        
        /* Rose theme */
        [data-theme="rose"] {
            --box-color: #331a26;
            --font-color: #FFFFFF;
        }
        
        /* Form elements styling for themes */
        .themed-box input,
        .themed-box textarea,
        .themed-box select {
            background-color: rgba(0, 0, 0, 0.3);
            border-color: var(--font-color);
            color: var(--font-color);
        }
        
        .themed-box input::placeholder,
        .themed-box textarea::placeholder {
            color: rgba(var(--font-color-rgb), 0.6);
        }
    </style>
</head>
<body class="bg-app-bg-light text-white min-h-screen transition-colors duration-300" data-theme="default">
    <div class="container mx-auto px-4 py-8 max-w-7xl">
        <div class="text-center mb-6">
            <h1 class="text-3xl font-bold text-green-400">VG-AI Image Reference Studio</h1>
            <p class="text-white">Advanced Prompt Engineering & Multi-Model Image Generation</p>
            <!-- Color Theme Selector -->
            <div id="themeSelector" class="flex justify-center gap-3 mt-4">
                <!-- Theme buttons will be injected here by JS -->
            </div>
        </div>

        <!-- Main Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <!-- Left Panel: Prompt Engineering -->
            <div class="themed-box rounded-2xl shadow-xl p-6 space-y-4">
                <h2 class="text-xl font-semibold">1. Prompt Engineering</h2>

                <!-- Image Upload -->
                <div>
                    <label class="block text-sm font-medium mb-2">Reference Image (Optional)</label>
                    <div id="uploadArea" class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
                        <div id="uploadPrompt"><svg class="w-10 h-10 mx-auto mb-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg><p class="text-sm font-medium">Drop image or click to upload</p></div>
                        <div id="imagePreview" class="hidden"><img id="previewImg" class="max-w-full max-h-32 mx-auto rounded-lg mb-3"><div class="flex justify-center space-x-2 flex-wrap gap-1"><button id="replaceBtn" class="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs">Replace</button><button id="removeBgBtn" class="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-xs">🪄 Remove BG</button><button id="removeBtn" class="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xs">Remove</button></div></div>
                    </div>
                    <input type="file" id="fileInput" class="hidden" accept="image/*">
                    <button id="readImageBtn" class="w-full mt-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed">Read Image to Base Prompt</button>
                </div>
                
                <!-- Base Prompt -->
                <div>
                    <div class="flex justify-between items-center mb-2"><label class="block text-sm font-medium">Base Prompt</label><button id="clearPrompt" class="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600">🗑️ Clear</button></div>
                    <textarea id="originalPrompt" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-base resize-none" rows="4" placeholder="Enter prompt, or generate one by reading an image..."></textarea>
                </div>

                <!-- Analysis Controls -->
                <div>
                    <label class="block text-sm font-medium mb-2">Variable Analysis</label>
                    <div class="flex items-center gap-3 mb-2"><label class="text-sm">Model:</label><select id="analysisModel" class="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"><option>Claude-Sonnet-4</option><option>GPT-4o</option><option>Grok-4</option></select></div>
                    <div class="flex gap-2 flex-wrap">
                        <button id="analyzeBtn" class="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">🔍 Analyze</button>
                        <button id="addChoiceBtn" class="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">✨ Add Choice</button>
                        <button id="feedBtn" class="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">⬇️ Feed</button>
                        <button id="copyAllBtn" class="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">📋 Copy All</button>
                    </div>
                </div>
                <div id="analysisLoading" class="hidden"><div class="flex items-center text-blue-600"><div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div><span id="analysisStatus"></span></div></div>

                <!-- Variable Controls (moved from right panel) -->
                <div id="variableControls" class="hidden">
                    <h3 class="text-lg font-medium mb-2">Rotation Variables</h3>
                    <div id="variableList" class="space-y-3 mb-3 p-2 themed-box rounded-lg"></div>
                    <div class="flex gap-3 items-center"><button id="prevCombo" class="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">←</button><span id="comboCounter" class="px-3 py-1 text-center bg-black bg-opacity-20 border border-current rounded-lg font-medium">1/1</span><button id="nextCombo" class="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">→</button></div>
                </div>
            </div>

            <!-- Right Panel: Generation -->
            <div class="themed-box rounded-2xl shadow-xl p-6 space-y-4">
                <h2 class="text-xl font-semibold">2. Generation</h2>
                

                <div>
                    <label for="rotatedPrompt" class="block text-sm font-medium mb-2">Final Prompt (Editable)</label>
                    <textarea id="rotatedPrompt" rows="5" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-black bg-opacity-20 text-white text-base resize-none" placeholder="Final prompt for generation appears here..."></textarea>
                    <button id="refeedBtn" class="w-full mt-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">⬆️ Refeed to Base</button>
                </div>
                <div class="p-3 themed-box rounded-lg space-y-3">
                    <div class="flex items-center gap-3"><label class="text-sm text-white">Multimodal Model:</label><select id="enhancementBot" class="flex-1 px-3 py-1 border border-current rounded-lg text-sm bg-transparent text-white"><option>GPT-4o</option><option>Claude-Sonnet-4</option><option>Gemini-2.0-Flash-Preview</option></select></div>
                    <div>
                        <input type="file" id="techniquesFile" accept=".txt,.md" class="hidden"/>
                        <div class="flex gap-2"><button onclick="document.getElementById('techniquesFile').click()" id="uploadBtn" class="flex-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm">📁 Upload Techniques</button><button id="clearTechniques" class="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm hidden">✕</button></div>
                        <div id="techniqueStatus" class="text-xs mt-1 text-white hidden"></div>
                    </div>
                    <button id="enhancePromptBtn" class="w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg"><span id="enhanceBtnText">🚀 Enhance Prompt</span><div id="enhanceBtnLoader" class="hidden"><div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mx-auto"></div></div></button>
                </div>

                <!-- Generation Models -->
                <div class="p-3 themed-box rounded-lg space-y-3">
                    <h3 class="text-lg font-medium text-white">Generation Models</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label class="block text-xs font-medium mb-1 text-white">Model A</label><select id="modelA" class="w-full px-3 py-2 text-sm border rounded-lg bg-transparent text-white border-current"><option>@GPT-Image-1</option><option>@Flux-Kontext-Pro</option><option>@Flux-Kontext-Max</option></select></div>
                        <div><label class="block text-xs font-medium mb-1 text-white">Model B</label><select id="modelB" class="w-full px-3 py-2 text-sm border rounded-lg bg-transparent text-white border-current"><option>@Flux-Kontext-Pro</option><option>@GPT-Image-1</option><option>@Flux-Kontext-Max</option></select></div>
                    </div>
                </div>

                <!-- Generate Button -->
                <button id="generateBtn" class="w-full bg-secondary hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
                    <span id="btnText">GENERATE IMAGES</span>
                    <div id="btnLoader" class="hidden"><div class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"></div><span>Processing...</span></div>
                </button>
            </div>
        </div>

        <!-- Results Section -->
        <div id="resultsSection" class="hidden mt-6">
            <div class="themed-box rounded-2xl shadow-lg p-6">
                <div class="flex justify-between items-center mb-6"><h2 class="text-xl font-bold">Generated Results</h2><div class="flex gap-2"><button id="downloadImages" class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">📥 Download Images</button><button id="generateAnother" class="px-4 py-2 bg-primary text-white rounded-lg">Generate Another</button></div></div>
                <div id="multiResultGrid" class="grid gap-6"></div>
            </div>
        </div>
    </div>

<script>
// --- STATE & DOM ---
let currentVariables = [], uploadedFile = null, loadedTechniques = null, techniqueFileName = '', basePromptForRotation = '', currentCombination = 0, totalCombinations = 0;
const dom = {
    uploadArea: document.getElementById('uploadArea'), fileInput: document.getElementById('fileInput'), uploadPrompt: document.getElementById('uploadPrompt'), imagePreview: document.getElementById('imagePreview'), previewImg: document.getElementById('previewImg'), replaceBtn: document.getElementById('replaceBtn'), removeBgBtn: document.getElementById('removeBgBtn'), removeBtn: document.getElementById('removeBtn'), readImageBtn: document.getElementById('readImageBtn'),
    originalPrompt: document.getElementById('originalPrompt'), clearPrompt: document.getElementById('clearPrompt'),
    analysisModel: document.getElementById('analysisModel'), analyzeBtn: document.getElementById('analyzeBtn'), addChoiceBtn: document.getElementById('addChoiceBtn'), copyAllBtn: document.getElementById('copyAllBtn'), analysisLoading: document.getElementById('analysisLoading'), analysisStatus: document.getElementById('analysisStatus'),
    variableControls: document.getElementById('variableControls'), variableList: document.getElementById('variableList'), prevCombo: document.getElementById('prevCombo'), nextCombo: document.getElementById('nextCombo'), comboCounter: document.getElementById('comboCounter'),
    rotatedPrompt: document.getElementById('rotatedPrompt'),
    feedBtn: document.getElementById('feedBtn'), refeedBtn: document.getElementById('refeedBtn'),
    enhancementBot: document.getElementById('enhancementBot'), techniquesFile: document.getElementById('techniquesFile'), uploadBtn: document.getElementById('uploadBtn'), clearTechniques: document.getElementById('clearTechniques'), techniqueStatus: document.getElementById('techniqueStatus'), enhancePromptBtn: document.getElementById('enhancePromptBtn'), enhanceBtnText: document.getElementById('enhanceBtnText'), enhanceBtnLoader: document.getElementById('enhanceBtnLoader'),
    modelA: document.getElementById('modelA'), modelB: document.getElementById('modelB'),
    generateBtn: document.getElementById('generateBtn'), btnText: document.getElementById('btnText'), btnLoader: document.getElementById('btnLoader'),
    resultsSection: document.getElementById('resultsSection'), multiResultGrid: document.getElementById('multiResultGrid'), downloadImages: document.getElementById('downloadImages'), generateAnother: document.getElementById('generateAnother'),
    themeSelector: document.getElementById('themeSelector'),
};

// --- POE HANDLERS ---
window.Poe.registerHandler("analysis-handler", r => handleAnalysisResponse(r));
window.Poe.registerHandler("ai-expand-handler", r => handleAiExpandResponse(r));
window.Poe.registerHandler("enhancement-handler", r => handleEnhancementResponse(r));
window.Poe.registerHandler("image-read-handler", r => handleImageReadResponse(r));
window.Poe.registerHandler("remove-bg-handler", r => handleRemoveBgResponse(r));

// --- IMAGE HANDLING ---
function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    uploadedFile = file;
    const reader = new FileReader();
    reader.onload = e => {
        dom.previewImg.src = e.target.result;
        dom.uploadPrompt.classList.add('hidden');
        dom.imagePreview.classList.remove('hidden');
        dom.readImageBtn.disabled = false;
    };
    reader.readAsDataURL(file);
}
function removeImage() {
    uploadedFile = null;
    dom.uploadPrompt.classList.remove('hidden');
    dom.imagePreview.classList.add('hidden');
    dom.fileInput.value = '';
    dom.readImageBtn.disabled = true;
}
async function readImage() {
    if (!uploadedFile) { showAlert('Please upload an image first.'); return; }
    const model = dom.enhancementBot.value;
    setLoading(dom.readImageBtn, true, 'Reading...');
    try {
        await window.Poe.sendUserMessage(`@${model} Describe this image in detail for a generative art prompt. Focus on subject, style, colors, composition, and mood.`, {
            handler: "image-read-handler", stream: false, openChat: false, attachments: [uploadedFile]
        });
    } catch (e) {
        showAlert('Error reading image: ' + e.message);
        setLoading(dom.readImageBtn, false, 'Read Image to Base Prompt');
    }
}
function handleImageReadResponse(result) {
    setLoading(dom.readImageBtn, false, 'Read Image to Base Prompt');
    if (result.status === "complete") dom.originalPrompt.value = result.responses[0].content.trim();
    else showAlert("Image read error: " + (result.responses[0].statusText || 'Unknown error'));
}

async function removeBackground() {
    if (!uploadedFile) { showAlert('Please upload an image first.'); return; }
    setLoading(dom.removeBgBtn, true, 'Removing...');
    try {
        await window.Poe.sendUserMessage(`@remove-background Remove background from this image`, {
            handler: "remove-bg-handler", stream: false, openChat: false, attachments: [uploadedFile]
        });
    } catch (e) {
        showAlert('Error removing background: ' + e.message);
        setLoading(dom.removeBgBtn, false, '🪄 Remove BG');
    }
}

function handleRemoveBgResponse(result) {
    setLoading(dom.removeBgBtn, false, '🪄 Remove BG');
    if (result.status === "complete") {
        if (result.responses[0].attachments?.length > 0) {
            // Convert the result to a new file and update the preview
            fetch(result.responses[0].attachments[0].url)
                .then(response => response.blob())
                .then(blob => {
                    uploadedFile = new File([blob], 'removed-bg.png', { type: 'image/png' });
                    dom.previewImg.src = result.responses[0].attachments[0].url;
                })
                .catch(e => showAlert('Error processing removed background image: ' + e.message));
        } else {
            showAlert('No background-removed image was generated.');
        }
    } else {
        showAlert("Background removal error: " + (result.responses[0].statusText || 'Unknown error'));
    }
}

// --- PROMPT ROTATION ---
async function analyzePrompt() {
    const prompt = dom.originalPrompt.value.trim();
    if (!prompt) { showAlert('Please enter a base prompt to analyze.'); return; }
    basePromptForRotation = prompt;
    showAnalysisLoading(true, 'Analyzing variables...');
    const analysisPrompt = `
Analyze this prompt and identify key variables that could be rotated for systematic research: "${prompt}"

Your task:
1. Identify 6-7 of the most important nouns, adjectives, locations, or concepts that could be varied
2. For each variable, generate exactly 10 diverse, relevant alternatives
3. Use the EXACT text from the original prompt as current_value for each variable

Output ONLY valid JSON in this exact format:
{
  "variables": [
    {
      "name": "variable_name",
      "current_value": "exact_text_from_original_prompt", 
      "options": ["option1", "option2", "option3", "option4", "option5", "option6", "option7", "option8", "option9", "option10"]
    }
  ]
}

Limit to 6-7 variables maximum. Each variable should have exactly 10 options.`;
    try {
        await window.Poe.sendUserMessage(`@${dom.analysisModel.value} ${analysisPrompt}`, { handler: "analysis-handler", stream: false, openChat: false });
    } catch (e) {
        showAnalysisLoading(false);
        showAlert('Error analyzing prompt: ' + e.message);
    }
}
function handleAnalysisResponse(result, context) {
    showAnalysisLoading(false);
    if (result.status !== "complete") { showAlert("Analysis error: " + (result.responses[0].statusText || 'Unknown error')); return; }
    
    // Handle normal analysis - JSON response
    try {
        const jsonMatch = result.responses[0].content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error('No JSON in response');
        const data = JSON.parse(jsonMatch[0]);
        if (!data.variables) throw new Error('Invalid JSON structure');
        currentVariables = data.variables.slice(0, 10);
        setupVariableControls();
        calculateCombinations();
        updateRotatedPrompt();
        dom.variableControls.classList.remove('hidden');
    } catch (e) {
        showAlert('Error parsing analysis: ' + e.message);
    }
}

function handleAiExpandResponse(result, context) {
    showAnalysisLoading(false);
    if (result.status !== "complete") { showAlert("AI expand error: " + (result.responses[0].statusText || 'Unknown error')); return; }
    
    // Handle AI expansion - plain text response  
    try {
        const response = result.responses[0].content;
        const expandedOptions = response.trim().split('\n').map(opt => opt.trim()).filter(opt => opt.length > 0);
        
        // We need to know which variable this was for - store it globally during the call
        if (window.currentExpandVariableIndex !== undefined) {
            const variableIndex = window.currentExpandVariableIndex;
            const originalOptions = window.currentExpandOriginalOptions || [];
            
            // Combine original examples with AI-generated options
            const allNewOptions = [...originalOptions, ...expandedOptions];
            
            // Add to the textarea for user to review
            const customTextArea = document.getElementById(`customText-${variableIndex}`);
            if (customTextArea) {
                customTextArea.value = allNewOptions.join('\n');
                showAlert(`AI generated ${expandedOptions.length} additional options! Review and click "Add" to confirm.`);
            } else {
                showAlert('Error: Could not find textarea to update.');
            }
            
            // Clean up
            delete window.currentExpandVariableIndex;
            delete window.currentExpandOriginalOptions;
        } else {
            showAlert(`AI generated ${expandedOptions.length} options, but lost track of which variable this was for.`);
        }
    } catch (error) {
        showAlert('Error processing AI expansion: ' + error.message);
    }
}
function setupVariableControls() {
    dom.variableList.innerHTML = '';
    currentVariables.forEach((v, i) => {
        const div = document.createElement('div');
        div.className = 'p-3 border rounded-lg themed-box';
        let opts = (v.options || []).filter(opt => opt !== v.current_value);
        opts.unshift(v.current_value);
        div.innerHTML = `
            <label class="block text-sm font-medium mb-2 text-white">${v.name}:</label>
            <div class="flex gap-2 mb-2">
                <select class="flex-1 p-2 border rounded text-sm bg-transparent border-current text-white" data-variable-index="${i}">${opts.map(o => `<option value="${escapeHtml(o)}">${o === v.current_value ? `${escapeHtml(o)} (Original)` : escapeHtml(o)}</option>`).join('')}</select>
                <button class="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs transition-colors" onclick="addCustomOption(${i})" title="Add custom options">+</button>
            </div>
            <div id="customInput-${i}" class="hidden mt-2">
                <div class="flex flex-col gap-1">
                    <textarea id="customText-${i}" class="w-full p-2 border rounded text-xs resize-none bg-transparent border-current text-white" rows="2" placeholder="Add custom options (one per line)"></textarea>
                    <div class="flex gap-1">
                        <button class="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs" onclick="confirmCustomOptions(${i})">Add</button>
                        <button class="px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-xs" onclick="aiExpandOptions(${i})">AI Expand</button>
                        <button class="px-2 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded text-xs" onclick="cancelCustomOptions(${i})">Cancel</button>
                    </div>
                </div>
            </div>
        `;
        div.querySelector('select').addEventListener('change', updateRotatedPrompt);
        dom.variableList.appendChild(div);
    });
}
function updateRotatedPrompt() {
    if (currentVariables.length === 0) { dom.rotatedPrompt.value = dom.originalPrompt.value; return; }
    let p = basePromptForRotation;
    currentVariables.forEach((v, i) => {
        const s = document.querySelector(`[data-variable-index="${i}"]`);
        if(s) p = p.replace(new RegExp(escapeRegExp(v.current_value), 'gi'), s.value);
    });
    dom.rotatedPrompt.value = p;
}

// --- FEED/REFEED & ENHANCEMENT ---
function feedPrompt() {
    const text = dom.originalPrompt.value.trim();
    if (!text) { showAlert('Base prompt is empty.'); return; }
    dom.rotatedPrompt.value = text;
    basePromptForRotation = text;
    dom.variableControls.classList.add('hidden');
    currentVariables = [];
}
function refeedPrompt() {
    const text = dom.rotatedPrompt.value.trim();
    if (!text) { showAlert('Final prompt is empty.'); return; }
    dom.originalPrompt.value = text;
    basePromptForRotation = text;
    dom.variableControls.classList.add('hidden');
    currentVariables = [];
}
function handleTechniqueFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => { loadedTechniques = e.target.result; techniqueFileName = file.name; updateTechniqueStatus(true); };
    reader.readAsText(file);
}
function clearTechniqueFile() { loadedTechniques = null; techniqueFileName = ''; dom.techniquesFile.value = ''; updateTechniqueStatus(false); }
function updateTechniqueStatus(loaded) {
    dom.uploadBtn.textContent = loaded ? `📄 ${techniqueFileName}` : '📁 Upload Techniques';
    dom.clearTechniques.classList.toggle('hidden', !loaded);
    dom.techniqueStatus.classList.toggle('hidden', !loaded);
    if(loaded) dom.techniqueStatus.textContent = `✓ Techniques loaded.`;
    dom.enhanceBtnText.textContent = loaded ? '🚀 Enhance with Techniques' : '🚀 Enhance Prompt';
}
async function enhancePrompt() {
    const prompt = dom.rotatedPrompt.value.trim();
    if (!prompt) { showAlert('Prompt to enhance is empty.'); return; }
    setLoading(dom.enhancePromptBtn, true);
    let p;
    const model = dom.enhancementBot.value;
    const opts = { handler: "enhancement-handler", stream: false, openChat: false };
    if (loadedTechniques) {
        p = `Using these techniques:\n\n${loadedTechniques}\n\nEnhance this prompt: "${prompt}"`;
    } else {
        if (uploadedFile) {
            p = `As an expert multimodal prompt engineer, enhance the following prompt, taking inspiration from the attached reference image: "${prompt}"\n\nMerge the text's intent with the image's style, subject, and mood. Provide only the final, enhanced prompt.`;
            opts.attachments = [uploadedFile];
        } else {
            p = `Enhance this prompt for clarity and creative potential for a generative model: "${prompt}"`;
        }
    }
    try {
        await window.Poe.sendUserMessage(`@${model} ${p}`, opts);
    } catch (e) {
        setLoading(dom.enhancePromptBtn, false);
        showAlert('Error enhancing prompt: ' + e.message);
    }
}
function handleEnhancementResponse(result) {
    setLoading(dom.enhancePromptBtn, false);
    if (result.status === "complete") dom.rotatedPrompt.value = result.responses[0].content.trim();
    else showAlert("Enhancement error: " + (result.responses[0].statusText || 'Unknown error'));
}

// --- IMAGE GENERATION ---
async function generateImages() {
    const prompt = dom.rotatedPrompt.value.trim();
    if (!prompt) { showAlert('Final prompt is empty. Please feed, rotate, or enhance a prompt first.'); return; }
    setLoading(dom.generateBtn, true);
    dom.resultsSection.classList.remove('hidden');
    const calls = [
        { id: 'modelA', name: dom.modelA.value, bot: dom.modelA.value, prompt, imageFile: uploadedFile },
        { id: 'modelB', name: dom.modelB.value, bot: dom.modelB.value, prompt, imageFile: uploadedFile }
    ];
    createMultipleResultBoxes(calls);
    await Promise.allSettled(calls.map(c => callBotWithResultBox(c.bot, c.prompt, c.imageFile, c.id, c.name)));
    setLoading(dom.generateBtn, false);
}
function createMultipleResultBoxes(calls) {
    const totalBoxes = calls.length + (uploadedFile ? 1 : 0);
    dom.multiResultGrid.className = `grid gap-6 md:grid-cols-${Math.min(totalBoxes, 3)}`;
    dom.multiResultGrid.innerHTML = '';
    if (uploadedFile) {
        const refBox = document.createElement('div');
        refBox.innerHTML = `<h3 class="text-sm font-medium mb-3 text-white">Reference</h3><div class="bg-black bg-opacity-20 border border-current rounded-lg p-2"><img src="${dom.previewImg.src}" class="w-full rounded-lg"></div>`;
        dom.multiResultGrid.appendChild(refBox);
    }
    calls.forEach(c => {
        const box = document.createElement('div');
        box.id = `result-${c.id}`;
        box.innerHTML = `<h3 class="text-sm font-medium mb-3 text-white">${c.name}</h3><div id="content-${c.id}" class="bg-black bg-opacity-20 border border-current rounded-lg p-4 min-h-48 flex items-center justify-center"><div class="text-center text-white">...</div></div>`;
        dom.multiResultGrid.appendChild(box);
    });
}
async function callBotWithResultBox(bot, prompt, image, id, name) {
    return new Promise(async (resolve, reject) => {
        const handler = `bot-handler-${id}-${Date.now()}`;
        const el = document.getElementById(`content-${id}`);
        window.Poe.registerHandler(handler, r => {
            if (r.status === "complete") {
                if (r.responses[0].attachments?.length > 0) {
                    el.innerHTML = `<img src="${r.responses[0].attachments[0].url}" class="w-full rounded-lg">`;
                    resolve();
                } else {
                    el.innerHTML = `<div class="text-yellow-600 p-4">No image generated.</div>`;
                    reject();
                }
            } else if (r.status === "error") {
                el.innerHTML = `<div class="text-red-600 p-4">Failed.</div>`;
                reject();
            }
        });
        const opts = { handler, stream: false, openChat: false };
        if (image) opts.attachments = [image];
        window.Poe.sendUserMessage(`@${bot} ${prompt}`, opts).catch(e => {
            el.innerHTML = `<div class="text-red-600 p-4">Connection Failed.</div>`;
            reject(e);
        });
    });
}

// --- THEME SELECTOR ---
function initializeColorThemes() {
    const themes = {
        default: 'bg-gray-400',
        mint: 'bg-emerald-400',
        sky: 'bg-sky-400',
        lavender: 'bg-violet-400',
        rose: 'bg-rose-400',
    };
    Object.entries(themes).forEach(([themeName, colorClass]) => {
        const button = document.createElement('button');
        button.className = `w-6 h-6 rounded-full ${colorClass} border-2 border-transparent focus:outline-none transition-transform hover:scale-110`;
        button.dataset.theme = themeName;
        button.title = themeName.charAt(0).toUpperCase() + themeName.slice(1);
        button.addEventListener('click', () => setColorTheme(themeName));
        dom.themeSelector.appendChild(button);
    });
    setColorTheme('default'); // Set initial theme
}
function setColorTheme(themeName) {
    // Set the theme data attribute on body
    document.body.setAttribute('data-theme', themeName);
    
    // Update active button indicator
    document.querySelectorAll('#themeSelector button').forEach(btn => {
        btn.classList.remove('ring-2', 'ring-primary');
        if (btn.dataset.theme === themeName) {
            btn.classList.add('ring-2', 'ring-primary');
        }
    });
}

// --- CUSTOM VARIABLE OPTIONS ---
function addCustomOption(variableIndex) {
    // Shows the hidden input area for the selected variable
    const customInput = document.getElementById(`customInput-${variableIndex}`);
    customInput.classList.remove('hidden');
    document.getElementById(`customText-${variableIndex}`).focus();
}

function cancelCustomOptions(variableIndex) {
    // Hides the input area and clears the textarea
    const customInput = document.getElementById(`customInput-${variableIndex}`);
    customInput.classList.add('hidden');
    document.getElementById(`customText-${variableIndex}`).value = '';
}

function confirmCustomOptions(variableIndex) {
    // Takes text from the textarea, adds it to the variable's options, and refreshes the dropdown
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
    let allOptions = (variable.options || []).filter(opt => opt !== variable.current_value);
    allOptions.unshift(variable.current_value);
    select.innerHTML = allOptions.map(option => `<option value="${escapeHtml(option)}">${option === variable.current_value ? `${escapeHtml(option)} (Original)` : escapeHtml(option)}</option>`).join('');
    select.value = currentValue; // Keep the previously selected value

    calculateCombinations();
    cancelCustomOptions(variableIndex);
    showAlert(`Added ${newOptions.length} new option(s)!`);
}

async function aiExpandOptions(variableIndex) {
    const customText = document.getElementById(`customText-${variableIndex}`).value.trim();
    if (!customText) {
        showAlert('Please enter at least one example option for AI to expand on.');
        return;
    }

    const variable = currentVariables[variableIndex];
    const examples = customText.split('\n').map(opt => opt.trim()).filter(opt => opt.length > 0);
    
    // Store info globally so the handler can access it
    window.currentExpandVariableIndex = variableIndex;
    window.currentExpandOriginalOptions = examples;
    
    showAnalysisLoading(true, 'AI expanding your options...');

    const expandPrompt = `
Based on these examples: ${examples.join(', ')}
And this variable context: "${variable.name}" from original prompt "${basePromptForRotation}"

Generate exactly 8 more similar options that follow the same pattern/style/category.

Output ONLY a simple list, one option per line, no explanations or formatting:`;

    try {
        const selectedModel = dom.analysisModel.value;
        await window.Poe.sendUserMessage(`@${selectedModel} ${expandPrompt}`, {
            handler: "ai-expand-handler",
            stream: false,
            openChat: false
        });
    } catch (error) {
        showAnalysisLoading(false);
        showAlert('Error expanding options: ' + error.message);
    }
}

function showAlert(message) {
    // Custom alert replacement using a simple toast
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 max-w-sm';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// --- HELPERS & UTILITIES ---
function escapeHtml(s) { const p = document.createElement("p"); p.textContent = s; return p.innerHTML; }
function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function showAnalysisLoading(loading, status = 'Analyzing...') { dom.analysisLoading.classList.toggle('hidden', !loading); if(loading) dom.analysisStatus.textContent = status; }
function setLoading(btn, loading, text) {
    btn.disabled = loading;
    if (text) {
        btn.textContent = text;
    } else {
        btn.querySelector('span').classList.toggle('hidden', loading);
        btn.querySelector('div').classList.toggle('hidden', !loading);
    }
}
function calculateCombinations() { totalCombinations = currentVariables.reduce((t, v) => t * (v.options?.length || 1), 1); currentCombination = 0; updateComboCounter(); }
function navigateCombination(dir) {
    if (totalCombinations <= 1) return;
    currentCombination = (currentCombination + dir + totalCombinations) % totalCombinations;
    let temp = currentCombination;
    for (let i = currentVariables.length - 1; i >= 0; i--) {
        const v = currentVariables[i], c = v.options?.length || 1, s = document.querySelector(`[data-variable-index="${i}"]`);
        if (s) { s.selectedIndex = temp % c; temp = Math.floor(temp / c); }
    }
    updateRotatedPrompt(); updateComboCounter();
}
function updateComboCounter() { dom.comboCounter.textContent = `${currentCombination + 1}/${totalCombinations}`; }
function addChoiceOptions() {
    if (currentVariables.length === 0) { showAlert('Please analyze a prompt first to generate variables.'); return; }

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
                `<option value="${escapeHtml(optionObj.value)}" ${optionObj.value === currentValue ? 'selected' : ''}>${escapeHtml(optionObj.display)}</option>`
            ).join('');
        }
    });

    // Update combinations count
    calculateCombinations();
    
    if (addedCount > 0) {
        showAlert(`Added "of your choice" options to ${addedCount} variable${addedCount !== 1 ? 's' : ''}!`);
    } else {
        showAlert('All variables already have "of your choice" options.');
    }
}
function clearPrompt() {
    dom.originalPrompt.value = ''; dom.rotatedPrompt.value = ''; dom.variableControls.classList.add('hidden');
    currentVariables = []; basePromptForRotation = ''; removeImage(); clearTechniqueFile();
}
function resetGeneration() { dom.resultsSection.classList.add('hidden'); setLoading(dom.generateBtn, false, 'GENERATE IMAGES'); }

// --- COPY ALL FUNCTION ---
function copyAllData() {
    if (currentVariables.length === 0 && !dom.originalPrompt.value.trim() && !dom.rotatedPrompt.value.trim()) {
        showAlert('No data to copy. Please create some prompts and variables first.');
        return;
    }

    let copyText = '';
    
    // Add prompts
    if (dom.originalPrompt.value.trim()) {
        copyText += `Base Prompt: ${dom.originalPrompt.value.trim()}\n\n`;
    }
    
    if (dom.rotatedPrompt.value.trim() && dom.rotatedPrompt.value.trim() !== dom.originalPrompt.value.trim()) {
        copyText += `Final Prompt: ${dom.rotatedPrompt.value.trim()}\n\n`;
    }
    
    // Add current variable states
    if (currentVariables.length > 0) {
        copyText += 'Variables:\n';
        currentVariables.forEach((variable, index) => {
            const select = document.querySelector(`[data-variable-index="${index}"]`);
            const currentValue = select ? select.value : variable.current_value;
            copyText += `${index + 1}. ${variable.name}: ${currentValue}\n`;
        });
        copyText += '\n';
        
        // Add all available options
        copyText += 'Available Options:\n';
        currentVariables.forEach((variable, index) => {
            copyText += `${index + 1}. ${variable.name}: ${variable.options.join(', ')}\n`;
        });
    }

    // Copy to clipboard
    navigator.clipboard.writeText(copyText).then(() => {
        showAlert('All data copied to clipboard!');
    }).catch(err => {
        showAlert('Failed to copy to clipboard. Please try again.');
        console.error('Copy failed:', err);
    });
}

// --- DOWNLOAD IMAGES FUNCTION ---
async function downloadImages() {
    const images = [];
    
    // Find all generated images
    const modelAImg = document.querySelector('#content-modelA img');
    const modelBImg = document.querySelector('#content-modelB img');
    
    if (!modelAImg && !modelBImg) {
        showAlert('No images to download. Please generate images first.');
        return;
    }
    
    try {
        // Download Model A image
        if (modelAImg) {
            const response = await fetch(modelAImg.src);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${dom.modelA.value.replace('@', '')}_image.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        
        // Small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Download Model B image
        if (modelBImg) {
            const response = await fetch(modelBImg.src);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${dom.modelB.value.replace('@', '')}_image.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        
        const downloadCount = (modelAImg ? 1 : 0) + (modelBImg ? 1 : 0);
        showAlert(`Successfully downloaded ${downloadCount} image${downloadCount !== 1 ? 's' : ''}!`);
        
    } catch (error) {
        showAlert('Failed to download images. Please try again.');
        console.error('Download failed:', error);
    }
}

// --- EVENT LISTENERS ---
dom.uploadArea.addEventListener('click', () => dom.fileInput.click());
dom.fileInput.addEventListener('change', e => handleFile(e.target.files[0]));
dom.replaceBtn.addEventListener('click', () => dom.fileInput.click());
dom.removeBgBtn.addEventListener('click', removeBackground);
dom.removeBtn.addEventListener('click', removeImage);
dom.readImageBtn.addEventListener('click', readImage);
dom.analyzeBtn.addEventListener('click', analyzePrompt);
dom.addChoiceBtn.addEventListener('click', addChoiceOptions);
dom.copyAllBtn.addEventListener('click', copyAllData);
dom.clearPrompt.addEventListener('click', clearPrompt);
dom.prevCombo.addEventListener('click', () => navigateCombination(-1));
dom.nextCombo.addEventListener('click', () => navigateCombination(1));
dom.feedBtn.addEventListener('click', feedPrompt);
dom.refeedBtn.addEventListener('click', refeedPrompt);
dom.techniquesFile.addEventListener('change', handleTechniqueFile);
dom.clearTechniques.addEventListener('click', clearTechniqueFile);
dom.enhancePromptBtn.addEventListener('click', enhancePrompt);
dom.generateBtn.addEventListener('click', generateImages);
dom.downloadImages.addEventListener('click', downloadImages);
dom.generateAnother.addEventListener('click', resetGeneration);

// --- INITIALIZATION ---
dom.readImageBtn.disabled = true;
dom.originalPrompt.focus();
initializeColorThemes(); // Initialize the new theme selector

</script>
</body>
</html>



```

## Metadata
- **Extracted**: 2025-07-27T19:22:09.590Z
- **Source**: https://poe.com/edit_bot?bot=VG-IMREF
- **Bot Type**: Canvas App
- **Code Length**: 44757 characters

---
*Extracted using VG Canvas App Extractor*
