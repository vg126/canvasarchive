# VGame-Instructme

## Description
No description available

## Canvas Code
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>4-Bot Chain Guidance Experiment</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        primary: '#5D5CDE'
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
        <div class="text-center mb-8">
            <h1 class="text-3xl font-bold mb-2">4-Bot Chain Guidance Experiment</h1>
            <p class="text-gray-600 dark:text-gray-400">Guide a prompt through 4 AI stages using only universal instructions</p>
        </div>

        <!-- Controls -->
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Model Selection</label>
                    <select id="modelSelect" class="w-full p-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option value="Claude-Haiku-3">Claude-Haiku-3</option>
                        <option value="Gemini-2.0-Flash">Gemini-2.0-Flash</option>
                        <option value="Claude-Sonnet-4">Claude-Sonnet-4</option>
                        <option value="GPT-4o-mini">GPT-4o-mini</option>
                    </select>
                </div>
                <div class="flex items-end">
                    <button id="copyBtn" class="w-full px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">
                        Copy Full Log
                    </button>
                </div>
            </div>

            <div class="mb-4">
                <label class="block text-sm font-medium mb-2">Initial Prompt</label>
                <input type="text" id="initialPrompt" placeholder="Enter your starting prompt..." class="w-full p-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent">
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Stage 1 Instruction</label>
                    <textarea id="instruction1" placeholder="Universal instruction for stage 1..." class="w-full p-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent h-20 resize-none"></textarea>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Stage 2 Instruction</label>
                    <textarea id="instruction2" placeholder="Universal instruction for stage 2..." class="w-full p-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent h-20 resize-none"></textarea>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Stage 3 Instruction</label>
                    <textarea id="instruction3" placeholder="Universal instruction for stage 3..." class="w-full p-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent h-20 resize-none"></textarea>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Stage 4 Instruction</label>
                    <textarea id="instruction4" placeholder="Universal instruction for stage 4..." class="w-full p-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent h-20 resize-none"></textarea>
                </div>
            </div>

            <button id="runChain" class="w-full px-6 py-3 bg-primary hover:bg-purple-700 text-white rounded-lg font-medium text-lg transition-colors">
                Run 4-Bot Chain
            </button>
        </div>

        <!-- Results -->
        <div id="results" class="space-y-6">
            <div id="stage1Result" class="hidden bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Stage 1 Output</h3>
                <div id="stage1Content" class="text-gray-700 dark:text-gray-300 whitespace-pre-wrap"></div>
                <div id="stage1Loading" class="text-blue-600 dark:text-blue-400 italic">Processing...</div>
            </div>

            <div id="stage2Result" class="hidden bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h3 class="font-semibold text-green-900 dark:text-green-100 mb-2">Stage 2 Output</h3>
                <div id="stage2Content" class="text-gray-700 dark:text-gray-300 whitespace-pre-wrap"></div>
                <div id="stage2Loading" class="text-green-600 dark:text-green-400 italic">Processing...</div>
            </div>

            <div id="stage3Result" class="hidden bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <h3 class="font-semibold text-orange-900 dark:text-orange-100 mb-2">Stage 3 Output</h3>
                <div id="stage3Content" class="text-gray-700 dark:text-gray-300 whitespace-pre-wrap"></div>
                <div id="stage3Loading" class="text-orange-600 dark:text-orange-400 italic">Processing...</div>
            </div>

            <div id="stage4Result" class="hidden bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <h3 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">Stage 4 Output (Final)</h3>
                <div id="stage4Content" class="text-gray-700 dark:text-gray-300 whitespace-pre-wrap"></div>
                <div id="stage4Loading" class="text-purple-600 dark:text-purple-400 italic">Processing...</div>
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

        let chainLog = [];

        // Register handlers for each stage
        window.Poe.registerHandler("stage1-handler", (result) => {
            const msg = result.responses[0];
            const loading = document.getElementById('stage1Loading');
            const content = document.getElementById('stage1Content');

            if (msg.status === "error") {
                content.textContent = "Error: " + msg.statusText;
                loading.style.display = 'none';
            } else if (msg.status === "incomplete") {
                content.textContent = msg.content;
                loading.style.display = 'block';
            } else if (msg.status === "complete") {
                content.textContent = msg.content;
                loading.style.display = 'none';
                chainLog[0].output = msg.content;
                runStage2();
            }
        });

        window.Poe.registerHandler("stage2-handler", (result) => {
            const msg = result.responses[0];
            const loading = document.getElementById('stage2Loading');
            const content = document.getElementById('stage2Content');

            if (msg.status === "error") {
                content.textContent = "Error: " + msg.statusText;
                loading.style.display = 'none';
            } else if (msg.status === "incomplete") {
                content.textContent = msg.content;
                loading.style.display = 'block';
            } else if (msg.status === "complete") {
                content.textContent = msg.content;
                loading.style.display = 'none';
                chainLog[1].output = msg.content;
                runStage3();
            }
        });

        window.Poe.registerHandler("stage3-handler", (result) => {
            const msg = result.responses[0];
            const loading = document.getElementById('stage3Loading');
            const content = document.getElementById('stage3Content');

            if (msg.status === "error") {
                content.textContent = "Error: " + msg.statusText;
                loading.style.display = 'none';
            } else if (msg.status === "incomplete") {
                content.textContent = msg.content;
                loading.style.display = 'block';
            } else if (msg.status === "complete") {
                content.textContent = msg.content;
                loading.style.display = 'none';
                chainLog[2].output = msg.content;
                runStage4();
            }
        });

        window.Poe.registerHandler("stage4-handler", (result) => {
            const msg = result.responses[0];
            const loading = document.getElementById('stage4Loading');
            const content = document.getElementById('stage4Content');

            if (msg.status === "error") {
                content.textContent = "Error: " + msg.statusText;
                loading.style.display = 'none';
            } else if (msg.status === "incomplete") {
                content.textContent = msg.content;
                loading.style.display = 'block';
            } else if (msg.status === "complete") {
                content.textContent = msg.content;
                loading.style.display = 'none';
                chainLog[3].output = msg.content;
                console.log("Chain complete!");
            }
        });

        async function runStage1() {
            const model = document.getElementById('modelSelect').value;
            const prompt = document.getElementById('initialPrompt').value;
            const instruction = document.getElementById('instruction1').value;
            
            const fullPrompt = `@${model} ${instruction}\n\nContent to process: ${prompt}`;
            
            chainLog[0] = {
                stage: 1,
                instruction: instruction,
                input: prompt,
                output: null
            };

            document.getElementById('stage1Result').classList.remove('hidden');
            document.getElementById('stage1Loading').style.display = 'block';
            document.getElementById('stage1Content').textContent = '';

            try {
                await window.Poe.sendUserMessage(fullPrompt, {
                    handler: "stage1-handler",
                    stream: true,
                    openChat: false
                });
            } catch (err) {
                document.getElementById('stage1Content').textContent = "Error: " + err;
                document.getElementById('stage1Loading').style.display = 'none';
            }
        }

        async function runStage2() {
            const model = document.getElementById('modelSelect').value;
            const instruction = document.getElementById('instruction2').value;
            const previousOutput = chainLog[0].output;
            
            const fullPrompt = `@${model} ${instruction}\n\nContent to process: ${previousOutput}`;
            
            chainLog[1] = {
                stage: 2,
                instruction: instruction,
                input: previousOutput,
                output: null
            };

            document.getElementById('stage2Result').classList.remove('hidden');
            document.getElementById('stage2Loading').style.display = 'block';
            document.getElementById('stage2Content').textContent = '';

            try {
                await window.Poe.sendUserMessage(fullPrompt, {
                    handler: "stage2-handler",
                    stream: true,
                    openChat: false
                });
            } catch (err) {
                document.getElementById('stage2Content').textContent = "Error: " + err;
                document.getElementById('stage2Loading').style.display = 'none';
            }
        }

        async function runStage3() {
            const model = document.getElementById('modelSelect').value;
            const instruction = document.getElementById('instruction3').value;
            const previousOutput = chainLog[1].output;
            
            const fullPrompt = `@${model} ${instruction}\n\nContent to process: ${previousOutput}`;
            
            chainLog[2] = {
                stage: 3,
                instruction: instruction,
                input: previousOutput,
                output: null
            };

            document.getElementById('stage3Result').classList.remove('hidden');
            document.getElementById('stage3Loading').style.display = 'block';
            document.getElementById('stage3Content').textContent = '';

            try {
                await window.Poe.sendUserMessage(fullPrompt, {
                    handler: "stage3-handler",
                    stream: true,
                    openChat: false
                });
            } catch (err) {
                document.getElementById('stage3Content').textContent = "Error: " + err;
                document.getElementById('stage3Loading').style.display = 'none';
            }
        }

        async function runStage4() {
            const model = document.getElementById('modelSelect').value;
            const instruction = document.getElementById('instruction4').value;
            const previousOutput = chainLog[2].output;
            
            const fullPrompt = `@${model} ${instruction}\n\nContent to process: ${previousOutput}`;
            
            chainLog[3] = {
                stage: 4,
                instruction: instruction,
                input: previousOutput,
                output: null
            };

            document.getElementById('stage4Result').classList.remove('hidden');
            document.getElementById('stage4Loading').style.display = 'block';
            document.getElementById('stage4Content').textContent = '';

            try {
                await window.Poe.sendUserMessage(fullPrompt, {
                    handler: "stage4-handler",
                    stream: true,
                    openChat: false
                });
            } catch (err) {
                document.getElementById('stage4Content').textContent = "Error: " + err;
                document.getElementById('stage4Loading').style.display = 'none';
            }
        }

        document.getElementById('runChain').addEventListener('click', async () => {
            const prompt = document.getElementById('initialPrompt').value;
            const instruction1 = document.getElementById('instruction1').value;
            
            if (!prompt.trim()) {
                alert('Please enter an initial prompt');
                return;
            }
            if (!instruction1.trim()) {
                alert('Please enter at least the Stage 1 instruction');
                return;
            }

            // Reset results
            chainLog = [];
            ['stage1Result', 'stage2Result', 'stage3Result', 'stage4Result'].forEach(id => {
                document.getElementById(id).classList.add('hidden');
            });

            // Start the chain
            runStage1();
        });

        document.getElementById('copyBtn').addEventListener('click', () => {
            let logText = "=== 4-Bot Chain Experiment Log ===\n\n";
            logText += `Initial Prompt: ${document.getElementById('initialPrompt').value}\n`;
            logText += `Model: ${document.getElementById('modelSelect').value}\n\n`;
            
            chainLog.forEach((stage, index) => {
                if (stage) {
                    logText += `--- STAGE ${stage.stage} ---\n`;
                    logText += `Instruction: ${stage.instruction}\n`;
                    logText += `Input: ${stage.input.substring(0, 200)}${stage.input.length > 200 ? '...' : ''}\n`;
                    logText += `Output: ${stage.output || 'No output yet'}\n\n`;
                }
            });

            navigator.clipboard.writeText(logText).then(() => {
                const btn = document.getElementById('copyBtn');
                const originalText = btn.textContent;
                btn.textContent = 'Copied!';
                btn.classList.add('bg-green-600');
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.classList.remove('bg-green-600');
                }, 2000);
            });
        });
    </script>
</body>
</html>

```

## Metadata
- **Extracted**: 2025-07-27T19:15:23.173Z
- **Source**: https://poe.com/edit_bot?bot=VGame-Instructme
- **Bot Type**: Canvas App
- **Code Length**: 17495 characters

---
*Extracted using VG Canvas App Extractor*
