// =============================================
// BY-WANZZ v5 - MAIN JAVASCRIPT
// File: script.js
// Deskripsi: Logic utama aplikasi
// =============================================

// ============ SYSTEM STATE ============
const state = {
    attacking: false,
    bugExploiting: false,
    startTime: null,
    stats: {
        rps: 0,
        totalRequests: 0,
        successRate: 0,
        bandwidth: 0,
        botsActive: 12
    },
    currentMethod: 'ultra-flood',
    currentBug: 'sql',
    powerLevel: 75,
    isMobile: window.innerWidth <= 768,
    videoLoaded: false
};

// ============ PAYLOADS DATABASE ============
const payloads = [
    "../../../etc/passwd",
    "php://filter/convert.base64-encode/resource=index.php",
    "admin' OR '1'='1'",
    "eval(String.fromCharCode(97,108,101,114,116,40,39,88,83,83,39,41))"
];

// ============ BUG TYPES ============
const bugTypes = {
    sql: 'SQL Injection',
    xss: 'Cross-Site Scripting',
    lfi: 'Local File Inclusion',
    rce: 'Remote Code Execution',
    auth: 'Authentication Bypass',
    dos: 'Denial of Service'
};

// ============ VULNERABILITY DATABASE ============
const vulnerabilities = [
    'Unsanitized user input',
    'Missing access controls',
    'Buffer overflow',
    'Directory traversal',
    'CSRF token missing',
    'SQL query concatenation',
    'Reflected XSS',
    'Command injection',
    'XXE injection',
    'SSRF vulnerability'
];

// ============ TARGET DATABASE ============
const targetDatabase = [
    'https://admin-panel.com/login',
    'http://192.168.1.1:8080/admin',
    'https://api.vulnerable.com/v1',
    'http://test-server.local/control',
    'https://webapp.com/dashboard'
];

// ============ INITIALIZE SYSTEM ============
function initialize() {
    console.log('🚀 Initializing BY-WANZZ v5...');
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize video
    initializeVideo();
    
    // Load main content
    loadMainContent();
    
    // Start system monitoring
    startSystemMonitoring();
    
    // Hide loader after 2 seconds
    setTimeout(() => {
        hideLoader();
        showNotification('System Ready', 'BY-WANZZ v5 initialized successfully!', 'success');
        addTerminal('✓ SYSTEM INITIALIZATION COMPLETE', 'success');
        addTerminal('⚡ BY-WANZZ v5 - EXTREME MODE ACTIVATED');
        addTerminal('📱 ' + (state.isMobile ? 'MOBILE' : 'DESKTOP') + ' MODE DETECTED');
        
        // Start visualization
        startVisualization();
    }, 2000);
}

// ============ SETUP EVENT LISTENERS ============
function setupEventListeners() {
    // Video play button
    document.getElementById('playVideoBtn')?.addEventListener('click', playVideo);
    
    // Scroll events
    const mainContainer = document.getElementById('mainContainer');
    if (mainContainer) {
        mainContainer.addEventListener('scroll', handleScroll);
        
        // Touch optimization for mobile
        if (state.isMobile) {
            mainContainer.addEventListener('touchstart', () => {
                mainContainer.style.scrollBehavior = 'auto';
            });
            
            mainContainer.addEventListener('touchend', () => {
                setTimeout(() => {
                    mainContainer.style.scrollBehavior = 'smooth';
                }, 100);
            });
        }
    }
    
    // Window resize
    window.addEventListener('resize', handleResize);
    
    // Error handling
    window.addEventListener('error', handleGlobalError);
}

// ============ INITIALIZE VIDEO ============
function initializeVideo() {
    const video = document.getElementById('bgVideo');
    const playBtn = document.getElementById('playVideoBtn');
    
    if (!video) return;
    
    // Try to play video
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            state.videoLoaded = true;
            console.log('✅ Video autoplay successful');
            if (playBtn) playBtn.style.display = 'none';
        }).catch(error => {
            console.log('⚠️ Video autoplay prevented:', error);
            if (playBtn) playBtn.style.display = 'block';
            useVideoFallback();
        });
    }
    
    // Video error handling
    video.addEventListener('error', (e) => {
        console.error('❌ Video error:', e);
        useVideoFallback();
        if (playBtn) playBtn.style.display = 'none';
    });
    
    // Video loaded
    video.addEventListener('loadeddata', () => {
        console.log('✅ Video loaded successfully');
        state.videoLoaded = true;
    });
}

