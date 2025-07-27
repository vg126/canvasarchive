# VGRBANGER

## Description
No description available

## Canvas Code
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DRBanger Legal Research System</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/marked@9.1.6/marked.min.js"></script>
    <script>
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
    </script>
</head>
<body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-8 max-w-6xl">
        <!-- Header -->
        <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-[#5D5CDE] mb-2">🎯 DRBanger Legal Research System</h1>
            <p class="text-gray-600 dark:text-gray-400">SST Application → ICC Precedent Evaluation → Dialectical Resolution → Doctrinal Formatting</p>
        </div>

        <!-- Input Section -->
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
            <h2 class="text-xl font-semibold mb-4">📝 Input Configuration</h2>
            
            <!-- Legal Text Input -->
            <div class="mb-4">
                <label class="block text-sm font-medium mb-2">Legal Text (e.g., ICC Article 17)</label>
                <textarea 
                    id="legalText" 
                    class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-base resize-vertical"
                    rows="4"
                    placeholder="Enter the legal text you want to analyze..."
                ></textarea>
            </div>

            <!-- SST Capsule Input -->
            <div class="mb-4">
                <label class="block text-sm font-medium mb-2">SST Technique</label>
                <textarea 
                    id="sstCapsule" 
                    class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-base resize-vertical"
                    rows="3"
                    placeholder="Enter a specific SST technique (e.g., 'Zobrist Hashing Transformation - Converts positions to unique 64-bit numbers...')"
                ></textarea>
                <button 
                    id="loadDefaultSST"
                    class="mt-2 px-4 py-2 bg-gray-200 dark:bg-gray-600 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                    Load Sample SST List
                </button>
            </div>

            <!-- Bot Selectors -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Bot 1: SST Application</label>
                    <select id="bot1" class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-base">
                        <option value="GPT-4.1" selected>GPT-4.1 (Default)</option>
                        <option value="Claude-Sonnet-4">Claude-Sonnet-4</option>
                        <option value="Claude-Sonnet-3.5">Claude-Sonnet-3.5</option>
                        <option value="Command-R-Plus">Command-R-Plus</option>
                        <option value="Mixtral8x22b-Inst-FW">Mixtral8x22b-Inst-FW</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Bot 2: Legal Evaluation</label>
                    <select id="bot2" class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-base">
                        <option value="Claude-Sonnet-4-Search" selected>Claude-Sonnet-4-Search (Default)</option>
                        <option value="Gemini-2.5-Pro">Gemini-2.5-Pro</option>
                        <option value="Gemini-2.5-Flash">Gemini-2.5-Flash</option>
                        <option value="GPT-4o-Search">GPT-4o-Search</option>
                        <option value="Claude-Opus-4-Search">Claude-Opus-4-Search</option>
                        <option value="Claude-Sonnet-3.5-Search">Claude-Sonnet-3.5-Search</option>
                        <option value="Perplexity-Sonar-Rsn">Perplexity-Sonar-Rsn</option>
                        <option value="Perplexity-Sonar">Perplexity-Sonar</option>
                        <option value="GPT-Researcher">GPT-Researcher</option>
                        <option value="Perplexity-Sonar-Pro">Perplexity-Sonar-Pro</option>
                        <option value="Perplexity-Sonar-Rsn-Pro">Perplexity-Sonar-Rsn-Pro</option>
                        <option value="Reka-Research">Reka-Research</option>
                        <option value="Grok-4">Grok-4</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Bot 3: Dialectical Resolver</label>
                    <select id="bot3" class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-base">
                        <option value="Claude-Opus-4-Search" selected>Claude-Opus-4-Search (Default)</option>
                        <option value="Gemini-2.5-Pro">Gemini-2.5-Pro</option>
                        <option value="Gemini-2.5-Flash">Gemini-2.5-Flash</option>
                        <option value="GPT-4o-Search">GPT-4o-Search</option>
                        <option value="Claude-Sonnet-4-Search">Claude-Sonnet-4-Search</option>
                        <option value="Claude-Sonnet-3.5-Search">Claude-Sonnet-3.5-Search</option>
                        <option value="Perplexity-Sonar-Rsn">Perplexity-Sonar-Rsn</option>
                        <option value="Perplexity-Sonar">Perplexity-Sonar</option>
                        <option value="GPT-Researcher">GPT-Researcher</option>
                        <option value="Perplexity-Sonar-Pro">Perplexity-Sonar-Pro</option>
                        <option value="Perplexity-Sonar-Rsn-Pro">Perplexity-Sonar-Rsn-Pro</option>
                        <option value="Reka-Research">Reka-Research</option>
                        <option value="Grok-4">Grok-4</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Bot 4: Doctrinal Formatter</label>
                    <select id="bot4" class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-base">
                        <option value="Claude-Sonnet-3.5-Search" selected>Claude-Sonnet-3.5-Search (Default)</option>
                        <option value="Gemini-2.5-Pro">Gemini-2.5-Pro</option>
                        <option value="Gemini-2.5-Flash">Gemini-2.5-Flash</option>
                        <option value="GPT-4o-Search">GPT-4o-Search</option>
                        <option value="Claude-Opus-4-Search">Claude-Opus-4-Search</option>
                        <option value="Claude-Sonnet-4-Search">Claude-Sonnet-4-Search</option>
                        <option value="Perplexity-Sonar-Rsn">Perplexity-Sonar-Rsn</option>
                        <option value="Perplexity-Sonar">Perplexity-Sonar</option>
                        <option value="GPT-Researcher">GPT-Researcher</option>
                        <option value="Perplexity-Sonar-Pro">Perplexity-Sonar-Pro</option>
                        <option value="Perplexity-Sonar-Rsn-Pro">Perplexity-Sonar-Rsn-Pro</option>
                        <option value="Reka-Research">Reka-Research</option>
                        <option value="Grok-4">Grok-4</option>
                    </select>
                </div>
            </div>

            <!-- Pre-Prompt Instructions -->
            <div id="prePromptSection" class="mb-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                <h3 class="text-sm font-semibold mb-3 text-indigo-800 dark:text-indigo-200">🎯 Custom Pre-Prompt Instructions (Optional)</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                        <label class="block text-xs font-medium mb-1 text-indigo-700 dark:text-indigo-300">Bot 1 Pre-Prompt</label>
                        <textarea 
                            id="prePrompt1" 
                            class="w-full p-2 border border-indigo-300 dark:border-indigo-600 rounded bg-white dark:bg-gray-700 text-sm resize-vertical"
                            rows="2"
                            placeholder="Custom instructions for SST Application Bot..."
                        ></textarea>
                    </div>
                    <div>
                        <label class="block text-xs font-medium mb-1 text-indigo-700 dark:text-indigo-300">Bot 2 Pre-Prompt</label>
                        <textarea 
                            id="prePrompt2" 
                            class="w-full p-2 border border-indigo-300 dark:border-indigo-600 rounded bg-white dark:bg-gray-700 text-sm resize-vertical"
                            rows="2"
                            placeholder="Custom instructions for Legal Evaluation Bot..."
                        ></textarea>
                    </div>
                    <div>
                        <label class="block text-xs font-medium mb-1 text-indigo-700 dark:text-indigo-300">Bot 3 Pre-Prompt</label>
                        <textarea 
                            id="prePrompt3" 
                            class="w-full p-2 border border-indigo-300 dark:border-indigo-600 rounded bg-white dark:bg-gray-700 text-sm resize-vertical"
                            rows="2"
                            placeholder="Custom instructions for Dialectical Resolver Bot..."
                        ></textarea>
                    </div>
                    <div>
                        <label class="block text-xs font-medium mb-1 text-indigo-700 dark:text-indigo-300">Bot 4 Pre-Prompt</label>
                        <textarea 
                            id="prePrompt4" 
                            class="w-full p-2 border border-indigo-300 dark:border-indigo-600 rounded bg-white dark:bg-gray-700 text-sm resize-vertical"
                            rows="2"
                            placeholder="Custom instructions for Doctrinal Formatter Bot..."
                        ></textarea>
                    </div>
                </div>
            </div>

            <!-- Manual Mode Info -->
            <div class="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div class="flex items-center">
                    <span class="text-blue-600 dark:text-blue-400 font-medium">👤 Manual Mode</span>
                    <span class="ml-2 text-sm text-blue-700 dark:text-blue-300">Run each bot individually to control costs and review outputs</span>
                </div>
            </div>
        </div>

        <!-- Copy All Button -->
        <div class="mb-6 text-center">
            <button 
                id="copyAllResults"
                class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-base disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
            >
                📋 Copy All Results
            </button>
        </div>

        <!-- Results Section -->
        <div id="resultsSection" class="space-y-6 hidden">
            <!-- Bot 1 Results -->
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="text-lg font-semibold flex items-center">
                        <span class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
                        🔍 SST Mechanical Application Bot
                    </h3>
                    <div class="flex space-x-2">
                        <button 
                            id="copyBot1"
                            class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
                            disabled
                        >
                            📋 Copy
                        </button>
                        <button 
                            id="sendBot1"
                            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            📤 Send Bot 1
                        </button>
                    </div>
                </div>
                <div id="bot1Status" class="text-sm text-gray-600 dark:text-gray-400 mb-2"></div>
                <div id="bot1Output" class="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-4 rounded border min-h-[50px] max-h-[600px] overflow-y-auto"></div>
            </div>

            <!-- Bot 2 Results -->
            <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="text-lg font-semibold flex items-center">
                        <span class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
                        ⚡ ICC Precedent Evaluator Bot
                    </h3>
                    <div class="flex space-x-2">
                        <button 
                            id="copyBot2"
                            class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                            disabled
                        >
                            📋 Copy
                        </button>
                        <button 
                            id="sendBot2"
                            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled
                        >
                            📤 Send Bot 2
                        </button>
                    </div>
                </div>
                <div id="bot2Status" class="text-sm text-gray-600 dark:text-gray-400 mb-2"></div>
                <div id="bot2Output" class="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-4 rounded border min-h-[50px] max-h-[600px] overflow-y-auto"></div>
            </div>

            <!-- Bot 3 Results -->
            <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="text-lg font-semibold flex items-center">
                        <span class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm mr-3">3</span>
                        🧪 Dialectical Resolver Bot
                    </h3>
                    <div class="flex space-x-2">
                        <button 
                            id="copyBot3"
                            class="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 transition-colors disabled:opacity-50"
                            disabled
                        >
                            📋 Copy
                        </button>
                        <button 
                            id="sendBot3"
                            class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled
                        >
                            📤 Send Bot 3
                        </button>
                    </div>
                </div>
                <div id="bot3Status" class="text-sm text-gray-600 dark:text-gray-400 mb-2"></div>
                <div id="bot3Output" class="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-4 rounded border min-h-[50px] max-h-[600px] overflow-y-auto"></div>
            </div>

            <!-- Bot 4 Results -->
            <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="text-lg font-semibold flex items-center">
                        <span class="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm mr-3">4</span>
                        ⚡ Doctrinal Formatter Bot
                    </h3>
                    <div class="flex space-x-2">
                        <button 
                            id="copyBot4"
                            class="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
                            disabled
                        >
                            📋 Copy
                        </button>
                        <button 
                            id="sendBot4"
                            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled
                        >
                            📤 Send Bot 4
                        </button>
                    </div>
                </div>
                <div id="bot4Status" class="text-sm text-gray-600 dark:text-gray-400 mb-2"></div>
                <div id="bot4Output" class="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-4 rounded border min-h-[50px] max-h-[600px] overflow-y-auto"></div>
            </div>
        </div>

        <!-- Error Display -->
        <div id="errorSection" class="hidden bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mt-6">
            <h3 class="text-red-800 dark:text-red-200 font-semibold mb-2">❌ Error</h3>
            <div id="errorMessage" class="text-red-700 dark:text-red-300"></div>
        </div>
    </div>

    <script>
        // Default SST Capsule List
        const defaultSST = `### Sample SST Techniques

**From: Chess Informatics**
Zobrist Hashing Transformation – Converts positions to unique 64-bit numbers by XORing random values associated with board elements.

**From: Translation Studies**
Modulation – Alters the point of view or category of thought, shifting perspective from one conceptual framework to another.

**From: Software Engineering**
Factory Method Pattern – Delegates object instantiation to subclasses, allowing the system to decide which class to instantiate at runtime.

**From: Quantum Computing**
Quantum Superposition Mixer – Layers tracks (all possible states of a qubit) playing simultaneously, mixing huge data sets into single lightweight wave.

**From: Music Theory**
Klangfarbenmelodie (Timbre-Melody) – Distributes melodic lines among different instruments, with each playing only a few notes, making timbre changes structural.`;

        // Load default SST when button is clicked
        document.getElementById('loadDefaultSST').addEventListener('click', () => {
            document.getElementById('sstCapsule').value = defaultSST;
        });

        // Core bot prompt templates
        const botPrompts = {
            bot1: (legalText, sstTechnique, prePrompt) => {
                const basePrompt = `ROLE: sst_mechanical_applicator
TASK: Apply the provided SST technique mechanically to legal text
LEGAL TEXT: ${legalText}

SST TECHNIQUE: ${sstTechnique}

INSTRUCTIONS:
1. Apply the SST technique MECHANICALLY to the legal text structure
2. Do NOT interpret legal meaning - treat text as raw material for transformation
3. Transform the legal text THROUGH the SST lens as if it were data/code/music/etc
4. Show exactly HOW the transformation changes the text's structure
5. Include confidence score (0-100) for the mechanical application

OUTPUT FORMAT: 
[SST Applied: <technique name>]
[Confidence: XX/100]

<Mechanical transformation of the legal text through the SST lens>`;
                return prePrompt ? `${prePrompt}\n\n${basePrompt}` : basePrompt;
            },

            bot2: (bot1Output, legalText, prePrompt) => {
                const basePrompt = `ROLE: sst_skeptic_critic
TASK: DEMOLISH the SST application as legally invalid and methodologically flawed
BOT 1 OUTPUT: ${bot1Output}
ORIGINAL ICC TEXT: ${legalText}

CRITICAL MANDATE: You are the hostile critic. Attack the SST transformation relentlessly.

ATTACK VECTORS:
1. **Methodological Invalidity**: SST is imported from non-legal domains - why should chess/music/computing techniques apply to law?
2. **Textual Violence**: The transformation distorts the plain meaning of legal text beyond recognition
3. **Precedential Disconnect**: No ICC case has ever used this interpretive method - it's judicial activism
4. **Due Process Violations**: The transformation undermines established legal safeguards and procedural requirements
5. **Practical Impossibility**: Courts cannot operationalize these abstract transformations in real cases
6. **Legal Certainty Destruction**: SST creates unpredictable interpretations that violate rule of law principles

OUTPUT STRUCTURE:
**METHODOLOGICAL REJECTION**: [Why this SST technique has no place in legal interpretation]
**TEXTUAL DISTORTION**: [How the transformation violates established canons of interpretation]  
**PRECEDENTIAL VOID**: [Why no serious court would accept this approach]
**PRACTICAL IMPOSSIBILITY**: [Why this cannot work in actual ICC proceedings]
**VERDICT**: [Definitive rejection with 2-3 devastating points]

TONE: Hostile academic critic. Think law review takedown piece, not diplomatic evaluation.`;
                return prePrompt ? `${prePrompt}\n\n${basePrompt}` : basePrompt;
            },

            bot3: (bot2Output, bot1Output, prePrompt) => {
                const basePrompt = `ROLE: Dialectical Resolver
INPUT 1 (Thesis - The SST Transformation): ${bot1Output}
INPUT 2 (Antithesis - The Legal Critique): ${bot2Output}

TASK:
1. Analyze the conflict between the Thesis and the Antithesis.
2. Formulate a single, specific Doctrinal Gap within existing ICC law that this conflict reveals.
3. Write a one-paragraph analysis explaining this Doctrinal Gap, citing relevant articles or case law.
4. Conclude with the Doctrinal Gap phrased as a single, answerable legal question. Do not discuss the SST or methodology.`;
                return prePrompt ? `${prePrompt}\n\n${basePrompt}` : basePrompt;
            },

            bot4: (bot3Output, prePrompt) => {
                const basePrompt = `ROLE: Doctrinal Formatter
INPUT: The doctrinal gap analysis from Bot 3.
INPUT TEXT: ${bot3Output}

TASK:
1. Extract the relevant legal provisions, the statement of the issue, and the final doctrinal question from the INPUT text.
2. Format this information into the following Markdown template.
3. Do NOT add any new analysis, commentary, or methodological discussion. Adhere strictly to the template.

TEMPLATE:
**MEMORANDUM ON A POTENTIAL DOCTRINAL GAP IN ICC JURISPRUDENCE**

**1. Relevant Provisions:**
* [List the primary legal texts discussed in the input]

**2. Statement of the Issue (The Gap):**
* [Insert the one-paragraph summary of the doctrinal conflict from the input]

**3. The Resulting Doctrinal Question:**
* [Insert the single, mandatory legal question from the input]`;
                return prePrompt ? `${prePrompt}\n\n${basePrompt}` : basePrompt;
            }
        };

        // Bot handlers
        window.Poe.registerHandler("bot1-handler", (result, context) => {
            console.log("Bot1 handler called with status:", result.status);
            handleBotResponse(result, 'bot1', () => {
                console.log("Bot1 completed");
                window.bot1Output = result.responses[0].content;
                document.getElementById('sendBot1').disabled = false;
                document.getElementById('sendBot2').disabled = false;
                document.getElementById('copyBot1').disabled = false;
                updateCopyAllButton();
            });
        });

        window.Poe.registerHandler("bot2-handler", (result, context) => {
            console.log("Bot2 handler called with status:", result.status);
            handleBotResponse(result, 'bot2', () => {
                console.log("Bot2 completed");
                window.bot2Output = result.responses[0].content;
                document.getElementById('sendBot2').disabled = false;
                document.getElementById('sendBot3').disabled = false;
                document.getElementById('copyBot2').disabled = false;
                updateCopyAllButton();
            });
        });

        window.Poe.registerHandler("bot3-handler", (result, context) => {
            console.log("Bot3 handler called with status:", result.status);
            handleBotResponse(result, 'bot3', () => {
                console.log("Bot3 completed");
                window.bot3Output = result.responses[0].content;
                document.getElementById('sendBot3').disabled = false;
                document.getElementById('sendBot4').disabled = false;
                document.getElementById('copyBot3').disabled = false;
                updateCopyAllButton();
            });
        });

        window.Poe.registerHandler("bot4-handler", (result, context) => {
            console.log("Bot4 handler called with status:", result.status);
            handleBotResponse(result, 'bot4', () => {
                console.log("Bot4 completed");
                document.getElementById('sendBot4').disabled = false;
                document.getElementById('copyBot4').disabled = false;
                updateCopyAllButton();
            });
        });

        // Helper function to handle bot responses
        function handleBotResponse(result, botNum, onComplete) {
            const status = document.getElementById(`${botNum}Status`);
            const output = document.getElementById(`${botNum}Output`);
            
            console.log(`${botNum} received result:`, {
                status: result.status,
                responseCount: result.responses ? result.responses.length : 0,
                firstResponseStatus: result.responses && result.responses[0] ? result.responses[0].status : 'none',
                fullResult: result
            });
            
            if (result.responses && result.responses.length > 0) {
                const response = result.responses[0];
                
                if (response.status === "error") {
                    console.log(`${botNum} error:`, response.statusText);
                    status.textContent = "❌ Error occurred";
                    output.innerHTML = `<div class="text-red-600">Error: ${response.statusText || 'Unknown error'}</div>`;
                } else if (response.status === "incomplete") {
                    status.textContent = "⏳ Generating response...";
                    output.innerHTML = marked.parse(response.content || "Loading...");
                } else if (response.status === "complete") {
                    console.log(`${botNum} completed successfully`);
                    status.textContent = "✅ Complete";
                    output.innerHTML = marked.parse(response.content);
                    if (onComplete && typeof onComplete === 'function') {
                        console.log(`${botNum} calling onComplete callback`);
                        onComplete();
                    }
                }
            } else {
                console.log(`${botNum} error: No responses received`);
                showError(`${botNum}: No response received`);
            }
            
            if (result.status === "complete" && result.responses && result.responses.length > 0) {
                const response = result.responses[0];
                if (response.status !== "complete" && response.content) {
                    console.log(`${botNum} force completing due to result.status === complete`);
                    status.textContent = "✅ Complete";
                    output.innerHTML = marked.parse(response.content);
                    if (onComplete && typeof onComplete === 'function') {
                        console.log(`${botNum} force calling onComplete callback`);
                        onComplete();
                    }
                }
            }
        }

        // Bot execution functions
        async function startBot1() {
            const legalText = document.getElementById('legalText').value.trim();
            const sstTechnique = document.getElementById('sstCapsule').value.trim();
            const bot1Name = document.getElementById('bot1').value;
            const prePrompt1 = document.getElementById('prePrompt1').value.trim();

            if (!legalText || !sstTechnique) {
                showError("Please enter both legal text and SST technique");
                document.getElementById('sendBot1').disabled = false;
                return;
            }

            const prompt = botPrompts.bot1(legalText, sstTechnique, prePrompt1);

            try {
                document.getElementById('bot1Status').textContent = "🚀 Starting SST application...";
                await window.Poe.sendUserMessage(`@${bot1Name} ${prompt}`, {
                    handler: "bot1-handler",
                    stream: true,
                    openChat: false
                });
            } catch (error) {
                showError(`Bot 1 Error: ${error.message}`);
                document.getElementById('sendBot1').disabled = false;
            }
        }

        async function startBot2() {
            if (!window.bot1Output) {
                showError("Please run Bot 1 first");
                document.getElementById('sendBot2').disabled = false;
                return;
            }

            const legalText = document.getElementById('legalText').value.trim();
            const bot2Name = document.getElementById('bot2').value;
            const prePrompt2 = document.getElementById('prePrompt2').value.trim();

            const prompt = botPrompts.bot2(window.bot1Output, legalText, prePrompt2);

            try {
                document.getElementById('bot2Status').textContent = "🚀 Starting ICC precedent evaluation...";
                await window.Poe.sendUserMessage(`@${bot2Name} ${prompt}`, {
                    handler: "bot2-handler",
                    stream: true,
                    openChat: false
                });
            } catch (error) {
                showError(`Bot 2 Error: ${error.message}`);
                document.getElementById('sendBot2').disabled = false;
            }
        }

        async function startBot3() {
            if (!window.bot2Output || !window.bot1Output) {
                showError("Please run Bot 1 and Bot 2 first");
                document.getElementById('sendBot3').disabled = false;
                return;
            }

            const bot3Name = document.getElementById('bot3').value;
            const prePrompt3 = document.getElementById('prePrompt3').value.trim();

            const prompt = botPrompts.bot3(window.bot2Output, window.bot1Output, prePrompt3);

            try {
                document.getElementById('bot3Status').textContent = "🚀 Starting dialectical resolution...";
                await window.Poe.sendUserMessage(`@${bot3Name} ${prompt}`, {
                    handler: "bot3-handler",
                    stream: true,
                    openChat: false
                });
            } catch (error) {
                showError(`Bot 3 Error: ${error.message}`);
                document.getElementById('sendBot3').disabled = false;
            }
        }

        async function startBot4() {
            if (!window.bot3Output) {
                showError("Please run Bot 3 first");
                document.getElementById('sendBot4').disabled = false;
                return;
            }

            const bot4Name = document.getElementById('bot4').value;
            const prePrompt4 = document.getElementById('prePrompt4').value.trim();

            const prompt = botPrompts.bot4(window.bot3Output, prePrompt4);

            try {
                document.getElementById('bot4Status').textContent = "🚀 Formatting doctrinal memorandum...";
                await window.Poe.sendUserMessage(`@${bot4Name} ${prompt}`, {
                    handler: "bot4-handler",
                    stream: true,
                    openChat: false
                });
            } catch (error) {
                showError(`Bot 4 Error: ${error.message}`);
                document.getElementById('sendBot4').disabled = false;
            }
        }

        // Copy functions
        function copyToClipboard(text, buttonId) {
            navigator.clipboard.writeText(text).then(() => {
                const button = document.getElementById(buttonId);
                const originalText = button.textContent;
                button.textContent = "✅ Copied!";
                setTimeout(() => {
                    button.textContent = originalText;
                }, 2000);
            }).catch(err => {
                showError('Failed to copy to clipboard');
            });
        }

        function copyAllResults() {
            const results = [];
            
            if (window.bot1Output) {
                results.push("=== BOT 1: SST MECHANICAL APPLICATION ===\n" + window.bot1Output);
            }
            if (window.bot2Output) {
                results.push("=== BOT 2: ICC PRECEDENT EVALUATION ===\n" + window.bot2Output);
            }
            if (window.bot3Output) {
                results.push("=== BOT 3: DIALECTICAL RESOLUTION ===\n" + window.bot3Output);
            }
            if (window.bot4Output) {
                results.push("=== BOT 4: DOCTRINAL FORMATTING ===\n" + document.getElementById('bot4Output').textContent);
            }
            
            const allText = results.join("\n\n");
            copyToClipboard(allText, 'copyAllResults');
        }

        function updateCopyAllButton() {
            const hasResults = window.bot1Output || window.bot2Output || window.bot3Output || window.bot4Output;
            document.getElementById('copyAllResults').disabled = !hasResults;
        }

        // Utility functions
        function showError(message) {
            document.getElementById('errorMessage').textContent = message;
            document.getElementById('errorSection').classList.remove('hidden');
            setTimeout(() => {
                document.getElementById('errorSection').classList.add('hidden');
            }, 10000);
        }

        function resetOutputs() {
            // Clear stored outputs
            window.bot1Output = null;
            window.bot2Output = null;
            window.bot3Output = null;
            window.bot4Output = null;
            
            // Clear UI
            ['bot1Output', 'bot2Output', 'bot3Output', 'bot4Output'].forEach(id => {
                document.getElementById(id).innerHTML = '';
            });
            ['bot1Status', 'bot2Status', 'bot3Status', 'bot4Status'].forEach(id => {
                document.getElementById(id).textContent = '';
            });
            
            // Reset buttons
            ['sendBot2', 'sendBot3', 'sendBot4'].forEach(id => {
                document.getElementById(id).disabled = true;
            });
            ['copyBot1', 'copyBot2', 'copyBot3', 'copyBot4'].forEach(id => {
                document.getElementById(id).disabled = true;
            });
            document.getElementById('copyAllResults').disabled = true;
            
            document.getElementById('errorSection').classList.add('hidden');
        }

        // Event listeners
        document.getElementById('sendBot1').addEventListener('click', async () => {
            document.getElementById('sendBot1').disabled = true;
            resetOutputs();
            document.getElementById('resultsSection').classList.remove('hidden');
            await startBot1();
        });

        document.getElementById('sendBot2').addEventListener('click', async () => {
            document.getElementById('sendBot2').disabled = true;
            await startBot2();
        });

        document.getElementById('sendBot3').addEventListener('click', async () => {
            document.getElementById('sendBot3').disabled = true;
            await startBot3();
        });

        document.getElementById('sendBot4').addEventListener('click', async () => {
            document.getElementById('sendBot4').disabled = true;
            await startBot4();
        });

        // Copy button handlers
        document.getElementById('copyBot1').addEventListener('click', () => {
            if (window.bot1Output) copyToClipboard(window.bot1Output, 'copyBot1');
        });

        document.getElementById('copyBot2').addEventListener('click', () => {
            if (window.bot2Output) copyToClipboard(window.bot2Output, 'copyBot2');
        });

        document.getElementById('copyBot3').addEventListener('click', () => {
            if (window.bot3Output) copyToClipboard(window.bot3Output, 'copyBot3');
        });

        document.getElementById('copyBot4').addEventListener('click', () => {
            if (window.bot4Output) copyToClipboard(document.getElementById('bot4Output').textContent, 'copyBot4');
        });

        document.getElementById('copyAllResults').addEventListener('click', copyAllResults);

        // Initialize on page load
        window.addEventListener('load', () => {
            // Start with results section visible and Bot 1 ready
            document.getElementById('resultsSection').classList.remove('hidden');
            document.getElementById('sendBot1').disabled = false;
        });
    </script>
</body>
</html>

```

## Metadata
- **Extracted**: 2025-07-27T20:04:45.740Z
- **Source**: https://poe.com/edit_bot?bot=VGRBANGER
- **Bot Type**: Canvas App
- **Code Length**: 38625 characters

---
*Extracted using VG Master Bot Automation*
