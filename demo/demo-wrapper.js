import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { PersonalizedVideo } from '../static/src/personalized-video.js';
import ivory from './images/ivory.svg';
import rami from './images/rami.svg';
import leumi from './images/leumi.svg';
import macabi from './images/macabi.svg';

// Register the PersonalizedVideo component if not already registered
if (!customElements.get('personalized-video')) {
    customElements.define('personalized-video', PersonalizedVideo);
}

const OFFICE_IMAGES = {
    'office1': {
        url: ivory,
        alt: 'לאומי'
    },
    'office2': {
        url: rami,
        alt: 'רמי'
    },
    'office3': {
        url: leumi,
        alt: 'לאומי'
    },
    'office4': {
        url: macabi,
        alt: 'מכבי'
    }
};

export class DemoWrapper extends LitElement {
    static styles = css`
        :host {
            display: block;
            font-family: 'Heebo', sans-serif;
            --primary-color: #6366f1;
            --primary-hover: #4f46e5;
            --bg-color: #ffffff;
            --text-color: #1f2937;
            --border-color: #e5e7eb;
            --radius: 0.75rem;
            --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        }

        .demo-grid {
            display: grid;
            grid-template-columns: 2fr 3fr;
            gap: 2rem;
            margin-top: 2rem;
            direction: rtl;
            max-width: 1400px;
            margin-left: auto;
            margin-right: auto;
        }

        .controls {
            background: var(--bg-color);
            padding: 2.5rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            display: flex;
            flex-direction: column;
            gap: 2.5rem;
            min-width: 400px;
        }

        .video-container {
            background: var(--bg-color);
            padding: 2rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            max-width: 100%;
            overflow: hidden;
        }

        .video-container ::slotted(personalized-video),
        .video-container personalized-video {
            width: 100% !important;
            max-width: 800px !important;
        }

        .control-group {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .control-group h3 {
            font-size: 1.5rem;
            color: var(--text-color);
            font-weight: 600;
            margin: 0;
            margin-bottom: 0.5rem;
        }

        .dropdown {
            position: relative;
        }

        .dropdown-trigger {
            padding: 1.25rem 1.5rem;
            border: 2px solid var(--border-color);
            border-radius: var(--radius);
            background: transparent;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 1.125rem;
            font-weight: 500;
            width: 100%;
            text-align: right;
            color: var(--text-color);
            font-family: 'Heebo', sans-serif;
            line-height: 1.4;
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-height: 4rem;
        }

        .dropdown-trigger.with-image {
            padding: 0.5rem;
            min-height: 120px;
            display: grid;
            grid-template-columns: 200px 40px;
            gap: 1rem;
            align-items: center;
        }

        .dropdown-trigger.with-image.open {
            grid-template-columns: 1fr;
        }

        .dropdown-trigger .selected-image {
            height: 100%;
            border-radius: calc(var(--radius) - 0.25rem);
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .dropdown-trigger.open .selected-image {
            opacity: 0;
            width: 0;
            margin: 0;
            visibility: hidden;
        }

        .dropdown-trigger .selected-image img {
            width: 100%;
            height: 100%;
        }

        .dropdown-trigger:hover {
            border-color: var(--primary-color);
            background: #f8fafc;
        }

        .dropdown-trigger.open {
            border-color: var(--primary-color);
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }

        .dropdown-content {
            position: absolute;
            top: 100%;
            right: 0;
            left: 0;
            background: white;
            border: 2px solid var(--primary-color);
            border-top: none;
            border-bottom-left-radius: var(--radius);
            border-bottom-right-radius: var(--radius);
            z-index: 10;
            max-height: 0;
            opacity: 0;
            visibility: hidden;
            overflow: hidden;
            transition: all 0.3s ease;
            transform: translateY(-10px);
            pointer-events: none;
        }

        .dropdown-content.open {
            max-height: 300px;
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
            pointer-events: auto;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .option-button {
            padding: 1rem 1.5rem;
            width: 100%;
            text-align: right;
            background: transparent;
            border: none;
            cursor: pointer;
            font-size: 1.125rem;
            font-family: 'Heebo', sans-serif;
            color: var(--text-color);
            transition: background-color 0.2s ease;
        }

        .option-button:hover {
            background: #f8fafc;
        }

        .option-button.selected {
            background: #f0f7ff;
            font-weight: 600;
        }

        .chevron {
            width: 20px;
            height: 20px;
            transition: transform 0.3s ease;
        }

        .chevron.open {
            transform: rotate(180deg);
        }

        .image-options {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            width: 100%;
        }

        .image-option {
            position: relative;
            aspect-ratio: 16/9;
            border-radius: calc(var(--radius) - 0.25rem);
            overflow: hidden;
            cursor: pointer;
            border: 2px solid var(--border-color);
            transition: all 0.2s ease;
        }

        .image-option:hover {
            border-color: var(--primary-color);
            transform: translateY(-2px);
        }

        .image-option.selected {
            border-color: var(--primary-color);
            box-shadow: var(--shadow);
        }

        .image-option img {
            width: 100%;
            height: 100%;
            transition: transform 0.3s ease;
        }

        .image-option:hover img {
            transform: scale(1.05);
        }


        @media (max-width: 768px) {
            .demo-grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }

            .controls, .video-container {
                padding: 1.5rem;
            }

            .image-options {
                grid-template-columns: 1fr;
            }
        }
    `;

