/**
 * Unicode Character Mapping Utilities for LinkedIn Formatting
 * LinkedIn doesn't support Markdown, so we use Unicode Mathematical Alphanumeric Symbols.
 */

const charMaps = {
    bold: {
        uppercase: [0x1D400, 0x1D419], // A-Z
        lowercase: [0x1D41A, 0x1D433], // a-z
        digits: [0x1D7CE, 0x1D7D7],    // 0-9
    },
    italic: {
        uppercase: [0x1D434, 0x1D44D],
        lowercase: [0x1D44E, 0x1D467],
        exceptions: { 'h': 'ℎ' } // Special case: Unicode hole for 'h' (u+210E)
    },
    boldItalic: {
        uppercase: [0x1D468, 0x1D481],
        lowercase: [0x1D482, 0x1D49B],
    },
    monospace: {
        uppercase: [0x1D670, 0x1D689],
        lowercase: [0x1D68A, 0x1D6A3],
        digits: [0x1D7F6, 0x1D7FF],
    }
};

const transformChar = (char, type) => {
    const code = char.charCodeAt(0);
    const map = charMaps[type];
    if (!map) return char;

    // Handle specific exceptions (like italic 'h')
    if (map.exceptions && map.exceptions[char]) {
        return map.exceptions[char];
    }

    // Uppercase A-Z (65-90)
    if (code >= 65 && code <= 90) {
        const offset = code - 65;
        return String.fromCodePoint(map.uppercase[0] + offset);
    }

    // Lowercase a-z (97-122)
    if (code >= 97 && code <= 122) {
        const offset = code - 97;
        return String.fromCodePoint(map.lowercase[0] + offset);
    }

    // Digits 0-9 (48-57)
    if (code >= 48 && code <= 57 && map.digits) {
        const offset = code - 48;
        return String.fromCodePoint(map.digits[0] + offset);
    }

    return char;
};

export const formatText = (text, type) => {
    if (!type || type === 'normal') return text;
    // Use Array.from for surrogate pair safety (emojis)
    return Array.from(text).map(char => transformChar(char, type)).join('');
};

export const FORMAT_TYPES = [
    { id: 'normal', label: 'Normal', icon: 'Type' },
    { id: 'bold', label: 'Bold', icon: 'Bold' },
    { id: 'italic', label: 'Italic', icon: 'Italic' },
    { id: 'boldItalic', label: 'Bold Italic', icon: 'Heading' },
    { id: 'monospace', label: 'Monospace', icon: 'Code' },
];
