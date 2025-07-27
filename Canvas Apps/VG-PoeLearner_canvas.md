# VG-PoeLearner

## Description
No description available

## Canvas Code
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Poe Bot Development Learning Zone</title>
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
        .feature-card {
            transition: all 0.3s ease;
        }
        .feature-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(93, 92, 222, 0.15);
        }
        .demo-output {
            max-height: 300px;
            overflow-y: auto;
        }
        .loading-spinner {
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    </style>
</head>
<body class="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center space-x-4">
                    <div class="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                        <span class="text-white font-bold text-sm">PZ</span>
                    </div>
                    <div>
                        <h1 class="text-xl font-bold text-gray-900 dark:text-gray-100">Poe Development Learning Zone</h1>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Interactive showcase of bot development features</p>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Features:</span>
                    <span id="featureCount" class="bg-primary text-white px-2 py-1 rounded text-sm font-medium">0</span>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Introduction -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Welcome to the Interactive Learning Zone</h2>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
                Explore every way you can influence Poe bot behavior through interactive demonstrations. Each feature includes explanations, 
                code examples, and live demos where possible using the Poe Embed API.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 class="font-semibold text-blue-900 dark:text-blue-300">📚 Learn</h3>
                    <p class="text-sm text-blue-700 dark:text-blue-400">Understand each feature with clear explanations</p>
                </div>
                <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h3 class="font-semibold text-green-900 dark:text-green-300">🚀 Demo</h3>
                    <p class="text-sm text-green-700 dark:text-green-400">See features in action with live bot interactions</p>
                </div>
                <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <h3 class="font-semibold text-purple-900 dark:text-purple-300">💻 Code</h3>
                    <p class="text-sm text-purple-700 dark:text-purple-400">Copy ready-to-use code examples</p>
                </div>
            </div>
        </div>

        <!-- Category Filters -->
        <div class="mb-8">
            <div class="flex flex-wrap gap-2">
                <button onclick="filterByCategory('all')" class="filter-btn active bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    All Features
                </button>
                <button onclick="filterByCategory('Core Prompt Construction')" class="filter-btn bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-300 dark:hover:bg-gray-600">
                    Core Construction
                </button>
                <button onclick="filterByCategory('Knowledge & Context Enhancement')" class="filter-btn bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-300 dark:hover:bg-gray-600">
                    Knowledge & Context
                </button>
                <button onclick="filterByCategory('Response Behavior Modifiers')" class="filter-btn bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-300 dark:hover:bg-gray-600">
                    Behavior Modifiers
                </button>
                <button onclick="filterByCategory('Interactive Elements')" class="filter-btn bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-300 dark:hover:bg-gray-600">
                    Interactive Elements
                </button>
                <button onclick="filterByCategory('Advanced Prompt Engineering')" class="filter-btn bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-300 dark:hover:bg-gray-600">
                    Advanced Engineering
                </button>
            </div>
        </div>

        <!-- Features Grid -->
        <div id="featuresGrid" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Features will be dynamically populated -->
        </div>

        <!-- Demo Modal -->
        <div id="demoModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 id="modalTitle" class="text-xl font-bold text-gray-900 dark:text-gray-100"></h3>
                    <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div class="p-6 overflow-y-auto max-h-[70vh]">
                    <div id="modalContent">
                        <!-- Modal content will be populated dynamically -->
                    </div>
                </div>
            </div>
        </div>
    </main>

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

        // Feature data from the CSV
        const features = [
            {
                category: "Core Prompt Construction",
                name: "Plain-text instructions",
                description: "Foundation of bot behavior - your main weapon",
                quote: "behavior is specified using plain-text instructions",
                botType: "Prompt Bot",
                demo: true,
                webUI: [
                    "Go to Create > Bot",
                    "Fill in the 'Prompt' field with your instructions",
                    "Describe exactly what your bot should do"
                ],
                code: `# Simple prompt instruction demo
prompt = "You are a helpful coding assistant. Always explain your code clearly."
# In production: This goes in the Prompt field of your bot configuration`,
                production: "Configure this in the Prompt field when creating your bot."
            },
            {
                category: "Core Prompt Construction",
                name: "Model selection",
                description: "Choose base intelligence (Claude, GPT-4o, Llama)",
                quote: "built on top of existing models",
                botType: "Prompt Bot, Server Bot",
                demo: true,
                webUI: [
                    "In bot creation, select 'Base bot'",
                    "Choose from Claude-Sonnet-4, GPT-4o, Llama, etc.",
                    "Different models have different capabilities"
                ],
                code: `# Demo: Compare responses from different models
models = ["Claude-Sonnet-4", "GPT-4o", "Claude-Haiku-3"]
# We'll show how the same prompt gets different responses`,
                production: "Select the base model during bot creation in the Poe interface."
            },
            {
                category: "Core Prompt Construction",
                name: "Templating with {{user_prompt}}",
                description: "Control exact placement of user input in prompts",
                quote: "specify a `{{user_prompt}}` in either of the style prompts",
                botType: "Prompt Bot",
                demo: false,
                webUI: [
                    "In your prompt field, include {{user_prompt}}",
                    "Add context before: 'Analyze this: {{user_prompt}}'",
                    "Add context after: '{{user_prompt}} Explain in simple terms.'"
                ],
                code: `# Template example
template = """
You are a code reviewer. Analyze this code:
{{user_prompt}}

Provide feedback on:
1. Code quality
2. Best practices
3. Potential improvements
"""`,
                production: "Use {{user_prompt}} in your bot's prompt field to control input placement."
            },
            {
                category: "Knowledge & Context Enhancement",
                name: "Bot calling",
                description: "Leverage other bots' capabilities within yours",
                quote: "Server bots can call any other bot",
                botType: "Server Bot",
                demo: true,
                webUI: [
                    "Only available in Server Bot code",
                    "Cannot be configured through web UI",
                    "Requires FastAPI implementation"
                ],
                code: `# Bot calling simulation
# In a real server bot:
# await fp.query_bot("Claude-Sonnet-4", "Explain quantum physics")
print("Would call another bot here in production")`,
                production: "Implement bot calling in your Server Bot's FastAPI code using fp.query_bot()."
            },
            {
                category: "Response Behavior Modifiers",
                name: "Temperature",
                description: "Control creativity vs consistency (0.0-2.0)",
                quote: "Higher temperatures introduce more randomness",
                botType: "Prompt Bot, Server Bot",
                demo: true,
                webUI: [
                    "Advanced Settings > Temperature",
                    "0.0 = Very consistent, deterministic",
                    "1.0 = Balanced creativity",
                    "2.0 = Very creative, unpredictable"
                ],
                code: `# Temperature comparison demo
temperatures = [0.1, 1.0, 1.8]
prompt = "Write a creative story about a robot"
# We'll show how responses differ with temperature`,
                production: "Set temperature in Advanced Settings or via API parameters in Server Bots."
            },
            {
                category: "Interactive Elements",
                name: "Suggest replies",
                description: "Guide conversation flow with LLM suggestions",
                quote: "LLM-generated reply options after responses",
                botType: "Prompt Bot, Server Bot",
                demo: false,
                webUI: [
                    "Bot Settings > Suggested Replies",
                    "Enable 'Show suggested replies'",
                    "Bot will generate follow-up options"
                ],
                code: `# Suggested replies are auto-generated
# Configure in bot settings
suggest_replies = True
# The bot will automatically suggest follow-up questions`,
                production: "Enable suggested replies in your bot's settings panel."
            },
            {
                category: "Output Formatting & Presentation",
                name: "Render markdown content",
                description: "Toggle markdown vs plain text display",
                quote: "messages rendered using Markdown",
                botType: "Prompt Bot",
                demo: true,
                webUI: [
                    "Bot Settings > Render markdown content",
                    "Toggle ON for rich formatting",
                    "Toggle OFF for plain text only"
                ],
                code: `# Markdown formatting demo
markdown_text = """
# Heading
**Bold text**
*Italic text*
- List item 1
- List item 2
\`\`\`python
print("Code block")
\`\`\`
"""`,
                production: "Configure markdown rendering in your bot's display settings."
            },
            {
                category: "Advanced Prompt Engineering",
                name: "Negative prompt (--no)",
                description: "Exclude unwanted elements in generation",
                quote: "indicate elements that should be avoided",
                botType: "Prompt Bot",
                demo: true,
                webUI: [
                    "Add --no parameter to your prompt",
                    "Example: 'Draw a cat --no dogs'",
                    "Useful for image generation bots"
                ],
                code: `# Negative prompt example
positive_prompt = "A beautiful landscape"
negative_prompt = "--no people, cars, buildings"
full_prompt = f"{positive_prompt} {negative_prompt}"`,
                production: "Include --no parameters in prompts sent to image generation bots."
            },
            {
                category: "Multi-Bot & Integration",
                name: "sendUserMessage",
                description: "Programmatically trigger bot interactions",
                quote: "Message text sent to bots",
                botType: "Canvas App",
                demo: true,
                webUI: [
                    "Only available in Canvas Apps",
                    "Use JavaScript in your Canvas app",
                    "Call window.Poe.sendUserMessage()"
                ],
                code: `// Canvas App bot interaction
await window.Poe.sendUserMessage(
    "@Claude-Sonnet-4 Explain JavaScript",
    { openChat: false, handler: "response-handler" }
);`,
                production: "Use the Poe Embed API in Canvas applications for bot interactions."
            },
            {
                category: "Knowledge & Context Enhancement",
                name: "Knowledge base files",
                description: "Add domain expertise via .txt, .pdf, .docx, .html",
                quote: "Major text file formats are supported",
                botType: "Prompt Bot",
                demo: false,
                webUI: [
                    "Bot Settings > Knowledge",
                    "Upload .txt, .pdf, .docx, or .html files",
                    "Bot can reference this knowledge in responses"
                ],
                code: `# Knowledge base simulation
knowledge_files = ["manual.pdf", "faq.txt", "guide.docx"]
# In production: Upload these files in bot settings
print(f"Would upload {len(knowledge_files)} knowledge files")`,
                production: "Upload knowledge files through the bot's Knowledge section in settings."
            }
        ];

        function initializePage() {
            renderFeatures();
            updateFeatureCount();
        }

        function renderFeatures(categoryFilter = 'all') {
            const grid = document.getElementById('featuresGrid');
            const filteredFeatures = categoryFilter === 'all' 
                ? features 
                : features.filter(f => f.category === categoryFilter);

            grid.innerHTML = filteredFeatures.map(feature => `
                <div class="feature-card bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 category-${feature.category.replace(/\s+/g, '-').toLowerCase()}">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">${feature.name}</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">${feature.description}</p>
                            <div class="flex items-center space-x-2 mb-3">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                    ${feature.category}
                                </span>
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                    ${feature.botType}
                                </span>
                            </div>
                        </div>
                        ${feature.demo ? 
                            `<button onclick="openDemo('${feature.name}')" class="ml-4 bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                                Demo
                            </button>` : 
                            `<span class="ml-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-lg text-sm">
                                Config Only
                            </span>`
                        }
                    </div>
                    <blockquote class="border-l-4 border-primary pl-4 italic text-sm text-gray-600 dark:text-gray-400">
                        "${feature.quote}"
                    </blockquote>
                </div>
            `).join('');
        }

        function filterByCategory(category) {
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active', 'bg-primary', 'text-white');
                btn.classList.add('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
            });
            
            event.target.classList.add('active', 'bg-primary', 'text-white');
            event.target.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');

            renderFeatures(category);
            updateFeatureCount(category);
        }

        function updateFeatureCount(categoryFilter = 'all') {
            const count = categoryFilter === 'all' 
                ? features.length 
                : features.filter(f => f.category === categoryFilter).length;
            document.getElementById('featureCount').textContent = count;
        }

        function openDemo(featureName) {
            const feature = features.find(f => f.name === featureName);
            if (!feature) return;

            document.getElementById('modalTitle').textContent = feature.name;
            document.getElementById('modalContent').innerHTML = `
                <div class="space-y-6">
                    <!-- Description -->
                    <div>
                        <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">Description</h4>
                        <p class="text-gray-600 dark:text-gray-400">${feature.description}</p>
                    </div>

                    <!-- Web UI Steps -->
                    <div>
                        <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">Web UI Activation</h4>
                        <ul class="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                            ${feature.webUI.map(step => `<li>${step}</li>`).join('')}
                        </ul>
                    </div>

                    <!-- Code Example -->
                    <div>
                        <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">Code Example</h4>
                        <pre class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto text-sm"><code>${feature.code}</code></pre>
                    </div>

                    <!-- Production Note -->
                    <div>
                        <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">Production Implementation</h4>
                        <p class="text-gray-600 dark:text-gray-400">${feature.production}</p>
                    </div>

                    <!-- Interactive Demo -->
                    ${feature.demo ? `
                        <div>
                            <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">Live Demo</h4>
                            <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                <button onclick="runDemo('${feature.name}')" class="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors" id="demoBtn-${feature.name.replace(/\s+/g, '')}">
                                    Run Interactive Demo
                                </button>
                                <div id="demoOutput-${feature.name.replace(/\s+/g, '')}" class="mt-4 demo-output"></div>
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;

            document.getElementById('demoModal').classList.remove('hidden');
        }

        function closeModal() {
            document.getElementById('demoModal').classList.add('hidden');
        }

        // Demo handler for Poe API responses
        window.Poe && window.Poe.registerHandler && window.Poe.registerHandler('demo-handler', (result, context) => {
            const outputId = `demoOutput-${context.featureName.replace(/\s+/g, '')}`;
            const output = document.getElementById(outputId);
            if (!output) return;

            const msg = result.responses[0];
            if (msg.status === "error") {
                output.innerHTML = `<div class="text-red-600 dark:text-red-400">Error: ${msg.statusText}</div>`;
            } else if (msg.status === "incomplete") {
                output.innerHTML = `<div class="text-gray-600 dark:text-gray-400">${msg.content}</div>`;
            } else if (msg.status === "complete") {
                output.innerHTML = `<div class="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">${msg.content}</div>`;
            }
        });

        async function runDemo(featureName) {
            const feature = features.find(f => f.name === featureName);
            if (!feature) return;

            const btnId = `demoBtn-${featureName.replace(/\s+/g, '')}`;
            const outputId = `demoOutput-${featureName.replace(/\s+/g, '')}`;
            
            const btn = document.getElementById(btnId);
            const output = document.getElementById(outputId);

            btn.disabled = true;
            btn.innerHTML = `<div class="loading-spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block mr-2"></div>Running...`;
            
            output.innerHTML = '<div class="text-gray-500 dark:text-gray-400">Initializing demo...</div>';

            try {
                // Different demo logic based on feature
                switch (featureName) {
                    case 'Plain-text instructions':
                        if (window.Poe && window.Poe.sendUserMessage) {
                            await window.Poe.sendUserMessage(
                                "@Claude-Haiku-3 You are a helpful coding assistant. Explain what JavaScript is in exactly 2 sentences.",
                                { 
                                    handler: "demo-handler", 
                                    stream: true, 
                                    openChat: false,
                                    handlerContext: { featureName }
                                }
                            );
                        } else {
                            output.innerHTML = '<div class="text-blue-600 dark:text-blue-400">Mock: A helpful coding assistant would explain JavaScript clearly and concisely in exactly 2 sentences as instructed.</div>';
                        }
                        break;

                    case 'Model selection':
                        if (window.Poe && window.Poe.sendUserMessage) {
                            output.innerHTML = '<div class="text-gray-600 dark:text-gray-400">Comparing different models...</div>';
                            await window.Poe.sendUserMessage(
                                "@Claude-Haiku-3 @GPT-4o-mini Write a haiku about programming",
                                { 
                                    handler: "demo-handler", 
                                    stream: true, 
                                    openChat: false,
                                    handlerContext: { featureName }
                                }
                            );
                        } else {
                            output.innerHTML = '<div class="text-blue-600 dark:text-blue-400">Mock: Different models would respond with varying styles - Claude might be more poetic, GPT more technical.</div>';
                        }
                        break;

                    case 'Temperature':
                        if (window.Poe && window.Poe.sendUserMessage) {
                            await window.Poe.sendUserMessage(
                                "@Claude-Haiku-3 Tell me a creative story about a robot in exactly 3 sentences. Be very creative and imaginative.",
                                { 
                                    handler: "demo-handler", 
                                    stream: true, 
                                    openChat: false,
                                    handlerContext: { featureName }
                                }
                            );
                        } else {
                            output.innerHTML = '<div class="text-blue-600 dark:text-blue-400">Mock: High temperature = "Zyx-9 danced through neon rain, composing symphonies from server hums." Low temperature = "The robot performed its assigned tasks efficiently."</div>';
                        }
                        break;

                    case 'Bot calling':
                        if (window.Poe && window.Poe.sendUserMessage) {
                            output.innerHTML = '<div class="text-gray-600 dark:text-gray-400">Simulating multi-bot interaction...</div>';
                            await window.Poe.sendUserMessage(
                                "@Claude-Haiku-3 Explain quantum computing in simple terms. @GPT-4o-mini Now create a metaphor for quantum computing.",
                                { 
                                    handler: "demo-handler", 
                                    stream: true, 
                                    openChat: false,
                                    handlerContext: { featureName }
                                }
                            );
                        } else {
                            output.innerHTML = '<div class="text-blue-600 dark:text-blue-400">Mock: Server bot would call Claude for explanation, then GPT for metaphor, combining responses intelligently.</div>';
                        }
                        break;

                    case 'Render markdown content':
                        output.innerHTML = `
                            <div class="space-y-4">
                                <div class="border border-gray-200 dark:border-gray-600 rounded p-3">
                                    <h5 class="font-medium mb-2">With Markdown Rendering:</h5>
                                    <div class="prose dark:prose-invert max-w-none">
                                        <h1>Heading 1</h1>
                                        <p><strong>Bold text</strong> and <em>italic text</em></p>
                                        <ul>
                                            <li>List item 1</li>
                                            <li>List item 2</li>
                                        </ul>
                                        <code>inline code</code>
                                    </div>
                                </div>
                                <div class="border border-gray-200 dark:border-gray-600 rounded p-3">
                                    <h5 class="font-medium mb-2">Without Markdown Rendering:</h5>
                                    <div class="font-mono text-sm text-gray-600 dark:text-gray-400">
                                        # Heading 1<br>
                                        **Bold text** and *italic text*<br>
                                        - List item 1<br>
                                        - List item 2<br>
                                        \`inline code\`
                                    </div>
                                </div>
                            </div>
                        `;
                        break;

                    case 'sendUserMessage':
                        if (window.Poe && window.Poe.sendUserMessage) {
                            await window.Poe.sendUserMessage(
                                "@Claude-Haiku-3 This message was sent programmatically from a Canvas app! Say hello back.",
                                { 
                                    handler: "demo-handler", 
                                    stream: true, 
                                    openChat: false,
                                    handlerContext: { featureName }
                                }
                            );
                        } else {
                            output.innerHTML = '<div class="text-red-600 dark:text-red-400">Poe Embed API not available. This feature only works in published Canvas apps.</div>';
                        }
                        break;

                    case 'Negative prompt (--no)':
                        if (window.Poe && window.Poe.sendUserMessage) {
                            await window.Poe.sendUserMessage(
                                "@Claude-Haiku-3 Describe a peaceful garden scene. Make it very detailed but avoid mentioning any animals or people.",
                                { 
                                    handler: "demo-handler", 
                                    stream: true, 
                                    openChat: false,
                                    handlerContext: { featureName }
                                }
                            );
                        } else {
                            output.innerHTML = '<div class="text-blue-600 dark:text-blue-400">Mock: "A serene garden with blooming flowers and gentle water features --no people, animals"</div>';
                        }
                        break;

                    default:
                        output.innerHTML = '<div class="text-yellow-600 dark:text-yellow-400">Demo not implemented for this feature yet. This would demonstrate the feature in a real scenario.</div>';
                }
            } catch (error) {
                output.innerHTML = `<div class="text-red-600 dark:text-red-400">Demo error: ${error.message}</div>`;
            } finally {
                btn.disabled = false;
                btn.innerHTML = 'Run Interactive Demo';
            }
        }

        // Initialize the page
        initializePage();

        // Close modal when clicking outside
        document.getElementById('demoModal').addEventListener('click', (e) => {
            if (e.target.id === 'demoModal') {
                closeModal();
            }
        });
    </script>
</body>
</html>

```

## Metadata
- **Extracted**: 2025-07-27T19:14:48.172Z
- **Source**: https://poe.com/edit_bot?bot=VG-PoeLearner
- **Bot Type**: Canvas App
- **Code Length**: 33448 characters

---
*Extracted using VG Canvas App Extractor*
