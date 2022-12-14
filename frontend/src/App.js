import './App.css';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header.js';
import { IndexPage } from './components/IndexPage.js';
import { Board } from './components/Board.js';
import { ThreadDetail } from './components/ThreadDetails.js';
import { NotFound404 } from './components/NotFound404.js';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/:slug" element={<Board />} />
            <Route path="/:slug/:id" element={<ThreadDetail />} />
            <Route path="/*" element={<NotFound404 />} />
          </Routes>
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
