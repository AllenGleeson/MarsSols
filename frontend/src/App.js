import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/home'
import RootLayout from './base_layouts/root_layout'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;