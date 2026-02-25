import Header from './components/Header/Header';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import InputArea from './components/InputArea/InputArea';
import SuggestionBar from './components/SuggestionBar/SuggestionBar';
import OutputArea from './components/OutputArea/OutputArea';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <LanguageSelector />
        <InputArea />
        <SuggestionBar />
        <OutputArea />
      </main>
    </div>
  );
}

export default App;
