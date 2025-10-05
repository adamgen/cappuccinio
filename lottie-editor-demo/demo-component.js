import { LitElement, html, css } from 'lit';
import lottieData from './a.js';

export class DemoComponent extends LitElement {
    static styles = css`
        :host {
            display: block;
            padding: 1rem;
        }
        
        .info-panel {
            background: #f8f9fa;
            border-radius: 6px;
            padding: 1rem;
            margin-top: 1rem;
        }

        .text-elements {
            display: grid;
            gap: 1rem;
            margin-top: 1rem;
        }

        .text-element {
            background: white;
            border: 1px solid #e1e4e8;
            border-radius: 4px;
            padding: 1rem;
        }

        .text-element h4 {
            margin: 0 0 0.5rem 0;
            color: #2c3e50;
        }

        .text-element-path {
            font-family: monospace;
            font-size: 0.9rem;
            color: #6a737d;
            margin-bottom: 0.5rem;
        }

        .text-input {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #e1e4e8;
            border-radius: 3px;
            font-family: monospace;
            margin-bottom: 0.5rem;
            text-align: start;
        }

        .text-input[dir="rtl"] {
            text-align: right;
        }

        .text-input[dir="ltr"] {
            text-align: left;
        }

        .text-input:focus {
            outline: none;
            border-color: var(--primary-color, #4a90e2);
            box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
        }

        .log-output {
            font-family: monospace;
            white-space: pre-wrap;
            background: #2c3e50;
            color: #ecf0f1;
            padding: 1rem;
            border-radius: 4px;
            max-height: 300px;
            overflow-y: auto;
        }

        button {
            background: var(--primary-color, #4a90e2);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            margin-right: 0.5rem;
        }

        button:hover {
            opacity: 0.9;
        }

        .button-group {
            margin-bottom: 1rem;
        }
    `;

    static properties = {
        textElements: { type: Array },
        lottieData: { type: Object }
    };

    isRTL(text) {
        // RTL characters ranges
        const rtlRanges = [
            [0x0590, 0x05FF], // Hebrew
            [0x0600, 0x06FF], // Arabic
            [0x0750, 0x077F], // Arabic Supplement
            [0x08A0, 0x08FF], // Arabic Extended-A
            [0xFB50, 0xFDFF], // Arabic Presentation Forms-A
            [0xFE70, 0xFEFF], // Arabic Presentation Forms-B
            [0x10800, 0x10FFF], // Additional RTL scripts
        ];

        // Count RTL characters
        let rtlCount = 0;
        let totalCount = 0;

        for (let i = 0; i < text.length; i++) {
            const code = text.charCodeAt(i);
            if (code === 32) continue; // Skip spaces
            totalCount++;
            
            // Check if character is in RTL ranges
            for (const [start, end] of rtlRanges) {
                if (code >= start && code <= end) {
                    rtlCount++;
                    break;
                }
            }
        }

        // Consider text RTL if more than 40% characters are RTL
        return totalCount > 0 && (rtlCount / totalCount) > 0.4;
    }

    constructor() {
        super();
        this.textElements = [];
        this.lottieData = lottieData;
        this.findTextElements(this.lottieData);
    }

    updateTextValue(path, value) {
        // Split the path into parts
        const parts = path.split('.');
        let current = this.lottieData;
        
        // Traverse the path except the last part
        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i];
            if (part.includes('[')) {
                // Handle array access
                const [arrayName, indexStr] = part.split('[');
                const index = parseInt(indexStr.replace(']', ''));
                current = current[arrayName][index];
            } else {
                current = current[part];
            }
        }

        // Update the text value
        const lastPart = parts[parts.length - 1];
        if (lastPart.includes('[')) {
            const [arrayName, indexStr] = lastPart.split('[');
            const index = parseInt(indexStr.replace(']', ''));
            current[arrayName][index] = value;
        } else {
            current[lastPart] = value;
        }

        // Request an update
        this.requestUpdate();
    }

    findTextElements(data, path = '') {
        if (!data || typeof data !== 'object') return;

        // Check if this is a text element based on Lottie spec
        if (data.t && data.t.d && Array.isArray(data.t.d.k)) {
            data.t.d.k.forEach((keyframe, idx) => {
                if (keyframe.s && keyframe.s.t) {
                    this.textElements.push({
                        path: `${path}.t.d.k[${idx}].s.t`,
                        text: keyframe.s.t,
                        fullPath: path
                    });
                }
            });
        }

        // Check layers array
        if (Array.isArray(data.layers)) {
            data.layers.forEach((layer, idx) => {
                if (layer.t && layer.t.d && Array.isArray(layer.t.d.k)) {
                    layer.t.d.k.forEach((keyframe, kIdx) => {
                        if (keyframe.s && keyframe.s.t) {
                            this.textElements.push({
                                path: `layers[${idx}].t.d.k[${kIdx}].s.t`,
                                text: keyframe.s.t,
                                fullPath: `layers[${idx}]`
                            });
                        }
                    });
                }
            });
        }

        // Check assets array
        if (Array.isArray(data.assets)) {
            data.assets.forEach((asset, idx) => {
                if (asset.layers) {
                    asset.layers.forEach((layer, layerIdx) => {
                        if (layer.t && layer.t.d && Array.isArray(layer.t.d.k)) {
                            layer.t.d.k.forEach((keyframe, kIdx) => {
                                if (keyframe.s && keyframe.s.t) {
                                    this.textElements.push({
                                        path: `assets[${idx}].layers[${layerIdx}].t.d.k[${kIdx}].s.t`,
                                        text: keyframe.s.t,
                                        fullPath: `assets[${idx}].layers[${layerIdx}]`
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }

        // Recursively search through arrays
        if (Array.isArray(data)) {
            data.forEach((item, index) => {
                this.findTextElements(item, `${path}[${index}]`);
            });
            return;
        }

        // Recursively search through object properties
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const newPath = path ? `${path}.${key}` : key;
                this.findTextElements(data[key], newPath);
            }
        }
    }

    showRawData() {
        const formattedData = JSON.stringify(lottieData, null, 2);
        const logOutput = this.shadowRoot.querySelector('.log-output');
        logOutput.textContent = formattedData;
        logOutput.style.display = 'block';
    }

    hideRawData() {
        const logOutput = this.shadowRoot.querySelector('.log-output');
        logOutput.style.display = 'none';
    }

    render() {
        return html`
            <div>
                <div class="button-group">
                    <button @click=${this.showRawData}>Show Raw Data</button>
                    <button @click=${this.hideRawData}>Hide Raw Data</button>
                </div>

                <div class="info-panel">
                    <h3>Text Elements in Animation</h3>
                    <p>Found ${this.textElements.length} text elements in the Lottie animation:</p>
                    
                    <div class="text-elements">
                        ${this.textElements.map(element => html`
                            <div class="text-element">
                                <h4>Text Content:</h4>
                                <input 
                                    type="text" 
                                    class="text-input"
                                    .value=${element.text}
                                    dir=${this.isRTL(element.text) ? "rtl" : "ltr"}
                                    @input=${(e) => {
                                        const path = element.path;
                                        this.updateTextValue(path, e.target.value);
                                        // Update the local text element as well
                                        element.text = e.target.value;
                                    }}
                                />
                                <div class="text-element-path">Path: ${element.path}</div>
                            </div>
                        `)}
                    </div>

                    <div class="log-output" style="display: none;"></div>
                </div>
            </div>
        `;
    }
}

customElements.define('demo-component', DemoComponent);