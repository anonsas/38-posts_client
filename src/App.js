import { useState, useEffect } from 'react';
import './App.scss';
// import { AuthProvider } from './contexts/AuthContext';
// import RequireAuth from './components/RequireAuth';
import { AuthContext } from './contexts/AuthContext';
import { Routes, Route } from 'react-router-dom';
import { Home, Login, Register, Profile, PostForm, Post, NotFound } from './pages/index';
import { Navbar } from './components/index';
import axios from 'axios';

function App() {
  // Track wether we logged-in or not.
  const [authState, setAuthState] = useState({
    id: 0,
    username: '',
    status: false,
  });

  useEffect(() => {
    axios
      .get('http://localhost:4000/auth/auth', {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({
            id: 0,
            username: '',
            status: false,
          });
        } else {
          setAuthState({
            id: response.data.id,
            username: response.data.username,
            status: true,
          });
        }
      });
  }, []);



  return (
    // <AuthProvider>
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
        {/* <Route path="profile" element={<RequireAuth><Profile /></RequireAuth>} /> */}
        <Route path="post/:id" element={<Post />} />
        <Route path="postform" element={<PostForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContext.Provider>
    // </AuthProvider>
  );
}

export default App;
