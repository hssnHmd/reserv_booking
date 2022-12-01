import './App.css';
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home';
import Hotels from './pages/hotels/Hotels';
import List from './pages/list/List';
import Login from './pages/login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotel/:id" element={<Hotels/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
