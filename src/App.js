import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Detail from './Components/Detail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Genre from './Components/Genre';
import Trending from './Components/Trending';
import Search from './Components/Search';
import { useEffect, useState } from 'react';
import Login from './Login';
import Register from './Register';
function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7125/api/User")
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then(data => setUsers(data))
      .catch(error => console.error("Fetch error:", error));
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/comics/:slug" element={<Detail></Detail>}></Route>
          <Route path="/genre/:slug" element={<Genre></Genre>}></Route>
          <Route path="/danh-sach/:slug" element={<Trending></Trending>}></Route>
          <Route path="/search/" element={<Search></Search>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
