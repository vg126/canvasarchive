# VG-Drainer

## Description
No description available

## Canvas Code
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Linguistic Abstraction Experiment</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#5D5CDE',
                        'bg-light': '#FFFFFF',
                        'bg-dark': '#181818'
                    }
                }
            }
        }
    </script>
    <style>
        .mode-card {
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }
        .mode-card.active {
            border-color: #5D5CDE;
            box-shadow: 0 0 20px rgba(93, 92, 222, 0.2);
        }
        .result-card {
            min-height: 120px;
        }
        .loading-pulse {
            animation: pulse 1.5s infinite;
        }
    </style>
</head>
<body class="bg-bg-light dark:bg-bg-dark text-gray-900 dark:text-gray-100 min-h-screen transition-colors">
    <div class="container mx-auto px-4 py-8 max-w-6xl">
        <!-- Header -->
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Linguistic Abstraction Experiment
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Explore how different linguistic representations influence AI interpretation outcomes. 
                Enter a sentence and see how various abstraction layers affect meaning extraction.
            </p>
        </div>

        <!-- Input Section -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <label for="sentence-input" class="block text-lg font-semibold mb-3">
                Enter Your Sentence
            </label>
            <textarea 
                id="sentence-input"
                placeholder="e.g., The curious cat carefully climbed the tall oak tree in the garden."
                class="w-full p-4 text-base border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                       focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors
                       resize-none"
                rows="3"
            ></textarea>
            <div class="flex flex-wrap items-center gap-3 mt-4">
                <div class="flex items-center gap-2">
                    <label for="model-select" class="text-sm font-medium text-gray-700 dark:text-gray-300">
                        AI Model:
                    </label>
                    <select 
                        id="model-select"
                        class="px-3 py-2 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                               focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    >
                        <option value="Gemini-2.5-Flash">Gemini 2.5 Flash (Recommended)</option>
                        <option value="Gemini-2.0-Flash">Gemini 2.0 Flash</option>
                    </select>
                </div>
                <button 
                    id="analyze-single-btn"
                    class="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg 
                           font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span id="analyze-single-text">Analyze Regular Mode</span>
                </button>
                <button 
                    id="analyze-btn"
                    class="bg-primary/80 hover:bg-primary text-white px-6 py-2 rounded-lg 
                           font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Analyze All Modes
                </button>
                <button 
                    id="clear-btn"
                    class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg 
                           font-medium transition-colors"
                >
                    Clear Results
                </button>
            </div>
        </div>

        <!-- Mode Selection -->
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div class="mode-card bg-white dark:bg-gray-800 rounded-lg p-4 cursor-pointer" data-mode="syntax-drained">
                <h3 class="font-bold text-primary mb-2">Syntax-Drained</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Stripped of syntactic scaffolding</p>
            </div>
            <div class="mode-card bg-white dark:bg-gray-800 rounded-lg p-4 cursor-pointer" data-mode="hyphenated">
                <h3 class="font-bold text-primary mb-2">Hyphenated</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Token-chunked, compression-resistant</p>
            </div>
            <div class="mode-card active bg-white dark:bg-gray-800 rounded-lg p-4 cursor-pointer" data-mode="regular">
                <h3 class="font-bold text-primary mb-2">Regular</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Standard sentence baseline</p>
            </div>
            <div class="mode-card bg-white dark:bg-gray-800 rounded-lg p-4 cursor-pointer" data-mode="organized">
                <h3 class="font-bold text-primary mb-2">Organized</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Structured, logical reordering</p>
            </div>
            <div class="mode-card bg-white dark:bg-gray-800 rounded-lg p-4 cursor-pointer" data-mode="verbose">
                <h3 class="font-bold text-primary mb-2">Verbose</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Expanded and explanatory</p>
            </div>
        </div>

        <!-- Transformations Display -->
        <div id="transformations-section" class="hidden mb-8">
            <h2 class="text-2xl font-bold mb-4">Linguistic Transformations</h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div id="syntax-drained-transform" class="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h4 class="font-semibold text-primary mb-2">Syntax-Drained</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400 italic">Processing...</p>
                </div>
                <div id="hyphenated-transform" class="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h4 class="font-semibold text-primary mb-2">Hyphenated</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400 italic">Processing...</p>
                </div>
                <div id="organized-transform" class="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h4 class="font-semibold text-primary mb-2">Organized</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400 italic">Processing...</p>
                </div>
                <div id="verbose-transform" class="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h4 class="font-semibold text-primary mb-2">Verbose</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400 italic">Processing...</p>
                </div>
            </div>
        </div>

        <!-- Results Section -->
        <div id="results-section" class="hidden">
            <h2 class="text-2xl font-bold mb-4">AI Interpretation Outcomes</h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                <div id="syntax-drained-result" class="result-card bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h4 class="font-semibold text-primary mb-3">Syntax-Drained</h4>
                    <div class="loading-pulse text-gray-500 dark:text-gray-400">Analyzing...</div>
                </div>
                <div id="hyphenated-result" class="result-card bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h4 class="font-semibold text-primary mb-3">Hyphenated</h4>
                    <div class="loading-pulse text-gray-500 dark:text-gray-400">Analyzing...</div>
                </div>
                <div id="regular-result" class="result-card bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h4 class="font-semibold text-primary mb-3">Regular</h4>
                    <div class="loading-pulse text-gray-500 dark:text-gray-400">Analyzing...</div>
                </div>
                <div id="organized-result" class="result-card bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h4 class="font-semibold text-primary mb-3">Organized</h4>
                    <div class="loading-pulse text-gray-500 dark:text-gray-400">Analyzing...</div>
                </div>
                <div id="verbose-result" class="result-card bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h4 class="font-semibold text-primary mb-3">Verbose</h4>
                    <div class="loading-pulse text-gray-500 dark:text-gray-400">Analyzing...</div>
                </div>
            </div>
        </div>

        <!-- Analysis Summary -->
        <div id="summary-section" class="hidden mt-8 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-xl p-6">
            <h3 class="text-xl font-bold mb-3">Interpretation Convergence Analysis</h3>
            <div id="summary-content" class="text-gray-700 dark:text-gray-300">
                Analysis will appear here once all interpretations are complete...
            </div>
        </div>
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

        // Mode selection
        const modeCards = document.querySelectorAll('.mode-card');
        let selectedMode = 'regular';

        modeCards.forEach(card => {
            card.addEventListener('click', () => {
                modeCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                selectedMode = card.dataset.mode;
                
                // Update single analysis button text
                const modeNames = {
                    'syntax-drained': 'Syntax-Drained',
                    'hyphenated': 'Hyphenated', 
                    'regular': 'Regular',
                    'organized': 'Organized',
                    'verbose': 'Verbose'
                };
                document.getElementById('analyze-single-text').textContent = `Analyze ${modeNames[selectedMode]} Mode`;
            });
        });

        // Linguistic transformations
        function transformSentence(sentence, mode) {
            switch (mode) {
                case 'syntax-drained':
                    // Remove articles, prepositions, conjunctions, auxiliary verbs
                    const syntaxWords = /\b(the|a|an|in|on|at|by|for|with|to|of|and|or|but|is|was|were|am|are|be|been|being|have|has|had|will|would|could|should|may|might)\b/gi;
                    return sentence.replace(syntaxWords, '').replace(/\s+/g, ' ').trim();
                
                case 'hyphenated':
                    // Break words into syllable-like chunks with hyphens
                    return sentence.split(' ').map(word => {
                        if (word.length <= 3) return word;
                        const chunks = [];
                        for (let i = 0; i < word.length; i += 2) {
                            chunks.push(word.slice(i, i + 3));
                        }
                        return chunks.join('-');
                    }).join(' ');
                
                case 'organized':
                    // Reorder for clarity: subject, verb, object structure
                    const words = sentence.split(' ');
                    // Simple heuristic: move descriptive words after main nouns
                    return sentence.replace(/(\w+ly)\s+(\w+)/g, '$2 $1').replace(/\s+/g, ' ').trim();
                
                case 'verbose':
                    // Add explanatory context
                    return `In this scenario, we observe that ${sentence.toLowerCase()} This action demonstrates the specific behavioral pattern and contextual relationship between the elements described.`;
                
                default:
                    return sentence;
            }
        }

        // AI interpretation requests
        let results = {};
        let analysisCount = 0;

        // Register handler when Poe API is available
        function registerPoeHandler() {
            if (window.Poe) {
                window.Poe.registerHandler('interpretation-handler', (result, context) => {
                    const { mode } = context;
                    const msg = result.responses[0];
                    
                    const resultElement = document.getElementById(`${mode}-result`);
                    const contentDiv = resultElement.querySelector('div');
                    
                    if (msg.status === 'error') {
                        contentDiv.innerHTML = `<span class="text-red-500">Error: ${msg.statusText}</span>`;
                    } else if (msg.status === 'incomplete') {
                        contentDiv.innerHTML = msg.content || 'Processing...';
                    } else if (msg.status === 'complete') {
                        contentDiv.innerHTML = msg.content;
                        results[mode] = msg.content;
                        analysisCount++;
                        
                        if (analysisCount === 5) {
                            generateSummary();
                        }
                    }
                });
            } else {
                // Try again in 100ms if Poe API not yet available
                setTimeout(registerPoeHandler, 100);
            }
        }
        
        // Initialize handler registration
        registerPoeHandler();

        async function analyzeWithAI(transformedText, mode) {
            if (!window.Poe) {
                const resultElement = document.getElementById(`${mode}-result`);
                const contentDiv = resultElement.querySelector('div');
                contentDiv.innerHTML = `<span class="text-red-500">Poe API not available</span>`;
                return;
            }

            const selectedModel = document.getElementById('model-select').value;
            const prompt = `@${selectedModel} Analyze and interpret this text. Provide a concise interpretation focusing on: 1) Main meaning/intent, 2) Key elements identified, 3) Emotional tone or sentiment. Be brief and analytical.

Text: "${transformedText}"

Provide only the interpretation analysis, no preamble.`;

            try {
                await window.Poe.sendUserMessage(prompt, {
                    handler: 'interpretation-handler',
                    stream: true,
                    openChat: false,
                    handlerContext: { mode }
                });
            } catch (err) {
                const resultElement = document.getElementById(`${mode}-result`);
                const contentDiv = resultElement.querySelector('div');
                contentDiv.innerHTML = `<span class="text-red-500">Error: ${err.message || 'Unknown error'}</span>`;
            }
        }

        function generateSummary() {
            const summaryContent = document.getElementById('summary-content');
            const modes = ['syntax-drained', 'hyphenated', 'regular', 'organized', 'verbose'];
            
            // Simple convergence analysis
            const interpretations = modes.map(mode => results[mode] || '');
            const similarities = [];
            
            // Calculate basic similarity by checking for common key terms
            for (let i = 0; i < interpretations.length; i++) {
                for (let j = i + 1; j < interpretations.length; j++) {
                    const words1 = interpretations[i].toLowerCase().split(/\W+/);
                    const words2 = interpretations[j].toLowerCase().split(/\W+/);
                    const common = words1.filter(word => words2.includes(word) && word.length > 3);
                    similarities.push({
                        modes: [modes[i], modes[j]],
                        commonWords: common.length,
                        similarity: common.length / Math.max(words1.length, words2.length)
                    });
                }
            }
            
            const avgSimilarity = similarities.reduce((sum, sim) => sum + sim.similarity, 0) / similarities.length;
            const convergenceLevel = avgSimilarity > 0.3 ? 'High' : avgSimilarity > 0.15 ? 'Moderate' : 'Low';
            
            summaryContent.innerHTML = `
                <p class="mb-3"><strong>Convergence Level:</strong> ${convergenceLevel} (${(avgSimilarity * 100).toFixed(1)}% average similarity)</p>
                <p class="mb-3"><strong>Observation:</strong> ${convergenceLevel === 'High' ? 
                    'The AI interpretations show strong consistency across different linguistic representations, suggesting robust semantic understanding.' :
                    convergenceLevel === 'Moderate' ?
                    'The interpretations show moderate variation, indicating that linguistic surface form has some influence on AI understanding.' :
                    'Significant divergence in interpretations suggests that the linguistic representation strongly affects AI comprehension of the underlying meaning.'
                }</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    This experiment demonstrates how different abstraction layers in language can lead to varying degrees of interpretation stability in AI systems.
                </p>
            `;
            
            document.getElementById('summary-section').classList.remove('hidden');
        }

        // Single mode analysis function
        async function analyzeSingleMode() {
            const sentence = document.getElementById('sentence-input').value.trim();
            if (!sentence) {
                alert('Please enter a sentence to analyze.');
                return;
            }

            // Reset state for single mode
            results = {};
            analysisCount = 0;
            
            // Show sections but hide summary
            document.getElementById('transformations-section').classList.remove('hidden');
            document.getElementById('results-section').classList.remove('hidden');
            document.getElementById('summary-section').classList.add('hidden');

            // Clear all displays first
            const allModes = ['syntax-drained', 'hyphenated', 'regular', 'organized', 'verbose'];
            allModes.forEach(mode => {
                const transformElement = document.getElementById(`${mode}-transform`);
                if (transformElement) {
                    const p = transformElement.querySelector('p');
                    p.textContent = 'Not analyzed';
                    p.classList.add('italic');
                }
                
                const resultElement = document.getElementById(`${mode}-result`);
                const contentDiv = resultElement.querySelector('div');
                contentDiv.innerHTML = '<div class="text-gray-400 dark:text-gray-500">Not analyzed</div>';
            });

            // Process only the selected mode
            const transformed = transformSentence(sentence, selectedMode);
            const transformElement = document.getElementById(`${selectedMode}-transform`);
            if (transformElement) {
                const p = transformElement.querySelector('p');
                p.textContent = transformed;
                p.classList.remove('italic');
            }

            // Add regular transformation display if it doesn't exist
            if (selectedMode === 'regular') {
                const regularTransform = document.createElement('div');
                regularTransform.id = 'regular-transform';
                regularTransform.className = 'bg-white dark:bg-gray-800 rounded-lg p-4';
                regularTransform.innerHTML = `
                    <h4 class="font-semibold text-primary mb-2">Regular</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">${sentence}</p>
                `;
                
                const transformGrid = document.querySelector('#transformations-section .grid');
                if (!document.getElementById('regular-transform')) {
                    transformGrid.appendChild(regularTransform);
                }
            }

            // Set loading state for selected mode
            const resultElement = document.getElementById(`${selectedMode}-result`);
            const contentDiv = resultElement.querySelector('div');
            contentDiv.innerHTML = '<div class="loading-pulse text-gray-500 dark:text-gray-400">Analyzing...</div>';

            // Analyze with AI
            await analyzeWithAI(transformed, selectedMode);
        }

        // Main analysis function
        async function analyzeAllModes() {
            const sentence = document.getElementById('sentence-input').value.trim();
            if (!sentence) {
                alert('Please enter a sentence to analyze.');
                return;
            }

            // Reset state
            results = {};
            analysisCount = 0;
            
            // Show sections
            document.getElementById('transformations-section').classList.remove('hidden');
            document.getElementById('results-section').classList.remove('hidden');
            document.getElementById('summary-section').classList.add('hidden');

            const modes = ['syntax-drained', 'hyphenated', 'regular', 'organized', 'verbose'];
            
            // Generate and display transformations
            modes.forEach(mode => {
                const transformed = transformSentence(sentence, mode);
                const transformElement = document.getElementById(`${mode}-transform`);
                if (transformElement) {
                    const p = transformElement.querySelector('p');
                    p.textContent = transformed;
                    p.classList.remove('italic');
                }
                
                // Reset result displays
                const resultElement = document.getElementById(`${mode}-result`);
                const contentDiv = resultElement.querySelector('div');
                contentDiv.innerHTML = '<div class="loading-pulse text-gray-500 dark:text-gray-400">Analyzing...</div>';
            });

            // Add regular transformation display
            const regularTransform = document.createElement('div');
            regularTransform.id = 'regular-transform';
            regularTransform.className = 'bg-white dark:bg-gray-800 rounded-lg p-4';
            regularTransform.innerHTML = `
                <h4 class="font-semibold text-primary mb-2">Regular</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">${sentence}</p>
            `;
            
            const transformGrid = document.querySelector('#transformations-section .grid');
            if (!document.getElementById('regular-transform')) {
                transformGrid.appendChild(regularTransform);
            }

            // Analyze with AI
            for (const mode of modes) {
                const transformed = transformSentence(sentence, mode);
                await analyzeWithAI(transformed, mode);
                // Small delay to avoid overwhelming the API
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }

        function clearResults() {
            document.getElementById('transformations-section').classList.add('hidden');
            document.getElementById('results-section').classList.add('hidden');
            document.getElementById('summary-section').classList.add('hidden');
            document.getElementById('sentence-input').value = '';
        }

        // Event listeners
        document.getElementById('analyze-single-btn').addEventListener('click', analyzeSingleMode);
        document.getElementById('analyze-btn').addEventListener('click', analyzeAllModes);
        document.getElementById('clear-btn').addEventListener('click', clearResults);

        // Enter key support
        document.getElementById('sentence-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                analyzeAllModes();
            }
        });
    </script>
</body>
</html>

```

## Metadata
- **Extracted**: 2025-07-27T20:12:13.063Z
- **Source**: https://poe.com/edit_bot?bot=VG-Drainer
- **Bot Type**: Canvas App
- **Code Length**: 25440 characters

---
*Extracted using VG Master Bot Automation*
