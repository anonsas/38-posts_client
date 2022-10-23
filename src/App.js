import './App.scss';
import { Page } from './constants';
import { Navbar } from './components/index';
import { AuthProvider } from './contexts/AuthContext';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Page.Home />} />
        <Route path="login" element={<Page.Login />} />
        <Route path="register" element={<Page.Register />} />
        <Route path="profile" element={<Page.Profile />} />
        <Route path="user/:id" element={<Page.UserProfile />} />
        <Route path="post/:id" element={<Page.Post />} />
        <Route path="postform" element={<Page.PostForm />} />
        <Route path="*" element={<Page.NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
