import { Routes, Route, Navigate } from 'react-router-dom';

// Import Pages
import Navbar from './components/navbar';
import Home from './pages/home'
import Login from './pages/login'
import BusList from './pages/buslist';
import BusDetail from './pages/busdetail';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/buslist' element={<BusList />} />
        <Route path='/busdetail' element={<BusDetail />} />
      </Routes>
    </>
  );
}

export default App;
