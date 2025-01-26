import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Detail from './Components/Detail';
import { BrowserRouter as  Router, Routes , Route } from 'react-router-dom';
import Genre from './Components/Genre';
import Trending from './Components/Trending';
import Search from './Components/Search';
function App() {
  return (

      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/comics/:slug" element={<Detail></Detail>}></Route>
          <Route path="/genre/:slug" element={<Genre></Genre>}></Route>
          <Route path="/danh-sach/:slug" element={<Trending></Trending>}></Route>
          <Route path="/search/" element={<Search></Search>}></Route>
        </Routes>
      </Router>

  );
}

export default App;
