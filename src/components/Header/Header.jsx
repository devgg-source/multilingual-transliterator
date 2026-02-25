import { useTransliterator } from '../../context/TransliteratorContext';
import styles from './Header.module.css';

function Header() {
  const { selectedLanguage } = useTransliterator();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>Multilingual Transliterator</h1>
        <p className={styles.subtitle}>
          Type in English → Get <strong>{selectedLanguage.name}</strong> ({selectedLanguage.script})
        </p>
      </div>
    </header>
  );
}

export default Header;
