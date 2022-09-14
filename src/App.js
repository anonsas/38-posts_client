import './App.scss';
import { Routes, Route, Link } from 'react-router-dom';
import { Home, NotFound } from './pages/index';

function App() {
  return (
    <div>
      <Link to="/form">Create A Post</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
