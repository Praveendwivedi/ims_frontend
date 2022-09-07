import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import demo from './components/demo';
import Product from './components/product';
import ProductDetail from './components/productDetail';
function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/home"  element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<Product/>} />
        <Route path="/product/detail/:id" element={<ProductDetail/>} />
      </Routes>
      {/* <Home /> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
    </Router>
  );
}

export default App;
