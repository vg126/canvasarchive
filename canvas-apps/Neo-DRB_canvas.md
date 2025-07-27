# Neo-DRB

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
            <p class="text-gray-600 dark:text-gray-400">SST Application → ICC Precedent Evaluation → International Law Proof of Concept → ICC Insight Extraction</p>
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
                        <option value="Gemini-2.5-Flash" selected>Gemini-2.5-Flash (Default)</option>
                        <option value="Claude-Haiku-3.5-Search">Claude-Haiku-3.5-Search</option>
                        <option value="Claude-Sonnet-4-Search">Claude-Sonnet-4-Search</option>
                        <option value="Gemini-2.0-Flash">Gemini-2.0-Flash</option>
                        <option value="GPT-4o-Search">GPT-4o-Search</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Bot 3: International Law SST Applicator</label>
                    <select id="bot3" class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-base">
                        <option value="DeepSeek-V3-FW" selected>DeepSeek-V3-FW (Default)</option>
                        <option value="Claude-Opus-4">Claude-Opus-4</option>
                        <option value="Claude-Sonnet-4">Claude-Sonnet-4</option>
                        <option value="Claude-Sonnet-4-Search">Claude-Sonnet-4-Search</option>
                        <option value="Grok-4">Grok-4</option>
                        <option value="o3-pro">o3-pro</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Bot 4: ICC Insight Extractor</label>
                    <select id="bot4" class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-base">
                        <option value="Claude-3.5-Haiku" selected>Claude-3.5-Haiku (Default)</option>
                        <option value="Claude-Opus-4">Claude-Opus-4</option>
                        <option value="Claude-Sonnet-4">Claude-Sonnet-4</option>
                        <option value="Grok-4">Grok-4</option>
                        <option value="Gemini-2.5-Pro">Gemini-2.5-Pro</option>
                        <option value="GPT-4o">GPT-4o</option>
                        <option value="Llama-3.1-405B-T">Llama-3.1-405B-T</option>
                    </select>
                </div>
            </div>

            <!-- Pre-Prompt Instructions (Manual Mode Only) -->
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
                            placeholder="Custom instructions for International Law SST Applicator Bot..."
                        ></textarea>
                    </div>
                    <div>
                        <label class="block text-xs font-medium mb-1 text-indigo-700 dark:text-indigo-300">Bot 4 Pre-Prompt</label>
                        <textarea 
                            id="prePrompt4" 
                            class="w-full p-2 border border-indigo-300 dark:border-indigo-600 rounded bg-white dark:bg-gray-700 text-sm resize-vertical"
                            rows="2"
                            placeholder="Custom instructions for ICC Insight Extractor Bot..."
                        ></textarea>
                    </div>
                </div>
            </div>

            <!-- Execution Mode Toggle -->
            <div class="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <label class="flex items-center cursor-pointer">
                    <input type="checkbox" id="manualMode" class="sr-only">
                    <div class="relative">
                        <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
                        <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                    </div>
                    <div class="ml-3">
                        <span class="text-sm font-medium">Execution Mode: </span>
                        <span id="modeLabel" class="text-sm font-bold text-[#5D5CDE]">🤖 Auto (Sequential)</span>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            <span id="modeDescription">Runs all 4 bots automatically in sequence</span>
                        </p>
                    </div>
                </label>
            </div>

            <!-- Run Button -->
            <button 
                id="runAnalysis"
                class="w-full px-6 py-3 bg-[#5D5CDE] text-white rounded-lg hover:bg-[#4a49c7] transition-colors font-medium text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
                🚀 Run DRBanger Analysis
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
                    <button 
                        id="sendBot1"
                        class="hidden px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        📤 Send Bot 1
                    </button>
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
                    <button 
                        id="sendBot2"
                        class="hidden px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        📤 Send Bot 2
                    </button>
                </div>
                <div id="bot2Status" class="text-sm text-gray-600 dark:text-gray-400 mb-2"></div>
                <div id="bot2Output" class="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-4 rounded border min-h-[50px] max-h-[600px] overflow-y-auto"></div>
            </div>

            <!-- Bot 3 Results -->
            <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="text-lg font-semibold flex items-center">
                        <span class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm mr-3">3</span>
                        🧪 International Law SST Applicator Bot
                    </h3>
                    <button 
                        id="sendBot3"
                        class="hidden px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        📤 Send Bot 3
                    </button>
                </div>
                <div id="bot3Status" class="text-sm text-gray-600 dark:text-gray-400 mb-2"></div>
                <div id="bot3Output" class="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-4 rounded border min-h-[50px] max-h-[600px] overflow-y-auto"></div>
            </div>

            <!-- Bot 4 Results -->
            <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="text-lg font-semibold flex items-center">
                        <span class="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm mr-3">4</span>
                        ⚡ ICC Insight Extractor Bot
                    </h3>
                    <button 
                        id="sendBot4"
                        class="hidden px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        📤 Send Bot 4
                    </button>
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
                const basePrompt = `ROLE: international_law_sst_applicator
TASK: APPLY SST to international law to prove its validity as interpretive technique
CONTEXT: Bot 2 gave narrow ICC precedent-based critique. Now apply SST to international law as proof of concept.

BOT 2 EVALUATION: ${bot2Output}

MANDATE: 
- International law provides wider canvas than ICC's limited case law
- APPLY (not simulate) the same SST to actual international law provisions
- Show that SST is a legitimate interpretive technique through concrete application
- Create dialectical tension: narrow precedent view vs SST's broad power

DELIVERABLE 1: CONCRETE SST APPLICATION
Choose specific international law provision (UN Charter, Geneva Conventions, VCLT, etc.)
APPLY the SST transformation. Show the actual result, not theory.

DELIVERABLE 2: VALIDITY DEMONSTRATION TABLE

| Traditional Legal Reading | SST-Applied Reading | What This Proves About SST |
|---|---|---|
| [conventional interpretation] | [actual SST result] | [SST's interpretive power] |

DELIVERABLE 3: DIALECTICAL RESPONSE
2-3 sentences: How this international law application proves SST is valid despite Bot 2's precedent concerns`;
                return prePrompt ? `${prePrompt}\n\n${basePrompt}` : basePrompt;
            },

            bot4: (bot2Output, bot3Output, legalText, sstTechnique, prePrompt) => {
                const basePrompt = `ROLE: concrete_icc_extractor
TASK: Extract SPECIFIC ICC legal angles from the SST transformation - zero abstractions
INPUTS: 
SST Applied: ${sstTechnique}
Original ICC Text: ${legalText}
Bot 3 Proof: ${bot3Output}

MANDATE: Bot 3 proved SST works in international law. Now extract the specific ICC angle this creates.

CONCRETE OUTPUT REQUIRED (Example format - follow this precision):

**ICC FINDING**: [One specific legal angle, e.g., "Article 28 command responsibility allows instant liability determination through knowledge-failure entanglement"]

**APPLICATION TO ICC PROVISION**: [Apply the SST to a specific ICC article. Show exact transformation, like your Grok example did with Article 28(a) and (b) pairing]

**SPECIFIC CASE IMPACT**: [Name specific ICC cases this affects - Bemba, Lubanga, Al Bashir, etc. - and exactly how]

**PROSECUTOR TOOL**: [Exact procedural advantage this gives ICC prosecutors, e.g., "eliminates need for separate proof of failure measures in command responsibility cases"]

**DEFENSE VULNERABILITY**: [Specific weakness this creates for defense teams]

**IMMEDIATE APPLICATION**: [Which pending ICC case or future prosecution could use this right now]

EXAMPLES OF CONCRETE vs ABSTRACT:
❌ ABSTRACT: "systematic approach to interpretation"
✅ CONCRETE: "eliminates separate proof requirement for Article 28(b) measures"

❌ ABSTRACT: "enhanced understanding of complementarity"  
✅ CONCRETE: "Article 17(2) delay in (b) instantly resolves intent as unwilling"

WRITE LIKE A PROSECUTOR'S INTERNAL MEMO - specific, actionable, immediate.`;
                return prePrompt ? `${prePrompt}\n\n${basePrompt}` : basePrompt;
            }
        };

        // Bot handlers
        window.Poe.registerHandler("bot1-handler", (result, context) => {
            console.log("Bot1 handler called with status:", result.status);
            handleBotResponse(result, 'bot1', () => {
                console.log("Bot1 completed, starting Bot2");
                window.bot1Output = result.responses[0].content;
                setTimeout(() => startBot2().catch(handleBotError), 500);
            });
        });

        window.Poe.registerHandler("bot2-handler", (result, context) => {
            console.log("Bot2 handler called with status:", result.status);
            handleBotResponse(result, 'bot2', () => {
                console.log("Bot2 completed, starting Bot3");
                window.bot2Output = result.responses[0].content;
                setTimeout(() => startBot3().catch(handleBotError), 500);
            });
        });

        window.Poe.registerHandler("bot3-handler", (result, context) => {
            console.log("Bot3 handler called with status:", result.status);
            handleBotResponse(result, 'bot3', () => {
                console.log("Bot3 completed, starting Bot4");
                window.bot3Output = result.responses[0].content;
                if (window.bot2Output && window.bot3Output) {
                    setTimeout(() => startBot4().catch(handleBotError), 500);
                }
            });
        });

        window.Poe.registerHandler("bot4-handler", (result, context) => {
            console.log("Bot4 handler called with status:", result.status);
            handleBotResponse(result, 'bot4', () => {
                console.log("Bot4 completed, analysis finished");
                document.getElementById('runAnalysis').disabled = false;
                document.getElementById('runAnalysis').textContent = "🚀 Run DRBanger Analysis";
            });
        });

        // Manual mode handlers
        window.Poe.registerHandler("bot1-manual", (result, context) => {
            handleBotResponse(result, 'bot1', () => {
                window.bot1Output = result.responses[0].content;
                document.getElementById('sendBot1').disabled = false;
                document.getElementById('sendBot2').disabled = false;
            }, true);
        });

        window.Poe.registerHandler("bot2-manual", (result, context) => {
            handleBotResponse(result, 'bot2', () => {
                window.bot2Output = result.responses[0].content;
                document.getElementById('sendBot2').disabled = false;
                document.getElementById('sendBot3').disabled = false;
            }, true);
        });

        window.Poe.registerHandler("bot3-manual", (result, context) => {
            handleBotResponse(result, 'bot3', () => {
                window.bot3Output = result.responses[0].content;
                document.getElementById('sendBot3').disabled = false;
                document.getElementById('sendBot4').disabled = false;
            }, true);
        });

        window.Poe.registerHandler("bot4-manual", (result, context) => {
            handleBotResponse(result, 'bot4', () => {
                document.getElementById('sendBot4').disabled = false;
                document.getElementById('runAnalysis').disabled = false;
                document.getElementById('runAnalysis').textContent = "🚀 Run DRBanger Analysis";
            }, true);
        });

        // Helper function to handle bot responses
        function handleBotResponse(result, botNum, onComplete, isManual = false) {
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
                    resetRunButton();
                } else if (response.status === "incomplete") {
                    status.textContent = "⏳ Generating response...";
                    output.innerHTML = marked.parse(response.content || "Loading...");
                } else if (response.status === "complete") {
                    console.log(`${botNum} completed successfully`);
                    status.textContent = isManual ? "✅ Complete - Ready for next bot" : "✅ Complete";
                    output.innerHTML = marked.parse(response.content);
                    // Always call onComplete for successful completion
                    if (onComplete && typeof onComplete === 'function') {
                        console.log(`${botNum} calling onComplete callback`);
                        onComplete();
                    }
                }
            } else {
                console.log(`${botNum} error: No responses received`);
                showError(`${botNum}: No response received`);
                resetRunButton();
            }
            
            // Additional check: if result.status is "complete" but response status is not, still try to complete
            if (result.status === "complete" && result.responses && result.responses.length > 0) {
                const response = result.responses[0];
                if (response.status !== "complete" && response.content) {
                    console.log(`${botNum} force completing due to result.status === complete`);
                    status.textContent = isManual ? "✅ Complete - Ready for next bot" : "✅ Complete";
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
                resetRunButton();
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
                handleBotError(error);
            }
        }

        async function startBot2() {
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
                handleBotError(error);
            }
        }

        async function startBot3() {
            const bot3Name = document.getElementById('bot3').value;
            const prePrompt3 = document.getElementById('prePrompt3').value.trim();

            const prompt = botPrompts.bot3(window.bot2Output, window.bot1Output, prePrompt3);

            try {
                document.getElementById('bot3Status').textContent = "🚀 Starting SST application to international law...";
                await window.Poe.sendUserMessage(`@${bot3Name} ${prompt}`, {
                    handler: "bot3-handler",
                    stream: true,
                    openChat: false
                });
            } catch (error) {
                handleBotError(error);
            }
        }

        async function startBot4() {
            if (!window.bot2Output || !window.bot3Output) {
                showError("Bot 4 cannot start - missing required outputs");
                resetRunButton();
                return;
            }

            const legalText = document.getElementById('legalText').value.trim();
            const sstTechnique = document.getElementById('sstCapsule').value.trim();
            const bot4Name = document.getElementById('bot4').value;
            const prePrompt4 = document.getElementById('prePrompt4').value.trim();

            const prompt = botPrompts.bot4(window.bot2Output, window.bot3Output, legalText, sstTechnique, prePrompt4);

            try {
                document.getElementById('bot4Status').textContent = "🚀 Extracting ICC insights...";
                await window.Poe.sendUserMessage(`@${bot4Name} ${prompt}`, {
                    handler: "bot4-handler",
                    stream: true,
                    openChat: false
                });
            } catch (error) {
                handleBotError(error);
            }
        }

        // Manual mode functions
        async function startBot1Manual() {
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
                    handler: "bot1-manual",
                    stream: true,
                    openChat: false
                });
            } catch (error) {
                showError(`Bot 1 Error: ${error.message}`);
                document.getElementById('sendBot1').disabled = false;
            }
        }

        async function startBot2Manual() {
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
                    handler: "bot2-manual",
                    stream: true,
                    openChat: false
                });
            } catch (error) {
                showError(`Bot 2 Error: ${error.message}`);
                document.getElementById('sendBot2').disabled = false;
            }
        }

        async function startBot3Manual() {
            if (!window.bot2Output) {
                showError("Please run Bot 2 first");
                document.getElementById('sendBot3').disabled = false;
                return;
            }

            const bot3Name = document.getElementById('bot3').value;
            const prePrompt3 = document.getElementById('prePrompt3').value.trim();

            const prompt = botPrompts.bot3(window.bot2Output, window.bot1Output, prePrompt3);

            try {
                document.getElementById('bot3Status').textContent = "🚀 Starting SST application to international law...";
                await window.Poe.sendUserMessage(`@${bot3Name} ${prompt}`, {
                    handler: "bot3-manual",
                    stream: true,
                    openChat: false
                });
            } catch (error) {
                showError(`Bot 3 Error: ${error.message}`);
                document.getElementById('sendBot3').disabled = false;
            }
        }

        async function startBot4Manual() {
            if (!window.bot2Output || !window.bot3Output) {
                showError("Please run Bot 2 and Bot 3 first");
                document.getElementById('sendBot4').disabled = false;
                return;
            }

            const legalText = document.getElementById('legalText').value.trim();
            const sstTechnique = document.getElementById('sstCapsule').value.trim();
            const bot4Name = document.getElementById('bot4').value;
            const prePrompt4 = document.getElementById('prePrompt4').value.trim();

            const prompt = botPrompts.bot4(window.bot2Output, window.bot3Output, legalText, sstTechnique, prePrompt4);

            try {
                document.getElementById('bot4Status').textContent = "🚀 Extracting ICC insights...";
                await window.Poe.sendUserMessage(`@${bot4Name} ${prompt}`, {
                    handler: "bot4-manual",
                    stream: true,
                    openChat: false
                });
            } catch (error) {
                showError(`Bot 4 Error: ${error.message}`);
                document.getElementById('sendBot4').disabled = false;
            }
        }

        // Utility functions
        function showError(message) {
            document.getElementById('errorMessage').textContent = message;
            document.getElementById('errorSection').classList.remove('hidden');
            setTimeout(() => {
                document.getElementById('errorSection').classList.add('hidden');
            }, 10000);
        }

        function resetRunButton() {
            document.getElementById('runAnalysis').disabled = false;
            document.getElementById('runAnalysis').textContent = "🚀 Run DRBanger Analysis";
        }

        function handleBotError(error) {
            showError(`Error: ${error.message}`);
            resetRunButton();
        }

        function resetOutputs() {
            // Clear stored outputs
            window.bot1Output = null;
            window.bot2Output = null;
            window.bot3Output = null;
            
            // Clear UI
            ['bot1Output', 'bot2Output', 'bot3Output', 'bot4Output'].forEach(id => {
                document.getElementById(id).innerHTML = '';
            });
            ['bot1Status', 'bot2Status', 'bot3Status', 'bot4Status'].forEach(id => {
                document.getElementById(id).textContent = '';
            });
            document.getElementById('errorSection').classList.add('hidden');
        }

        // Event listeners
        document.getElementById('runAnalysis').addEventListener('click', async () => {
            resetOutputs();
            document.getElementById('resultsSection').classList.remove('hidden');
            
            if (isManualMode) {
                // Manual mode - show send buttons
                const sendButtons = ['sendBot1', 'sendBot2', 'sendBot3', 'sendBot4'];
                sendButtons.forEach(id => {
                    document.getElementById(id).classList.remove('hidden');
                });
                document.getElementById('sendBot1').disabled = false;
                document.getElementById('sendBot2').disabled = true;
                document.getElementById('sendBot3').disabled = true;
                document.getElementById('sendBot4').disabled = true;
                
                document.getElementById('runAnalysis').textContent = "🎯 Manual Mode: Use Individual Send Buttons";
            } else {
                // Auto mode
                document.getElementById('runAnalysis').disabled = true;
                document.getElementById('runAnalysis').textContent = "⏳ Running Analysis...";
                await startBot1();
            }
        });

        // Manual mode toggle
        let isManualMode = false;

        document.getElementById('manualMode').addEventListener('change', function() {
            isManualMode = this.checked;
            const dot = document.querySelector('.dot');
            const modeLabel = document.getElementById('modeLabel');
            const modeDescription = document.getElementById('modeDescription');
            const sendButtons = ['sendBot1', 'sendBot2', 'sendBot3', 'sendBot4'];
            
            if (isManualMode) {
                dot.style.transform = 'translateX(24px)';
                dot.style.backgroundColor = '#5D5CDE';
                modeLabel.textContent = '👤 Manual (Step-by-Step)';
                modeDescription.textContent = 'Send each bot individually to track costs per step';
                if (!document.getElementById('resultsSection').classList.contains('hidden')) {
                    sendButtons.forEach(id => {
                        document.getElementById(id).classList.remove('hidden');
                    });
                }
            } else {
                dot.style.transform = 'translateX(0px)';
                dot.style.backgroundColor = 'white';
                modeLabel.textContent = '🤖 Auto (Sequential)';
                modeDescription.textContent = 'Runs all 4 bots automatically in sequence';
                sendButtons.forEach(id => {
                    document.getElementById(id).classList.add('hidden');
                });
            }
        });

        // Manual send button handlers
        document.getElementById('sendBot1').addEventListener('click', async () => {
            document.getElementById('sendBot1').disabled = true;
            await startBot1Manual();
        });

        document.getElementById('sendBot2').addEventListener('click', async () => {
            document.getElementById('sendBot2').disabled = true;
            await startBot2Manual();
        });

        document.getElementById('sendBot3').addEventListener('click', async () => {
            document.getElementById('sendBot3').disabled = true;
            await startBot3Manual();
        });

        document.getElementById('sendBot4').addEventListener('click', async () => {
            document.getElementById('sendBot4').disabled = true;
            await startBot4Manual();
        });

        // Load default SST on page load
        window.addEventListener('load', () => {
            // Optional: pre-load a sample SST
            // document.getElementById('sstCapsule').value = "Zobrist Hashing Transformation – Converts positions to unique 64-bit numbers by XORing random values associated with board elements.";
        });
    </script>
</body>
</html>


```

## Metadata
- **Extracted**: 2025-07-27T19:58:13.152Z
- **Source**: https://poe.com/edit_bot?bot=Neo-DRB
- **Bot Type**: Canvas App
- **Code Length**: 42500 characters

---
*Extracted using VG Master Bot Automation*
