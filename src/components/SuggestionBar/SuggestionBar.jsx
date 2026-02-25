import { useTransliterator } from '../../context/TransliteratorContext';
import styles from './SuggestionBar.module.css';

function SuggestionBar() {
  const { suggestions, setSuggestions, outputText, setOutputText } = useTransliterator();

  if (suggestions.length === 0) return null;

  const handlePick = (suggestion) => {
    // Replace the last word in output with the picked suggestion
    const words = outputText.split(' ');
    words[words.length - 1] = suggestion;
    setOutputText(words.join(' '));
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
