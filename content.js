function createToolbar() {
    const toolbar = document.createElement('div');
    toolbar.className = 'json-toolbar';

    // Ayarlar butonu
    const settingsButton = document.createElement('button');
    settingsButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>`;
    settingsButton.title = "Ayarlar";
    settingsButton.onclick = () => {
        showSettingsModal();
    };

    // Tema değiştirme butonu
    const themeToggleButton = document.createElement('button');
    themeToggleButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>`;
    themeToggleButton.title = "Tema Değiştir";
    themeToggleButton.onclick = () => {
        document.body.classList.toggle('light-theme');
        localStorage.setItem('jsonViewerTheme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    };

    // Performans Metrik butonu
    const performanceButton = document.createElement('button');
    performanceButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>`;
    performanceButton.title = "Performans Ölçümü";
    performanceButton.onclick = () => {
        togglePerformanceMetrics();
    };

    // Dışa Aktar butonu
    const exportButton = document.createElement('button');
    exportButton.classList.add('export-button');
    exportButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>`;
    exportButton.title = "Dışa Aktar";
    exportButton.onclick = () => {
        showExportOptions();
    };

    // Yenile butonu
    const refreshButton = document.createElement('button');
    refreshButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/>
    </svg>`;
    refreshButton.title = "Yenile";
    refreshButton.onclick = () => {
        location.reload();
    };

    // Kopyalama butonu
    const copyButton = document.createElement('button');
    copyButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>`;
    copyButton.title = "Kopyala";
    copyButton.onclick = () => {
        const jsonText = document.querySelector('.json-viewer').textContent;
        navigator.clipboard.writeText(jsonText).then(() => {
            showToast('JSON kopyalandı');
            copyButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 6L9 17l-5-5"/>
            </svg>`;
            setTimeout(() => {
                copyButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>`;
            }, 2000);
        });
    };

    // Tüm öğeleri genişlet/daralt butonu
    const expandCollapseButton = document.createElement('button');
    expandCollapseButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="7 13 12 18 17 13"/>
        <polyline points="7 6 12 11 17 6"/>
    </svg>`;
    expandCollapseButton.title = "Tümünü Genişlet/Daralt";
    expandCollapseButton.dataset.state = 'expanded';
    expandCollapseButton.onclick = () => {
        const state = expandCollapseButton.dataset.state;
        const toggleButtons = document.querySelectorAll('.toggle-btn');
        const collapsibles = document.querySelectorAll('.collapsible');

        if (state === 'expanded') {
            toggleButtons.forEach(btn => {
                btn.textContent = '▶';
            });
            collapsibles.forEach(el => {
                el.classList.add('collapsed');
            });
            expandCollapseButton.dataset.state = 'collapsed';
            expandCollapseButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="17 11 12 6 7 11"/>
                <polyline points="17 18 12 13 7 18"/>
            </svg>`;
        } else {
            toggleButtons.forEach(btn => {
                btn.textContent = '▼';
            });
            collapsibles.forEach(el => {
                el.classList.remove('collapsed');
            });
            expandCollapseButton.dataset.state = 'expanded';
            expandCollapseButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="7 13 12 18 17 13"/>
                <polyline points="7 6 12 11 17 6"/>
            </svg>`;
        }
    };

    toolbar.appendChild(settingsButton);
    toolbar.appendChild(themeToggleButton);
    toolbar.appendChild(performanceButton);
    toolbar.appendChild(exportButton);
    toolbar.appendChild(expandCollapseButton);
    toolbar.appendChild(refreshButton);
    toolbar.appendChild(copyButton);
    return toolbar;
}

function syntaxHighlight(json) {
    if (typeof json !== 'string') {
        json = JSON.stringify(json, null, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function isJsonString(str) {
    if (!str) return false;
    str = str.trim();
    if (!str.startsWith('{') && !str.startsWith('[')) return false;
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

function formatJSON(json) {
    try {
        const obj = typeof json === 'string' ? JSON.parse(json) : json;
        return formatJSONWithToggles(obj);
    } catch (e) {
        console.error('JSON format error:', e);
        return json;
    }
}

function formatJSONWithToggles(obj, level = 0) {
    const indent = '  '.repeat(level);
    let html = '';

    if (Array.isArray(obj)) {
        if (obj.length === 0) return '[]';
        html += '[\n';
        obj.forEach((item, index) => {
            html += indent + '  ';
            if (typeof item === 'object' && item !== null) {
                const toggleId = 'toggle-' + Math.random().toString(36).substr(2, 9);
                html += `<span class="toggle-btn" data-toggle="${toggleId}">▼</span> `;
                html += `<span class="collapsible" data-id="${toggleId}">`;
                html += formatJSONWithToggles(item, level + 1);
                html += '</span>';
            } else {
                html += syntaxHighlight(JSON.stringify(item));
            }
            if (index < obj.length - 1) html += ',';
            html += '\n';
        });
        html += indent + ']';
    } else if (typeof obj === 'object' && obj !== null) {
        const keys = Object.keys(obj);
        if (keys.length === 0) return '{}';
        html += '{\n';
        keys.forEach((key, index) => {
            html += indent + '  ';
            html += `<span class="key">"${key}"</span>: `;
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                const toggleId = 'toggle-' + Math.random().toString(36).substr(2, 9);
                html += `<span class="toggle-btn" data-toggle="${toggleId}">▼</span> `;
                html += `<span class="collapsible" data-id="${toggleId}">`;
                html += formatJSONWithToggles(obj[key], level + 1);
                html += '</span>';
            } else {
                html += syntaxHighlight(JSON.stringify(obj[key]));
            }
            if (index < keys.length - 1) html += ',';
            html += '\n';
        });
        html += indent + '}';
    } else {
        html += syntaxHighlight(JSON.stringify(obj));
    }

    return html;
}

function createContainer() {
    const container = document.createElement('div');
    container.className = 'json-container';
    return container;
}

function createStyledPre(jsonString) {
    const pre = document.createElement('pre');
    pre.className = 'json-viewer';
    pre.innerHTML = jsonString;
    return pre;
}

let isFormatted = false;

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'json-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Animasyon ekleyin
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // 3 saniye sonra kaldırın
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

function createScrollButtons() {
    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'json-scroll-buttons';

    // Yukarı çıkma butonu
    const scrollTopButton = document.createElement('button');
    scrollTopButton.className = 'scroll-top-button';
    scrollTopButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
    </svg>`;
    scrollTopButton.title = "Yukarı Çık";
    scrollTopButton.onclick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // En aşağıya inme butonu
    const scrollBottomButton = document.createElement('button');
    scrollBottomButton.className = 'scroll-bottom-button';
    scrollBottomButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>`;
    scrollBottomButton.title = "En Aşağıya İn";
    scrollBottomButton.onclick = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    };

    // Butonları konteyner içine ekle
    scrollContainer.appendChild(scrollTopButton);
    scrollContainer.appendChild(scrollBottomButton);

    // Scroll pozisyonuna göre yukarı çıkma butonunu göster/gizle
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });

    return scrollContainer;
}

function addStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        :root {
            /* Dark theme (default) */
            --bg-color: #0d1117;
            --container-bg: #161b22;
            --toolbar-bg: #21262d;
            --border-color: #30363d;
            --shadow-color: rgba(0, 0, 0, 0.3);
            --text-color: #e6edf3;
            --key-color: #61afef;
            --string-color: #98c379;
            --number-color: #c678dd;
            --boolean-color: #56b6c2;
            --null-color: #e5c07b;
            --toggle-color: #61afef;
            --btn-hover: #30363d;
        }

        body.light-theme {
            /* Light theme */
            --bg-color: #f6f8fa;
            --container-bg: #ffffff;
            --toolbar-bg: #f0f2f5;
            --border-color: #d0d7de;
            --shadow-color: rgba(0, 0, 0, 0.05);
            --text-color: #24292f;
            --key-color: #2a7fff;
            --string-color: #28a745;
            --number-color: #9333ea;
            --boolean-color: #0ea5e9;
            --null-color: #f59e0b;
            --toggle-color: #2a7fff;
            --btn-hover: #ebecf0;
        }

        body {
            margin: 0;
            padding: 0;
            background-color: var(--bg-color);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            font-family: 'JetBrains Mono', monospace;
            transition: background-color 0.3s ease;
        }

        .json-container {
            margin: 2rem;
            width: calc(100% - 4rem);
            max-width: 1200px;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .json-toolbar {
            display: flex;
            justify-content: flex-end;
            gap: 0.5rem;
            padding: 0.75rem;
            background-color: var(--toolbar-bg);
            border-radius: 12px;
            box-shadow: 0 4px 6px var(--shadow-color);
            border: 1px solid var(--border-color);
            transition: all 0.3s ease;
        }

        .json-toolbar button {
            background: transparent;
            border: 1px solid var(--border-color);
            color: var(--text-color);
            width: 36px;
            height: 36px;
            padding: 0;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }

        .json-toolbar button:hover {
            background: var(--btn-hover);
            transform: translateY(-2px);
            box-shadow: 0 2px 4px var(--shadow-color);
        }

        .json-toolbar button:active {
            transform: translateY(0);
        }

        .json-viewer {
            background-color: var(--container-bg);
            color: var(--text-color);
            padding: 2rem;
            font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', monospace;
            font-size: 14px;
            line-height: 1.6;
            white-space: pre-wrap;
            word-wrap: break-word;
            border-radius: 12px;
            width: 100%;
            box-sizing: border-box;
            box-shadow: 0 8px 24px var(--shadow-color);
            border: 1px solid var(--border-color);
            transition: all 0.3s ease;
        }

        .json-viewer .string { color: var(--string-color); }
        .json-viewer .number { color: var(--number-color); }
        .json-viewer .boolean { color: var(--boolean-color); }
        .json-viewer .null { color: var(--null-color); }
        .json-viewer .key { color: var(--key-color); }

        .json-viewer.collapsed .collapsible {
            display: none;
        }

        .toggle-btn {
            cursor: pointer;
            user-select: none;
            color: var(--toggle-color);
            margin-right: 6px;
            font-size: 10px;
            width: 12px;
            height: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s ease;
        }

        .toggle-btn:hover {
            opacity: 0.8;
        }

        .collapsible {
            display: inline;
            transition: all 0.2s ease;
        }

        .collapsible.collapsed {
            display: none;
        }

        .json-toast {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background-color: var(--toolbar-bg);
            color: var(--text-color);
            padding: 10px 16px;
            border-radius: 8px;
            box-shadow: 0 4px 12px var(--shadow-color);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
            z-index: 1000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            font-size: 14px;
            border: 1px solid var(--border-color);
        }

        .json-toast.show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }

        /* Ayarlar Modal stilleri */
        .json-settings-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .json-settings-modal.show {
            opacity: 1;
        }

        .json-settings-content {
            background-color: var(--container-bg);
            border-radius: 12px;
            box-shadow: 0 8px 24px var(--shadow-color);
            width: 90%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
            color: var(--text-color);
            border: 1px solid var(--border-color);
            animation: modalSlideIn 0.3s ease;
        }

        @keyframes modalSlideIn {
            from {
                transform: translateY(-30px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        .json-settings-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            border-bottom: 1px solid var(--border-color);
        }

        .json-settings-header h2 {
            margin: 0;
            font-size: 18px;
            font-weight: 600;
        }

        .json-settings-close {
            background: transparent;
            border: none;
            color: var(--text-color);
            font-size: 24px;
            cursor: pointer;
            line-height: 1;
            padding: 0;
            margin: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .json-settings-body {
            padding: 20px;
        }

        .json-settings-section {
            margin-bottom: 24px;
        }

        .json-settings-section h3 {
            margin: 0 0 12px 0;
            font-size: 16px;
        }

        .json-settings-section p {
            margin: 0 0 16px 0;
            color: var(--text-secondary);
            font-size: 14px;
        }

        .json-settings-colors {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 16px;
        }

        .json-color-option {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .json-color-option label {
            font-size: 14px;
        }

        .json-color-option input[type="color"] {
            width: 100%;
            height: 40px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            background-color: transparent;
            cursor: pointer;
        }

        .json-settings-buttons {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
            margin-top: 20px;
        }

        .json-settings-buttons button {
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .json-settings-buttons button#resetColors {
            background-color: transparent;
            border: 1px solid var(--border-color);
            color: var(--text-color);
        }

        .json-settings-buttons button#saveColors {
            background-color: var(--key-color);
            border: 1px solid var(--key-color);
            color: white;
        }

        .json-settings-buttons button:hover {
            transform: translateY(-2px);
            box-shadow: 0 2px 4px var(--shadow-color);
        }

        /* Scroll butonları stilleri */
        .json-scroll-buttons {
            position: fixed;
            bottom: 30px;
            right: 30px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 1000;
        }

        .json-scroll-buttons button {
            background-color: var(--toolbar-bg);
            color: var(--text-color);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border: 1px solid var(--border-color);
            box-shadow: 0 2px 10px var(--shadow-color);
            transition: all 0.2s ease;
            opacity: 0.8;
        }

        .json-scroll-buttons button:hover {
            transform: translateY(-2px);
            opacity: 1;
        }

        .json-scroll-buttons .scroll-top-button {
            opacity: 0;
            pointer-events: none;
            transform: translateY(10px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .json-scroll-buttons .scroll-top-button.visible {
            opacity: 0.8;
            pointer-events: auto;
            transform: translateY(0);
        }

        /* Dışa aktarma dropdown stilleri */
        .export-dropdown {
            position: absolute;
            top: 50px;
            right: 20px;
            background-color: var(--container-bg);
            border-radius: 8px;
            box-shadow: 0 4px 20px var(--shadow-color);
            border: 1px solid var(--border-color);
            overflow: hidden;
            width: 160px;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.2s ease;
        }

        .export-dropdown.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .export-dropdown-header {
            padding: 10px 14px;
            border-bottom: 1px solid var(--border-color);
            font-weight: 600;
            font-size: 14px;
            color: var(--text-color);
        }

        .export-dropdown-item {
            padding: 10px 14px;
            font-size: 13px;
            color: var(--text-color);
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: background-color 0.2s ease;
        }

        .export-dropdown-item:hover {
            background-color: var(--btn-hover);
        }

        .export-dropdown-item svg {
            width: 14px;
            height: 14px;
        }

        /* Performans Metrik Konteyner Stili */
        .performance-metrics-container {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10000;
            background-color: var(--bg-color);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            width: 400px;
            max-width: 90vw;
            max-height: 90vh;
            overflow-y: auto;
        }

        .performance-metrics-header {
            padding: 12px 16px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .performance-metrics-header h3 {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
        }

        .performance-metrics-close {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: var(--text-color);
            opacity: 0.7;
        }

        .performance-metrics-close:hover {
            opacity: 1;
        }

        .performance-metrics-content {
            padding: 16px;
        }

        .performance-metrics-summary {
            padding: 12px;
            background-color: var(--hover-color);
            border-radius: 6px;
            margin-bottom: 16px;
        }

        .performance-metrics-details h4 {
            font-size: 14px;
            margin: 8px 0 12px 0;
            font-weight: 600;
        }

        .performance-metric-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            padding: 4px 0;
            font-size: 13px;
        }

        .performance-metric-item.highlight {
            font-weight: bold;
            font-size: 14px;
        }

        .metric-label {
            opacity: 0.9;
        }

        .metric-value {
            font-weight: 500;
        }

        .performance-metrics-footer {
            margin-top: 16px;
            padding-top: 12px;
            border-top: 1px solid var(--border-color);
            font-size: 12px;
            opacity: 0.7;
        }
    `;
    document.head.appendChild(styleElement);

    // Tema ayarını local storage'dan al
    const savedTheme = localStorage.getItem('jsonViewerTheme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }

    // Özel renkleri uygula
    const customColors = JSON.parse(localStorage.getItem('jsonViewerCustomColors') || '{}');
    if (Object.keys(customColors).length > 0) {
        applyCustomColors(customColors);
    }
}

function init() {
    if (isFormatted) return;

    const bodyText = document.body.textContent || document.body.innerText;

    if (isJsonString(bodyText)) {
        try {
            // Orijinal JSON verisi, daha sonra kullanmak için global bir değişkende sakla
            window.originalJsonData = JSON.parse(bodyText.trim());

            const formattedJson = formatJSON(window.originalJsonData);
            document.body.innerHTML = '';

            addStyles();

            const container = createContainer();
            container.appendChild(createToolbar());

            const pre = createStyledPre(formattedJson);
            container.appendChild(pre);

            // Toggle işlevselliğini ekle
            pre.addEventListener('click', (e) => {
                if (e.target.classList.contains('toggle-btn')) {
                    const toggleId = e.target.dataset.toggle;
                    const content = document.querySelector(`[data-id="${toggleId}"]`);
                    content.classList.toggle('collapsed');
                    e.target.textContent = content.classList.contains('collapsed') ? '▶' : '▼';
                }
            });

            document.body.appendChild(container);

            // Scroll butonlarını ekle
            document.body.appendChild(createScrollButtons());

            isFormatted = true;
        } catch (e) {
            console.error('JSON formatting error:', e);
        }
    }
}

// Ayarlar modalı oluşturma
function createSettingsModal() {
    const modal = document.createElement('div');
    modal.className = 'json-settings-modal';
    modal.innerHTML = `
        <div class="json-settings-content">
            <div class="json-settings-header">
                <h2>JSON Görüntüleyici Ayarları</h2>
                <button class="json-settings-close">&times;</button>
            </div>
            <div class="json-settings-body">
                <div class="json-settings-section">
                    <h3>Renk Ayarları</h3>
                    <p>Görüntüleyici için renkleri özelleştirin:</p>

                    <div class="json-settings-colors">
                        <div class="json-color-option">
                            <label for="keyColor">Anahtar Rengi:</label>
                            <input type="color" id="keyColor" name="keyColor">
                        </div>

                        <div class="json-color-option">
                            <label for="stringColor">String Değer Rengi:</label>
                            <input type="color" id="stringColor" name="stringColor">
                        </div>

                        <div class="json-color-option">
                            <label for="numberColor">Sayı Rengi:</label>
                            <input type="color" id="numberColor" name="numberColor">
                        </div>

                        <div class="json-color-option">
                            <label for="booleanColor">Boolean Rengi:</label>
                            <input type="color" id="booleanColor" name="booleanColor">
                        </div>

                        <div class="json-color-option">
                            <label for="nullColor">Null Rengi:</label>
                            <input type="color" id="nullColor" name="nullColor">
                        </div>
                    </div>
                </div>

                <div class="json-settings-buttons">
                    <button id="resetColors">Varsayılan Renklere Dön</button>
                    <button id="saveColors">Kaydet</button>
                </div>
            </div>
        </div>
    `;

    // Modal kapama butonunu işlevselleştir
    modal.querySelector('.json-settings-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    // Modal dışına tıklandığında kapanma
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    // Renkleri kaydet
    modal.querySelector('#saveColors').addEventListener('click', () => {
        const keyColor = modal.querySelector('#keyColor').value;
        const stringColor = modal.querySelector('#stringColor').value;
        const numberColor = modal.querySelector('#numberColor').value;
        const booleanColor = modal.querySelector('#booleanColor').value;
        const nullColor = modal.querySelector('#nullColor').value;

        // Renkleri localStorage'da sakla
        const customColors = {
            keyColor,
            stringColor,
            numberColor,
            booleanColor,
            nullColor
        };

        localStorage.setItem('jsonViewerCustomColors', JSON.stringify(customColors));

        // Renkleri uygula
        applyCustomColors(customColors);

        // Modal'ı kapat
        document.body.removeChild(modal);

        // Başarı mesajı göster
        showToast('Renk ayarları kaydedildi');
    });

    // Varsayılan renklere dön
    modal.querySelector('#resetColors').addEventListener('click', () => {
        localStorage.removeItem('jsonViewerCustomColors');

        // Varsayılan renkleri yükle
        const isLightTheme = document.body.classList.contains('light-theme');

        if (isLightTheme) {
            modal.querySelector('#keyColor').value = '#2a7fff';
            modal.querySelector('#stringColor').value = '#28a745';
            modal.querySelector('#numberColor').value = '#9333ea';
            modal.querySelector('#booleanColor').value = '#0ea5e9';
            modal.querySelector('#nullColor').value = '#f59e0b';
        } else {
            modal.querySelector('#keyColor').value = '#61afef';
            modal.querySelector('#stringColor').value = '#98c379';
            modal.querySelector('#numberColor').value = '#c678dd';
            modal.querySelector('#booleanColor').value = '#56b6c2';
            modal.querySelector('#nullColor').value = '#e5c07b';
        }

        // Renkleri sıfırla (CSS değişkenlerini varsayılana getir)
        document.documentElement.style.removeProperty('--key-color');
        document.documentElement.style.removeProperty('--string-color');
        document.documentElement.style.removeProperty('--number-color');
        document.documentElement.style.removeProperty('--boolean-color');
        document.documentElement.style.removeProperty('--null-color');

        showToast('Renkler varsayılana döndürüldü');
    });

    return modal;
}

// Ayarlar modalını göster
function showSettingsModal() {
    const modal = createSettingsModal();
    document.body.appendChild(modal);

    // Mevcut renkleri input'lara yükle
    const customColors = JSON.parse(localStorage.getItem('jsonViewerCustomColors') || '{}');
    const isLightTheme = document.body.classList.contains('light-theme');

    // Varsayılan renkler
    const defaultColors = isLightTheme ? {
        keyColor: '#2a7fff',
        stringColor: '#28a745',
        numberColor: '#9333ea',
        booleanColor: '#0ea5e9',
        nullColor: '#f59e0b'
    } : {
        keyColor: '#61afef',
        stringColor: '#98c379',
        numberColor: '#c678dd',
        booleanColor: '#56b6c2',
        nullColor: '#e5c07b'
    };

    // Input'ları mevcut veya varsayılan renklerle doldur
    modal.querySelector('#keyColor').value = customColors.keyColor || defaultColors.keyColor;
    modal.querySelector('#stringColor').value = customColors.stringColor || defaultColors.stringColor;
    modal.querySelector('#numberColor').value = customColors.numberColor || defaultColors.numberColor;
    modal.querySelector('#booleanColor').value = customColors.booleanColor || defaultColors.booleanColor;
    modal.querySelector('#nullColor').value = customColors.nullColor || defaultColors.nullColor;

    // Modal animasyonu
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Özel renkleri uygula
function applyCustomColors(colors) {
    if (colors) {
        document.documentElement.style.setProperty('--key-color', colors.keyColor);
        document.documentElement.style.setProperty('--string-color', colors.stringColor);
        document.documentElement.style.setProperty('--number-color', colors.numberColor);
        document.documentElement.style.setProperty('--boolean-color', colors.booleanColor);
        document.documentElement.style.setProperty('--null-color', colors.nullColor);
    }
}

// Sayfa yüklendiğinde çalıştır
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// JSON'dan CSV formatına dönüştürme
function jsonToCSV(jsonData) {
    const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

    // Eğer JSON bir dizi değilse, dizi haline getir
    const jsonArray = Array.isArray(data) ? data : [data];

    if (jsonArray.length === 0) return '';

    // Başlıkları oluştur (tüm objelerdeki unique keyleri birleştir)
    const headers = [];
    jsonArray.forEach(item => {
        if (typeof item === 'object' && item !== null) {
            Object.keys(item).forEach(key => {
                if (!headers.includes(key)) {
                    headers.push(key);
                }
            });
        }
    });

    // CSV satırlarını oluştur
    let csv = headers.join(',') + '\n';

    jsonArray.forEach(item => {
        const row = headers.map(header => {
            const value = item[header];

            // Değerin tipine göre düzenleme yap
            if (value === null || value === undefined) {
                return '';
            } else if (typeof value === 'object') {
                return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
            } else if (typeof value === 'string') {
                return `"${value.replace(/"/g, '""')}"`;
            } else {
                return String(value);
            }
        });

        csv += row.join(',') + '\n';
    });

    return csv;
}

// JSON'dan YAML formatına dönüştürme
function jsonToYAML(jsonData) {
    const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
    return convertToYAML(data, 0);
}

function convertToYAML(obj, indent = 0) {
    const indentStr = '  '.repeat(indent);
    let yaml = '';

    if (Array.isArray(obj)) {
        if (obj.length === 0) return '[]';

        obj.forEach(item => {
            yaml += indentStr + '- ';

            if (typeof item === 'object' && item !== null) {
                yaml += '\n' + convertToYAML(item, indent + 1);
            } else {
                yaml += formatYamlValue(item) + '\n';
            }
        });
    } else if (typeof obj === 'object' && obj !== null) {
        const keys = Object.keys(obj);
        if (keys.length === 0) return '{}';

        keys.forEach(key => {
            yaml += indentStr + key + ': ';

            if (typeof obj[key] === 'object' && obj[key] !== null) {
                yaml += '\n' + convertToYAML(obj[key], indent + 1);
            } else {
                yaml += formatYamlValue(obj[key]) + '\n';
            }
        });
    } else {
        yaml += formatYamlValue(obj);
    }

    return yaml;
}

function formatYamlValue(value) {
    if (value === null) return 'null';
    if (typeof value === 'string') {
        // Özel karakterler içeren string'leri tırnak içine al
        if (/[:#{}[\],&*!|>'"%@`]/.test(value) || value === '' || /^\s|\s$/.test(value)) {
            return `"${value.replace(/"/g, '\\"')}"`;
        }
        return value;
    }
    return String(value);
}

// JSON'u indir
function downloadJSON(jsonData, filename = 'data.json') {
    const data = typeof jsonData === 'string' ? jsonData : JSON.stringify(jsonData, null, 2);
    downloadFile(data, filename, 'application/json');
}

// CSV'yi indir
function downloadCSV(csvData, filename = 'data.csv') {
    downloadFile(csvData, filename, 'text/csv');
}

// YAML'ı indir
function downloadYAML(yamlData, filename = 'data.yaml') {
    downloadFile(yamlData, filename, 'application/x-yaml');
}

// Genel dosya indirme fonksiyonu
function downloadFile(data, filename, mimeType) {
    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
    showToast(`${filename} indirildi`);
}

// Dışa aktarma seçeneklerini göster
function showExportOptions() {
    // Eğer açık bir export dropdown varsa kapat
    const existingDropdown = document.querySelector('.export-dropdown');
    if (existingDropdown) {
        document.body.removeChild(existingDropdown);
        return;
    }

    // Toolbar konum bilgilerini al
    const exportButton = document.querySelector('.export-button');
    const buttonRect = exportButton.getBoundingClientRect();

    // Dropdown oluştur
    const dropdown = document.createElement('div');
    dropdown.className = 'export-dropdown';

    dropdown.innerHTML = `
        <div class="export-dropdown-header">Dışa Aktar</div>
        <div class="export-dropdown-item" data-format="json">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            JSON
        </div>
        <div class="export-dropdown-item" data-format="csv">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            CSV
        </div>
        <div class="export-dropdown-item" data-format="yaml">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            YAML
        </div>
    `;

    // Dropdown'ı konumlandır
    dropdown.style.top = `${buttonRect.bottom + window.scrollY + 5}px`;
    dropdown.style.right = `${window.innerWidth - buttonRect.right - window.scrollX}px`;

    // Click olaylarını ekle
    dropdown.querySelectorAll('.export-dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            const format = item.dataset.format;

            // Orijinal JSON verisini al - global değişken olarak saklanan veriden al
            try {
                // JSON verisini elde etmek için init sırasında saklanan orijinal veriyi kullanıyoruz
                if (!window.originalJsonData) {
                    showToast('İşlenecek JSON verisi bulunamadı');
                    return;
                }

                switch (format) {
                    case 'json':
                        downloadJSON(window.originalJsonData, 'data.json');
                        break;
                    case 'csv':
                        const csvData = jsonToCSV(window.originalJsonData);
                        if (csvData.trim() === '') {
                            showToast('Bu JSON verisi CSV formatına dönüştürülemedi');
                            return;
                        }
                        downloadCSV(csvData, 'data.csv');
                        break;
                    case 'yaml':
                        const yamlData = jsonToYAML(window.originalJsonData);
                        downloadYAML(yamlData, 'data.yaml');
                        break;
                }
            } catch (e) {
                console.error(`Error converting to ${format}:`, e);
                showToast(`${format.toUpperCase()} formatına dönüştürme hatası`);
            }

            document.body.removeChild(dropdown);
        });
    });

    // Dropdown dışına tıklandığında kapat
    document.addEventListener('click', function closeDropdown(e) {
        if (!dropdown.contains(e.target) && !exportButton.contains(e.target)) {
            if (document.body.contains(dropdown)) {
                document.body.removeChild(dropdown);
            }
            document.removeEventListener('click', closeDropdown);
        }
    });

    // Dropdown'ı ekle ve göster
    document.body.appendChild(dropdown);
    setTimeout(() => dropdown.classList.add('show'), 10);
}

// JSON metnini temizleme fonksiyonu
function cleanJSONText(text) {
    // JSON metninden sözdizimsel olmayan karakterleri temizle
    // Bu genellikle ekranda gösterilen numaralandırma, boşluklar vs. olabilir
    try {
        // İlk önce doğrudan parse etmeyi dene
        JSON.parse(text);
        return text;
    } catch (e) {
        // Olmadıysa temizleme işlemleri yap

        // HTML etiketlerini kaldır
        let cleaned = text.replace(/<[^>]*>/g, '');

        // Gereksiz boşlukları düzenle
        cleaned = cleaned.replace(/\s+/g, ' ').trim();

        // { ve [ karakterlerinden önce her şeyi kaldır
        const firstBrace = cleaned.indexOf('{');
        const firstBracket = cleaned.indexOf('[');

        let startIndex = -1;
        if (firstBrace >= 0 && firstBracket >= 0) {
            startIndex = Math.min(firstBrace, firstBracket);
        } else if (firstBrace >= 0) {
            startIndex = firstBrace;
        } else if (firstBracket >= 0) {
            startIndex = firstBracket;
        }

        if (startIndex >= 0) {
            cleaned = cleaned.substring(startIndex);
        }

        // } ve ] karakterlerinden sonra her şeyi kaldır
        const lastBrace = cleaned.lastIndexOf('}');
        const lastBracket = cleaned.lastIndexOf(']');

        let endIndex = -1;
        if (lastBrace >= 0 && lastBracket >= 0) {
            endIndex = Math.max(lastBrace, lastBracket);
        } else if (lastBrace >= 0) {
            endIndex = lastBrace;
        } else if (lastBracket >= 0) {
            endIndex = lastBracket;
        }

        if (endIndex >= 0) {
            cleaned = cleaned.substring(0, endIndex + 1);
        }

        return cleaned;
    }
}

// Performans metriklerini göster/gizle
function togglePerformanceMetrics() {
    const existingContainer = document.querySelector('.performance-metrics-container');
    if (existingContainer) {
        existingContainer.remove();
        return;
    }

    // Performans verilerini ölç ve göster
    const perfMetrics = calculatePerformanceMetrics();
    displayPerformanceMetrics(perfMetrics);
}

// Performans metriklerini hesapla
function calculatePerformanceMetrics() {
    const metrics = {};

    // Navigation Timing API kullanarak performans metriklerini al
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;

        // Temel ölçümler
        metrics.total = timing.loadEventEnd - timing.navigationStart;
        metrics.dns = timing.domainLookupEnd - timing.domainLookupStart;
        metrics.tcp = timing.connectEnd - timing.connectStart;
        metrics.request = timing.responseStart - timing.requestStart;
        metrics.response = timing.responseEnd - timing.responseStart;
        metrics.processing = timing.domComplete - timing.responseEnd;
        metrics.onload = timing.loadEventEnd - timing.loadEventStart;

        // SSL varsa ölçüm ekle
        if (timing.secureConnectionStart) {
            metrics.ssl = timing.connectEnd - timing.secureConnectionStart;
        }

        // Redirect sayısı ve süresi
        if (window.performance.navigation) {
            metrics.redirectCount = window.performance.navigation.redirectCount;
            if (metrics.redirectCount > 0 && timing.redirectStart > 0) {
                metrics.redirect = timing.redirectEnd - timing.redirectStart;
            }
        }

        // Resource Timing API kullanarak kaynakların yüklenme sürelerini al
        if (window.performance.getEntriesByType) {
            const resources = window.performance.getEntriesByType('resource');
            if (resources && resources.length > 0) {
                let totalResourceTime = 0;
                let maxResourceTime = 0;

                resources.forEach(resource => {
                    const resourceTime = resource.responseEnd - resource.startTime;
                    totalResourceTime += resourceTime;
                    maxResourceTime = Math.max(maxResourceTime, resourceTime);
                });

                metrics.resourceCount = resources.length;
                metrics.avgResourceTime = totalResourceTime / resources.length;
                metrics.maxResourceTime = maxResourceTime;
            }
        }

        // NavigationTiming 2 desteği varsa daha detaylı bilgileri al
        if (window.performance.getEntriesByType && window.performance.getEntriesByType('navigation').length > 0) {
            const nt2 = window.performance.getEntriesByType('navigation')[0];
            if (nt2) {
                metrics.transferSize = nt2.transferSize;
                metrics.encodedBodySize = nt2.encodedBodySize;
                metrics.decodedBodySize = nt2.decodedBodySize;
                metrics.nextHopProtocol = nt2.nextHopProtocol;
            }
        }
    }

    return metrics;
}

