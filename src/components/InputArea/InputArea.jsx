import { useTransliterator } from '../../context/TransliteratorContext';
import { transliterate } from '../../services/transliterate';
import styles from './InputArea.module.css';

function InputArea() {
  const {
    inputText,
    setInputText,
    outputText,
    setOutputText,
    selectedLanguage,
    setSuggestions,
    currentWord,
    setCurrentWord,
  } = useTransliterator();

  const handleKeyDown = async (e) => {
    // When user presses Space, transliterate the current word
    if (e.key === ' ' && currentWord.trim()) {
      e.preventDefault();

      const results = await transliterate(currentWord, selectedLanguage.code);

      if (results.length > 0) {
        // Show suggestions — pick the first one as default
        setSuggestions(results);

        // Append the top suggestion to output
        const transliterated = results[0];
        setOutputText((prev) => (prev ? prev + ' ' + transliterated : transliterated));
      } else {
        // No result — keep original word
        setOutputText((prev) => (prev ? prev + ' ' + currentWord : currentWord));
      }

      // Append space to input and reset current word
      setInputText((prev) => prev + currentWord + ' ');
      setCurrentWord('');
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    // Extract only the current word (text after last space in raw typing)
    setCurrentWord(value);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setCurrentWord('');
    setSuggestions([]);
  };

  return (
    <div className={styles.inputArea}>
      <div className={styles.labelRow}>
        <label className={styles.label} htmlFor="transliterate-input">
          Type in English
        </label>
        {(inputText || currentWord) && (
          <button className={styles.clearBtn} onClick={handleClear}>
            Clear
          </button>
        )}
      </div>
      <div className={styles.inputWrapper}>
        <span className={styles.committed}>{inputText}</span>
        <input
          id="transliterate-input"
          className={styles.input}
          type="text"
          value={currentWord}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={inputText ? '' : 'e.g., enna venum (press space to convert)'}
          autoFocus
          autoComplete="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
}

export default InputArea;
