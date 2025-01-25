import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Detail from './Components/Detail';
import { BrowserRouter as  Router, Routes , Route } from 'react-router-dom';
import Genre from './Components/Genre';
function App() {
  return (

      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/comics/:slug" element={<Detail></Detail>}></Route>
          <Route path="/genre/:slug" element={<Genre></Genre>}></Route>
        </Routes>
      </Router>

  );
}

export default App;