// ============ PLAY VIDEO MANUALLY ============
function playVideo() {
    const video = document.getElementById('bgVideo');
    const playBtn = document.getElementById('playVideoBtn');
    
    if (video) {
        video.play().then(() => {
            state.videoLoaded = true;
            if (playBtn) playBtn.style.display = 'none';
            showNotification('Video Started', 'Background video is now playing', 'success');
        }).catch(error => {
            console.error('Failed to play video:', error);
            useVideoFallback();
        });
    }
}

// ============ VIDEO FALLBACK ============
function useVideoFallback() {
    const fallback = document.getElementById('videoFallback');
    if (fallback) {
        fallback.style.display = 'block';
        addTerminal('⚠️ Using fallback background (video not available)', 'warning');
    }
}

// ============ LOAD MAIN CONTENT ============
function loadMainContent() {
    const contentDiv = document.getElementById('content');
    if (!contentDiv) return;
    
    // Load main grid structure
    contentDiv.innerHTML = generateMainGrid();
    
    // Setup dynamic event listeners
    setupDynamicEventListeners();
}

// ============ GENERATE MAIN GRID ============
function generateMainGrid() {
    return `
        <div class="cyber-grid" id="mainGrid">
            <!-- Header -->
            <header class="header">
                <div class="main-title">BY-WANZZ v5 | CYBER SUITE</div>
                <div class="live-badges">
                    <div class="badge online"><span style="color: var(--neon-green);">●</span> ONLINE</div>
                    <div class="badge attack"><span style="color: var(--neon-pink);">⚡</span> ATTACK READY</div>
                    <div class="badge bug"><span style="color: var(--neon-blue);">🐛</span> BUG ACTIVE</div>
                </div>
            </header>
            
            <!-- Left Panel -->
            ${generateLeftPanel()}
            
            <!-- Center Panel -->
            ${generateCenterPanel()}
            
            <!-- Right Panel -->
            ${generateRightPanel()}
            
            <!-- Footer -->
            ${generateFooter()}
        </div>
        
        <!-- Additional Content -->
        ${generateAdditionalContent()}
    `;
}

// ============ GENERATE LEFT PANEL ============
function generateLeftPanel() {
    return `
        <div class="panel-left">
            <h2 class="panel-title">ATTACK CONTROL PANEL</h2>
            
            <div class="target-section">
                <div style="color: var(--neon-blue); margin-bottom: 10px; font-weight: bold;">
                    🎯 TARGET CONFIGURATION
                </div>
                <div class="target-input">
                    <input type="text" id="targetUrl" 
                           placeholder="https://target-domain.com/admin"
                           value="https://vulnerable-target.com">
                </div>
            </div>
            
            <div style="margin: 25px 0;">
                <div style="color: var(--neon-pink); margin-bottom: 15px; font-weight: bold;">
                    ⚔️ ATTACK METHODS
                </div>
                <div class="method-grid">
                    ${generateMethodCards()}
                </div>
            </div>
            
            <div class="attack-buttons">
                <button class="anime-btn launch" id="launchAttack">
                    <span>⚡</span> LAUNCH ATTACK
                </button>
                <button class="anime-btn stop" id="stopAttack">
                    <span>⏹️</span> STOP ALL
                </button>
                <button class="anime-btn bug" id="exploitBug">
                    <span>🐛</span> EXPLOIT BUG
                </button>
                <button class="anime-btn" id="autoMode">
                    <span>🤖</span> AUTO MODE
                </button>
            </div>
            
            <div style="margin-top: 30px;">
                <div style="color: var(--neon-green); margin-bottom: 15px; font-weight: bold; cursor: pointer;"
                     onclick="toggleAdvanced()">
                    ⚙️ ADVANCED CONFIG [CLICK TO EXPAND]
                </div>
                <div id="advancedOptions" style="display: none;">
                    ${generateAdvancedOptions()}
                </div>
            </div>
        </div>
    `;
}