    static properties = {
        selectedCompany: { type: String },
        selectedImage: { type: String },
        selectedName: { type: String },
        companyDropdownOpen: { type: Boolean },
        imageDropdownOpen: { type: Boolean },
        nameDropdownOpen: { type: Boolean }
    };

    constructor() {
        super();
        this.selectedCompany = 'ivory';
        this.selectedImage = 'office1';
        this.selectedName = 'avi';
        this.companyDropdownOpen = false;
        this.imageDropdownOpen = false;
        this.nameDropdownOpen = false;
        this._handleClickOutside = this._handleClickOutside.bind(this);
    }

    render() {
        return html`
            <div class="demo-grid">
                <div class="controls">
                    <div class="control-group">
                        <h3>בחר שם</h3>
                        <div class="dropdown">
                            <button class="dropdown-trigger ${this.nameDropdownOpen ? 'open' : ''}"
                                    @click=${() => this.toggleNameDropdown()}>
                                <span>${this.getName()}</span>
                                <svg class="chevron ${this.nameDropdownOpen ? 'open' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M6 9l6 6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                            <div class="dropdown-content ${this.nameDropdownOpen ? 'open' : ''}">
                                <button class="option-button ${this.selectedName === 'avi' ? 'selected' : ''}"
                                        @click=${() => this.selectName('avi')}>
                                    אבי אברהמי
                                </button>
                                <button class="option-button ${this.selectedName === 'moshe' ? 'selected' : ''}"
                                        @click=${() => this.selectName('moshe')}>
                                    משה כהן
                                </button>
                                <button class="option-button ${this.selectedName === 'sarah' ? 'selected' : ''}"
                                        @click=${() => this.selectName('sarah')}>
                                    שרה לוי
                                </button>
                                <button class="option-button ${this.selectedName === 'david' ? 'selected' : ''}"
                                        @click=${() => this.selectName('david')}>
                                    דוד ישראלי
                                </button>
                                <button class="option-button ${this.selectedName === 'rachel' ? 'selected' : ''}"
                                        @click=${() => this.selectName('rachel')}>
                                    רחל גולדברג
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="control-group">
                        <h3>בחר חברה</h3>
                        <div class="dropdown">
                            <button class="dropdown-trigger ${this.companyDropdownOpen ? 'open' : ''}"
                                    @click=${() => this.toggleCompanyDropdown()}>
                                <span>${this.getCompanyName()}</span>
                                <svg class="chevron ${this.companyDropdownOpen ? 'open' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M6 9l6 6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                            <div class="dropdown-content ${this.companyDropdownOpen ? 'open' : ''}">
                                <button class="option-button ${this.selectedCompany === 'ivory' ? 'selected' : ''}"
                                        @click=${() => this.selectCompany('ivory')}>
                                    אייבורי
                                </button>
                                <button class="option-button ${this.selectedCompany === 'rami' ? 'selected' : ''}"
                                        @click=${() => this.selectCompany('rami')}>
                                    רמי לוי
                                </button>
                                <button class="option-button ${this.selectedCompany === 'macabi' ? 'selected' : ''}"
                                        @click=${() => this.selectCompany('macabi')}>
                                    מכבי
                                </button>
                                <button class="option-button ${this.selectedCompany === 'leumi' ? 'selected' : ''}"
                                        @click=${() => this.selectCompany('leumi')}>
                                    לאומי
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="control-group">
                        <h3>בחר תמונה</h3>
                        <div class="dropdown">
                            <button class="dropdown-trigger with-image ${this.imageDropdownOpen ? 'open' : ''}"
                                    @click=${() => this.toggleImageDropdown()}>
                                <div class="selected-image">
                                    <img src="${this.getImageUrl()}" alt="תמונה נבחרת">
                                </div>
                                <svg class="chevron ${this.imageDropdownOpen ? 'open' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M6 9l6 6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                            <div class="dropdown-content ${this.imageDropdownOpen ? 'open' : ''}">
                                <div class="image-options">
                                    ${Object.entries(OFFICE_IMAGES).map(([key, image]) => html`
                                        <div class="image-option ${this.selectedImage === key ? 'selected' : ''}"
                                             @click=${() => this.selectImage(key)}>
                                            <img src="${image.url}" alt="${image.alt}">
                                        </div>
                                    `)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="video-container">
                    <personalized-video
                        id="demo-video"
                        key="xtra"
                        videoHeight="1080"
                        videoWidth="1080"
                        .payload=${this.getVideoPayload()}
                        placeholderImage="https://gifts.xgiftcard.co.il//uploads/siteSetting/2024/08/1-main_logo-a7b9ff21.png"
                        videoUrl="https://customer-m17spzblvpq4qzi0.cloudflarestream.com/edea321628f421c3d2f5373cfb65244c/manifest/video.m3u8"
                    ></personalized-video>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('click', this._handleClickOutside);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('click', this._handleClickOutside);
    }

    _handleClickOutside(event) {
        const path = event.composedPath();
        if (!path.includes(this.shadowRoot)) {
            this.companyDropdownOpen = false;
            this.imageDropdownOpen = false;
            this.nameDropdownOpen = false;
        }
    }

    toggleCompanyDropdown() {
        this.companyDropdownOpen = !this.companyDropdownOpen;
        this.imageDropdownOpen = false;
        this.nameDropdownOpen = false;
    }

    toggleImageDropdown() {
        this.imageDropdownOpen = !this.imageDropdownOpen;
        this.companyDropdownOpen = false;
        this.nameDropdownOpen = false;
    }

    toggleNameDropdown() {
        this.nameDropdownOpen = !this.nameDropdownOpen;
        this.companyDropdownOpen = false;
        this.imageDropdownOpen = false;
    }

    selectCompany(company) {
        this.selectedCompany = company;
        this.companyDropdownOpen = false;
    }

    selectImage(image) {
        this.selectedImage = image;
        this.imageDropdownOpen = false;
    }

    selectName(name) {
        this.selectedName = name;
        this.nameDropdownOpen = false;
    }

    getVideoPayload() {
        return {
            name: this.getName(),
            companyName: this.getCompanyName(),
            imageUrl: this.getImageUrl()
        };
    }

    getName() {
        const names = {
            'avi': 'אבי אברהמי',
            'moshe': 'משה כהן',
            'sarah': 'שרה לוי',
            'david': 'דוד ישראלי',
            'rachel': 'רחל גולדברג'
        };
        return names[this.selectedName];
    }

    getCompanyName() {
        const companyNames = {
            'ivory': 'אייבורי',
            'rami': 'רמי לוי',
            'macabi': 'מכבי',
            'leumi': 'לאומי'
        };
        return companyNames[this.selectedCompany];
    }

    getImageUrl() {
        return OFFICE_IMAGES[this.selectedImage].url;
    }
}

customElements.define('demo-wrapper', DemoWrapper);
