function createToolbar() {
    const toolbar = document.createElement('div');
    toolbar.className = 'json-toolbar';
    
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
    
    toolbar.appendChild(themeToggleButton);
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

function addStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        :root {
            /* Dark theme (default) */
            --bg-color: #121212;
            --container-bg: #1a1a1a; 
            --toolbar-bg: #252525;
            --border-color: #333;
            --shadow-color: rgba(0, 0, 0, 0.2);
            --text-color: #e0e0e0;
            --key-color: #88c0d0;
            --string-color: #a3be8c;
            --number-color: #b48ead;
            --boolean-color: #81a1c1;
            --null-color: #ebcb8b;
            --toggle-color: #81a1c1;
            --btn-hover: #363636;
        }
        
        body.light-theme {
            /* Light theme */
            --bg-color: #f8f9fa;
            --container-bg: #ffffff;
            --toolbar-bg: #f1f3f5;
            --border-color: #e9ecef;
            --shadow-color: rgba(0, 0, 0, 0.05);
            --text-color: #343a40;
            --key-color: #0c8599;
            --string-color: #2b8a3e;
            --number-color: #5f3dc4;
            --boolean-color: #1864ab;
            --null-color: #e67700;
            --toggle-color: #1864ab;
            --btn-hover: #e9ecef;
        }

        body {
            margin: 0;
            padding: 0;
            background-color: var(--bg-color);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
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
    `;
    document.head.appendChild(styleElement);
    
    // Tema ayarını local storage'dan al
    const savedTheme = localStorage.getItem('jsonViewerTheme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
}

function init() {
    if (isFormatted) return;
    
    const bodyText = document.body.textContent || document.body.innerText;
    
    if (isJsonString(bodyText)) {
        try {
            const formattedJson = formatJSON(bodyText);
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
            isFormatted = true;
        } catch (e) {
            console.error('JSON formatting error:', e);
        }
    }
}

// Artık bu fonksiyonlara ihtiyacımız yok
// function collapseJSON() { ... }
// function expandJSON() { ... }
// function formatCollapsedJSON() { ... }

// Sayfa yüklendiğinde çalıştır
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
} 