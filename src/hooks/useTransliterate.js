import { useCallback, useRef } from 'react';
import { useTransliterator } from '../context/TransliteratorContext';
import { transliterate } from '../services/transliterate';

/**
 * Custom hook that encapsulates all transliteration logic:
 * - Single editable input (user can edit any part freely)
 * - On Space: transliterate the word that just completed
 * - Tracks translated words by index, rebuilds output
 * - Detects edited words and re-transliterates them
 */
export function useTransliterateHook() {
  const {
    inputText,
    setInputText,
    translatedWords,
    setTranslatedWords,
    selectedLanguage,
    suggestions,
    setSuggestions,
    activeWordIndex,
    setActiveWordIndex,
    translatedSourceRef,
    outputText,
  } = useTransliterator();

  // Ref to avoid race conditions on rapid typing
  const pendingRef = useRef(false);

  /**
   * Transliterate a single word and update the map.
   */
  const transliterateWord = useCallback(
    async (word, index) => {
      if (!word.trim()) return;

      // Skip if this exact word was already transliterated at this index
      if (translatedSourceRef.current[index] === word) return;

      const results = await transliterate(word, selectedLanguage.code);

      if (results.length > 0) {
        setTranslatedWords((prev) => ({ ...prev, [index]: results[0] }));
        setSuggestions(results);
        setActiveWordIndex(index);
      } else {
        setTranslatedWords((prev) => ({ ...prev, [index]: word }));
        setSuggestions([]);
      }

      // Remember what source word produced this translation
      translatedSourceRef.current[index] = word;
    },
    [selectedLanguage.code, setTranslatedWords, setSuggestions, setActiveWordIndex, translatedSourceRef]
  );

  /**
   * Handle input change — just update the text freely.
   */
  const handleChange = useCallback(
    (e) => {
      const newText = e.target.value;
      setInputText(newText);

      // Clean up translated words if user deleted words
      const words = newText.split(' ').filter(Boolean);
      setTranslatedWords((prev) => {
        const cleaned = {};
        words.forEach((_, i) => {
          if (prev[i] !== undefined) cleaned[i] = prev[i];
        });
        return cleaned;
      });

      // Clean up source ref too
      const newSourceRef = {};
      words.forEach((_, i) => {
        if (translatedSourceRef.current[i] !== undefined) {
          newSourceRef[i] = translatedSourceRef.current[i];
        }
      });
      translatedSourceRef.current = newSourceRef;
    },
    [setInputText, setTranslatedWords, translatedSourceRef]
  );

  /**
   * Handle keydown — on Space, transliterate the word that just ended.
   * Also detect if a previously translated word was edited.
   */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key !== ' ') return;

      const text = inputText + e.key;
      const words = text.trimEnd().split(/\s+/).filter(Boolean);

      if (words.length === 0) return;

      // Don't prevent default — let the space character appear in the input

      // Find words that need (re-)transliteration
      words.forEach((word, index) => {
        const prevSource = translatedSourceRef.current[index];
        if (prevSource !== word) {
          // New word or edited word — transliterate it
          transliterateWord(word, index);
        }
      });
    },
    [inputText, transliterateWord, translatedSourceRef]
  );

  /**
   * Clear everything.
   */
  const handleClear = useCallback(() => {
    setInputText('');
    setTranslatedWords({});
    setSuggestions([]);
    setActiveWordIndex(-1);
    translatedSourceRef.current = {};
  }, [setInputText, setTranslatedWords, setSuggestions, setActiveWordIndex, translatedSourceRef]);

  return {
    inputText,
    outputText,
    suggestions,
    activeWordIndex,
    handleKeyDown,
    handleChange,
    handleClear,
  };
}
