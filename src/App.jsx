import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';
import { AddItemPage } from './pages/AddItemPage';
import { ItemListPage } from './pages/ItemListPage';
import { ItemDetailPage } from './pages/ItemDetailPage';
import { NotFound } from './pages/NotFound';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import './App.css';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/add-item' element={<AddItemPage />} />
        <Route path='/items' element={<ItemListPage />} />
        <Route path='/items/:id' element={<ItemDetailPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
