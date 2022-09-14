import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Home, PostForm, Post, NotFound } from './pages/index';
import { Navbar } from './components/index';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/postform" element={<PostForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
