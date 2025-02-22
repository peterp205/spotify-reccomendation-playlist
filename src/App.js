import './App.css';
//import of components
import searchBar from './components/searchBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 class="title">Spotfiy playlist builder</h1>
        <p>Enter a search term to start filtering for songs. Enter an artist, genre, song title or</p>
      </header>
      <main>
        <section id="search-bar">
          <searchBar />
        </section>
        <section id="spotfiy-lists">
          <div id="search-results">

          </div>
          <div id="playlist">

          </div>
        </section>  
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
