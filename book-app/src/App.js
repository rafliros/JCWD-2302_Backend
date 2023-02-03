import { Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/navbar';

// Pages
import Home from './pages/home';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
