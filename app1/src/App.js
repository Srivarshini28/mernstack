import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './Product';
import UserList from './UserList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/product" element={<Product />} />
        <Route path="/" element={<UserList />} />
      </Routes>
    </Router>
  );
}

export default App;