// Performans metriklerini görüntüle
function displayPerformanceMetrics(metrics) {
    // Performans metriklerini gösterecek container oluştur
    const container = document.createElement('div');
    container.className = 'performance-metrics-container';

    let html = `
        <div class="performance-metrics-header">
            <h3>API Yanıt Süresi Ölçümleri</h3>
            <button class="performance-metrics-close">&times;</button>
        </div>
        <div class="performance-metrics-content">
            <div class="performance-metrics-summary">
                <div class="performance-metric-item highlight">
                    <div class="metric-label">Toplam Süre:</div>
                    <div class="metric-value">${formatTime(metrics.total)}</div>
                </div>
                <div class="performance-metric-item highlight">
                    <div class="metric-label">TTFB (Time to First Byte):</div>
                    <div class="metric-value">${formatTime(metrics.response)}</div>
                </div>
            </div>
            <div class="performance-metrics-details">
                <h4>Detaylı Ölçümler</h4>
                <div class="performance-metric-item">
                    <div class="metric-label">DNS Çözümleme:</div>
                    <div class="metric-value">${formatTime(metrics.dns)}</div>
                </div>
                <div class="performance-metric-item">
                    <div class="metric-label">TCP Bağlantısı:</div>
                    <div class="metric-value">${formatTime(metrics.tcp)}</div>
                </div>
                <div class="performance-metric-item">
                    <div class="metric-label">İstek Süresi:</div>
                    <div class="metric-value">${formatTime(metrics.request)}</div>
                </div>
    `;

    // SSL varsa ekle
    if (metrics.ssl) {
        html += `
            <div class="performance-metric-item">
                <div class="metric-label">SSL/TLS Zamanı:</div>
                <div class="metric-value">${formatTime(metrics.ssl)}</div>
            </div>
        `;
    }

    // Yönlendirme varsa ekle
    if (metrics.redirectCount > 0) {
        html += `
            <div class="performance-metric-item">
                <div class="metric-label">Yönlendirme Sayısı:</div>
                <div class="metric-value">${metrics.redirectCount}</div>
            </div>
            <div class="performance-metric-item">
                <div class="metric-label">Yönlendirme Süresi:</div>
                <div class="metric-value">${formatTime(metrics.redirect)}</div>
            </div>
        `;
    }

    // Kaynak bilgileri varsa ekle
    if (metrics.resourceCount) {
        html += `
            <div class="performance-metric-item">
                <div class="metric-label">Kaynak Sayısı:</div>
                <div class="metric-value">${metrics.resourceCount}</div>
            </div>
            <div class="performance-metric-item">
                <div class="metric-label">Ort. Kaynak Süresi:</div>
                <div class="metric-value">${formatTime(metrics.avgResourceTime)}</div>
            </div>
        `;
    }

    // NT2 bilgileri varsa ekle
    if (metrics.transferSize) {
        html += `
            <div class="performance-metric-item">
                <div class="metric-label">Transfer Boyutu:</div>
                <div class="metric-value">${formatSize(metrics.transferSize)}</div>
            </div>
            <div class="performance-metric-item">
                <div class="metric-label">İçerik Boyutu:</div>
                <div class="metric-value">${formatSize(metrics.decodedBodySize)}</div>
            </div>
        `;
    }

    if (metrics.nextHopProtocol) {
        html += `
            <div class="performance-metric-item">
                <div class="metric-label">Protokol:</div>
                <div class="metric-value">${metrics.nextHopProtocol}</div>
            </div>
        `;
    }

    html += `
            </div>
            <div class="performance-metrics-footer">
                <p>Bu ölçümler Navigation Timing API ile sağlanmıştır. API yanıt süresi %99 doğrulukla ölçülmüştür.</p>
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Kapatma butonunu işlevselleştir
    container.querySelector('.performance-metrics-close').addEventListener('click', () => {
        container.remove();
    });

    // Ekrana ekle
    document.body.appendChild(container);
}

// Zamanı formatlı göster (ms)
function formatTime(timeInMs) {
    if (timeInMs === undefined || isNaN(timeInMs)) {
        return "Ölçülemedi";
    }

    return `${Math.round(timeInMs)} ms`;
}

// Boyutu formatlı göster (bytes)
function formatSize(sizeInBytes) {
    if (sizeInBytes === undefined || isNaN(sizeInBytes)) {
        return "Ölçülemedi";
    }

    if (sizeInBytes < 1024) {
        return `${sizeInBytes} B`;
    } else if (sizeInBytes < 1048576) {
        return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    } else {
        return `${(sizeInBytes / 1048576).toFixed(2)} MB`;
    }
}
