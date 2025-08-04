import { HashRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import PostsProvider from './contexts/PostsContext';
import { usePosts } from './contexts/PostsContext';
import HomePage from './components/homePage';
import AboutPage from './components/aboutPage';
import ContactPage from './components/contactPage';
import Navigation from './components/navigation';
import Footer from './components/footer';
import Header from './components/header';
import CreatePost from './components/createPost';
import PostDetail from './components/PostDetail';
import Login from './components/login';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <PostsProvider>
        <HashRouter>
          <div className="App">
            <Header />
            <Navigation />
            <main role="main">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/posts" element={<HomePage />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </PostsProvider>
    </AuthProvider>
  );
}

export default App;