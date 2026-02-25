import { useTransliterator } from '../../context/TransliteratorContext';
import styles from './SuggestionBar.module.css';

function SuggestionBar() {
  const {
    suggestions,
    setSuggestions,
    activeWordIndex,
    setTranslatedWords,
    translatedSourceRef,
  } = useTransliterator();

  if (suggestions.length === 0) return null;

  const handlePick = (suggestion) => {
    // Replace the translated word at the active index with the picked suggestion
    setTranslatedWords((prev) => ({
      ...prev,
      [activeWordIndex]: suggestion,
    }));
    setSuggestions([]);
  };

  return (
    <div className={styles.bar}>
      <span className={styles.hint}>Suggestions:</span>
      {suggestions.map((s, i) => (
        <button
          key={i}
          className={`${styles.chip} ${i === 0 ? styles.active : ''}`}
          onClick={() => handlePick(s)}
        >
          {s}
        </button>
      ))}
    </div>
  );
}

export default SuggestionBar;
