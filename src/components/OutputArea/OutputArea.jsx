import { useTransliterator } from '../../context/TransliteratorContext';
import styles from './OutputArea.module.css';

function OutputArea() {
  const { outputText, selectedLanguage } = useTransliterator();

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
  };

  return (
    <div className={styles.outputArea}>
      <div className={styles.labelRow}>
        <label className={styles.label}>
          {selectedLanguage.name} Output ({selectedLanguage.script})
        </label>
        {outputText && (
          <button className={styles.copyBtn} onClick={handleCopy}>
            Copy
          </button>
        )}
      </div>
      <div className={styles.output}>
        {outputText || (
          <span className={styles.placeholder}>
            Transliterated text will appear here...
          </span>
        )}
      </div>
    </div>
  );
}

export default OutputArea;
