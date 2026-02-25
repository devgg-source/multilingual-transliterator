import { useTransliterator } from '../../context/TransliteratorContext';
import styles from './LanguageSelector.module.css';

function LanguageSelector() {
  const { selectedLanguage, setSelectedLanguage, languages } = useTransliterator();

  const handleChange = (e) => {
    const lang = languages.find((l) => l.code === e.target.value);
    if (lang) setSelectedLanguage(lang);
  };

  return (
    <div className={styles.selector}>
      <label className={styles.label} htmlFor="lang-select">
        Target Language
      </label>
      <select
        id="lang-select"
        className={styles.dropdown}
        value={selectedLanguage.code}
        onChange={handleChange}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name} — {lang.script}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;
