import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/homePage';
import AboutPage from './components/aboutPage';
import Navigation from './components/navigation';
import Footer from './components/footer';
import Header from './components/header';
import CreatePost from './components/createPost';
import PostDetail from './components/postDetail';
import Login from './components/login';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Header />
        <Navigation />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<HomePage />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;