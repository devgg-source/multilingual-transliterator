# Multilingual Transliterator

A React-based web app that converts English (Latin script) text into various language scripts in real-time. Type in English, press **Space**, and get instant transliteration.

> Example: Type `enna venum` → Get `என்ன வேணும்` (Tamil)

## Features

- **Real-time transliteration** — converts each word on Space key press
- **16 languages supported** — Tamil, Hindi, Telugu, Kannada, Malayalam, Bengali, Gujarati, Marathi, Punjabi, Urdu, Arabic, Japanese, Chinese, Korean, Russian, Thai
- **Suggestion bar** — shows alternate transliterations to pick from
- **Copy to clipboard** — one-click copy of the output
- **No API key needed** — uses Google Input Tools (free)

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 19 |
| Build Tool | Vite |
| Styling | CSS Modules |
| Transliteration | Google Input Tools API |
| State | React Context |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
# Clone the repo
git clone https://github.com/devgg-source/multilingual-transliterator.git
cd multilingual-transliterator

# Install dependencies
npm install

# Start dev server
npm run dev
```

App runs at **http://localhost:3000**

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── main.jsx                            # Entry point
├── App.jsx                             # Root layout
├── context/
│   └── TransliteratorContext.jsx        # Shared state
├── data/
│   └── languages.js                    # Supported languages list
├── services/
│   └── transliterate.js                # Google Input Tools API
├── components/
│   ├── Header/                         # App title + language display
│   ├── LanguageSelector/               # Language dropdown
│   ├── InputArea/                      # English text input
│   ├── SuggestionBar/                  # Alternate suggestions
│   └── OutputArea/                     # Transliterated output + copy
└── styles/
    ├── index.css                       # Global reset
    └── App.css                         # Layout styles
```

## How It Works

1. Select a target language from the dropdown
2. Type English text in the input field
3. Press **Space** — the word gets transliterated via Google Input Tools API
4. Top suggestion auto-fills; click any alternate suggestion to swap
5. Click **Copy** to copy the output

## Roadmap

- [ ] Phase 2: Custom `useTransliterate` hook with debouncing
- [ ] Phase 3: Offline mode with Transformers.js / ONNX model
- [ ] Phase 4: Keyboard shortcuts & accessibility
- [ ] Phase 5: PWA support for mobile

## License

MIT
