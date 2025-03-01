function createToolbar() {
    const toolbar = document.createElement('div');
    toolbar.className = 'json-toolbar';
    
    // Yenile butonu
    const refreshButton = document.createElement('button');
    refreshButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/>
    </svg>`;
    refreshButton.onclick = () => {
        location.reload();
    };
    
    // Kopyalama butonu
    const copyButton = document.createElement('button');
    copyButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>`;
    copyButton.onclick = () => {
        const jsonText = document.querySelector('.json-viewer').textContent;
        navigator.clipboard.writeText(jsonText).then(() => {
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

function addStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        body {
            margin: 0;
            padding: 0;
            background-color: #1a1a1a;
            min-height: 100vh;
            display: flex;
            justify-content: center;
        }

        .json-container {
            margin: 2rem;
            width: calc(100% - 4rem);
            max-width: 1200px;
        }

        .json-toolbar {
            display: flex;
            justify-content: flex-end;
            gap: 0.75rem;
            margin-bottom: 1rem;
        }

        .json-toolbar button {
            background: #2d2d2d;
            border: 1px solid #444;
            color: #d4d4d4;
            width: 32px;
            height: 32px;
            padding: 0;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }

        .json-toolbar button:hover {
            background: #383838;
            border-color: #666;
            transform: translateY(-1px);
        }

        .json-viewer {
            background-color: #1e1e1e;
            color: #d4d4d4;
            padding: 2rem;
            font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', monospace;
            font-size: 14px;
            line-height: 1.6;
            white-space: pre-wrap;
            word-wrap: break-word;
            border-radius: 12px;
            width: 100%;
            box-sizing: border-box;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
            border: 1px solid #333;
        }

        .json-viewer .string { color: #ce9178; }
        .json-viewer .number { color: #b5cea8; }
        .json-viewer .boolean { color: #569cd6; }
        .json-viewer .null { color: #569cd6; }
        .json-viewer .key { color: #9cdcfe; }

        .json-viewer.collapsed .collapsible {
            display: none;
        }

        .json-viewer .collapsible {
            margin-left: 2rem;
        }

        .toggle-btn {
            cursor: pointer;
            user-select: none;
            color: #569cd6;
            margin-right: 4px;
        }

        .toggle-btn:hover {
            opacity: 0.8;
        }

        .collapsible {
            display: inline;
        }

        .collapsible.collapsed {
            display: none;
        }
    `;
    document.head.appendChild(styleElement);
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