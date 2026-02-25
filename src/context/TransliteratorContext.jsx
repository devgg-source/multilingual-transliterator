import { createContext, useContext, useState } from 'react';
import LANGUAGES from '../data/languages';

const TransliteratorContext = createContext(null);

export function TransliteratorProvider({ children }) {
  // The target language (default: Tamil)
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);

  // The raw English/Latin input the user is typing
  const [inputText, setInputText] = useState('');

  // The final transliterated output text
  const [outputText, setOutputText] = useState('');

  // Suggestions for the current word being typed
  const [suggestions, setSuggestions] = useState([]);

  // The current word fragment being typed (before space)
  const [currentWord, setCurrentWord] = useState('');

  const value = {
    selectedLanguage,
    setSelectedLanguage,
    inputText,
    setInputText,
    outputText,
    setOutputText,
    suggestions,
    setSuggestions,
    currentWord,
    setCurrentWord,
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