// ============ GENERATE METHOD CARDS ============
function generateMethodCards() {
    const methods = [
        { id: 'ultra-flood', icon: '🌊', name: 'ULTRA FLOOD', desc: '10,000+ RPS' },
        { id: 'anime-wave', icon: '🌀', name: 'ANIME WAVE', desc: 'Pattern-based attack' },
        { id: 'bug-exploit', icon: '🐛', name: 'BUG EXPLOIT', desc: 'Vulnerability abuse' },
        { id: 'resource-drain', icon: '💀', name: 'RESOURCE DRAIN', desc: 'Memory/CPU exhaustion' },
        { id: 'botnet-swarm', icon: '🤖', name: 'BOTNET SWARM', desc: 'Distributed attack' },
        { id: 'zero-day', icon: '💣', name: 'ZERO-DAY', desc: 'Unknown vulnerability' }
    ];
    
    return methods.map(method => `
        <div class="method-card ${method.id === state.currentMethod ? 'active' : ''}" 
             data-method="${method.id}">
            <div class="method-icon">${method.icon}</div>
            <div class="method-name">${method.name}</div>
            <div style="color: #aaa; font-size: 0.8em;">${method.desc}</div>
        </div>
    `).join('');
}

// ============ GENERATE CENTER PANEL ============
function generateCenterPanel() {
    return `
        <div class="panel-center">
            <div class="attack-stats">
                <div style="color: var(--neon-green); margin-bottom: 15px; font-weight: bold;">
                    📊 LIVE ATTACK STATISTICS
                </div>
                <div class="stats-grid">
                    <div class="stat-box">
                        <div class="stat-label">REQUESTS/SEC</div>
                        <div class="stat-value" id="rps">0</div>
                        <div style="font-size: 0.8em; color: #aaa;">MAX: 10K</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-label">TOTAL REQUESTS</div>
                        <div class="stat-value" id="totalReq">0</div>
                        <div style="font-size: 0.8em; color: #aaa;">AND COUNTING</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-label">SUCCESS RATE</div>
                        <div class="stat-value" id="successRate">0%</div>
                        <div style="font-size: 0.8em; color: #aaa;">TARGET HEALTH</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-label">BANDWIDTH</div>
                        <div class="stat-value" id="bandwidth">0 MB/s</div>
                        <div style="font-size: 0.8em; color: #aaa;">NETWORK LOAD</div>
                    </div>
                </div>
            </div>
            
            <div class="anime-terminal" id="terminal">
                <div class="terminal-line">
                    <div class="terminal-time">${getCurrentTime()}</div>
                    <div class="terminal-message success">⚡ BY-WANZZ v5 INITIALIZED</div>
                </div>
                <div class="terminal-line">
                    <div class="terminal-time">${getCurrentTime()}</div>
                    <div class="terminal-message">🌀 CYBER THEME ACTIVATED</div>
                </div>
                <div class="terminal-line">
                    <div class="terminal-time">${getCurrentTime()}</div>
                    <div class="terminal-message bug">🐛 BUG EXPLOITATION MODULE LOADED</div>
                </div>
            </div>
        </div>
    `;
}

