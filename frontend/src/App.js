import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header.js';
import { IndexPage } from './components/IndexPage.js';
import { Board } from './components/Board.js';
import { ThreadDetail } from './components/ThreadDetails.js';
import { NotFound404 } from './components/NotFound404.js';


function App() {
  return (
    <div className="App">
      <Header/>
	<main>
	  <Routes>
	    <Route path="/" element={<IndexPage/>}/>
	    <Route path="/:slug" element={<Board slug="a"/>}/>
	    <Route path="/:slug/:id" element={<ThreadDetail slug="a"/>}/>
	    <Route path="/*" element={<NotFound404/>}/>
	  </Routes>
	</main>
    </div>
  );
}

export default App;
