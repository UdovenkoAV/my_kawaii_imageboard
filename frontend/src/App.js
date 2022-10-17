import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/header.js';
import { IndexPage } from './components/index_page.js';
import { Board } from './components/board.js';
import { ThreadDetail } from './components/thread_detail.js';
import { NotFound } from './components/404.js';


function App() {
  return (
    <div className="App">
			<Header/>
			<main>
				<Routes>
				  <Route path="/" element={<IndexPage/>}/>
					<Route path="/:slug" element={<Board slug="a"/>}/>
					<Route path="/:slug/:id" element={<ThreadDetail slug="a"/>}/>
					<Route path="/*" element={<NotFound/>}/>
				</Routes>
			</main>
    </div>
  );
}

export default App;
