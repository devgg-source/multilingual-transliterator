const GOOGLE_INPUT_TOOLS_URL = 'https://inputtools.google.com/request';

/**
 * Transliterate a word using Google Input Tools API.
 *
 * @param {string} word - English/Latin input (e.g., "enna")
 * @param {string} langCode - Target language code (e.g., "ta")
 * @param {number} numSuggestions - Number of suggestions to fetch
 * @returns {Promise<string[]>} Array of transliterated suggestions
 */
export async function transliterate(word, langCode = 'ta', numSuggestions = 5) {
  if (!word.trim()) return [];

  const params = new URLSearchParams({
    text: word,
    itc: `${langCode}-t-i0-und`,
    num: numSuggestions,
  });

  try {
    const response = await fetch(`${GOOGLE_INPUT_TOOLS_URL}?${params}`);
    const data = await response.json();

    if (data[0] === 'SUCCESS') {
      return data[1][0][1]; // returns array like ["என்ன", "எண்ண", ...]
    }
    return [];
  } catch (error) {
    console.error('Transliteration failed:', error);
    return [];
  }
}
