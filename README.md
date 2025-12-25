# LinkedIn Post Formatter PRO

A professional Chrome Extension designed to transform standard LinkedIn text into attention-grabbing premium styles using Unicode mathematical characters. Elevate your personal branding without needing external formatting tools.

(public/icons/icon128.png)

## Key Features

- **Instant Auto-Formatting**: Toggle between **Bold**, *Italic*, ***Bold Italic***, and `Monospace` with a live preview.
- **Smart Character Tracking**: Real-time counter for the 3000-character LinkedIn post limit with dynamic visual feedback.
- **Draft Persistence**: Automatically saves your drafts to Chrome's local storage—never lose your writing progress.
- **Unicode Safety**: Advanced character mapping that fixes common rendering "holes" (like the letter `ℎ`) and supports emojis/non-Latin scripts safely.
- **Premium UI**: Modern glassmorphism design optimized for the Chrome Side Panel experience.

## Tech Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS with Modern Tokens
- **Manifest**: Extension Manifest V3

## Local Installation (Developer Mode)

To run this extension locally:

1. **Clone or Download** this repository.
2. **Build the project**:
   ```bash
   npm install
   npm run build
   ```
3. **Load in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer mode** (toggle in the top right).
   - Click **Load unpacked**.
   - Select the `dist` folder generated in this project directory.
4. **Pin & Launch**: Pin the extension to your toolbar and click the icon to open the side panel while writing on LinkedIn.

## Professional UI Standards

This tool follows high-end Chrome Web Store standards, featuring:
- **Glassmorphism**: Elegant blur effects and subtle border glows.
- **Micro-animations**: Smooth transitions for every interactive state.
- **Native Experience**: Optimized scrollbars and layouts for a built-in browser feel.

## License

MIT License. Developed for professional LinkedIn creators.
