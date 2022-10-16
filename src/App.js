import './App.scss';
import { AuthProvider } from './contexts/User';
import { Routes, Route } from 'react-router-dom';
import { Home, Login, Register, PostForm, Post, NotFound } from './pages/index';
import { Navbar } from './components/index';
// import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* <Route path="profile" element={<RequireAuth><Profile /></RequireAuth>} /> */}
        <Route path="post/:id" element={<Post />} />
        <Route path="postform" element={<PostForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
