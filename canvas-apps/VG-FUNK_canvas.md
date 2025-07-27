# VG-FUNK

## Description
No description available

## Canvas Code
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Text Processing Functions</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .loading-spinner {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .slider-track {
            background: linear-gradient(to right, #e5e7eb 0%, #5D5CDE 0%);
        }
    </style>
</head>
<body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
        <!-- Header -->
        <div class="text-center mb-8">
            <h1 class="text-3xl font-bold mb-2">Text Processing Functions</h1>
            <p class="text-gray-600 dark:text-gray-400">Transform your text with specialized processing functions</p>
        </div>

        <!-- Model Selection -->
        <div class="mb-6">
            <label for="modelSelect" class="block text-sm font-medium mb-2">Select Model</label>
            <select id="modelSelect" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-base">
                <option value="Claude-Sonnet-4">Claude-Sonnet-4 (High Quality)</option>
                <option value="Llama-3.2-3B">Llama-3.2-3B (Tiny - 3B params)</option>
                <option value="Llama-3.1-8B">Llama-3.1-8B (Small - 8B params)</option>
                <option value="Mixtral-8x7B">Mixtral-8x7B (Small but efficient)</option>
            </select>
        </div>

        <!-- Function Selection -->
        <div class="mb-6">
            <label for="functionSelect" class="block text-sm font-medium mb-2">Select Function</label>
            <select id="functionSelect" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-base">
                <option value="capsulize-regular">Capsulize (Regular) - Detailed structured list</option>
                <option value="capsulize-subheader">Capsulize (Subheader) - List with subheadings</option>
                <option value="atomize">Atomize - Physical descriptors (experimental aggregation)</option>
                <option value="atomize-image-gen">Atomize Image Gen - Granular image prompts</option>
            </select>
        </div>

        <!-- Atomize Controls (hidden by default) -->
        <div id="atomizeControls" class="mb-6 hidden">
            <!-- Start Position Slider -->
            <div class="mb-4">
                <label class="block text-sm font-medium mb-2">Start Position</label>
                <div class="flex items-center space-x-4">
                    <span class="text-sm text-gray-600 dark:text-gray-400">V1</span>
                    <div class="flex-1 relative">
                        <input type="range" id="startSlider" min="1" max="4" value="1" 
                               class="w-full h-2 rounded-lg appearance-none cursor-pointer slider-track">
                        <div class="flex justify-between text-xs text-gray-500 mt-1">
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                        </div>
                    </div>
                    <span class="text-sm text-gray-600 dark:text-gray-400">V4</span>
                </div>
            </div>

            <!-- Aggregation Count Slider -->
            <div class="mb-4">
                <label class="block text-sm font-medium mb-2">Aggregation Count</label>
                <div class="flex items-center space-x-4">
                    <span class="text-sm text-gray-600 dark:text-gray-400">1</span>
                    <div class="flex-1 relative">
                        <input type="range" id="countSlider" min="1" max="4" value="1" 
                               class="w-full h-2 rounded-lg appearance-none cursor-pointer slider-track">
                        <div class="flex justify-between text-xs text-gray-500 mt-1">
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                        </div>
                    </div>
                    <span class="text-sm text-gray-600 dark:text-gray-400">4</span>
                </div>
            </div>

            <!-- Aggregation Preview -->
            <div id="aggregationPreview" class="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-3 rounded">
                Will use: Version 1 only
            </div>
        </div>

        <!-- Input Section -->
        <div class="mb-6">
            <label for="textInput" class="block text-sm font-medium mb-2">Input Text</label>
            <textarea id="textInput" rows="8" 
                      class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-base resize-y"
                      placeholder="Paste your text here or upload a file..."></textarea>
            
            <!-- File Upload -->
            <div class="mt-3">
                <input type="file" id="fileInput" accept=".txt,.md,.doc,.docx" class="hidden">
                <button onclick="document.getElementById('fileInput').click()" 
                        class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    📁 Upload File
                </button>
                <span id="fileName" class="ml-3 text-sm text-gray-600 dark:text-gray-400"></span>
            </div>
        </div>

        <!-- Process Button -->
        <button id="processBtn" 
                class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors mb-6">
            Process Text
        </button>

        <!-- Output Section -->
        <div id="outputSection" class="hidden">
            <div class="flex items-center justify-between mb-3">
                <label class="block text-sm font-medium">Output</label>
                <button id="copyBtn" class="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors">
                    📋 Copy
                </button>
            </div>
            <div id="output" class="p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 min-h-40 whitespace-pre-wrap"></div>
        </div>

        <!-- Loading State -->
        <div id="loading" class="hidden text-center py-8">
            <div class="loading-spinner w-8 h-8 border-4 border-gray-300 border-t-indigo-600 rounded-full mx-auto mb-4"></div>
            <p class="text-gray-600 dark:text-gray-400">Processing your text...</p>
        </div>
    </div>

    <script>
        // Dark mode support
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

        // Function templates
        const functions = {
            'capsulize-regular': {
                name: 'Capsulize (Regular)',
                prompt: `You are a Meticulous Information Distiller. Transform the following document into a detailed, sequentially structured list of core points, facts, findings, and data. Extract key informational units including: findings and conclusions, specific data points, definitions and concepts, comparisons and contrasts, process steps, key arguments, constraints and limitations, and source attributions.

Process:
1. Read the entire document comprehensively
2. Identify core informational units in each section
3. Rephrase each unit into clear, concise statements
4. Maintain logical flow and context
5. Prioritize information fidelity over brevity

Output as a numbered list with concise, factual, unambiguous statements. Focus on machine comprehensibility and information completeness.

Document to capsulize:`
            },
            'capsulize-subheader': {
                name: 'Capsulize (Subheader)',
                prompt: `You are a Meticulous Information Distiller. Transform the following document into a detailed, structured list organized under relevant subheadings. Extract core informational units and organize them by the document's inherent structure.

Process:
1. Identify main sections or thematic blocks in the document
2. Extract key informational units from each section
3. Organize points under subheadings that reflect the source structure
4. Maintain sequential flow within each section
5. Prioritize information fidelity and structural preservation

Output as a numbered list grouped under clear subheadings that reflect the document's organization. Each point should be a single, concise informational unit.

Document to capsulize:`
            },
            'atomize': {
                1: {
                    name: 'Atomize (Level 1)',
                    prompt: `Break down the following description into simple, physical descriptors. Focus on what can be directly observed: body positions, movements, spatial relationships, and environmental details. Use clear, unambiguous language with one idea per point. Avoid abstract concepts or interpretive language.

Description to atomize:`
                },
                2: {
                    name: 'Atomize (Level 2)', 
                    prompt: `Break down the following description into atomic, physical descriptors organized in logical sequence. Each descriptor must be directly observable or measurable. Organize as: foundation (base positions) → structure (main actions/relationships) → details (micro-movements, adjustments). Use concrete terms: angles, directions, distances, muscle tension, contact points. No interpretive or abstract language.

Description to atomize:`
                },
                3: {
                    name: 'Atomize (Level 3)',
                    prompt: `Convert the following into precise, measurable physical descriptors with quantified properties. Express all states in measurable units (meters, degrees, kg) or explicit directional vectors. Describe static final states of all components. Sequence: Environment → Foundation → Actor → Details → Forces. Each line must represent a single, non-decomposable physical state requiring zero interpretation.

Description to atomize:`
                },
                4: {
                    name: 'Atomize (Level 4)',
                    prompt: `Execute Physical-Descriptor-Transpilation protocol. Compile input into structured array of atomic physical states with absolute quantization. All properties in measurable units or directional vectors. Zero-inference mandate - omit unspecified details. Build sequence: Environment & Lighting → Foundational Geometry → Primary Actor Pose → Structural Details → Secondary Objects → Micro-states & Forces. Output must be verifiable physical states with purged qualitative language.

Description to atomize:`
                }
            },
            'atomize-image-gen': {
                name: 'Atomize Image Gen',
                prompt: `Convert the user's image idea into atomic, granular descriptors using the "No-More-Branches" philosophy. Reduce every open variable so the model has nothing to invent. Fidelity over randomness.

Process:
1. BREAK-IT-DOWN: Convert into atomic micro-goals
   - Identify subject(s)
   - Identify action/pose
   - Identify key props/clothing
   - Identify environment (minimal, if any)
   - Turn each into short declarative clauses

2. GRANULAR ASSEMBLY: Re-stitch micro-goals into one linear prompt, ordering from most important to least. Keep clauses short; separate with commas.

3. CONSEQUENCE DYNAMICS: Embed natural cause-effect pairs so the model infers details instead of hallucinating extras (e.g., "strong wind, hair blown backward").

4. OPTIONAL NOTATIONS: Use weights sparingly: (subject:1.2) increases importance; (element:-1) suppresses.

5. CHECKLIST:
   - Each clause is a single visual fact
   - No redundant adjectives that open new branches
   - Environment minimal unless essential
   - Pose and tension described causally
   - Optional weights only where model drifts

Output format: Single linear prompt with comma-separated atomic clauses, ordered by importance.

Image idea to atomize:`
            }
        };

        // DOM elements
        const modelSelect = document.getElementById('modelSelect');
        const functionSelect = document.getElementById('functionSelect');
        const atomizeControls = document.getElementById('atomizeControls');
        const startSlider = document.getElementById('startSlider');
        const countSlider = document.getElementById('countSlider');
        const aggregationPreview = document.getElementById('aggregationPreview');
        const textInput = document.getElementById('textInput');
        const fileInput = document.getElementById('fileInput');
        const fileName = document.getElementById('fileName');
        const processBtn = document.getElementById('processBtn');
        const outputSection = document.getElementById('outputSection');
        const output = document.getElementById('output');
        const loading = document.getElementById('loading');
        const copyBtn = document.getElementById('copyBtn');

        // Slider descriptions
        const sliderDescriptions = {
            1: "Level 1: Simple, observable physical descriptors",
            2: "Level 2: Structured with logical sequence", 
            3: "Level 3: Technical with measurements and vectors",
            4: "Level 4: Maximum precision with strict protocols"
        };

        // Event listeners
        functionSelect.addEventListener('change', function() {
            if (this.value === 'atomize') {
                atomizeControls.classList.remove('hidden');
                updateAggregationPreview();
            } else {
                atomizeControls.classList.add('hidden');
            }
        });

        startSlider.addEventListener('input', function() {
            updateSliderTrack(this);
            updateAggregationPreview();
        });

        countSlider.addEventListener('input', function() {
            updateSliderTrack(this);
            updateAggregationPreview();
        });

        function updateSliderTrack(slider) {
            const value = slider.value;
            const percentage = ((value - 1) / 3) * 100;
            slider.style.background = `linear-gradient(to right, #5D5CDE 0%, #5D5CDE ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;
        }

        function updateAggregationPreview() {
            const start = parseInt(startSlider.value);
            const count = parseInt(countSlider.value);
            const versions = getSelectedVersions(start, count);
            
            if (count === 1) {
                aggregationPreview.textContent = `Will use: Version ${versions[0]} only`;
            } else {
                aggregationPreview.textContent = `Will aggregate: Versions ${versions.join(', ')} (${count} versions)`;
            }
        }

        function getSelectedVersions(start, count) {
            const versions = [];
            for (let i = 0; i < count; i++) {
                const version = ((start - 1 + i) % 4) + 1; // Circular wraparound
                versions.push(version);
            }
            return versions;
        }

        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                fileName.textContent = file.name;
                const reader = new FileReader();
                reader.onload = function(e) {
                    textInput.value = e.target.result;
                };
                reader.readAsText(file);
            }
        });

        processBtn.addEventListener('click', processText);
        copyBtn.addEventListener('click', copyOutput);

        // Register Poe handler
        if (window.Poe && window.Poe.registerHandler) {
            window.Poe.registerHandler("text-processor", (result) => {
                const msg = result.responses[0];
                
                if (msg.status === "error") {
                    output.textContent = "Error: " + msg.statusText;
                    output.className = "p-4 border border-red-300 dark:border-red-600 rounded-lg bg-red-50 dark:bg-red-900/20 min-h-40 whitespace-pre-wrap";
                } else if (msg.status === "incomplete") {
                    output.textContent = msg.content;
                } else if (msg.status === "complete") {
                    output.textContent = msg.content;
                    loading.classList.add('hidden');
                    outputSection.classList.remove('hidden');
                }
            });
        }

        async function processText() {
            const selectedFunction = functionSelect.value;
            const selectedModel = modelSelect.value;
            const inputText = textInput.value.trim();
            
            if (!inputText) {
                showCustomAlert('Please enter some text to process.');
                return;
            }

            // Show loading
            loading.classList.remove('hidden');
            outputSection.classList.add('hidden');
            output.className = "p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 min-h-40 whitespace-pre-wrap";

            // Get the appropriate prompt
            let prompt;
            if (selectedFunction === 'atomize') {
                prompt = buildAggregatedAtomizePrompt();
            } else {
                prompt = functions[selectedFunction].prompt;
            }

            const fullPrompt = prompt + '\n\n' + inputText;

            try {
                if (window.Poe && window.Poe.sendUserMessage) {
                    await window.Poe.sendUserMessage(`@${selectedModel} ${fullPrompt}`, {
                        handler: "text-processor",
                        stream: true,
                        openChat: false
                    });
                } else {
                    // Fallback for testing without Poe API
                    setTimeout(() => {
                        output.textContent = "Poe API not available. This is a demo of the interface.";
                        loading.classList.add('hidden');
                        outputSection.classList.remove('hidden');
                    }, 1000);
                }
            } catch (err) {
                output.textContent = "Error: " + err.message;
                output.className = "p-4 border border-red-300 dark:border-red-600 rounded-lg bg-red-50 dark:bg-red-900/20 min-h-40 whitespace-pre-wrap";
                loading.classList.add('hidden');
                outputSection.classList.remove('hidden');
            }
        }

        function buildAggregatedAtomizePrompt() {
            const start = parseInt(startSlider.value);
            const count = parseInt(countSlider.value);
            const versions = getSelectedVersions(start, count);
            
            if (count === 1) {
                // Single version - return as is but strip role
                return stripRole(functions.atomize[versions[0]].prompt);
            } else {
                // Multiple versions - aggregate them
                let aggregatedPrompt = "Break down the following description into atomic physical descriptors. Apply these instruction sets in combination:\n\n";
                
                versions.forEach((version, index) => {
                    aggregatedPrompt += `INSTRUCTION SET ${index + 1}:\n`;
                    aggregatedPrompt += stripRole(functions.atomize[version].prompt);
                    aggregatedPrompt += "\n\n";
                });
                
                aggregatedPrompt += "Synthesize these approaches to provide the most comprehensive breakdown possible.\n\nDescription to atomize:";
                return aggregatedPrompt;
            }
        }

        function stripRole(prompt) {
            // Remove "You are Violet" and role-specific language, keep core instructions
            return prompt
                .replace(/You are Violet.*?Your (task|role) is to/i, 'Your task is to')
                .replace(/You are Violet.*?secretary\./i, '')
                .replace(/Role:.*?secretary/i, '')
                .replace(/Execute.*?protocol\./i, '')
                .replace(/🧑‍🔬.*?transpiler\./i, '')
                .replace(/⚡.*?⚛️/gi, '')
                .trim();
        }

        function copyOutput() {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(output.textContent).then(() => {
                    copyBtn.textContent = '✅ Copied';
                    setTimeout(() => {
                        copyBtn.textContent = '📋 Copy';
                    }, 2000);
                });
            }
        }

        function showCustomAlert(message) {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            modal.innerHTML = `
                <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
                    <p class="text-gray-700 dark:text-gray-300 mb-4">${message}</p>
                    <div class="flex justify-end">
                        <button class="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded" onclick="this.closest('.fixed').remove()">OK</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }

        // Initialize slider tracks
        updateSliderTrack(startSlider);
        updateSliderTrack(countSlider);
    </script>
</body>
</html>

```

## Metadata
- **Extracted**: 2025-07-27T20:09:58.287Z
- **Source**: https://poe.com/edit_bot?bot=VG-FUNK
- **Bot Type**: Canvas App
- **Code Length**: 22476 characters

---
*Extracted using VG Master Bot Automation*
