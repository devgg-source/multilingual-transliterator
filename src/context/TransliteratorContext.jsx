import { createContext, useContext, useState, useRef, useMemo } from 'react';
import LANGUAGES from '../data/languages';

const TransliteratorContext = createContext(null);

export function TransliteratorProvider({ children }) {
  // The target language (default: Tamil)
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);

  // The full English input text (always editable)
  const [inputText, setInputText] = useState('');

  // Map of english word → transliterated word (keyed by word index)
  // e.g. { 0: 'என்ன', 1: 'வேணும்' }
  const [translatedWords, setTranslatedWords] = useState({});

  // Suggestions for the most recently transliterated word
  const [suggestions, setSuggestions] = useState([]);

  // Index of the word suggestions apply to
  const [activeWordIndex, setActiveWordIndex] = useState(-1);

  // Track which words have already been transliterated (to avoid re-fetching)
  const translatedSourceRef = useRef({});

  // Compute output text from translatedWords map
  const outputText = useMemo(() => {
    const words = inputText.split(/\s+/).filter(Boolean);
    return words
      .map((_, i) => translatedWords[i] || '')
      .filter(Boolean)
      .join(' ');
  }, [inputText, translatedWords]);

  const value = {
    selectedLanguage,
    setSelectedLanguage,
    inputText,
    setInputText,
    translatedWords,
    setTranslatedWords,
    suggestions,
    setSuggestions,
    activeWordIndex,
    setActiveWordIndex,
    translatedSourceRef,
    outputText,
    languages: LANGUAGES,
  };

  return (
    <TransliteratorContext.Provider value={value}>
      {children}
    </TransliteratorContext.Provider>
  );
}

export function useTransliterator() {
  const context = useContext(TransliteratorContext);
  if (!context) {
    throw new Error('useTransliterator must be used within TransliteratorProvider');
  }
  return context;
}