// ============ GENERATE RIGHT PANEL ============
function generateRightPanel() {
    return `
        <div class="panel-right">
            <div class="bug-modules">
                <h2 class="panel-title">🐛 BUG EXPLOITATION SUITE</h2>
                
                <div style="color: var(--neon-blue); margin: 15px 0; font-size: 0.9em;">
                    Select bug type to exploit vulnerabilities
                </div>
                
                <div class="bug-grid">
                    ${generateBugCards()}
                </div>
                
                <div style="margin-top: 25px;">
                    <div style="color: var(--neon-green); margin-bottom: 10px; font-weight: bold;">
                        EXPLOIT PARAMETERS
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <input type="text" id="bugParam" placeholder="Parameter">
                        <input type="text" id="bugPayload" placeholder="Payload">
                    </div>
                    <button class="anime-btn" id="executeBug">
                        🚀 EXECUTE EXPLOIT
                    </button>
                </div>
            </div>
            
            <div class="viz-panel">
                <div style="color: var(--cyber-purple); margin-bottom: 15px; font-weight: bold;">
                    📡 ATTACK VISUALIZATION
                </div>
                <div class="viz-container" id="vizContainer"></div>
                <div style="text-align: center; margin-top: 15px;">
                    <button class="anime-btn" id="startViz">
                        START VISUALIZATION
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ============ GENERATE BUG CARDS ============
function generateBugCards() {
    const bugs = [
        { id: 'sql', icon: '💉', name: 'SQL INJECTION' },
        { id: 'xss', icon: '🎯', name: 'XSS ATTACK' },
        { id: 'lfi', icon: '📁', name: 'LFI/RFI' },
        { id: 'rce', icon: '💻', name: 'RCE EXPLOIT' },
        { id: 'auth', icon: '🔑', name: 'AUTH BYPASS' },
        { id: 'dos', icon: '💥', name: 'DoS VULNERABILITY' }
    ];
    
    return bugs.map(bug => `
        <div class="bug-card ${bug.id === state.currentBug ? 'active' : ''}" 
             data-bug="${bug.id}">
            <div style="font-size: 1.5em; margin-bottom: 5px;">${bug.icon}</div>
            <div style="font-weight: bold; color: var(--neon-pink);">${bug.name}</div>
        </div>
    `).join('');
}

// ============ GENERATE FOOTER ============
function generateFooter() {
    return `
        <footer class="footer">
            <div class="control-block power">
                <div style="color: var(--neon-pink); font-weight: bold; margin-bottom: 10px;">⚡ POWER CONTROL</div>
                <input type="range" min="1" max="100" value="${state.powerLevel}" id="powerSlider">
                <div style="color: white; margin-top: 10px;">INTENSITY: <span id="powerLevel">${state.powerLevel}%</span></div>
            </div>
            
            <div class="control-block timing">
                <div style="color: var(--neon-blue); font-weight: bold; margin-bottom: 10px;">⏱️ TIMING CONTROL</div>
                <select id="timingSelect">
                    <option>INSTANT ATTACK</option>
                    <option>GRADUAL RAMP-UP</option>
                    <option>WAVE PATTERN</option>
                    <option>RANDOM INTERVALS</option>
                </select>
            </div>
            
            <div class="control-block stealth">
                <div style="color: var(--neon-green); font-weight: bold; margin-bottom: 10px;">👻 STEALTH MODE</div>
                <div style="display: flex; gap: 10px;">
                    <button class="stealth-btn" data-level="low">LOW</button>
                    <button class="stealth-btn" data-level="medium">MEDIUM</button>
                    <button class="stealth-btn active" data-level="high">HIGH</button>
                </div>
            </div>
            
            <div class="control-block extra">
                <div style="color: var(--cyber-purple); font-weight: bold; margin-bottom: 10px;">💎 EXTRA FEATURES</div>
                <button class="anime-btn" id="autoTarget">AUTO-TARGET</button>
                <button class="anime-btn" id="saveSession">SAVE SESSION</button>
            </div>
        </footer>
    `;
}

// ============ GENERATE ADDITIONAL CONTENT ============
function generateAdditionalContent() {
    return `
        <div style="padding: 40px 20px; background: rgba(0,0,0,0.8); margin: 20px; border-radius: 20px; border: 2px solid var(--neon-blue);">
            <h2 style="color: var(--neon-pink); text-align: center; margin-bottom: 30px; font-size: 2em;">
                ⚡ BY-WANZZ FEATURES ⚡
            </h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 40px;">
                ${generateFeatureCards()}
            </div>
            
            <div style="text-align: center; margin-top: 40px;">
                <div class="anime-btn" style="display: inline-block; padding: 15px 40px; font-size: 1.2em;">
                    ⚡ BY-WANZZ v5 | CYBER ATTACK SUITE ⚡
                </div>
                <p style="color: #aaa; margin-top: 20px; font-size: 0.9em;">
                    For educational and authorized testing purposes only.
                </p>
            </div>
        </div>
    `;
}

// ============ SETUP DYNAMIC EVENT LISTENERS ============
function setupDynamicEventListeners() {
    // Method selection
    document.querySelectorAll('.method-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.method-card').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            state.currentMethod = this.dataset.method;
            addTerminal(`⚔️ Attack method changed to: ${this.dataset.method.toUpperCase().replace('-', ' ')}`);
            showNotification('Method Changed', `Switched to ${this.dataset.method}`, 'info');
        });
    });
    
    // Bug selection
    document.querySelectorAll('.bug-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.bug-card').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            state.currentBug = this.dataset.bug;
            addTerminal(`🐛 Bug type selected: ${this.dataset.bug.toUpperCase()}`);
        });
    });
    
    // Attack buttons
    document.getElementById('launchAttack')?.addEventListener('click', launchAttack);
    document.getElementById('stopAttack')?.addEventListener('click', stopAttack);
    document.getElementById('exploitBug')?.addEventListener('click', exploitBug);
    document.getElementById('executeBug')?.addEventListener('click', executeBug);
    document.getElementById('autoMode')?.addEventListener('click', autoMode);
    document.getElementById('startViz')?.addEventListener('click', startVisualization);
    document.getElementById('autoTarget')?.addEventListener('click', autoTarget);
    document.getElementById('saveSession')?.addEventListener('click', saveSession);
    
    // Power control
    const powerSlider = document.getElementById('powerSlider');
    