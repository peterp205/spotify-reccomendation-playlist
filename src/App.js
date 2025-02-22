import './App.css';
//import of components
import SearchBar from './components/searchBar';
import Playlist from './components/playlist';
import SearchResults from './components/searchResults';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1 class="title">Spotfiy playlist builder</h1>
      </header>
      <main>
        <section id="search-bar">
          <SearchBar/>
        </section>
        <section id="spotify-lists">
          <div id="search-results">
            <SearchResults />
          </div>
          <div id="playlist">
            <Playlist />
          </div>
        </section>  
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
