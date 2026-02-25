import { useTransliterateHook } from '../../hooks/useTransliterate';
import styles from './InputArea.module.css';

function InputArea() {
  const {
    inputText,
    handleKeyDown,
    handleChange,
    handleClear,
  } = useTransliterateHook();

  return (
    <div className={styles.inputArea}>
      <div className={styles.labelRow}>
        <label className={styles.label} htmlFor="transliterate-input">
          Type in English
        </label>
        <button
          className={`${styles.clearBtn} ${inputText ? styles.clearBtnVisible : ''}`}
          onClick={handleClear}
          tabIndex={inputText ? 0 : -1}
        >
          Clear
        </button>
      </div>
      <textarea
        id="transliterate-input"
        className={styles.textarea}
        value={inputText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder='e.g., enna venum (press space to convert)'
        autoFocus
        autoComplete="off"
        spellCheck="false"
        rows={3}
      />
    </div>
  );
}

export default InputArea;
